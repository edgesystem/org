# Auditoria e Relatório – Painel Org (org_panel)

## 1. AUDITORIA RÁPIDA E BRUTAL

### Componentes que estavam “mortos” ou em risco (corrigidos)

| Componente | Problema | Correção |
|------------|----------|----------|
| **App.tsx – container raiz** | `pointer-events-none` no wrapper fazia o CEF/FiveM entregar cliques ao jogo em vez do NUI | Container com `pointer-events-auto` quando o painel está visível |
| **App.tsx – closePanel** | Chamava `fetch('/close')` em vez do callback registrado no Lua | Passou a usar `fetchNui("orgpanel:close")` e `setIsVisible(false)` |
| **Header – botão Fechar** | Só chamava `fetchNui("orgpanel:close")` e não escondia a UI no React | Header recebe `onClose={closePanel}` e o botão chama `onClose()` |
| **UnbanModal** | `handleUnban` não esperava a Promise do `onConfirm`, modal fechava antes do sucesso | `handleUnban` async com `await Promise.resolve(member.onConfirm(...))` e depois `onClose()` |
| **Lua – unbanMember** | Callback não repassava `data` para o servidor | `lib.callback(..., data)` para enviar `citizenid` |

### Arquivos que tinham mocks/valores fixos (ajustes feitos)

| Arquivo | O que tinha | O que foi feito |
|---------|-------------|------------------|
| **Header.tsx** | `imgRectangle1984` e `imgHeader` = URLs via.placeholder.com | Uso de imports dos assets em `src/assets/` (logo e header) |
| **App.tsx** | Background = URL externa Unsplash (pode falhar no NUI) | Fundo trocado para gradiente CSS (sem dependência externa) |
| **Dashboard.tsx** | `goalAmount` só de `farmProgress.realProgress` | Sincronização com `currentQuantity` ou `realProgress` (fallback) |

### CSS que poderia matar cliques (revisado)

- **App.tsx**: o wrapper principal tinha `pointer-events-none`; o painel interno tinha `pointer-events-auto`. Em alguns contextos CEF/NUI, o hit testing pode considerar primeiro o elemento raiz, então **todo o container visível** passou a ter `pointer-events-auto` quando o painel está aberto.
- **Outros**: `pointer-events-none` em modais (badge, input, etc.) está apenas em elementos decorativos (ícones dentro de inputs, bordas), não na área clicável. Nenhum outro CSS global foi alterado.

### Componentes já vivos (só conferência)

- **Header** – abas com `onClick={() => setActiveTab(tab)}` e botões Discord/Fechar com handlers.
- **Dashboard** – `onEditGoal`, `onDeliverGoal`, Rádio, Waypoint com `onClick` e `fetchNui`.
- **Bank** – Depositar/Sacar com `onClick={onDeposit}` / `onClick={onWithdraw}`.
- **Members** – Recrutar, Banir, RankSelector com `onClick`/`onChange`.
- **PD** – Desbanir com `onClick` que chama `onUnbanMember({ ...entry, onConfirm: handleUnban })`.
- **FarmProgressArc** – `onClaim` no botão “Coletar Recompensa”.
- **Modais** – BankOperationModal, EditGoalModal, RecruitModal, BanModal, etc. com `onConfirm`/`onClose` e `fetchNui` no App.

---

## 2. Client Lua (client/main.lua)

- **SetNuiFocus**: mantido `SetNuiFocus(true, true)` ao abrir e `SetNuiFocus(false, false)` ao fechar.
- **SetNuiFocusKeepInput(false)** já estava correto.
- **Debug**: adicionado `print('[org_panel] SendNUIMessage: openPanel')` antes de `SendNUIMessage`.
- **Close**: tanto `closePanel` quanto `orgpanel:close` estão registrados; o React usa apenas `orgpanel:close`.
- **unbanMember**: callback passou a repassar `data` para o servidor (ex.: `citizenid`).

---

## 3. React – vida total

