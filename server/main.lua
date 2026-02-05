local QBCore = exports['qb-core']:GetCoreObject()

-- =====================================================
-- TOKYO_QJOBSYSTEM CACHE
-- =====================================================

---@type table<string, table>
local orgConfigCache = {}

--- Carrega todas as configurações de org do tokyo_qjobsystem
local function LoadOrgConfigs()
    local result = MySQL.scalar.await("SELECT jobs FROM tokyo_qjobsystem")

    orgConfigCache = {}

    if result then
        local ok, orgList = pcall(function()
            return json.decode(result)
        end)

        if ok and orgList and type(orgList) == "table" then
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
        end
    end

    if Config.Debug then
        local orgCount = 0
        for _ in pairs(orgConfigCache) do orgCount = orgCount + 1 end
        print("[org_panel] Carregadas " .. orgCount .. " configuracoes de org do tokyo_qjobsystem")
    end
end

-- Carregar configs na inicialização
LoadOrgConfigs()

-- Recarregar configs quando solicitado
QBCore.Commands.Add('orgpanel_reload', 'Recarregar configuracoes das orgs', {}, true, function(source)
    LoadOrgConfigs()
    local orgCount = 0
    for _ in pairs(orgConfigCache) do orgCount = orgCount + 1 end
    TriggerClientEvent('chat:addMessage', source, {
        args = { "[org_panel]", "Configuracoes recarregadas. Total de orgs: " .. orgCount }
    })
end, 'admin')

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

