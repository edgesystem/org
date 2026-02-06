local QBCore = exports['qb-core']:GetCoreObject()
local isPanelOpen = false

-- =====================================================
-- COMMAND TO OPEN PANEL
-- =====================================================

RegisterCommand('painelorg', function()
    if isPanelOpen then return end

    print('[org_panel] === COMANDO PAINELORG EXECUTADO ===')
    
    -- Verificar se o jogador pertence a uma organizacao (COM TIMEOUT)
    local startTime = GetGameTimer()
    lib.callback('orgpanel:getMyOrgInfo', false, function(orgInfo)
        local elapsed = GetGameTimer() - startTime
        print('[org_panel] Callback retornou em ' .. elapsed .. 'ms')
        
        if not orgInfo then
            print('[org_panel] ERRO: Jogador nao pertence a organizacao!')
            TriggerEvent('qb-core:client:Notify', 'Voce nao pertence a nenhuma organizacao!', 'error')
            return
        end

        print('[org_panel] Sucesso! Abrindo painel para: ' .. tostring(orgInfo.label))
        print('[org_panel] orgInfo completo: ' .. json.encode(orgInfo))
        
        isPanelOpen = true
        SetNuiFocus(true, true)
        SetNuiFocusKeepInput(false)
        
        local msg = { action = 'openPanel', data = orgInfo }
        print('[org_panel] Enviando mensagem openPanel para NUI')
        SendNUIMessage(msg)
        
        -- Verificar se NUI esta respondendo apos 2 segundos
        CreateThread(function()
            Wait(2000)
            print('[org_panel] Verificacao NUI: painel ainda esta aberto = ' .. tostring(isPanelOpen))
        end)
    end, function(err)
        print('[org_panel] ERRO NO CALLBACK: ' .. tostring(err))
        -- Mesmo com erro, tentar abrir o painel
        isPanelOpen = true
        SetNuiFocus(true, true)
        SendNUIMessage({ action = 'openPanel', error = err })
    end)
end, false)

-- =====================================================
-- NUI CALLBACKS
-- =====================================================

-- Fechar painel: NUI pode chamar 'closePanel' ou 'orgpanel:close'
RegisterNUICallback('closePanel', function(data, cb)
    print('[org_panel] Fechando painel (closePanel)')
    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)
    isPanelOpen = false
    cb('ok')
end)

RegisterNUICallback('orgpanel:close', function(data, cb)
    print('[org_panel] Fechando painel (orgpanel:close)')
    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)
    isPanelOpen = false
    cb('ok')
end)

RegisterNUICallback('orgpanel:getOverview', function(data, cb)
    lib.callback('orgpanel:getOverview', false, function(result)
        cb(result)
    end)
end)

RegisterNUICallback('orgpanel:getMyOrgInfo', function(data, cb)
    lib.callback('orgpanel:getMyOrgInfo', false, function(result)
        cb(result)
    end)
end)

RegisterNUICallback('orgpanel:getCurrentPlayer', function(data, cb)
    lib.callback('orgpanel:getCurrentPlayer', false, function(result)
        cb(result)
    end)
end)

RegisterNUICallback('orgpanel:getFarmConfig', function(data, cb)
    lib.callback('orgpanel:getFarmConfig', false, function(result)
        cb(result)
    end)
end)

RegisterNUICallback('orgpanel:getMyFarmProgress', function(data, cb)
    lib.callback('orgpanel:getMyFarmProgress', false, function(result)
        cb(result)
    end)
end)

RegisterNUICallback('orgpanel:claimFarmReward', function(data, cb)
    lib.callback('orgpanel:claimFarmReward', false, function(result)
        cb(result)
    end)
end)

RegisterNUICallback('orgpanel:getMembers', function(data, cb)
    lib.callback('orgpanel:getMembers', false, function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('orgpanel:getFarmRanking', function(data, cb)
    lib.callback('orgpanel:getFarmRanking', false, function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('orgpanel:getTransactions', function(data, cb)
    lib.callback('orgpanel:getTransactions', false, function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('orgpanel:getRecruitmentStats', function(data, cb)
    lib.callback('orgpanel:getRecruitmentStats', false, function(result)
        cb(result)
    end)
end)

RegisterNUICallback('orgpanel:getBannedMembers', function(data, cb)
    lib.callback('orgpanel:getBannedMembers', false, function(result)
        cb(result)
    end)
end)

RegisterNUICallback('orgpanel:deposit', function(data, cb)
    lib.callback('orgpanel:deposit', false, function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('orgpanel:withdraw', function(data, cb)
    lib.callback('orgpanel:withdraw', false, function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('orgpanel:changeMemberGrade', function(data, cb)
    lib.callback('orgpanel:changeMemberGrade', false, function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('orgpanel:recruitPlayer', function(data, cb)
    lib.callback('orgpanel:recruitPlayer', false, function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('orgpanel:banMember', function(data, cb)
    lib.callback('orgpanel:banMember', false, function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('orgpanel:unbanMember', function(data, cb)
    lib.callback('orgpanel:unbanMember', false, function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('orgpanel:updateFarmConfig', function(data, cb)
    lib.callback('orgpanel:updateFarmConfig', false, function(result)
        cb(result or { success = true })
    end, data)
end)

RegisterNUICallback('orgpanel:openDiscord', function(data, cb)
    -- Abrir link Discord ou trigger evento; ajuste conforme seu recurso
    cb({ success = true })
end)

RegisterNUICallback('orgpanel:openRadio', function(data, cb)
    -- Entrar no canal de rádio; ajuste conforme seu recurso
    cb({ success = true })
end)

RegisterNUICallback('orgpanel:setWaypoint', function(data, cb)
    -- Marcar waypoint no mapa; ajuste conforme seu recurso
    cb({ success = true })
end)

-- =====================================================
-- KEYBIND
-- =====================================================

RegisterKeyMapping('painelorg', 'Abrir Painel da Organizacao', 'keyboard', 'F7')
