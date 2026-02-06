# 🔧 Guia de Implementação Lua - Backend FiveM

## 📋 Visão Geral

Este guia mostra **exatamente** como implementar os callbacks Lua (client e server) para que o frontend React funcione perfeitamente com o backend FiveM.

---

## 📁 Estrutura de Arquivos

```
org_panel/
├── fxmanifest.lua
├── client.lua          ← RegisterNUICallback aqui
├── server.lua          ← lib.callback.register aqui
├── config.lua          ← Configurações (opcional)
└── nui/
    ├── build/          ← Output do React
    └── src/            ← Código fonte React
```

---

## 🔹 CLIENT.LUA - Exemplo Completo

```lua
local isOpen = false

-- Abrir painel (comando ou keybind)
RegisterCommand('painelorg', function()
    if not isOpen then
        SetNuiFocus(true, true)
        SendNUIMessage({
            action = 'openPanel'
        })
        isOpen = true
    end
end)

-- ============================================
-- EVENTOS DE FECHAMENTO
-- ============================================

-- Fechar painel
RegisterNUICallback('orgpanel:close', function(data, cb)
    SetNuiFocus(false, false)
    isOpen = false
    cb({ success = true })
end)

-- ============================================
-- EVENTOS DE LEITURA (GET-like)
-- ============================================

-- Obter informações da organização
RegisterNUICallback('orgpanel:getMyOrgInfo', function(data, cb)
    lib.callback('orgpanel:getMyOrgInfo', false, function(result)
        cb(result)
    end)
end)

-- Obter visão geral
RegisterNUICallback('orgpanel:getOverview', function(data, cb)
    lib.callback('orgpanel:getOverview', false, function(result)
        cb(result)
    end)
end)

-- Obter jogador atual
RegisterNUICallback('orgpanel:getCurrentPlayer', function(data, cb)
    lib.callback('orgpanel:getCurrentPlayer', false, function(result)
        cb(result)
    end)
end)

-- Obter configuração de farm
RegisterNUICallback('orgpanel:getFarmConfig', function(data, cb)
    lib.callback('orgpanel:getFarmConfig', false, function(result)
        cb(result)
    end)
end)

-- Obter progresso de farm
RegisterNUICallback('orgpanel:getMyFarmProgress', function(data, cb)
    lib.callback('orgpanel:getMyFarmProgress', false, function(result)
        cb(result)
    end)
end)

-- Obter membros
RegisterNUICallback('orgpanel:getMembers', function(data, cb)
    lib.callback('orgpanel:getMembers', false, function(result)
        cb(result)
    end, data)
end)

-- Obter transações
RegisterNUICallback('orgpanel:getTransactions', function(data, cb)
    lib.callback('orgpanel:getTransactions', false, function(result)
        cb(result)
    end, data)
end)

-- Obter membros banidos
RegisterNUICallback('orgpanel:getBannedMembers', function(data, cb)
    lib.callback('orgpanel:getBannedMembers', false, function(result)
        cb(result)
    end)
end)

-- Obter jogador por ID
RegisterNUICallback('orgpanel:getPlayerById', function(data, cb)
    lib.callback('orgpanel:getPlayerById', false, function(result)
        cb(result)
    end, data)
end)

-- ============================================
-- EVENTOS DE ESCRITA (POST-like)
-- ============================================

-- Depositar
RegisterNUICallback('orgpanel:deposit', function(data, cb)
    lib.callback('orgpanel:deposit', false, function(result)
        cb(result)
    end, data)
end)

-- Sacar
RegisterNUICallback('orgpanel:withdraw', function(data, cb)
    lib.callback('orgpanel:withdraw', false, function(result)
        cb(result)
    end, data)
end)

-- Alterar cargo
RegisterNUICallback('orgpanel:changeMemberGrade', function(data, cb)
    lib.callback('orgpanel:changeMemberGrade', false, function(result)
        cb(result)
    end, data)
end)

-- Recrutar jogador
RegisterNUICallback('orgpanel:recruitPlayer', function(data, cb)
    lib.callback('orgpanel:recruitPlayer', false, function(result)
        cb(result)
    end, data)
end)

-- Banir membro
RegisterNUICallback('orgpanel:banMember', function(data, cb)
    lib.callback('orgpanel:banMember', false, function(result)
        cb(result)
    end, data)
end)

-- Desbanir membro
RegisterNUICallback('orgpanel:unbanMember', function(data, cb)
    lib.callback('orgpanel:unbanMember', false, function(result)
        cb(result)
    end, data)
end)

-- Atualizar configuração de farm
RegisterNUICallback('orgpanel:updateFarmConfig', function(data, cb)
    lib.callback('orgpanel:updateFarmConfig', false, function(result)
        cb(result)
    end, data)
end)

-- Coletar recompensa de farm
RegisterNUICallback('orgpanel:claimFarmReward', function(data, cb)
    lib.callback('orgpanel:claimFarmReward', false, function(result)
        cb(result)
    end)
end)

-- ============================================
-- AÇÕES ESPECIAIS
-- ============================================

-- Abrir Discord
RegisterNUICallback('orgpanel:openDiscord', function(data, cb)
    -- Exemplo: abrir link ou notificar
    -- TriggerEvent('chat:addMessage', { args = { 'Discord: https://discord.gg/sua-org' } })
    cb({ success = true })
end)

-- Entrar no rádio
RegisterNUICallback('orgpanel:openRadio', function(data, cb)
    -- Exemplo: abrir item de rádio ou channel
    -- TriggerEvent('radioSystem:joinChannel', 123)
    cb({ success = true })
end)

-- Marcar waypoint
RegisterNUICallback('orgpanel:setWaypoint', function(data, cb)
    -- Exemplo: marcar localização da org no mapa
    -- SetNewWaypoint(x, y)
    cb({ success = true })
end)

-- ============================================
-- ESC KEY LISTENER
-- ============================================

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if isOpen then
            if IsControlJustReleased(0, 322) then -- ESC key
                SetNuiFocus(false, false)
                SendNUIMessage({
                    action = 'closePanel'
                })
                isOpen = false
            end
        else
            Citizen.Wait(500)
        end
    end
end)
```

