local QBCore = exports['qb-core']:GetCoreObject()

-- =====================================================
-- CONFIGURAÇÃO GLOBAL
-- =====================================================

Config = {}
Config.Debug = true  -- Mude para false em produção

-- =====================================================
-- CACHE DO TOKYO_QJOBSYSTEM
-- =====================================================

---@type table<string, table>
local orgConfigCache = {}

--- Carrega configurações de todas as organizações do tokyo_qjobsystem
local function LoadOrgConfigs()
    orgConfigCache = {}

    local result = MySQL.scalar.await("SELECT jobs FROM tokyo_qjobsystem")
    if not result then
        print("[org_panel] [ERRO] Não encontrou jobs em tokyo_qjobsystem")
        return
    end

    local ok, orgList = pcall(json.decode, result)
    if not ok or type(orgList) ~= "table" then
        print("[org_panel] [ERRO] Falha ao decodificar tokyo_qjobsystem: " .. tostring(orgList))
        return
    end

    for _, orgData in ipairs(orgList) do
        local orgName = orgData.job or orgData.name
        if orgName then
            orgConfigCache[orgName] = {
                label = orgData.label or orgName,
                type = orgData.type or orgData.jobtype or 'job',
                grades = orgData.grades or {}
            }
        end
    end

    if Config.Debug then
        local count = 0
        for _ in pairs(orgConfigCache) do count = count + 1 end
        print("[org_panel] Carregadas " .. count .. " configuracoes de org do tokyo_qjobsystem")
    end
end

-- Carrega na inicialização
LoadOrgConfigs()

-- Comando para recarregar manualmente (útil em dev)
QBCore.Commands.Add('orgpanel_reload', 'Recarregar configuracoes das orgs', {}, true, function(source)
    LoadOrgConfigs()
    local count = 0
    for _ in pairs(orgConfigCache) do count = count + 1 end
    TriggerClientEvent('chat:addMessage', source, {
        args = { "[org_panel]", "Configuracoes recarregadas. Total de orgs: " .. count }
    })
end, 'admin')

-- =====================================================
-- HELPERS
-- =====================================================

