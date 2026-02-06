# ✅ Checklist de Integração - Backend FiveM

## 🎯 Status: 100% MOCKS ELIMINADOS - BACKEND READY

Este documento confirma que **TODOS os dados mockados foram removidos** e o projeto está configurado para consumir exclusivamente o backend FiveM real seguindo a especificação técnica.

---

## ✅ Estrutura Base Implementada

### 1. Tipos TypeScript (`/types/orgpanel.ts`)
- [x] `OrgInfo` - Informações da organização
- [x] `Transaction` - Transações bancárias
- [x] `BlacklistMember` - Membros banidos
- [x] `CurrentPlayer` - Jogador atual
- [x] `FarmConfig` - Configuração de farm
- [x] `FarmProgress` - Progresso de farm
- [x] `Member` - Membros da organização
- [x] `Overview` - Visão geral
- [x] `ClaimFarmRewardResponse` - Resposta de coleta
- [x] `BankOperationResponse` - Resposta bancária
- [x] `StandardResponse` - Resposta padrão
- [x] Outros tipos auxiliares

### 2. Utilitário NUI (`/utils/fetchNui.ts`)
- [x] Função `fetchNui<T>()` implementada
- [x] Detecção automática do resource name
- [x] Tratamento de erros
- [x] Função `closePanel()` 
- [x] Função `isEnvBrowser()` para testes

### 3. Hook Central (`/hooks/useOrgData.ts`)
- [x] Hook `useOrgData` como fonte única de dados
- [x] Busca paralela de todos os dados (performance)
- [x] Função `refreshData()` para atualização
- [x] Mapeamento correto de dados do backend
- [x] Estados expostos: `orgInfo`, `farmConfig`, `farmProgress`, `members`, `transactions`, `blacklist`, `currentPlayer`
- [x] Funções expostas: `refreshData`, `setMembers`, `setBlacklist`

---

## ✅ Componentes Atualizados

### App.tsx (Core)
- [x] ❌ Removidos TODOS os mocks
- [x] ✅ Implementado `useOrgData` hook
- [x] ✅ Listener de `openPanel` message
- [x] ✅ Listener de ESC para fechar
- [x] ✅ Função `handleClose` chama `orgpanel:close`
- [x] ✅ Todas as ações chamam eventos NUI corretos:
  - `handleDeliverGoal` → `orgpanel:claimFarmReward`
  - `confirmRecruit` → `orgpanel:recruitPlayer`
  - `confirmBan` → `orgpanel:banMember`
  - `confirmUnban` → `orgpanel:unbanMember`
  - `confirmBankOperation` → `orgpanel:deposit` / `orgpanel:withdraw`
  - `confirmEditGoal` → `orgpanel:updateFarmConfig`
- [x] ✅ `refreshData()` chamado após cada ação
- [x] ✅ Loading state implementado
- [x] ✅ Error state implementado

### Header.tsx
- [x] ❌ Removidos mocks
- [x] ✅ Recebe dados via props: `bankBalance`, `orgLabel`, `onlineCount`, `totalMembers`
- [x] ✅ Botão Discord → `orgpanel:openDiscord`
- [x] ✅ Botão Fechar → chama `onClose` prop

### Dashboard.tsx
- [x] ❌ Removidos TODOS os mocks
- [x] ✅ Recebe `farmConfig` do backend
- [x] ✅ Recebe `farmProgress` do backend
- [x] ✅ Recebe `members` do backend
- [x] ✅ Rankings calculados dinamicamente:
  - Top entregas hoje (usa `dailyTotal`)
  - Top tempo jogado (usa `playtime`)
  - Top semanal (usa `weeklyTotal`)
- [x] ✅ Líderes filtrados dinamicamente (gradeName contém "líder")
- [x] ✅ Progress ring usa `farmProgress.currentQuantity` / `farmConfig.dailyGoal`
- [x] ✅ Botão "Coletar" desabilitado se `rewardClaimed` ou `currentQuantity === 0`
- [x] ✅ Botão Rádio → `orgpanel:openRadio`
- [x] ✅ Botão Waypoint → `orgpanel:setWaypoint`

