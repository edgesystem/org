local QBCore = exports['qb-core']:GetCoreObject()
local isPanelOpen = false

-- =====================================================
-- COMMAND TO OPEN PANEL
-- =====================================================

RegisterCommand('painelorg', function()
    if isPanelOpen then return end

    -- Verificar se o jogador pertence a uma organizacao
    lib.callback('orgpanel:getMyOrgInfo', false, function(orgInfo)
        if not orgInfo then
            TriggerEvent('qb-core:client:Notify', 'Voce nao pertence a nenhuma organizacao!', 'error')
            return
        end

        print('[org_panel] Abrindo painel para: ' .. orgInfo.label)
        isPanelOpen = true
        SetNuiFocus(true, true) -- true, true = focus E mouse para o NUI
        SetNuiFocusKeepInput(false) -- FALSE = mouse NAO controla personagem
        SendNUIMessage({
            action = 'openPanel'
        })
    end)
end, false)

-- =====================================================
-- NUI CALLBACKS
-- =====================================================

RegisterNUICallback('closePanel', function(data, cb)
    print('[org_panel] Fechando painel')
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
    end)
end)

-- =====================================================
-- KEYBIND
-- =====================================================

RegisterKeyMapping('painelorg', 'Abrir Painel da Organizacao', 'keyboard', 'F7')