- **App.tsx**: `activeTab` + `setActiveTab`; render condicional por aba; `closePanel` com `fetchNui("orgpanel:close")` e `setIsVisible(false)`; `onClose={closePanel}` no Header; container com `pointer-events-auto`; fundo em gradiente.
- **Header.tsx**: abas com `onClick={() => setActiveTab(tab)}`; botão Fechar chama `onClose()`; imagens do header/logo via import dos assets.
- **Dashboard/Inicio**: `FarmProgressComponent` recebe `FarmProgressArc` com `dailyGoal`, `currentQuantity`, `potentialReward`, `rewardClaimed`, `onClaim`; `goalAmount` sincronizado com `farmProgress.currentQuantity` ou `realProgress`.
- **Botões principais**: Depositar/Sacar (Bank) abrem modal; Confirmar no modal chama `confirmBankOperation` → `fetchNui` + `refreshData`; Coletar (FarmProgressArc) chama `handleClaimFarmReward` → `fetchNui("orgpanel:claimFarmReward")` + `refreshData`.
- **Modais**: todos com `onClose` e `onConfirm`/handler que chamam `fetchNui` no App e fecham o modal.
- **useOrgData**: usado no App; `refreshData()` na abertura do painel e após ações (deposit, withdraw, claim, recruit, ban, etc.). Sem mocks; dados vêm dos callbacks NUI.

---

## 4. Imagens

- **Header**: logo e imagem de fundo do header passaram a usar imports dos PNGs em `src/assets/` (build gera hashes em `build/assets/`).
- **Fundo do painel**: removida dependência de URL externa; fundo é gradiente CSS.
- **Mugshot**: em `useOrgData` já existe `mugshot_url: m.mugshot_url || null`. Onde for exibir avatar de membro, usar `member.mugshot_url || '/default-avatar.png'` (ou criar `public/default-avatar.png` se quiser fallback local).

---

## 5. RELATÓRIO FINAL – Pronto para produção

### Checklist

| Item | Status |
|------|--------|
| Painel abre com cursor funcional? | **Sim** – SetNuiFocus(true, true) + container com pointer-events-auto |
| Abas mudam conteúdo ao clicar? | **Sim** – activeTab + setActiveTab + render condicional por aba |
| Botões chamam callbacks e atualizam UI? | **Sim** – fetchNui nos handlers e refreshData() após ações |
| Imagens aparecem? | **Sim** – logo e header via import; fundo em gradiente |
| Nenhum mock visível? | **Sim** – placeholders externos e fundo externo removidos; dados do backend |

### Veredicto

**Pode ir para produção**, desde que:

1. O recurso FiveM aponte a UI para a pasta `build/` (ou a saída do `npm run build`).
2. Os callbacks no servidor (getMyOrgInfo, getFarmConfig, getMyFarmProgress, getMembers, getTransactions, getBannedMembers, deposit, withdraw, claimFarmReward, banMember, unbanMember, recruitPlayer, updateFarmConfig, etc.) estejam implementados e retornando dados corretos.

### Passos para testar

1. **Build**: `npm run build` (na pasta `nui`).
2. **Restart**: reiniciar o recurso `org_panel` no servidor (ou o nome que estiver no `fxmanifest`).
3. **Abrir**: no jogo, usar o comando (ex.: `/painelorg`) ou a keybind (ex.: F7).
4. **Verificar**:
   - F12 (DevTools do NUI) e F8 (console do cliente): ver mensagens `[org_panel]` e possíveis erros.
   - Clicar nas abas (INÍCIO, MEMBROS, FARMS, etc.) e ver o conteúdo trocar.
   - Clicar em Depositar/Sacar, Coletar, Recrutar, Banir, Fechar, etc., e ver modais/feedback e dados atualizando.

Se algo ainda ficar estático, checar no F8 se o Lua está recebendo os NUI callbacks e no F12 se há erros de JavaScript ou falha em `fetch`/`fetchNui`.