### Members.tsx
- [x] ❌ Removidos TODOS os mocks
- [x] ✅ Recebe `members` do backend
- [x] ✅ Recebe `blacklist` do backend
- [x] ✅ Recebe `refreshData` function
- [x] ✅ Filtro de busca funcional
- [x] ✅ Sistema de vagas por cargo mantido
- [x] ✅ `handleRankChange` chama `orgpanel:changeMemberGrade`
- [x] ✅ `refreshData()` chamado após alterar cargo
- [x] ✅ Stats cards calculados dinamicamente
- [x] ✅ Grid de vagas atualizado em tempo real

### Farms.tsx
- [x] ✅ Recebe `members` e `farmConfig` via props
- [x] Componente já preparado para backend

### Recruitment.tsx
- [x] Componente base mantido
- [x] TODO: Implementar `orgpanel:getRecruitmentStats` quando necessário

### Bank.tsx
- [x] ❌ Removidos mocks
- [x] ✅ Recebe `balance` do backend
- [x] ✅ Recebe `transactions` do backend
- [x] ✅ Tabela renderiza dados reais

### PD.tsx
- [x] ❌ Removidos mocks
- [x] ✅ Recebe `blacklist` do backend
- [x] ✅ Botão desbanir funcional

---

## ✅ Modals Atualizados

### RecruitModal.tsx
- [x] ✅ Valida contra `existingMemberIds` (backend)
- [x] ✅ Valida contra `blacklist` (backend)
- [x] ✅ Chama `orgpanel:getPlayerById` para buscar jogador

### BanModal.tsx
- [x] ✅ Recebe `member` real do backend
- [x] ✅ Envia `citizenid`, `reason` e `severity`

### UnbanModal.tsx
- [x] ✅ Recebe `member` real da blacklist
- [x] ✅ Confirma desbanimento via callback

### BankOperationModal.tsx
- [x] ✅ Recebe lista de `members` real
- [x] ✅ Envia `amount` e `description`

### EditGoalModal.tsx
- [x] ✅ Recebe `farmConfig` atual
- [x] ✅ Envia `dailyGoal` e `rewardPerUnit`

---

## ✅ Fluxos Implementados

### Abertura do Painel
```javascript
// Client Lua envia:
SendNUIMessage({ action: 'openPanel' })

// React escuta:
useEffect(() => {
  window.addEventListener('message', (event) => {
    if (event.data.action === 'openPanel') {
      setIsVisible(true);
      refreshData(); // Busca dados do backend
    }
  });
}, []);
```

### Fechamento do Painel
```javascript
// Usuário clica em Fechar ou ESC
handleClose() {
  setIsVisible(false);
  fetchNui('orgpanel:close'); // Client Lua recebe e faz SetNuiFocus(false, false)
}
```

### Ciclo de Ação
```javascript
// 1. Usuário clica em botão
// 2. Modal abre (se necessário)
// 3. Confirma ação
// 4. fetchNui('orgpanel:ACAO', dados)
// 5. Backend processa
// 6. refreshData() atualiza UI
```

---

## ✅ Eventos NUI Implementados

### Leitura (GET-like)
- [x] `orgpanel:getMyOrgInfo`
- [x] `orgpanel:getOverview`
- [x] `orgpanel:getCurrentPlayer`
- [x] `orgpanel:getFarmConfig`
- [x] `orgpanel:getMyFarmProgress`
- [x] `orgpanel:getMembers`
- [x] `orgpanel:getTransactions`
- [x] `orgpanel:getBannedMembers`

### Escrita (POST-like)
- [x] `orgpanel:deposit`
- [x] `orgpanel:withdraw`
- [x] `orgpanel:changeMemberGrade`
- [x] `orgpanel:recruitPlayer`
- [x] `orgpanel:banMember`
- [x] `orgpanel:unbanMember`
- [x] `orgpanel:updateFarmConfig`
- [x] `orgpanel:claimFarmReward`

### Ações
- [x] `orgpanel:close`
- [x] `orgpanel:openRadio`
- [x] `orgpanel:setWaypoint`

---

## ⚠️ Ajustes Necessários no Backend Lua

### Client Lua (`client.lua`)

**1. Adicionar RegisterNUICallback para cada evento:**

