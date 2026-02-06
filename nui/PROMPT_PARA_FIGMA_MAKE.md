# Prompt para Figma Make – Painel de Organização FiveM (org_panel)

**Use este texto inteiro como prompt ao enviar o projeto para o Figma Make ou para quem for integrar o design ao backend. Copie e cole tudo abaixo da linha.**

---

## INSTRUÇÕES GERAIS

Você vai trabalhar com um painel de organização para FiveM (NUI). O design/React que você gera ou exporta do Figma Make será integrado a um backend já existente: client Lua, server Lua, oxmysql e schema SQL. O objetivo é que o novo frontend (UI/UX do Figma) rode **sem quebrar** nenhum callback, endpoint ou lógica existente. Siga rigorosamente o contrato abaixo.

**O que você DEVE fazer:**
- Manter React 18+ e build com Vite; a saída deve gerar `nui/build/index.html` e `nui/build/**/*` para o `fxmanifest.lua` apontar.
- Usar **apenas** os eventos NUI e tipos TypeScript listados neste documento; nenhum dado na UI pode vir de mocks ou de formatos diferentes.
- Garantir uma **única fonte de dados** no React (um hook central que chama os eventos de leitura) e que **toda ação** (botão, modal) chame o evento NUI correto e, após sucesso, atualize os dados (refresh).
- Preservar o fluxo de abertura/fechamento do painel: abertura via mensagem NUI `openPanel`, fechamento via evento `orgpanel:close`.
- Se o design do Figma não tiver algum bloco da lista original (ex.: ranking de entregas, mensagem do líder), **readicione** esse bloco mantendo o visual novo onde possível, **ou** documente explicitamente que a funcionalidade foi removida por decisão de produto. Não remova callbacks nem campos do backend sem substituição ou documentação.

**O que você NÃO DEVE fazer:**
- Não renomeie nem remova eventos NUI (`orgpanel:*`). Não altere assinaturas no client Lua ou server Lua sem atualizar os três lugares (React `nui.ts`, client, server).
- Não use arrays ou objetos fixos (mocks) no lugar de dados que vêm do backend.
- Não altere o schema SQL sem documentar e sem ajustar server Lua e tipos TypeScript.
- Não remova o hook central de dados nem a função `fetchNui`; toda comunicação com o jogo passa por ela.

---

## 1. TIPOS TYPESCRIPT (OBRIGATÓRIOS)

O frontend deve usar **exatamente** estas interfaces. Arquivo de referência: `nui/src/types/orgpanel.ts`. Nenhum dado exibido na UI pode vir de outro formato.

```ts
export interface OrgInfo {
  orgName: string;
  label: string;
  myGrade: number;
  myGradeName: string;
  isBoss: boolean;
  bankAuth: boolean;
  isRecruiter: boolean;
  balance: number;
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "farm";
  description: string;
  amount: number;
  date: string;
  time: string;
  citizenid?: string;
  created_at?: number;
}

export interface BlacklistMember {
  id: string;
  name: string;
  reason: string;
  bannedBy: string;
  date: string;
  severity: "critical" | "high" | "medium";
}

export interface CurrentPlayer {
  citizenid: string;
  name: string;
  phone?: string;
}

export type RewardType = "per_unit" | "fixed";

export interface FarmConfig {
  enabled: boolean;
  dailyGoal: number;
  rewardType: RewardType;
  rewardPerUnit: number;
  rewardFixed: number;
  itemsAllowed: { name: string; min_qty?: number }[];
}

export interface FarmProgress {
  date: string;
  currentQuantity: number;
  rewardClaimed: boolean;
  dailyGoal: number;
  rewardType: RewardType;
  rewardPerUnit: number;
  rewardFixed: number;
  potentialReward: number;
}

export interface ClaimFarmRewardResponse {
  success: boolean;
  message: string;
  reward?: number;
  newBalance?: number;
  progress?: FarmProgress;
}

export interface BankOperationResponse {
  success: boolean;
  message: string;
  newBalance?: number;
}
```

---

## 2. EVENTOS NUI – LISTA COMPLETA E PAYLOADS

Toda comunicação do React com o jogo é feita via `fetchNui(eventName, data?)`. O nome do evento é a URL (ex.: `https://resourceName/orgpanel:getMyOrgInfo`). **Não invente eventos novos** sem adicionar também no client Lua e no server Lua.

### 2.1 Leitura (GET-like)