---

## 🔹 SERVER.LUA - Exemplo Completo

```lua
local QBCore = exports['qb-core']:GetCoreObject() -- ou seu framework

-- ============================================
-- LEITURA: getMyOrgInfo
-- ============================================

lib.callback.register('orgpanel:getMyOrgInfo', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return nil end

    local citizenid = Player.PlayerData.citizenid
    local job = Player.PlayerData.job

    -- Buscar dados da organização
    local result = MySQL.query.await('SELECT * FROM org_accounts WHERE org_name = ?', { job.name })
    
    if not result or #result == 0 then
        return nil
    end

    local org = result[1]

    return {
        orgName = job.name,
        label = job.label,
        myGrade = job.grade.level,
        myGradeName = job.grade.name,
        isBoss = job.isboss,
        bankAuth = job.grade.level >= 3, -- exemplo
        isRecruiter = job.grade.level >= 5, -- exemplo
        balance = org.balance or 0
    }
end)

-- ============================================
-- LEITURA: getOverview
-- ============================================

lib.callback.register('orgpanel:getOverview', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return nil end

    local job = Player.PlayerData.job
    
    -- Contar membros online
    local onlineCount = 0
    for _, playerId in ipairs(GetPlayers()) do
        local targetPlayer = QBCore.Functions.GetPlayer(tonumber(playerId))
        if targetPlayer and targetPlayer.PlayerData.job.name == job.name then
            onlineCount = onlineCount + 1
        end
    end

    -- Contar total de membros
    local totalResult = MySQL.scalar.await('SELECT COUNT(*) FROM players WHERE job = ?', { job.name })

    -- Buscar rating (exemplo)
    local ratingResult = MySQL.query.await('SELECT AVG(rating) as avg_rating, COUNT(*) as count FROM org_ratings WHERE org_name = ?', { job.name })
    
    local rating = 0
    local ratingCount = 0
    if ratingResult and #ratingResult > 0 then
        rating = ratingResult[1].avg_rating or 0
        ratingCount = ratingResult[1].count or 0
    end

    -- Buscar balance
    local balanceResult = MySQL.query.await('SELECT balance FROM org_accounts WHERE org_name = ?', { job.name })
    local balance = (balanceResult and #balanceResult > 0) and balanceResult[1].balance or 0

    return {
        orgName = job.name,
        label = job.label,
        balance = balance,
        onlineCount = onlineCount,
        totalMembers = totalResult or 0,
        rating = rating,
        ratingCount = ratingCount,
        myGrade = job.grade.level,
        myGradeName = job.grade.name
    }
end)

-- ============================================
-- LEITURA: getMembers
-- ============================================

lib.callback.register('orgpanel:getMembers', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {} end

    local job = Player.PlayerData.job

    -- Buscar membros do banco
    local result = MySQL.query.await([[
        SELECT 
            p.citizenid,
            p.charinfo,
            p.job,
            COALESCE(pt.total_playtime, 0) as playtime,
            COALESCE(fd.daily_total, 0) as dailyTotal,
            COALESCE(fw.weekly_total, 0) as weeklyTotal,
            COALESCE(r.recruited_count, 0) as recruited
        FROM players p
        LEFT JOIN org_playtime pt ON p.citizenid = pt.citizenid
        LEFT JOIN (
            SELECT citizenid, SUM(quantity) as daily_total
            FROM org_farm_deliveries
            WHERE DATE(delivered_at) = CURDATE()
            GROUP BY citizenid
        ) fd ON p.citizenid = fd.citizenid
        LEFT JOIN (
            SELECT citizenid, SUM(quantity) as weekly_total
            FROM org_farm_deliveries
            WHERE YEARWEEK(delivered_at) = YEARWEEK(NOW())
            GROUP BY citizenid
        ) fw ON p.citizenid = fw.citizenid
        LEFT JOIN (
            SELECT recruited_by, COUNT(*) as recruited_count
            FROM org_recruitments
            GROUP BY recruited_by
        ) r ON p.citizenid = r.recruited_by
        WHERE JSON_UNQUOTE(JSON_EXTRACT(p.job, '$.name')) = ?
        ORDER BY JSON_UNQUOTE(JSON_EXTRACT(p.job, '$.grade.level')) DESC
    ]], { job.name })

    local members = {}
    
    for _, row in ipairs(result) do
        local charinfo = json.decode(row.charinfo)
        local jobData = json.decode(row.job)
        
        -- Verificar se está online
        local isOnline = false
        for _, playerId in ipairs(GetPlayers()) do
            local targetPlayer = QBCore.Functions.GetPlayer(tonumber(playerId))
            if targetPlayer and targetPlayer.PlayerData.citizenid == row.citizenid then
                isOnline = true
                break
            end
        end

        table.insert(members, {
            citizenid = row.citizenid,
            name = charinfo.firstname .. ' ' .. charinfo.lastname,
            gradeName = jobData.grade.name,
            grade = jobData.grade.level,
            online = isOnline,
            deliveries = row.dailyTotal or 0,
            playtime = row.playtime or 0,
            weeklyTotal = row.weeklyTotal or 0,
            dailyTotal = row.dailyTotal or 0,
            recruited = row.recruited or 0,
            mugshot_url = charinfo.mugshot_url or nil
        })
    end

    return members
end)

-- ============================================
-- LEITURA: getFarmConfig
-- ============================================

lib.callback.register('orgpanel:getFarmConfig', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return nil end

    local job = Player.PlayerData.job

    local result = MySQL.query.await('SELECT * FROM org_farm_settings WHERE org_name = ?', { job.name })
    
    if not result or #result == 0 then
        -- Retornar config padrão
        return {
            enabled = true,
            dailyGoal = 1000,
            rewardType = 'per_unit',
            rewardPerUnit = 100,
            rewardFixed = 5000,
            itemsAllowed = {}
        }
    end

    local config = result[1]

    return {
        enabled = config.enabled == 1,
        dailyGoal = config.daily_goal,
        rewardType = config.reward_type,
        rewardPerUnit = config.reward_per_unit,
        rewardFixed = config.reward_fixed,
        itemsAllowed = json.decode(config.items_allowed or '[]')
    }
end)

-- ============================================
-- LEITURA: getMyFarmProgress
-- ============================================

lib.callback.register('orgpanel:getMyFarmProgress', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return nil end

    local citizenid = Player.PlayerData.citizenid
    local job = Player.PlayerData.job
    local today = os.date('%Y-%m-%d')

    -- Buscar progresso do dia
    local progressResult = MySQL.query.await([[
        SELECT * FROM org_farm_progress 
        WHERE citizenid = ? AND org_name = ? AND progress_date = ?
    ]], { citizenid, job.name, today })

    -- Buscar config
    local configResult = MySQL.query.await('SELECT * FROM org_farm_settings WHERE org_name = ?', { job.name })
    
    local config = configResult and #configResult > 0 and configResult[1] or nil
    local progress = progressResult and #progressResult > 0 and progressResult[1] or nil

    local dailyGoal = config and config.daily_goal or 1000
    local rewardType = config and config.reward_type or 'per_unit'
    local rewardPerUnit = config and config.reward_per_unit or 100
    local rewardFixed = config and config.reward_fixed or 5000
    local currentQuantity = progress and progress.current_quantity or 0
    local rewardClaimed = progress and progress.reward_claimed == 1 or false

    -- Calcular recompensa potencial
    local potentialReward = 0
    if rewardType == 'per_unit' then
        potentialReward = currentQuantity * rewardPerUnit
    elseif rewardType == 'fixed' and currentQuantity >= dailyGoal then
        potentialReward = rewardFixed
    end

    return {
        date = today,
        currentQuantity = currentQuantity,
        rewardClaimed = rewardClaimed,
        dailyGoal = dailyGoal,
        rewardType = rewardType,
        rewardPerUnit = rewardPerUnit,
        rewardFixed = rewardFixed,
        potentialReward = potentialReward
    }
end)

-- ============================================
-- LEITURA: getTransactions
-- ============================================

lib.callback.register('orgpanel:getTransactions', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {} end

    local job = Player.PlayerData.job

    local result = MySQL.query.await([[
        SELECT * FROM org_transactions 
        WHERE org_name = ? 
        ORDER BY created_at DESC 
        LIMIT 50
    ]], { job.name })

    return result or {}
end)

-- ============================================
-- LEITURA: getBannedMembers
-- ============================================

lib.callback.register('orgpanel:getBannedMembers', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {} end

    local job = Player.PlayerData.job

    local result = MySQL.query.await([[
        SELECT 
            ob.*,
            p.charinfo
        FROM org_bans ob
        LEFT JOIN players p ON ob.banned_citizenid = p.citizenid
        WHERE ob.org_name = ?
        ORDER BY ob.banned_at DESC
    ]], { job.name })

    local banned = {}
    for _, row in ipairs(result or {}) do
        local charinfo = row.charinfo and json.decode(row.charinfo) or {}
        table.insert(banned, {
            banned_citizenid = row.banned_citizenid,
            name = charinfo.firstname and (charinfo.firstname .. ' ' .. charinfo.lastname) or 'Desconhecido',
            reason = row.reason,
            banned_by = row.banned_by,
            banned_at = row.banned_at,
            severity = row.severity or 'medium'
        })
    end

    return banned
end)

-- ============================================
-- ESCRITA: deposit
-- ============================================

lib.callback.register('orgpanel:deposit', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then 
        return { success = false, message = 'Jogador não encontrado' }
    end

    local amount = tonumber(data.amount)
    local description = data.description or 'Depósito'

    if not amount or amount <= 0 then
        return { success = false, message = 'Valor inválido' }
    end

    local job = Player.PlayerData.job
    local citizenid = Player.PlayerData.citizenid

    -- Verificar se jogador tem dinheiro
    if Player.PlayerData.money.cash < amount then
        return { success = false, message = 'Dinheiro insuficiente' }
    end

    -- Remover dinheiro do jogador
    Player.Functions.RemoveMoney('cash', amount, 'org-deposit')

    -- Adicionar ao banco da org
    MySQL.query('UPDATE org_accounts SET balance = balance + ? WHERE org_name = ?', { amount, job.name })

    -- Registrar transação
    MySQL.insert('INSERT INTO org_transactions (org_name, transaction_type, amount, description, citizenid) VALUES (?, ?, ?, ?, ?)', {
        job.name,
        'deposit',
        amount,
        description,
        citizenid
    })

    -- Buscar novo balance
    local newBalance = MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', { job.name })

    return {
        success = true,
        message = 'Depósito realizado com sucesso',
        newBalance = newBalance
    }
end)

-- ============================================
-- ESCRITA: withdraw
-- ============================================

lib.callback.register('orgpanel:withdraw', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then 
        return { success = false, message = 'Jogador não encontrado' }
    end

    local amount = tonumber(data.amount)
    local description = data.description or 'Saque'

    if not amount or amount <= 0 then
        return { success = false, message = 'Valor inválido' }
    end

    local job = Player.PlayerData.job
    local citizenid = Player.PlayerData.citizenid

    -- Verificar permissão
    if not job.isboss and job.grade.level < 3 then
        return { success = false, message = 'Sem permissão para sacar' }
    end

    -- Verificar saldo da org
    local currentBalance = MySQL.scalar.await('SELECT balance FROM org_accounts WHERE org_name = ?', { job.name })
    
    if not currentBalance or currentBalance < amount then
        return { success = false, message = 'Saldo insuficiente na organização' }
    end

    -- Remover do banco da org
    MySQL.query('UPDATE org_accounts SET balance = balance - ? WHERE org_name = ?', { amount, job.name })

    -- Adicionar dinheiro ao jogador
    Player.Functions.AddMoney('cash', amount, 'org-withdraw')

    -- Registrar transação
    MySQL.insert('INSERT INTO org_transactions (org_name, transaction_type, amount, description, citizenid) VALUES (?, ?, ?, ?, ?)', {
        job.name,
        'withdraw',
        amount,
        description,
        citizenid
    })

    local newBalance = currentBalance - amount

    return {
        success = true,
        message = 'Saque realizado com sucesso',
        newBalance = newBalance
    }
end)

-- ============================================
-- ESCRITA: changeMemberGrade
-- ============================================

lib.callback.register('orgpanel:changeMemberGrade', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then 
        return { success = false, message = 'Jogador não encontrado' }
    end

    local targetCitizenid = data.citizenid
    local newGradeName = data.gradeName

    -- Verificar permissão
    if not Player.PlayerData.job.isboss then
        return { success = false, message = 'Apenas líderes podem alterar cargos' }
    end

    -- Buscar o grade level correspondente ao gradeName
    local jobInfo = QBCore.Shared.Jobs[Player.PlayerData.job.name]
    if not jobInfo then
        return { success = false, message = 'Informações do cargo não encontradas' }
    end

    local newGradeLevel = nil
    for level, gradeData in pairs(jobInfo.grades) do
        if gradeData.name == newGradeName then
            newGradeLevel = level
            break
        end
    end

    if not newGradeLevel then
        return { success = false, message = 'Cargo inválido' }
    end

    -- Atualizar cargo no banco de dados
    local updated = MySQL.update.await([[
        UPDATE players 
        SET job = JSON_SET(job, '$.grade.level', ?, '$.grade.name', ?)
        WHERE citizenid = ?
    ]], { newGradeLevel, newGradeName, targetCitizenid })

    if updated == 0 then
        return { success = false, message = 'Membro não encontrado' }
    end

    -- Se o jogador estiver online, atualizar em tempo real
    for _, playerId in ipairs(GetPlayers()) do
        local targetPlayer = QBCore.Functions.GetPlayer(tonumber(playerId))
        if targetPlayer and targetPlayer.PlayerData.citizenid == targetCitizenid then
            targetPlayer.Functions.SetJob(Player.PlayerData.job.name, newGradeLevel)
            break
        end
    end

    return { 
        success = true, 
        message = 'Cargo alterado com sucesso' 
    }
end)

-- ============================================
-- ESCRITA: banMember
-- ============================================

lib.callback.register('orgpanel:banMember', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then 
        return { success = false, message = 'Jogador não encontrado' }
    end

    local targetCitizenid = data.citizenid
    local reason = data.reason

    -- Verificar permissão
    if not Player.PlayerData.job.isboss and Player.PlayerData.job.grade.level < 5 then
        return { success = false, message = 'Sem permissão para banir' }
    end

    -- Inserir na blacklist
    MySQL.insert('INSERT INTO org_bans (org_name, banned_citizenid, reason, banned_by, severity) VALUES (?, ?, ?, ?, ?)', {
        Player.PlayerData.job.name,
        targetCitizenid,
        reason,
        Player.PlayerData.citizenid,
        'high' -- ou calcular baseado no motivo
    })

    -- Remover da organização
    MySQL.update('UPDATE players SET job = ? WHERE citizenid = ?', {
        json.encode({ name = 'unemployed', label = 'Desempregado', payment = 10, grade = { name = 'Freelancer', level = 0 }, isboss = false }),
        targetCitizenid
    })

    -- Se estiver online, kickar/notificar
    for _, playerId in ipairs(GetPlayers()) do
        local targetPlayer = QBCore.Functions.GetPlayer(tonumber(playerId))
        if targetPlayer and targetPlayer.PlayerData.citizenid == targetCitizenid then
            targetPlayer.Functions.SetJob('unemployed', 0)
            TriggerClientEvent('QBCore:Notify', targetPlayer.PlayerData.source, 'Você foi removido da organização', 'error')
            break
        end
    end

    return { 
        success = true, 
        message = 'Membro banido com sucesso' 
    }
end)

-- ============================================
-- ESCRITA: unbanMember
-- ============================================

lib.callback.register('orgpanel:unbanMember', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then 
        return { success = false, message = 'Jogador não encontrado' }
    end

    local targetCitizenid = data.citizenid

    -- Verificar permissão
    if not Player.PlayerData.job.isboss then
        return { success = false, message = 'Apenas líderes podem desbanir' }
    end

    -- Remover da blacklist
    local deleted = MySQL.query.await('DELETE FROM org_bans WHERE org_name = ? AND banned_citizenid = ?', {
        Player.PlayerData.job.name,
        targetCitizenid
    })

    return { 
        success = true, 
        message = 'Membro desbanido com sucesso' 
    }
end)

-- ============================================
-- ESCRITA: updateFarmConfig
-- ============================================

lib.callback.register('orgpanel:updateFarmConfig', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then 
        return { success = false, message = 'Jogador não encontrado' }
    end

    -- Verificar permissão
    if not Player.PlayerData.job.isboss then
        return { success = false, message = 'Apenas líderes podem alterar configurações' }
    end

    local dailyGoal = tonumber(data.dailyGoal)
    local rewardPerUnit = tonumber(data.rewardPerUnit)

    if not dailyGoal or dailyGoal <= 0 then
        return { success = false, message = 'Meta inválida' }
    end

    if not rewardPerUnit or rewardPerUnit <= 0 then
        return { success = false, message = 'Recompensa inválida' }
    end

    -- Atualizar configuração
    MySQL.query('UPDATE org_farm_settings SET daily_goal = ?, reward_per_unit = ? WHERE org_name = ?', {
        dailyGoal,
        rewardPerUnit,
        Player.PlayerData.job.name
    })

    return { 
        success = true, 
        message = 'Configuração atualizada com sucesso' 
    }
end)

-- ============================================
-- ESCRITA: claimFarmReward
-- ============================================

lib.callback.register('orgpanel:claimFarmReward', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then 
        return { success = false, message = 'Jogador não encontrado' }
    end

    local citizenid = Player.PlayerData.citizenid
    local job = Player.PlayerData.job
    local today = os.date('%Y-%m-%d')

    -- Buscar progresso
    local progress = MySQL.query.await('SELECT * FROM org_farm_progress WHERE citizenid = ? AND org_name = ? AND progress_date = ?', {
        citizenid, job.name, today
    })

    if not progress or #progress == 0 then
        return { success = false, message = 'Nenhum progresso encontrado hoje' }
    end

    local prog = progress[1]

    if prog.reward_claimed == 1 then
        return { success = false, message = 'Recompensa já coletada hoje' }
    end

    -- Buscar config
    local config = MySQL.query.await('SELECT * FROM org_farm_settings WHERE org_name = ?', { job.name })
    if not config or #config == 0 then
        return { success = false, message = 'Configuração não encontrada' }
    end

    local cfg = config[1]

    -- Calcular recompensa
    local reward = 0
    if cfg.reward_type == 'per_unit' then
        reward = prog.current_quantity * cfg.reward_per_unit
    elseif cfg.reward_type == 'fixed' and prog.current_quantity >= cfg.daily_goal then
        reward = cfg.reward_fixed
    end

    if reward <= 0 then
        return { success = false, message = 'Sem recompensa disponível' }
    end

    -- Adicionar dinheiro ao jogador
    Player.Functions.AddMoney('cash', reward, 'farm-reward')

    -- Marcar como coletado
    MySQL.update('UPDATE org_farm_progress SET reward_claimed = 1 WHERE id = ?', { prog.id })

    return { 
        success = true, 
        message = 'Recompensa coletada com sucesso',
        reward = reward
    }
end)

-- ============================================
-- ESCRITA: recruitPlayer
-- ============================================

lib.callback.register('orgpanel:recruitPlayer', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then 
        return { success = false, message = 'Jogador não encontrado' }
    end

    local targetId = tonumber(data.targetId)

    -- Verificar permissão
    if not Player.PlayerData.job.isboss and Player.PlayerData.job.grade.level < 5 then
        return { success = false, message = 'Sem permissão para recrutar' }
    end

    local TargetPlayer = QBCore.Functions.GetPlayer(targetId)
    if not TargetPlayer then
        return { success = false, message = 'Jogador não encontrado' }
    end

    -- Verificar se já está em uma org
    if TargetPlayer.PlayerData.job.name ~= 'unemployed' then
        return { success = false, message = 'Jogador já está em uma organização' }
    end

    -- Verificar blacklist
    local banned = MySQL.scalar.await('SELECT COUNT(*) FROM org_bans WHERE org_name = ? AND banned_citizenid = ?', {
        Player.PlayerData.job.name,
        TargetPlayer.PlayerData.citizenid
    })

    if banned and banned > 0 then
        return { success = false, message = 'Jogador está na lista negra' }
    end

    -- Recrutar (cargo inicial: Novato/0)
    TargetPlayer.Functions.SetJob(Player.PlayerData.job.name, 0)

    -- Registrar recrutamento
    MySQL.insert('INSERT INTO org_recruitments (org_name, recruited_citizenid, recruited_by) VALUES (?, ?, ?)', {
        Player.PlayerData.job.name,
        TargetPlayer.PlayerData.citizenid,
        Player.PlayerData.citizenid
    })

    TriggerClientEvent('QBCore:Notify', TargetPlayer.PlayerData.source, 'Você foi recrutado!', 'success')

    return { 
        success = true, 
        message = 'Jogador recrutado com sucesso' 
    }
end)
```

---

## ✅ Checklist de Implementação

### Client.lua
- [ ] Todos os `RegisterNUICallback` implementados
- [ ] ESC key listener funcionando
- [ ] Comando `/painelorg` criado
- [ ] SetNuiFocus correto

### Server.lua
- [ ] Todos os `lib.callback.register` implementados
- [ ] Queries SQL funcionando
- [ ] Permissões verificadas corretamente
- [ ] Retornos no formato correto (match com TypeScript)

### Banco de Dados
- [ ] Tabelas criadas conforme schema
- [ ] Índices criados para performance
- [ ] Dados de exemplo inseridos para testes

---

## 🧪 Como Testar

```lua
-- No console F8:
/painelorg

-- Verificar:
-- 1. Painel abre
-- 2. Dados carregam
-- 3. Ações funcionam
-- 4. Painel fecha com ESC
```

---

**Guia completo de implementação Lua finalizado!** 🚀