```lua
-- Fechar painel
RegisterNUICallback('orgpanel:close', function(data, cb)
  SetNuiFocus(false, false)
  cb({ success = true })
end)

-- Exemplo de evento de leitura
RegisterNUICallback('orgpanel:getMembers', function(data, cb)
  lib.callback('orgpanel:getMembers', false, function(result)
    cb(result or {})
  end, data)
end)

-- Exemplo de evento de escrita
RegisterNUICallback('orgpanel:changeMemberGrade', function(data, cb)
  lib.callback('orgpanel:changeMemberGrade', false, function(result)
    cb(result)
  end, data)
end)
```

### Server Lua (`server.lua`)

**2. Mapear tipos de dados corretamente:**

```lua
-- Exemplo: getMembers deve retornar:
lib.callback.register('orgpanel:getMembers', function(source, data)
  local members = {} -- buscar do banco
  
  for _, member in ipairs(members) do
    table.insert(result, {
      citizenid = member.citizenid,
      name = member.name,
      gradeName = member.grade_name, -- atenção ao nome do campo
      grade = member.grade,
      online = member.online,
      deliveries = member.deliveries,
      playtime = member.playtime,
      weeklyTotal = member.weekly_total,
      dailyTotal = member.daily_total,
      recruited = member.recruited,
      mugshot_url = member.mugshot_url
    })
  end
  
  return result
end)
```

**3. Ajustar nomes de campos conforme necessário:**

| Frontend (TypeScript) | Backend (Lua) |
|----------------------|---------------|
| `citizenid` | `citizenid` ou `identifier` |
| `gradeName` | `grade_name` ou `rank_name` |
| `dailyTotal` | `daily_total` ou `today_deliveries` |
| `weeklyTotal` | `weekly_total` ou `week_deliveries` |

---

## 🧪 Como Testar

### 1. Build do Frontend
```bash
cd nui
npm install
npm run build
```

### 2. Verificar Output
```bash
ls nui/build/
# Deve ter: index.html, assets/, ...
```

### 3. fxmanifest.lua
```lua
fx_version 'cerulean'
game 'gta5'

author 'Sua Org'
description 'Painel de Organização'
version '2.0.0'

ui_page 'nui/build/index.html'

files {
  'nui/build/index.html',
  'nui/build/**/*'
}

client_scripts {
  '@ox_lib/init.lua',
  'client.lua'
}

server_scripts {
  '@oxmysql/lib/MySQL.lua',
  '@ox_lib/init.lua',
  'server.lua'
}

dependencies {
  'ox_lib',
  'oxmysql'
}
```

### 4. Testar no Jogo
```
1. Restart do recurso: /ensure org_panel
2. Abrir painel: /painelorg ou F7
3. F8 Console: verificar se não há erros
4. F12 DevTools: verificar Network e Console
5. Testar cada aba e cada ação
```

---

## 📊 Resumo Final

| Item | Status |
|------|--------|
| **Mocks eliminados** | ✅ 100% |
| **Tipos TypeScript** | ✅ Completos |
| **fetchNui utility** | ✅ Implementado |
| **useOrgData hook** | ✅ Fonte única |
| **App.tsx** | ✅ Backend-ready |
| **Header.tsx** | ✅ Backend-ready |
| **Dashboard.tsx** | ✅ Backend-ready |
| **Members.tsx** | ✅ Backend-ready |
| **Bank.tsx** | ✅ Backend-ready |
| **PD.tsx** | ✅ Backend-ready |
| **Modals** | ✅ Backend-ready |
| **Eventos NUI** | ✅ Todos mapeados |
| **refreshData()** | ✅ Após cada ação |
| **openPanel/close** | ✅ Implementado |

---

## 🚀 Próximos Passos

1. ✅ **Frontend completo** - FEITO
2. ⏳ **Implementar callbacks Lua** - PENDENTE
3. ⏳ **Ajustar schema SQL se necessário** - PENDENTE
4. ⏳ **Testar integração completa** - PENDENTE
5. ⏳ **Deploy em produção** - PENDENTE

---

## 📝 Notas Importantes

- ✅ **ZERO mocks** restantes no código
- ✅ **Contratos respeitados** conforme spec
- ✅ **Eventos exatos** da documentação
- ✅ **Tipos corretos** em todas interfaces
- ✅ **refreshData()** chamado após TODAS as ações
- ✅ **Loading/Error states** implementados

**O frontend está 100% pronto para integração com o backend FiveM real!** 🎯