| Evento | Payload (data) | Retorno |
|--------|----------------|---------|
| `orgpanel:getMyOrgInfo` | nenhum | `OrgInfo \| null` |
| `orgpanel:getOverview` | nenhum | `{ orgName, label, balance, onlineCount, totalMembers, rating, ratingCount, myGrade, myGradeName } \| null` |
| `orgpanel:getCurrentPlayer` | nenhum | `{ citizenid, name } \| null` |
| `orgpanel:getPlayerById` | `{ targetId: string }` | `{ id, name, level, playtime, online, vip, vipType? } \| null` |
| `orgpanel:getFarmConfig` | nenhum | `FarmConfig \| null` |
| `orgpanel:getMyFarmProgress` | nenhum | `FarmProgress \| null` |
| `orgpanel:getMembers` | (opcional) filtros | array de membros (citizenid, name, gradeName, online, deliveries, playtime, etc.) |
| `orgpanel:getFarmRanking` | (opcional) data | `{ rank, citizenid, name, total }[] \| null` |
| `orgpanel:getTransactions` | (opcional) data | array (id, transaction_type, description, amount, created_at) |
| `orgpanel:getRecruitmentStats` | nenhum | `{ citizenid, total }[]` |
| `orgpanel:getRetentionMetrics` | nenhum | `{ period, retention, total }[]` |
| `orgpanel:getBannedMembers` | nenhum | array (banned_citizenid, name, reason, banned_by, banned_at) → mapear para `BlacklistMember[]` |
| `orgpanel:getSecurityLogs` | nenhum | `{ type, message, time, date }[]` |
| `orgpanel:getBlockedTodayCount` | nenhum | `{ count: number }` |

### 2.2 Escrita / Ações (POST-like)

| Evento | Payload (data) | Retorno |
|--------|----------------|---------|
| `orgpanel:deposit` | `{ amount: number, description?: string }` | `BankOperationResponse` |
| `orgpanel:withdraw` | `{ amount: number, description?: string }` | `BankOperationResponse` |
| `orgpanel:changeMemberGrade` | `{ citizenid: string, gradeName: string }` | `{ success: boolean, message?: string }` |
| `orgpanel:recruitPlayer` | `{ targetId: string }` | `{ success: boolean, message?: string }` |
| `orgpanel:banMember` | `{ citizenid: string, reason: string }` | `{ success: boolean, message?: string }` |
| `orgpanel:unbanMember` | `{ citizenid: string }` | `{ success: boolean, message?: string }` |
| `orgpanel:updateFarmConfig` | `{ dailyGoal: number, rewardPerUnit: number }` | `{ success: boolean, message?: string }` |
| `orgpanel:claimFarmReward` | nenhum | `ClaimFarmRewardResponse` |

### 2.3 Ações sem retorno de dados relevantes

| Evento | Payload | Uso |
|--------|---------|-----|
| `orgpanel:close` | nenhum | Fechar painel; client Lua libera SetNuiFocus(false, false). |
| `orgpanel:openDiscord` | nenhum | Abrir link Discord. |
| `orgpanel:openRadio` | nenhum | Entrar no canal de rádio. |
| `orgpanel:setWaypoint` | nenhum | Marcar waypoint no mapa. |

---

## 3. HOOK CENTRAL DE DADOS (useOrgData)

O App deve ter **um único hook** que busca todos os dados de leitura e expõe para a UI. Exemplo de assinatura e eventos a chamar na carga/refresh:

**Na montagem e ao chamar `refreshData()`:**
- `fetchNui("orgpanel:getMyOrgInfo")` → `orgInfo`
- `fetchNui("orgpanel:getFarmConfig")` → `farmConfig`
- `fetchNui("orgpanel:getMyFarmProgress")` → `farmProgress`
- `fetchNui("orgpanel:getTransactions")` → mapear para `Transaction[]`
- `fetchNui("orgpanel:getMembers")` → mapear para array de membros (id, name, rank, online, deliveries, playtime, weeklyTotal, dailyTotal, recruited, mugshot_url, etc.)
- `fetchNui("orgpanel:getBannedMembers")` → mapear para `BlacklistMember[]`
- `fetchNui("orgpanel:getCurrentPlayer")` → `currentPlayer`

**O hook deve expor:** `orgInfo`, `farmConfig`, `farmProgress`, `members`, `transactions`, `blacklist`, `currentPlayer`, `loading`, `refreshData`, `setMembers`, `setBlacklist`.

**Regra:** Após qualquer ação que altere dados (depositar, sacar, banir, recrutar, coletar recompensa, alterar cargo, desbanir, atualizar meta da farm), chame `refreshData()` para atualizar a UI.

---

## 4. MAPEAMENTO UI → BACKEND (POR TELA/ABA)

Use esta tabela para garantir que cada tela e cada botão chame o evento certo.