---@param source number
---@return table|nil orgData
local function GetOrgName(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return nil end

    local gang = Player.PlayerData.gang
    local job = Player.PlayerData.job

    if gang and gang.name and gang.name ~= 'none' then
        local orgConfig = orgConfigCache[gang.name]
        if orgConfig then
            local gradeData = orgConfig.grades[tostring(gang.grade.level)] or orgConfig.grades[gang.grade.level] or {}
            return {
                name = gang.name,
                type = 'gang',
                label = orgConfig.label,
                grade = gang.grade.level,
                gradeName = gang.grade.name or gradeData.name or 'Membro',
                isBoss = gradeData.isboss == true,
                bankAuth = gradeData.bankAuth == true,
                isRecruiter = gradeData.isrecruiter == true
            }
        end
        return {
            name = gang.name,
            type = 'gang',
            label = gang.label or gang.name,
            grade = gang.grade.level,
            gradeName = gang.grade.name,
            isBoss = false,
            bankAuth = false,
            isRecruiter = false
        }
    end

    if job and job.name and job.name ~= 'unemployed' then
        local orgConfig = orgConfigCache[job.name]
        if orgConfig then
            local gradeData = orgConfig.grades[tostring(job.grade.level)] or orgConfig.grades[job.grade.level] or {}
            return {
                name = job.name,
                type = 'job',
                label = orgConfig.label,
                grade = job.grade.level,
                gradeName = job.grade.name or gradeData.name or 'Membro',
                isBoss = gradeData.isboss == true,
                bankAuth = gradeData.bankAuth == true,
                isRecruiter = gradeData.isrecruiter == true
            }
        end
        return {
            name = job.name,
            type = 'job',
            label = job.label or job.name,
            grade = job.grade.level,
            gradeName = job.grade.name,
            isBoss = false,
            bankAuth = false,
            isRecruiter = false
        }
    end

    return nil
end

---@param source number
---@param permission string 'boss'|'bank'|'recruit'
---@return boolean
local function HasOrgPermission(source, permission)
    local orgData = GetOrgName(source)
    if not orgData then return false end

    local orgName = orgData.name
    local orgConfig = orgConfigCache[orgName]

    if orgConfig then
        local gradeLevel = orgData.grade
        local gradeData = orgConfig.grades[tostring(gradeLevel)] or orgConfig.grades[gradeLevel] or {}

        if permission == 'boss' then
            return orgData.isBoss or gradeData.isboss == true
        elseif permission == 'bank' then
            return orgData.bankAuth or gradeData.bankAuth == true
        elseif permission == 'recruit' then
            return orgData.isRecruiter or gradeData.isrecruiter == true
        end
    end

    if permission == 'boss' then return orgData.isBoss end
    if permission == 'bank' then return orgData.bankAuth end
    if permission == 'recruit' then return orgData.isRecruiter end

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

local function EnsureOrgAccount(orgName, orgType, label)
    local exists = MySQL.scalar.await('SELECT 1 FROM org_accounts WHERE org_name = ?', { orgName })
    if not exists then
        MySQL.insert('INSERT INTO org_accounts (org_name, org_type, label, balance) VALUES (?, ?, ?, 0)', {
            orgName,
            orgType or 'gang',
            label or orgName
        })
    end
end

---@param source number
---@return table|nil org
local function GetPlayerOrgFromDB(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return nil end

    local citizenid = Player.PlayerData.citizenid

    local row = MySQL.single.await('SELECT job, gang FROM players WHERE citizenid = ?', { citizenid })
    if not row then return nil end

    local jobData = row.job and json.decode(row.job) or nil
    local gangData = row.gang and json.decode(row.gang) or nil

    local orgJson = gangData or jobData
    if not orgJson or not orgJson.name then return nil end

    local orgName = orgJson.name
    local orgType = gangData and 'gang' or 'job'

    local grade = orgJson.grade or {}
    local gradeLevel = grade.level or 0
    local gradeName = grade.name or 'Membro'

    local isBoss = orgJson.isboss == true
    local bankAuth = orgJson.bankAuth == true
    local isRecruiter = orgJson.isrecruiter == true

    local label = orgJson.label or orgName

    local orgConfig = orgConfigCache[orgName]
    if orgConfig then
        local gradeData = orgConfig.grades[tostring(gradeLevel)] or orgConfig.grades[gradeLevel] or {}
        isBoss = isBoss or gradeData.isboss == true
        bankAuth = bankAuth or gradeData.bankAuth == true
        isRecruiter = isRecruiter or gradeData.isrecruiter == true
    end

    return {
        citizenid = citizenid,
        orgName = orgName,
        orgType = orgType,
        label = label,
        gradeLevel = gradeLevel,
        gradeName = gradeName,
        isBoss = isBoss,
        bankAuth = bankAuth,
        isRecruiter = isRecruiter
    }
end

-- =====================================================
-- READ CALLBACKS
-- =====================================================

lib.callback.register('orgpanel:getMyOrgInfo', function(source)
    print('[org_panel] getMyOrgInfo chamado para source: ' .. tostring(source))
    local org = GetPlayerOrgFromDB(source)
    print('[org_panel] GetPlayerOrgFromDB retornou orgName: ' .. (org and org.orgName or 'nil'))
    if not org then
        print('[org_panel] getMyOrgInfo retornando nil')
        return nil
    end

    EnsureOrgAccount(org.orgName, org.orgType, org.label)

    local balance = MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', { org.orgName }) or 0

    print('[org_panel] getMyOrgInfo retornando sucesso: ' .. org.label)
    return {
        orgName = org.orgName,
        label = org.label,
        myGrade = org.gradeLevel,
        myGradeName = org.gradeName,
        isBoss = org.isBoss,
        bankAuth = org.bankAuth,
        isRecruiter = org.isRecruiter,
        balance = balance
    }
end)

lib.callback.register('orgpanel:getOverview', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return nil end

    local orgData = GetOrgName(source)
    if not orgData then return nil end

    local balance = MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', { orgData.name }) or 0

    local totalMembers = MySQL.scalar.await('SELECT COUNT(*) FROM org_playtime WHERE org_name = ?', { orgData.name }) or 0

    local onlineCount = 0
    local allPlayers = QBCore.Functions.GetQBPlayers()
    for _, player in pairs(allPlayers) do
        if player.PlayerData.gang and player.PlayerData.gang.name == orgData.name or (player.PlayerData.job and player.PlayerData.job.name == orgData.name) then
            onlineCount = onlineCount + 1
        end
    end

    local ratingRow = MySQL.single.await('SELECT AVG(rating) as avg_rating, COUNT(*) as total FROM org_ratings WHERE org_name = ?', { orgData.name })
    local rating = ratingRow and ratingRow.avg_rating or 0
    local ratingCount = ratingRow and (ratingRow.total or 0) or 0

    return {
        orgName = orgData.name,
        label = orgData.label,
        balance = balance,
        onlineCount = onlineCount,
        totalMembers = totalMembers,
        rating = rating,
        ratingCount = ratingCount,
        myGrade = orgData.grade,
        myGradeName = orgData.gradeName
    }
end)

lib.callback.register('orgpanel:getMembers', function(source, data)
    local orgData = GetOrgName(source)
    if not orgData then return nil end

    local rows = MySQL.query.await([[
        SELECT op.citizenid, op.playtime, op.join_date, op.last_updated,
               p.charinfo, p.metadata
        FROM org_playtime op
        LEFT JOIN players p ON p.citizenid = op.citizenid
        WHERE op.org_name = ?
        ORDER BY op.playtime DESC
    ]], { orgData.name })

    if (not rows) then return {} end

    local members = {}
    for _, row in ipairs(rows) do
        local name = 'Desconhecido'
        local mugshot = nil
        if row.charinfo then
            local info = type(row.charinfo) == 'string' and json.decode(row.charinfo) or row.charinfo
            if info and (info.firstname or info.lastname) then
                name = (info.firstname or '') .. ' ' .. (info.lastname or '')
            end
        end

        if row.metadata then
            local meta = type(row.metadata) == 'string' and json.decode(row.metadata) or row.metadata
            mugshot = meta and meta.mugshot_url or nil
        end

        local TargetPlayer = QBCore.Functions.GetPlayerByCitizenId(row.citizenid)
        local gradeName = 'Membro'
        local online = false
        if TargetPlayer then
            online = true
            local job = TargetPlayer.PlayerData.job
            local gang = TargetPlayer.PlayerData.gang
            if gang and gang.name == orgData.name then
                gradeName = gang.grade.name
            elseif job and job.name == orgData.name then
                gradeName = job.grade.name
            end
        end

        local today = os.date('%Y-%m-%d')
        local daily_total = MySQL.scalar.await('SELECT quantity FROM org_farm_progress WHERE citizenid = ? AND org_name = ? AND date = ?', { row.citizenid, orgData.name, today }) or 0
        local weekly_total = MySQL.scalar.await('SELECT SUM(quantity) FROM org_farm_progress WHERE citizenid = ? AND org_name = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)', { row.citizenid, orgData.name }) or 0

        local deliveries_rows = MySQL.query.await('SELECT quantity, created_at FROM org_farm_deliveries WHERE citizenid = ? AND org_name = ? ORDER BY created_at DESC LIMIT 5', { row.citizenid, orgData.name })
        local recent_deliveries = {}
        if deliveries_rows then
            for _, dr in ipairs(deliveries_rows) do
                table.insert(recent_deliveries, {
                    amount = dr.quantity,
                    timestamp = dr.created_at,
                    date = os.date('%d/%m/%Y', dr.created_at / 1000),
                    time = os.date('%H:%M', dr.created_at / 1000)
                })
            end
        end

        members[#members + 1] = {
            citizenid = row.citizenid,
            name = name:gsub('^%s+', ''):gsub('%s+$', ''),
            playtime = row.playtime or 0,
            join_date = row.join_date,
            last_updated = row.last_updated,
            mugshot_url = mugshot,
            gradeName = gradeName,
            online = online,
            dailyTotal = daily_total,
            weeklyTotal = weekly_total,
            recentDeliveries = recent_deliveries
        }
    end
    return members
end)

lib.callback.register('orgpanel:getFarmConfig', function(source)
    local org = GetPlayerOrgFromDB(source)
    if not org then return nil end

    local row = MySQL.single.await('SELECT * FROM org_farm_settings WHERE org_name = ?', { org.orgName })

    if not row then
        return {
            enabled = false,
            dailyGoal = 0,
            rewardType = 'per_unit',
            rewardPerUnit = 0.0,
            rewardFixed = 0.0,
            itemsAllowed = {}
        }
    end

    local itemsAllowed = {}
    if row.items_allowed then
        local ok, decoded = pcall(json.decode, row.items_allowed)
        if ok and type(decoded) == 'table' then
            itemsAllowed = decoded
        end
    end

    return {
        enabled = row.enabled == 1,
        dailyGoal = row.daily_goal or 0,
        rewardType = row.reward_type or 'per_unit',
        rewardPerUnit = tonumber(row.reward_per_unit) or 0.0,
        rewardFixed = tonumber(row.reward_fixed) or 0.0,
        itemsAllowed = itemsAllowed
    }
end)

lib.callback.register('orgpanel:getFarmRanking', function(source, data)
    local orgData = GetOrgName(source)
    if not orgData then return nil end

    local limit = tonumber(data and data.limit) or 20
    local rows = MySQL.query.await([[
        SELECT ofd.citizenid, SUM(ofd.quantity) as total, p.charinfo
        FROM org_farm_deliveries ofd
        LEFT JOIN players p ON p.citizenid = ofd.citizenid
        WHERE ofd.org_name = ?
        GROUP BY ofd.citizenid, p.charinfo
        ORDER BY total DESC
        LIMIT ?
    ]], { orgData.name, limit })

    if not rows then return {} end

    local ranking = {}
    for i, row in ipairs(rows) do
        local name = 'Desconhecido'
        if row.charinfo then
            local info = type(row.charinfo) == 'string' and json.decode(row.charinfo) or row.charinfo
            if info and (info.firstname or info.lastname) then
                name = (info.firstname or '') .. ' ' .. (info.lastname or '')
            end
        end
        ranking[#ranking + 1] = {
            rank = i,
            citizenid = row.citizenid,
            name = name:gsub('^%s+', ''):gsub('%s+$', ''),
            total = tonumber(row.total) or 0
        }
    end
    return ranking
end)

lib.callback.register('orgpanel:getMyFarmProgress', function(source)
    local org = GetPlayerOrgFromDB(source)
    if not org then return nil end

    local today = os.date('%Y-%m-%d')
    local cfg = MySQL.single.await('SELECT * FROM org_farm_settings WHERE org_name = ?', { org.orgName })

    local row = MySQL.single.await([[
        SELECT quantity, reward_claimed
        FROM org_farm_progress
        WHERE citizenid = ? AND org_name = ? AND date = ?
    ]], { org.citizenid, org.orgName, today })

    local quantity = row and row.quantity or 0
    local rewardClaimed = row and (row.reward_claimed == 1) or false

    local dailyGoal = (cfg and cfg.daily_goal) or 0
    local rewardType = cfg and cfg.reward_type or 'per_unit'
    local rewardPerUnit = tonumber(cfg and cfg.reward_per_unit) or 0.0
    local rewardFixed = tonumber(cfg and cfg.reward_fixed) or 0.0

    local potentialReward = 0.0
    if cfg and cfg.enabled == 1 then
        if rewardType == 'per_unit' then
            potentialReward = quantity * rewardPerUnit
        else
            if quantity >= dailyGoal and not rewardClaimed then
                potentialReward = rewardFixed
            end
        end
    end

    return {
        date = today,
        currentQuantity = quantity,
        rewardClaimed = rewardClaimed,
        dailyGoal = dailyGoal,
        rewardType = rewardType,
        rewardPerUnit = rewardPerUnit,
        rewardFixed = rewardFixed,
        potentialReward = potentialReward
    }
end)

lib.callback.register('orgpanel:getTransactions', function(source, data)
    local orgData = GetOrgName(source)
    if not orgData then return nil end

    local limit = tonumber(data and data.limit) or 50
    local rows = MySQL.query.await([[
        SELECT id, citizenid, transaction_type, description, amount, created_at
        FROM org_transactions
        WHERE org_name = ?
        ORDER BY created_at DESC
        LIMIT ?
    ]], { orgData.name, limit })

    return rows or {}
end)

lib.callback.register('orgpanel:getRecruitmentStats', function(source)
    local orgData = GetOrgName(source)
    if not orgData then return nil end

    local rows = MySQL.query.await([[
        SELECT recruiter_citizenid, COUNT(*) as total
        FROM org_recruitments
        WHERE org_name = ?
        GROUP BY recruiter_citizenid
        ORDER BY total DESC
    ]], { orgData.name })

    if not rows then return {} end

    local stats = {}
    for _, row in ipairs(rows) do
        stats[#stats + 1] = {
            citizenid = row.recruiter_citizenid,
            total = tonumber(row.total) or 0
        }
    end
    return stats
end)

lib.callback.register('orgpanel:getBannedMembers', function(source)
    local orgData = GetOrgName(source)
    if not orgData then return nil end

    local rows = MySQL.query.await([[
        SELECT id, banned_citizenid, banned_by, reason, banned_at, is_active
        FROM org_bans
        WHERE org_name = ? AND is_active = 1
        ORDER BY banned_at DESC
    ]], { orgData.name })

    return rows or {}
end)

lib.callback.register('orgpanel:updateFarmConfig', function(source, data)
    if not HasOrgPermission(source, 'boss') then
        return { success = false, message = 'Sem permissao.' }
    end
    local org = GetPlayerOrgFromDB(source)
    if not org then return { success = false } end

    MySQL.update.await([[
        INSERT INTO org_farm_settings (org_name, daily_goal, reward_per_unit, enabled)
        VALUES (?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE daily_goal = ?, reward_per_unit = ?
    ]], { org.orgName, data.dailyGoal, data.rewardPerUnit, data.dailyGoal, data.rewardPerUnit })

    return { success = true }
end)

lib.callback.register('orgpanel:banMember', function(source, data)
    if not HasOrgPermission(source, 'boss') then
        return { success = false, message = 'Sem permissao.' }
    end
    local orgData = GetOrgName(source)
    local Player = QBCore.Functions.GetPlayer(source)

    MySQL.insert.await('INSERT INTO org_bans (org_name, banned_citizenid, banned_by, reason) VALUES (?, ?, ?, ?)', {
        orgData.name, data.citizenid, Player.PlayerData.citizenid, data.reason or 'Sem motivo'
    })

    local Target = QBCore.Functions.GetPlayerByCitizenId(data.citizenid)
    if Target then
        if orgData.type == 'gang' then Target.Functions.SetGang('none', 0)
        else Target.Functions.SetJob('unemployed', 0) end
    end

    return { success = true }
end)

lib.callback.register('orgpanel:unbanMember', function(source, data)
    if not HasOrgPermission(source, 'boss') then
        return { success = false, message = 'Sem permissao.' }
    end
    local orgData = GetOrgName(source)

    MySQL.update.await('UPDATE org_bans SET is_active = 0 WHERE org_name = ? AND banned_citizenid = ?', {
        orgData.name, data.citizenid
    })

    return { success = true }
end)

-- =====================================================
-- WRITE CALLBACKS
-- =====================================================

lib.callback.register('orgpanel:deposit', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return { success = false, message = 'Jogador nao encontrado.' } end

    if not HasOrgPermission(source, 'bank') then
        return { success = false, message = 'Sem permissao para depositar.' }
    end

    local orgData = GetOrgName(source)
    if not orgData then return { success = false, message = 'Voce nao pertence a uma organizacao.' } end

    local amount = tonumber(data and data.amount)
    if not amount or amount <= 0 then
        return { success = false, message = 'Valor invalido.' }
    end

    local citizenid = Player.PlayerData.citizenid
    local cash = Player.PlayerData.money.cash or 0
    if cash < amount then
        return { success = false, message = 'Dinheiro insuficiente.' }
    end

    Player.Functions.RemoveMoney('cash', amount, 'org-deposit')
    EnsureOrgAccount(orgData.name, orgData.type, orgData.label)

    MySQL.update.await('UPDATE org_accounts SET balance = balance + ? WHERE org_name = ?', { amount, orgData.name })
    MySQL.insert('INSERT INTO org_transactions (org_name, citizenid, transaction_type, description, amount) VALUES (?, ?, ?, ?, ?)', {
        orgData.name,
        citizenid,
        'entrada',
        data.description or 'Deposito no cofre',
        amount
    })

    LogOrgAction(orgData.name, citizenid, 'deposit', nil, { amount = amount })
    return { success = true, message = 'Deposito realizado.', newBalance = (MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', { orgData.name }) or 0) }
end)

lib.callback.register('orgpanel:withdraw', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return { success = false, message = 'Jogador nao encontrado.' } end

    if not HasOrgPermission(source, 'bank') then
        return { success = false, message = 'Sem permissao para sacar.' }
    end

    local orgData = GetOrgName(source)
    if not orgData then return { success = false, message = 'Voce nao pertence a uma organizacao.' } end

    local amount = tonumber(data and data.amount)
    if not amount or amount <= 0 then
        return { success = false, message = 'Valor invalido.' }
    end

    local balance = MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', { orgData.name }) or 0
    if balance < amount then
        return { success = false, message = 'Saldo insuficiente no cofre.' }
    end

    local citizenid = Player.PlayerData.citizenid

    MySQL.update.await('UPDATE org_accounts SET balance = balance - ? WHERE org_name = ?', { amount, orgData.name })
    MySQL.insert('INSERT INTO org_transactions (org_name, citizenid, transaction_type, description, amount) VALUES (?, ?, ?, ?, ?)', {
        orgData.name,
        citizenid,
        'saque',
        data.description or 'Saque do cofre',
        amount
    })

    Player.Functions.AddMoney('cash', amount, 'org-withdraw')
    LogOrgAction(orgData.name, citizenid, 'withdraw', nil, { amount = amount })

    local newBalance = MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', { orgData.name }) or 0
    return { success = true, message = 'Saque realizado.', newBalance = newBalance }
end)

lib.callback.register('orgpanel:claimFarmReward', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then
        return { success = false, message = 'Jogador nao encontrado.' }
    end

    local org = GetPlayerOrgFromDB(source)
    if not org then
        return { success = false, message = 'Voce nao pertence a uma organizacao.' }
    end

    local cfg = MySQL.single.await('SELECT * FROM org_farm_settings WHERE org_name = ?', { org.orgName })
    if not cfg or cfg.enabled ~= 1 then
        return { success = false, message = 'Sistema de farm nao configurado.' }
    end

    local today = os.date('%Y-%m-%d')

    local row = MySQL.single.await([[
        SELECT quantity, reward_claimed
        FROM org_farm_progress
        WHERE citizenid = ? AND org_name = ? AND date = ?
    ]], { org.citizenid, org.orgName, today })

    local quantity = row and row.quantity or 0
    local rewardClaimed = row and (row.reward_claimed == 1) or false

    if rewardClaimed then
        return { success = false, message = 'Recompensa ja coletada hoje.' }
    end

    local dailyGoal = cfg.daily_goal or 0
    if quantity < dailyGoal then
        return { success = false, message = 'Meta diaria ainda nao atingida.' }
    end

    local rewardType = cfg.reward_type or 'per_unit'
    local rewardPerUnit = tonumber(cfg.reward_per_unit) or 0.0
    local rewardFixed = tonumber(cfg.reward_fixed) or 0.0

    local reward = 0.0
    if rewardType == 'per_unit' then
        reward = quantity * rewardPerUnit
    else
        reward = rewardFixed
    end

    if reward <= 0 then
        return { success = false, message = 'Recompensa configurada e 0.' }
    end

    local balance = MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', { org.orgName }) or 0
    if balance < reward then
        return { success = false, message = 'Saldo insuficiente no cofre.' }
    end

    MySQL.update.await('UPDATE org_accounts SET balance = balance - ? WHERE org_name = ?', { reward, org.orgName })

    MySQL.update.await([[
        INSERT INTO org_farm_progress (citizenid, org_name, date, quantity, reward_claimed)
        VALUES (?, ?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE reward_claimed = 1
    ]], { org.citizenid, org.orgName, today, quantity })

    Player.Functions.AddMoney('bank', reward, 'farm-daily-reward')

    local newBalance = MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', { org.orgName }) or 0

    return {
        success = true,
        message = ('Voce recebeu R$ %.2f pela meta diaria.'):format(reward),
        reward = reward,
        newBalance = newBalance,
        progress = {
            date = today,
            currentQuantity = quantity,
            rewardClaimed = true,
            dailyGoal = dailyGoal,
            rewardType = rewardType,
            rewardPerUnit = rewardPerUnit,
            rewardFixed = rewardFixed,
            potentialReward = 0.0
        }
    }
end)

lib.callback.register('orgpanel:changeMemberGrade', function(source, data)
    if not HasOrgPermission(source, 'boss') then
        return { success = false, message = 'Sem permissao para alterar cargo.' }
    end

    local orgData = GetOrgName(source)
    if not orgData then return { success = false, message = 'Voce nao pertence a uma organizacao.' } end

    local targetCitizenid = data and data.citizenid
    local gradeName = data and data.gradeName

    if not targetCitizenid or not gradeName then
        return { success = false, message = 'Dados invalidos.' }
    end

    local newGrade = 0
    local orgConfig = orgConfigCache[orgData.name]
    if orgConfig and orgConfig.grades then
        for level, gradeData in pairs(orgConfig.grades) do
            if gradeData.name == gradeName then
                newGrade = tonumber(level)
                break
            end
        end
    end

    if newGrade == 0 then
        if orgData.type == 'gang' then
            local gang = QBCore.Shared.Gangs[orgData.name]
            if gang and gang.grades then
                for level, gdata in pairs(gang.grades) do
                    if gdata.name == gradeName then
                        newGrade = tonumber(level)
                        break
                    end
                end
            end
        else
            local job = QBCore.Shared.Jobs[orgData.name]
            if job and job.grades then
                for level, jdata in pairs(job.grades) do
                    if jdata.name == gradeName then
                        newGrade = tonumber(level)
                        break
                    end
                end
            end
        end
    end

    local TargetPlayer = QBCore.Functions.GetPlayerByCitizenId(targetCitizenid)
    if not TargetPlayer then
        if orgData.type == 'gang' then
            MySQL.update.await("UPDATE players SET gang = JSON_SET(gang, '$.grade.level', ?, '$.grade.name', ?) WHERE citizenid = ?", { newGrade, gradeName, targetCitizenid })
        else
            MySQL.update.await("UPDATE players SET job = JSON_SET(job, '$.grade.level', ?, '$.grade.name', ?) WHERE citizenid = ?", { newGrade, gradeName, targetCitizenid })
        end
    else
        if orgData.type == 'gang' then
            TargetPlayer.Functions.SetGang(orgData.name, newGrade)
        else
            TargetPlayer.Functions.SetJob(orgData.name, newGrade)
        end
    end

    LogOrgAction(orgData.name, QBCore.Functions.GetPlayer(source).PlayerData.citizenid, 'change_grade', targetCitizenid, { grade = newGrade, gradeName = gradeName })
    return { success = true, message = 'Cargo alterado.' }
end)

lib.callback.register('orgpanel:recruitPlayer', function(source, data)
    if not HasOrgPermission(source, 'recruit') then
        return { success = false, message = 'Sem permissao para recrutar.' }
    end

    local orgData = GetOrgName(source)
    if not orgData then return { success = false, message = 'Voce nao pertence a uma organizacao.' } end

    local targetId = tonumber(data and data.targetId)
    local targetCitizenid = data and data.citizenid
    if not targetId and not targetCitizenid then
        return { success = false, message = 'Informe o jogador.' }
    end

    local TargetPlayer = targetId and QBCore.Functions.GetPlayer(targetId) or QBCore.Functions.GetPlayerByCitizenId(targetCitizenid)
    if not TargetPlayer then
        return { success = false, message = 'Jogador nao esta online.' }
    end

    local recruitedCitizenid = TargetPlayer.PlayerData.citizenid

    if orgData.type == 'gang' then
        if TargetPlayer.PlayerData.gang and TargetPlayer.PlayerData.gang.name == orgData.name then
            return { success = false, message = 'Jogador ja esta na organizacao.' }
        end
        TargetPlayer.Functions.SetGang(orgData.name, 0)
    else
        if TargetPlayer.PlayerData.job and TargetPlayer.PlayerData.job.name == orgData.name then
            return { success = false, message = 'Jogador ja esta na organizacao.' }
        end
        TargetPlayer.Functions.SetJob(orgData.name, 0)
    end

    MySQL.insert.await('INSERT INTO org_playtime (citizenid, org_name, org_type, playtime) VALUES (?, ?, ?, 0) ON DUPLICATE KEY UPDATE last_updated = CURRENT_TIMESTAMP', {
        recruitedCitizenid,
        orgData.name,
        orgData.type
    })
    MySQL.insert('INSERT INTO org_recruitments (org_name, recruiter_citizenid, recruited_citizenid) VALUES (?, ?, ?)', {
        orgData.name,
        QBCore.Functions.GetPlayer(source).PlayerData.citizenid,
        recruitedCitizenid
    })

    LogOrgAction(orgData.name, QBCore.Functions.GetPlayer(source).PlayerData.citizenid, 'recruit', recruitedCitizenid, {})
    return { success = true, message = 'Jogador recrutado.' }
end)

lib.callback.register('orgpanel:banMember', function(source, data)
    if not HasOrgPermission(source, 'boss') then
        return { success = false, message = 'Sem permissao para banir.' }
    end

    local orgData = GetOrgName(source)
    if not orgData then return { success = false, message = 'Voce nao pertence a uma organizacao.' } end

    local bannedCitizenid = data and data.citizenid
    local reason = (data and data.reason) or 'Sem motivo informado'
    if not bannedCitizenid then
        return { success = false, message = 'Informe o jogador.' }
    end

    local bannedBy = QBCore.Functions.GetPlayer(source).PlayerData.citizenid

    MySQL.insert('INSERT INTO org_bans (org_name, banned_by, banned_citizenid, reason, is_active) VALUES (?, ?, ?, ?, 1)', {
        orgData.name,
        bannedBy,
        bannedCitizenid,
        reason
    })

    local TargetPlayer = QBCore.Functions.GetPlayerByCitizenId(bannedCitizenid)
    if TargetPlayer and (TargetPlayer.PlayerData.gang and TargetPlayer.PlayerData.gang.name == orgData.name or (TargetPlayer.PlayerData.job and TargetPlayer.PlayerData.job.name == orgData.name)) then
        if orgData.type == 'gang' then
            TargetPlayer.Functions.SetGang('none', 0)
        else
            TargetPlayer.Functions.SetJob('unemployed', 0)
        end
    end

    LogOrgAction(orgData.name, bannedBy, 'ban', bannedCitizenid, { reason = reason })
    return { success = true, message = 'Membro banido.' }
end)

lib.callback.register('orgpanel:unbanMember', function(source, data)
    if not HasOrgPermission(source, 'boss') then
        return { success = false, message = 'Sem permissao para desbanir.' }
    end

    local orgData = GetOrgName(source)
    if not orgData then return { success = false, message = 'Voce nao pertence a uma organizacao.' } end

    local bannedCitizenid = data and data.citizenid
    local banId = tonumber(data and data.banId)
    if not bannedCitizenid and not banId then
        return { success = false, message = 'Informe o banimento ou o jogador.' }
    end

    local unbannedBy = QBCore.Functions.GetPlayer(source).PlayerData.citizenid

    if banId then
        MySQL.update.await('UPDATE org_bans SET is_active = 0, unbanned_at = CURRENT_TIMESTAMP, unbanned_by = ? WHERE id = ? AND org_name = ?', {
            unbannedBy,
            banId,
            orgData.name
        })
    else
        MySQL.update.await('UPDATE org_bans SET is_active = 0, unbanned_at = CURRENT_TIMESTAMP, unbanned_by = ? WHERE org_name = ? AND banned_citizenid = ? AND is_active = 1', {
            unbannedBy,
            orgData.name,
            bannedCitizenid
        })
    end

    LogOrgAction(orgData.name, unbannedBy, 'unban', bannedCitizenid, {})
    return { success = true, message = 'Membro desbanido.' }
end)

-- =====================================================
-- DEBUG COMMAND (sempre habilitado para teste)
-- =====================================================

QBCore.Commands.Add('orgdebug', 'Debug org info', {}, false, function(source)
    local orgData = GetOrgName(source)
    print('=== ORG PANEL DEBUG ===')
    if orgData then
        print(json.encode(orgData, { indent = true }))
        print('Has boss permission:', HasOrgPermission(source, 'boss'))
        print('Has bank permission:', HasOrgPermission(source, 'bank'))
        print('Has recruit permission:', HasOrgPermission(source, 'recruit'))
        print('ORG ENCONTRADA - Painel deve abrir')
    else
        print('ORG NAO ENCONTRADA - Painel nao abrira')
    end
    print('========================')
end)