---@param source number
---@return table|nil {name, type, label, grade, gradeName, isBoss, bankAuth, isRecruiter}
local function GetOrgName(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return nil end

    local gang = Player.PlayerData.gang
    local job = Player.PlayerData.job

    local orgName = gang.name ~= 'none' and gang.name or (job.name ~= 'unemployed' and job.name)
    if not orgName or not orgConfigCache[orgName] then return nil end

    local cfg = orgConfigCache[orgName]
    local gradeLevel = gang.name ~= 'none' and gang.grade.level or job.grade.level
    local gradeData = cfg.grades[tostring(gradeLevel)] or {}

    return {
        name = orgName,
        type = cfg.type,
        label = cfg.label,
        grade = gradeLevel,
        gradeName = gradeData.name or 'Membro',
        isBoss = gradeData.isboss or false,
        bankAuth = gradeData.bankAuth or false,
        isRecruiter = gradeData.isrecruiter or false
    }
end

---@param source number
---@param perm string 'boss'|'bank'|'recruit'
---@return boolean
local function HasOrgPermission(source, perm)
    local org = GetOrgName(source)
    if not org then return false end

    if perm == 'boss' then return org.isBoss end
    if perm == 'bank' then return org.bankAuth end
    if perm == 'recruit' then return org.isRecruiter end
    return false
end

---@param orgName string
---@param actionBy string
---@param actionType string
---@param targetCitizenid string|nil
---@param details table|nil
local function LogOrgAction(orgName, actionBy, actionType, targetCitizenid, details)
    MySQL.insert('INSERT INTO org_logs (org_name, action_by, action_type, target_citizenid, details) VALUES (?, ?, ?, ?, ?)', {
        orgName,
        actionBy,
        actionType,
        targetCitizenid,
        details and json.encode(details) or nil
    })
end

-- =====================================================
-- CALLBACKS - READ
-- =====================================================

lib.callback.register('orgpanel:getMyOrgInfo', function(source)
    local org = GetOrgName(source)
    if not org then return nil end

    local balance = MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', {org.name}) or 0

    return {
        orgName = org.name,
        label = org.label,
        balance = balance,
        myGrade = org.grade,
        myGradeName = org.gradeName,
        isBoss = org.isBoss,
        bankAuth = org.bankAuth,
        isRecruiter = org.isRecruiter
    }
end)

lib.callback.register('orgpanel:getOverview', function(source)
    local org = GetOrgName(source)
    if not org then return nil end

    local balance = MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', {org.name}) or 0
    local totalMembers = MySQL.scalar.await('SELECT COUNT(*) FROM players WHERE JSON_EXTRACT(job, "$.name") = ? OR JSON_EXTRACT(gang, "$.name") = ?', {org.name, org.name}) or 0

    local onlineCount = 0
    local allPlayers = QBCore.Functions.GetQBPlayers()
    for _, p in pairs(allPlayers) do
        if p.PlayerData.job and p.PlayerData.job.name == org.name then
            onlineCount = onlineCount + 1
        elseif p.PlayerData.gang and p.PlayerData.gang.name == org.name then
            onlineCount = onlineCount + 1
        end
    end

    return {
        orgName = org.name,
        label = org.label,
        balance = balance,
        onlineCount = onlineCount,
        totalMembers = totalMembers,
        myGrade = org.grade,
        myGradeName = org.gradeName
    }
end)

lib.callback.register('orgpanel:getCurrentPlayer', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return nil end

    local name = 'Desconhecido'
    if Player.PlayerData.charinfo then
        local charinfo = type(Player.PlayerData.charinfo) == 'string' and json.decode(Player.PlayerData.charinfo) or Player.PlayerData.charinfo
        if charinfo and (charinfo.firstname or charinfo.lastname) then
            name = (charinfo.firstname or '') .. ' ' .. (charinfo.lastname or '')
        end
    end

    return {
        citizenid = Player.PlayerData.citizenid,
        name = name:gsub('^%s+', ''):gsub('%s+$', '')
    }
end)

lib.callback.register('orgpanel:getMembers', function(source)
    local org = GetOrgName(source)
    if not org then return {} end

    local rows = MySQL.query.await([[
        SELECT
            p.citizenid,
            JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')) as firstname,
            JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname')) as lastname,
            COALESCE(JSON_EXTRACT(p.job, '$.grade.level'), JSON_EXTRACT(p.gang, '$.grade.level'), 0) as grade,
            COALESCE(JSON_EXTRACT(p.job, '$.grade.name'), JSON_EXTRACT(p.gang, '$.grade.name'), 'Membro') as gradeName,
            (SELECT COALESCE(SUM(quantity), 0) FROM org_farm_progress WHERE citizenid = p.citizenid AND org_name = ?) as weeklyTotal,
            (SELECT COALESCE(SUM(quantity), 0) FROM org_farm_progress WHERE citizenid = p.citizenid AND org_name = ? AND date = CURDATE()) as dailyTotal
        FROM players p
        WHERE JSON_EXTRACT(p.job, '$.name') = ? OR JSON_EXTRACT(p.gang, '$.name') = ?
    ]], {org.name, org.name, org.name, org.name}) or {}

    local members = {}
    local onlinePlayers = QBCore.Functions.GetQBPlayers()

    for _, row in ipairs(rows) do
        local isOnline = false
        for _, p in pairs(onlinePlayers) do
            if p.PlayerData.citizenid == row.citizenid then
                isOnline = true
                break
            end
        end

        table.insert(members, {
            citizenid = row.citizenid,
            name = (row.firstname or 'Desconhecido') .. ' ' .. (row.lastname or ''),
            grade = tonumber(row.grade) or 0,
            gradeName = row.gradeName or 'Membro',
            online = isOnline,
            weeklyTotal = tonumber(row.weeklyTotal) or 0,
            dailyTotal = tonumber(row.dailyTotal) or 0,
            playtime = 0,
            deliveries = 0
        })
    end

    return members
end)

lib.callback.register('orgpanel:getFarmConfig', function(source)
    local org = GetOrgName(source)
    if not org then return {enabled = false, dailyGoal = 0, rewardPerUnit = 0} end

    local row = MySQL.single.await('SELECT * FROM org_farm_settings WHERE org_name = ?', {org.name})
    if not row then
        return {
            enabled = false,
            dailyGoal = 2000,
            rewardPerUnit = 0,
            rewardType = 'per_unit'
        }
    end

    return {
        enabled = row.enabled == 1,
        dailyGoal = row.daily_goal or 2000,
        rewardPerUnit = tonumber(row.reward_per_unit) or 0,
        rewardType = row.reward_type or 'per_unit'
    }
end)

lib.callback.register('orgpanel:getMyFarmProgress', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {currentQuantity = 0, dailyGoal = 0, rewardClaimed = false} end

    local org = GetOrgName(source)
    if not org then return {currentQuantity = 0, dailyGoal = 0, rewardClaimed = false} end

    local today = os.date('%Y-%m-%d')
    local row = MySQL.single.await([[
        SELECT quantity, reward_claimed
        FROM org_farm_progress
        WHERE citizenid = ? AND org_name = ? AND date = ?
    ]], {Player.PlayerData.citizenid, org.name, today})

    local cfg = MySQL.single.await('SELECT daily_goal, reward_per_unit FROM org_farm_settings WHERE org_name = ?', {org.name})

    return {
        currentQuantity = row and tonumber(row.quantity) or 0,
        dailyGoal = cfg and tonumber(cfg.daily_goal) or 2000,
        rewardClaimed = row and row.reward_claimed == 1 or false,
        rewardPerUnit = cfg and tonumber(cfg.reward_per_unit) or 0
    }
end)

lib.callback.register('orgpanel:claimFarmReward', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {success = false, message = 'Jogador nao encontrado'} end

    local org = GetOrgName(source)
    if not org then return {success = false, message = 'Voce nao pertence a uma org'} end

    local today = os.date('%Y-%m-%d')
    local row = MySQL.single.await([[
        SELECT quantity, reward_claimed
        FROM org_farm_progress
        WHERE citizenid = ? AND org_name = ? AND date = ?
    ]], {Player.PlayerData.citizenid, org.name, today})

    if not row or row.reward_claimed == 1 then
        return {success = false, message = 'Recompensa ja reivindicada ou nada a reivindicar'}
    end

    local quantity = tonumber(row.quantity) or 0
    local cfg = MySQL.single.await('SELECT reward_per_unit, daily_goal FROM org_farm_settings WHERE org_name = ? AND enabled = 1', {org.name})

    if not cfg or quantity < tonumber(cfg.daily_goal) then
        return {success = false, message = 'Meta diaria nao atingida'}
    end

    local reward = quantity * tonumber(cfg.reward_per_unit)
    if reward > 0 then
        Player.Functions.AddMoney('cash', reward)
    end

    MySQL.update('UPDATE org_farm_progress SET reward_claimed = 1 WHERE citizenid = ? AND org_name = ? AND date = ?',
        {Player.PlayerData.citizenid, org.name, today})

    return {success = true, message = 'Recompensa de $' .. reward .. ' reivindicada!'}
end)

lib.callback.register('orgpanel:getFarmRanking', function(source, data)
    local org = GetOrgName(source)
    if not org then return {} end

    local limit = tonumber(data and data.limit) or 10

    local rows = MySQL.query.await([[
        SELECT
            ofd.citizenid,
            SUM(ofd.quantity) as total,
            JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')) as firstname,
            JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname')) as lastname
        FROM org_farm_deliveries ofd
        LEFT JOIN players p ON p.citizenid = ofd.citizenid
        WHERE ofd.org_name = ?
        GROUP BY ofd.citizenid
        ORDER BY total DESC
        LIMIT ?
    ]], {org.name, limit}) or {}

    local ranking = {}
    for i, row in ipairs(rows) do
        table.insert(ranking, {
            rank = i,
            citizenid = row.citizenid,
            name = (row.firstname or 'Desconhecido') .. ' ' .. (row.lastname or ''),
            total = tonumber(row.total) or 0
        })
    end

    return ranking
end)

lib.callback.register('orgpanel:getTransactions', function(source, data)
    local org = GetOrgName(source)
    if not org then return {} end

    local limit = tonumber(data and data.limit) or 50

    local rows = MySQL.query.await([[
        SELECT id, citizenid, transaction_type, description, amount, created_at
        FROM org_transactions
        WHERE org_name = ?
        ORDER BY created_at DESC
        LIMIT ?
    ]], {org.name, limit}) or {}

    return rows
end)

lib.callback.register('orgpanel:getRecruitmentStats', function(source)
    local org = GetOrgName(source)
    if not org then return {} end

    local rows = MySQL.query.await([[
        SELECT recruiter_citizenid, COUNT(*) as total
        FROM org_recruitments
        WHERE org_name = ?
        GROUP BY recruiter_citizenid
        ORDER BY total DESC
    ]], {org.name}) or {}

    return rows
end)

lib.callback.register('orgpanel:getBannedMembers', function(source)
    local org = GetOrgName(source)
    if not org then return {} end

    local rows = MySQL.query.await([[
        SELECT id, banned_citizenid as citizenid, reason, banned_by, banned_at, is_active
        FROM org_bans
        WHERE org_name = ? AND is_active = 1
        ORDER BY banned_at DESC
    ]], {org.name}) or {}

    return rows
end)

-- =====================================================
-- CALLBACKS - WRITE/ACTIONS
-- =====================================================

lib.callback.register('orgpanel:deposit', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {success = false, message = 'Jogador nao encontrado'} end

    local org = GetOrgName(source)
    if not org or not org.bankAuth then return {success = false, message = 'Sem permissao para Depositar'} end

    local amount = tonumber(data and data.amount)
    if not amount or amount <= 0 then return {success = false, message = 'Valor invalido'} end

    if not Player.Functions.RemoveMoney('cash', amount) then
        return {success = false, message = 'Dinheiro insuficiente'}
    end

    MySQL.update('UPDATE org_accounts SET balance = balance + ? WHERE org_name = ?', {amount, org.name})
    MySQL.insert('INSERT INTO org_transactions (org_name, citizenid, transaction_type, description, amount) VALUES (?, ?, ?, ?, ?)',
        {org.name, Player.PlayerData.citizenid, 'deposit', 'Deposito', amount})

    LogOrgAction(org.name, Player.PlayerData.citizenid, 'deposit', nil, {amount = amount})

    return {success = true, message = 'Depositado $' .. amount}
end)

lib.callback.register('orgpanel:withdraw', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {success = false, message = 'Jogador nao encontrado'} end

    local org = GetOrgName(source)
    if not org or not org.isBoss then return {success = false, message = 'Apenas o chefe pode sacar'} end

    local amount = tonumber(data and data.amount)
    if not amount or amount <= 0 then return {success = false, message = 'Valor invalido'} end

    local currentBalance = MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', {org.name}) or 0
    if amount > currentBalance then return {success = false, message = 'Saldo insuficiente'} end

    Player.Functions.AddMoney('cash', amount)
    MySQL.update('UPDATE org_accounts SET balance = balance - ? WHERE org_name = ?', {amount, org.name})
    MySQL.insert('INSERT INTO org_transactions (org_name, citizenid, transaction_type, description, amount) VALUES (?, ?, ?, ?, ?)',
        {org.name, Player.PlayerData.citizenid, 'withdraw', 'Saque', amount})

    LogOrgAction(org.name, Player.PlayerData.citizenid, 'withdraw', nil, {amount = amount})

    return {success = true, message = 'Saque de $' .. amount .. ' realizado'}
end)

lib.callback.register('orgpanel:changeMemberGrade', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {success = false, message = 'Jogador nao encontrado'} end

    local org = GetOrgName(source)
    if not org or not org.isBoss then return {success = false, message = 'Apenas o chefe pode alterar cargos'} end

    local targetCitizenid = data and data.citizenid
    local newGrade = tonumber(data and data.grade)
    if not targetCitizenid or not newGrade then return {success = false, message = 'Dados incompletos'} end

    local targetPlayer = QBCore.Functions.GetPlayerByCitizenId(targetCitizenid)
    if targetPlayer then
        if targetPlayer.PlayerData.job and targetPlayer.PlayerData.job.name == org.name then
            targetPlayer.Functions.SetJob(org.name, newGrade)
        elseif targetPlayer.PlayerData.gang and targetPlayer.PlayerData.gang.name == org.name then
            targetPlayer.Functions.SetGang(org.name, newGrade)
        end
    else
        local targetRow = MySQL.single.await('SELECT job, gang FROM players WHERE citizenid = ?', {targetCitizenid})
        if targetRow then
            local jobData = targetRow.job and json.decode(targetRow.job)
            local gangData = targetRow.gang and json.decode(targetRow.gang)

            if jobData and jobData.name == org.name then
                jobData.grade = {level = newGrade}
                MySQL.update('UPDATE players SET job = ? WHERE citizenid = ?', {json.encode(jobData), targetCitizenid})
            elseif gangData and gangData.name == org.name then
                gangData.grade = {level = newGrade}
                MySQL.update('UPDATE players SET gang = ? WHERE citizenid = ?', {json.encode(gangData), targetCitizenid})
            end
        end
    end

    LogOrgAction(org.name, Player.PlayerData.citizenid, 'change_grade', targetCitizenid, {newGrade = newGrade})

    return {success = true, message = 'Cargo alterado'}
end)

lib.callback.register('orgpanel:recruitPlayer', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {success = false, message = 'Jogador nao encontrado'} end

    local org = GetOrgName(source)
    if not org or not org.isRecruiter then return {success = false, message = 'Sem permissao para recrutar'} end

    local targetId = tonumber(data and data.id)
    if not targetId then return {success = false, message = 'ID do jogador invalido'} end

    local targetPlayer = QBCore.Functions.GetPlayer(targetId)
    if not targetPlayer then return {success = false, message = 'Jogador offline ou nao encontrado'} end

    local targetCitizenid = targetPlayer.PlayerData.citizenid
    local orgType = org.type == 'gang' and 'gang' or 'job'

    if orgType == 'job' then
        targetPlayer.Functions.SetJob(org.name, 0)
    else
        targetPlayer.Functions.SetGang(org.name, 0)
    end

    MySQL.insert('INSERT INTO org_recruitments (org_name, recruiter_citizenid, recruited_citizenid) VALUES (?, ?, ?)',
        {org.name, Player.PlayerData.citizenid, targetCitizenid})

    LogOrgAction(org.name, Player.PlayerData.citizenid, 'recruit', targetCitizenid)

    return {success = true, message = 'Jogador recrutado!'}
end)

lib.callback.register('orgpanel:banMember', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {success = false, message = 'Jogador nao encontrado'} end

    local org = GetOrgName(source)
    if not org or not org.isBoss then return {success = false, message = 'Apenas o chefe pode banir'} end

    local targetCitizenid = data and data.citizenid
    local reason = data and data.reason or 'Motivo nao especificado'
    local duration = tonumber(data and data.duration) or 0

    if not targetCitizenid then return {success = false, message = 'Dados incompletos'} end

    local expiresAt = duration > 0 and os.date('%Y-%m-%d %H:%M:%S', os.time() + duration * 86400) or nil

    MySQL.insert('INSERT INTO org_bans (org_name, banned_citizenid, reason, banned_by, is_active) VALUES (?, ?, ?, ?, 1)',
        {org.name, targetCitizenid, reason, Player.PlayerData.citizenid})

    local targetPlayer = QBCore.Functions.GetPlayerByCitizenId(targetCitizenid)
    if targetPlayer then
        if targetPlayer.PlayerData.job and targetPlayer.PlayerData.job.name == org.name then
            targetPlayer.Functions.SetJob('unemployed', 0)
        elseif targetPlayer.PlayerData.gang and targetPlayer.PlayerData.gang.name == org.name then
            targetPlayer.Functions.SetGang('none', 0)
        end
    end

    LogOrgAction(org.name, Player.PlayerData.citizenid, 'ban', targetCitizenid, {reason = reason, duration = duration})

    return {success = true, message = 'Membro banido'}
end)

lib.callback.register('orgpanel:unbanMember', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {success = false, message = 'Jogador nao encontrado'} end

    local org = GetOrgName(source)
    if not org or not org.isBoss then return {success = false, message = 'Apenas o chefe pode desbanir'} end

    local targetCitizenid = data and data.citizenid
    if not targetCitizenid then return {success = false, message = 'Dados incompletos'} end

    MySQL.update('UPDATE org_bans SET is_active = 0, unbanned_at = NOW(), unbanned_by = ? WHERE org_name = ? AND banned_citizenid = ? AND is_active = 1',
        {Player.PlayerData.citizenid, org.name, targetCitizenid})

    LogOrgAction(org.name, Player.PlayerData.citizenid, 'unban', targetCitizenid)

    return {success = true, message = 'Membro desbanido'}
end)

-- =====================================================
-- EVENT HANDLERS
-- =====================================================

RegisterNetEvent('orgpanel:updateFarmProgress', function(citizenid, quantity)
    local src = source
    local org = GetOrgName(src)
    if not org then return end

    local today = os.date('%Y-%m-%d')

    local existing = MySQL.single.await('SELECT quantity FROM org_farm_progress WHERE citizenid = ? AND org_name = ? AND date = ?',
        {citizenid, org.name, today})

    if existing then
        MySQL.update('UPDATE org_farm_progress SET quantity = quantity + ? WHERE citizenid = ? AND org_name = ? AND date = ?',
            {quantity, citizenid, org.name, today})
    else
        MySQL.insert('INSERT INTO org_farm_progress (citizenid, org_name, date, quantity) VALUES (?, ?, ?, ?)',
            {citizenid, org.name, today, quantity})
    end

    MySQL.insert('INSERT INTO org_farm_deliveries (citizenid, org_name, quantity) VALUES (?, ?, ?)',
        {citizenid, org.name, quantity})
end)

-- =====================================================
-- CLIENT FUNCTIONS
-- =====================================================

RegisterNetEvent('orgpanel:openRadio', function()
    local src = source
    TriggerClientEvent('qb-radio:client:openRadio', src)
end)

RegisterNetEvent('orgpanel:setWaypoint', function(coords)
    local src = source
    TriggerClientEvent('qb-misc:client:setWaypoint', src, coords.x, coords.y)
end)