### Abas obrigatórias
- **INÍCIO** (Dashboard)
- **MEMBROS**
- **FARMS**
- **RECRUTAMENTO**
- **BANCO**
- **PD**

### INÍCIO (Dashboard)
- **Dados exibidos:** `orgInfo.label`, `orgInfo.balance`, `farmConfig.dailyGoal`, `farmConfig.rewardPerUnit`, `farmProgress` (currentQuantity, dailyGoal, potentialReward, rewardClaimed), rankings derivados de `members` (entregas hoje, tempo jogado, ranking semanal), líderes (membros com rank contendo "líder"), mensagem do líder (estado local ou futuro callback).
- **Ações:**  
  - Botão "Editar meta" → abre modal; ao confirmar: `fetchNui("orgpanel:updateFarmConfig", { dailyGoal, rewardPerUnit })` + `refreshData()`.  
  - Botão "Coletar Recompensa" → `fetchNui("orgpanel:claimFarmReward")` + `refreshData()`.  
  - Botão "Rádio" → `fetchNui("orgpanel:openRadio")`.  
  - Botão "Localização" / waypoint → `fetchNui("orgpanel:setWaypoint")`.  
  - Mensagem do líder: se houver modal de edição, manter estado local ou callback futuro; não remover o bloco de exibição sem documentar.

### MEMBROS
- **Dados exibidos:** `members` (lista com id, name, rank, online, recruited); busca/filtro local.
- **Ações:**  
  - "Recrutar" → abre modal; ao confirmar: `fetchNui("orgpanel:recruitPlayer", { targetId })` + `refreshData()`.  
  - "Banir" (por membro) → abre modal; ao confirmar: `fetchNui("orgpanel:banMember", { citizenid, reason })` + `refreshData()`.  
  - Alterar cargo: `fetchNui("orgpanel:changeMemberGrade", { citizenid, gradeName })` + `refreshData()` (ou atualizar `setMembers` localmente se o servidor retornar o novo estado).

### FARMS
- **Dados exibidos:** `members` (ex.: ranking ou lista de farm); pode usar `farmConfig` e `farmProgress`.
- **Ações:** conforme design; se houver "Coletar", usar `orgpanel:claimFarmReward` + `refreshData()`.

### RECRUTAMENTO
- **Dados exibidos:** `fetchNui("orgpanel:getRecruitmentStats")`, opcionalmente `getRetentionMetrics`.
- **Ações:** apenas leitura, salvo se o design tiver alguma ação; nesse caso use o evento NUI correspondente.

### BANCO
- **Dados exibidos:** `orgInfo.balance`, `transactions`.
- **Ações:**  
  - "Depositar" → abre modal; ao confirmar: `fetchNui("orgpanel:deposit", { amount, description })` + `refreshData()`.  
  - "Sacar" → abre modal; ao confirmar: `fetchNui("orgpanel:withdraw", { amount, description })` + `refreshData()`.

### PD (lista negra)
- **Dados exibidos:** `blacklist` (lista de banidos); opcionalmente `getSecurityLogs`, `getBlockedTodayCount`.
- **Ações:**  
  - "Desbanir" (por entrada) → abre modal; ao confirmar: `fetchNui("orgpanel:unbanMember", { citizenid: member.id })` + atualizar lista (e.g. `setBlacklist` ou `refreshData()`).

### Header (comum a todas as abas)
- **Dados exibidos:** `orgInfo.label`, `orgInfo.balance`, contagem de membros online, total de membros.
- **Ações:**  
  - Abas: estado `activeTab`; ao clicar em aba, atualize `activeTab` e renderize o conteúdo da aba correspondente.  
  - Botão Discord → `fetchNui("orgpanel:openDiscord")`.  
  - Botão Fechar → chamar função que faz `setIsVisible(false)` e `fetchNui("orgpanel:close")`.

---

## 5. FLUXO DE ABERTURA E FECHAMENTO DO PAINEL

- **Abertura:** O client Lua (FiveM) chama `SetNuiFocus(true, true)` e envia `SendNUIMessage({ action: 'openPanel' })`. O React deve escutar `window.addEventListener('message', ...)` e, quando `event.data.action === 'openPanel'`, definir visível e chamar `refreshData()`.
- **Fechamento:** O usuário clica em Fechar ou pressiona ESC. O React deve chamar `fetchNui("orgpanel:close")` e esconder a UI (ex.: `setIsVisible(false)`). O client Lua, ao receber o callback `orgpanel:close`, chama `SetNuiFocus(false, false)`.
- **Não** use outro evento ou URL para fechar (ex.: `/close` sozinho); use sempre `orgpanel:close`.

---

## 6. LUA (CLIENT E SERVER)

- **Client:** Cada evento listado na seção 2 deve ter um `RegisterNUICallback('orgpanel:XXX', function(data, cb) ... end)`. Os que recebem payload (deposit, withdraw, banMember, unbanMember, recruitPlayer, changeMemberGrade, updateFarmConfig, getMembers, getFarmRanking, getTransactions) devem repassar `data` ao servidor via `lib.callback('orgpanel:XXX', false, function(result) cb(result) end, data)`. Não remova nem renomeie callbacks.
- **Server:** Cada `lib.callback.register('orgpanel:XXX', ...)` deve continuar existindo com o mesmo nome e assinatura (source, data quando aplicável). Você pode melhorar implementação (logs, validação), mas não mude nomes nem assinaturas sem atualizar também o React e o client.
- Se o novo UI precisar de **um evento novo**, adicione em três lugares: tipo em `nui.ts`, `RegisterNUICallback` no client, `lib.callback.register` no server.

---

## 7. SQL (SCHEMA)

O backend usa as tabelas: `org_accounts`, `org_farm_settings`, `org_transactions`, `org_farm_deliveries`, `org_farm_progress`, `org_playtime`, `org_recruitments`, `org_bans`, `org_ratings`, `org_logs`. O schema é a fonte da verdade para persistência. **Não altere** tabelas ou colunas sem documentar e sem ajustar server Lua e tipos TypeScript conforme necessário.

---

## 8. FUNÇÃO fetchNui (OBRIGATÓRIA)

O React deve ter uma função que envia POST para `https://${resourceName}/${eventName}` com `body: JSON.stringify(data ?? {})` e retorna o JSON da resposta. Em ambiente browser (sem FiveM), `resourceName` pode ser `'nui-dev'` para testes. Exemplo de assinatura:

```ts
export async function fetchNui<T>(eventName: string, data?: any): Promise<T>
```

Todos os eventos da seção 2 devem ser chamados **somente** via essa função.

---

## 9. LAYOUT E SCROLL

- O painel deve ter altura limitada (ex.: 90vh) e **uma única área rolável** (ex.: uma div com `overflow-y: auto` e altura restante após o header). O header deve estar no fluxo do layout (não apenas `position: absolute` sem reservar espaço) para que o conteúdo comece abaixo dele e role corretamente.
- O container principal deve permitir cliques no NUI: evite `pointer-events: none` no wrapper principal quando o painel estiver visível.

---

## 10. CHECKLIST FINAL (OBRIGATÓRIO)

Antes de dar por concluída a integração, confira:

- [ ] `npm run build` na pasta `nui` gera `nui/build` sem erros.
- [ ] `fxmanifest.lua` mantém `ui_page 'nui/build/index.html'` e `files { 'nui/build/index.html', 'nui/build/**/*' }`.
- [ ] Nenhum mock: nenhum array/objeto fixo substitui dados que vêm de `useOrgData` ou de outros `fetchNui`.
- [ ] Componentes usam os tipos de `orgpanel.ts` (OrgInfo, Transaction, BlacklistMember, CurrentPlayer, FarmConfig, FarmProgress, etc.).
- [ ] Toda ação de usuário (depositar, sacar, banir, recrutar, coletar, alterar cargo, desbanir, editar meta, fechar) chama o evento NUI correto com o payload indicado na seção 2.
- [ ] Nenhum evento listado neste documento foi removido do client/server sem substituição ou documentação.
- [ ] Client Lua: todos os `RegisterNUICallback('orgpanel:XXX')` existem e repassam `data` quando o servidor espera.
- [ ] Abertura do painel: mensagem NUI `openPanel`; fechamento: `orgpanel:close` + SetNuiFocus false.
- [ ] Área de conteúdo rolável funciona; header fixo no topo.

---

## 11. COMO TESTAR

1. Rodar `npm run build` na pasta `nui`.  
2. No servidor FiveM, reiniciar o recurso do painel (ex.: `ensure org_panel`).  
3. No jogo, abrir o painel (comando ou keybind, ex.: `/painelorg` ou F7).  
4. Verificar F8 (console cliente) e F12 (DevTools do NUI): sem erros; ao clicar em abas e botões, os callbacks devem ser chamados e a UI atualizar.  
5. Testar cada aba e cada ação (Depositar, Sacar, Coletar, Recrutar, Banir, Desbanir, Editar meta, Fechar).

---

Fim do prompt. Use este documento completo ao enviar o projeto para o Figma Make ou para a equipe que fará a integração do design ao backend.
