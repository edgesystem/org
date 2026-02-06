# Comparação: Projeto Original (mock) vs Projeto Atual (backend)

Leitura completa entre `original/` (React com mocks) e `nui/` (React conectado ao backend). Objetivo: listar o que falta no painel atual para ficar completo e bonito como no original.

---

## Resumo executivo

| Área | Original | Atual | Falta / Observação |
|------|----------|--------|----------------------|
| **Dashboard** | prizes, slider meta, botão Entregar, trend no ranking, prêmios mensais (1° 2° 3°), botão Editar mensagem | FarmProgressArc (Coletar), rankings reais, sem prizes, sem slider | prizes, slider/“Entregar”, bloco prêmios mensais, botão Editar mensagem no bloco |
| **EditGoalModal** | Sistema de prêmios (1° 2° 3° + bônus), resumo e exemplo de cálculo | Só meta + valor total | Seção “Sistema de Prêmios” e resumo completo |
| **Header** | orgLabel hardcoded “é os cria”, 9/149 fixo, figma:asset | orgLabel dinâmico, membersOnline/maxMembers, imports normais | Atual está melhor (dados reais); original tem layout de referência |
| **Farms** | Mock de weekly/recentDeliveries, layout rico | Dados de `members` (weeklyAttendance, recentDeliveries) | Atual já usa backend; conferir se server envia weeklyAttendance e recentDeliveries |
| **Recruitment** | Lista “Novos Membros” com nome, recrutador, data, status | Placeholder “Em breve: Lista de novos membros” | Bloco “Novos Membros (30 dias)” com tabela real |
| **Bank** | Stats fixos (weeklyIncome/Expenses, monthly) | Stats calculados de `transactions` | Atual está correto (dados reais) |
| **PD** | Logs mockados localmente | fetchNui getSecurityLogs + getBlockedTodayCount | Atual já integrado; original tinha mais exemplo de UI de logs |
| **App** | Background Unsplash, sem NUI | Gradiente, useOrgData, fetchNui, openPanel/close | Atual correto para FiveM |

---

## 1. Dashboard (INÍCIO)

### 1.1 Original tem e atual não (ou está diferente)

| Item | Original | Atual |
|------|----------|--------|
| **Sistema de prêmios (prizes)** | `prizes: { first, second, third, others }`; exibido no card “Ranking Mensal” e na meta diária (bônus ao completar 100%) | Não existe; só `maxGoal` e `pricePerUnit` |
| **Slider da meta** | Input range 0–maxGoal para simular “quantidade entregue”; botão “Entregar” (abre SuccessModal) | Não tem slider; progresso vem de `farmProgress.currentQuantity` e botão “Coletar Recompensa” (FarmProgressArc) |
| **Trend no ranking** | No “Ranking \| Entrega de farm”: `trend: "+2"`, `trendUp: true` com ícone | Ranking sem coluna de tendência |
| **Título ranking** | “Ranking \| Entrega de farm” | “Ranking \| Entregas Hoje” |
| **Ranking mensal – prêmios a pagar** | Bloco “Prêmios a serem pagos” com 1° 2° 3° lugar em R$ (prizes.first, second, third) | Só top 3 por weeklyTotal; sem exibir valores de prêmio |
| **Mensagens do Líder – botão editar** | Botão com ícone Pencil ao lado do título “Mensagens do líder”; chama `onEditLeaderMessage` | Só o título “Mensagens do Líder”; **falta o botão Editar** (lado direito do bloco) |
| **Quick Actions (Rádio / Localização)** | Dois cards com botão interno “Entrar” e “Marcar” (visual mais destacado) | Dois botões únicos com texto “Entrar no canal” / “Marcar no mapa” (sem botão interno) |
| **Líderes** | Exibe `leader.id \| leader.name` | Exibe só `leader.name` (pode opcionalmente mostrar id) |

### 1.2 O que o atual tem a mais (correto)

- **FarmProgressArc**: componente de arco de progresso + botão “Coletar Recompensa” ligado a `orgpanel:claimFarmReward` e `farmProgress`.
- Rankings derivados de `members` (entregas hoje, tempo jogado, ranking semanal).
- Rádio e Waypoint com `fetchNui("orgpanel:openRadio")` e `orgpanel:setWaypoint`.

### 1.3 Ações recomendadas

1. **Adicionar botão “Editar” (Pencil)** no bloco “Mensagens do Líder” que chame `onEditLeaderMessage`.
2. **Decidir sobre prizes:**  
   - Se o backend passar a ter prêmios (1° 2° 3° + bônus 100%), adicionar estado `prizes` no App, passar para Dashboard e EditGoalModal e recriar o bloco “Prêmios a serem pagos” e o bônus na meta.  
   - Se não houver backend para isso, deixar como está ou documentar como “removido”.
3. **Trend no ranking:** se o servidor puder enviar variação (ex.: “+2” em relação ao dia anterior), adicionar coluna no ranking de entregas.
4. **Quick Actions:** opcionalmente replicar o visual do original (card com botão “Entrar” / “Marcar” dentro) mantendo os mesmos `fetchNui`.

---

## 2. EditGoalModal

### 2.1 Original tem e atual não

| Bloco | Descrição |
|-------|-----------|
| **currentPrizes** | Props `currentPrizes: { first, second, third, others }` e `onConfirm(goalAmount, pricePerUnit, prizes)`. |
| **Prêmio diário (bônus)** | Seção “Prêmio Diário (Completar Meta)” com input para `others` (bônus ao completar 100%). |
| **Prêmios do ranking mensal** | Grid 3 colunas: 1° 2° 3° lugar com inputs (firstPrize, secondPrize, thirdPrize). |
| **Resumo da configuração** | Box “Resumo da Configuração” com meta, bônus, 1° 2° 3° lugar. |
| **Como funciona** | Texto “Como Funciona (Sistema de Divisão)” com exemplo (75%, 100%, valor por entrega). |

### 2.2 Atual

- Apenas “Meta de Entregas” e “Valor Total da Meta”; `onConfirm(goalAmount, pricePerUnit)` sem prizes.

### 2.3 Ações recomendadas

1. Se o backend/schema tiver suporte a prêmios (tabela ou campos em `org_farm_settings`):  
   - Adicionar estado e campos de prêmios no modal (first, second, third, others).  
   - Novo callback ou extensão de `orgpanel:updateFarmConfig` para enviar esses valores.  
   - Recriar as seções de “Sistema de Prêmios” e “Resumo” do original.
2. Se não houver suporte: deixar modal como está e documentar que “Sistema de Prêmios” foi desativado até haver backend.

---

## 3. Header

- **Original:** `bankBalance` prop; título fixo “é os cria”; “9/149” fixo; imports `figma:asset/...`; botão Fechar só `console.log`; Discord `window.open`.
- **Atual:** `bankBalance`, `membersOnline`, `maxMembers`, `orgLabel` (dinâmicos); `onClose` que chama `fetchNui("orgpanel:close")`; Discord via `fetchNui("orgpanel:openDiscord")`; imagens por import normal.

Nada crítico falta no Header atual; o original serve de referência visual.

---

## 4. Farms

- **Original:** Arrays mockados `members` (com `weekly[]`) e `recentDeliveries`; stats fixos (2.847, 407, 82%, 87).
- **Atual:** Recebe `members` do App; usa `weeklyAttendance`, `weeklyTotal`, `dailyTotal`, `recentDeliveries`; stats calculados (totalWeekly, avgDaily, attendance, todayTotal).

Estrutura e layout estão alinhados. Garantir que o **server** envie em cada membro:

- `weeklyAttendance: boolean[]` (7 dias).
- `recentDeliveries: { amount, time, date, timestamp? }[]`.

Se não enviar, o calendário semanal e “Últimas Entregas” ficam vazios ou incompletos.

---

## 5. Recruitment

### 5.1 Original tem e atual não

| Bloco | Descrição |
|-------|-----------|
| **Lista “Novos Membros (30 dias)”** | Tabela com colunas: ID, Nome, Recrutador, Data de Entrada, Tempo (dias), Status (Ativo/Inativo). Dados mockados `newMembers[]`. |

### 5.2 Atual

- Stats e “Ranking de Recruitadores” e “Taxa de Retenção” com dados de `getRecruitmentStats` e `getRetentionMetrics`.
- Na seção “Novos Membros (30 dias)”: apenas placeholder “Em breve: Lista de novos membros com status de atividade”.

### 5.3 Ações recomendadas

1. **Backend:** Criar endpoint ou ampliar resposta (ex.: `getRecruitmentStats` ou novo evento) para retornar lista de novos membros (ex.: últimos 30 dias) com: id, name, recruiterName, joinDate, daysSinceJoin, active (ou equivalente).
2. **Front:** Substituir o placeholder pela tabela do original, consumindo esse endpoint e mapeando para as colunas ID, Nome, Recrutador, Data de Entrada, Tempo, Status.
3. **Recruitment – Ret. 7d / Ret. 30d:** No original cada recrutador tinha `retention7d` e `retention30d`. No atual estão fixos (92%, 78%). Se o backend enviar por recrutador, usar esses valores nas colunas.

---

## 6. Bank

- **Original:** `weeklyIncome`, `weeklyExpenses`, `monthlyIncome`, `monthlyExpenses` fixos (453000, 87000, etc.).
- **Atual:** Mesmos stats calculados a partir de `transactions`.

Nada falta no Bank em termos de funcionalidade; atual está correto.

---

## 7. PD

- **Original:** `securityLogs` em estado local mockado; `handleUnban` atualizava estado e adicionava log local.
- **Atual:** Logs com `fetchNui("orgpanel:getSecurityLogs")`, “Bloqueios Hoje” com `getBlockedTodayCount`, e unban com `fetchNui("orgpanel:unbanMember")` e atualização de lista.

Estrutura está boa. Se no original houver algum detalhe de UI (ex.: ícones por tipo de log, cores), pode ser replicado no atual mantendo os dados reais.

---

## 8. App (raiz)

- **Original:** Sem `useOrgData`, sem NUI; estado local para members, blacklist, transactions, bankBalance, maxGoal, pricePerUnit, prizes, leaderMessage; background com imagem Unsplash; sem `isVisible` nem listener de `openPanel`/ESC.
- **Atual:** `useOrgData`, `fetchNui`, visibilidade e fechamento com `orgpanel:close`, fundo em gradiente, `FarmProgressArc` e handlers de claim/edit/close.

Nada a reverter; atual é o correto para produção.

---

## 9. Componentes e arquivos

| Componente / pasta | Original | Atual |
|--------------------|----------|--------|
| **FarmProgressArc** | Não existe | Existe e está integrado |
| **hooks/useOrgData.ts** | Não existe | Existe |
| **lib/nui.ts** | Não existe | Existe |
| **types/orgpanel.ts** | Não existe | Existe |
| **Modais** | Mesmos nomes; EditGoalModal com prizes | EditGoalModal sem prizes; resto alinhado |

Nenhum componente do original foi removido; o atual adiciona hook, lib, types e FarmProgressArc.

---

## 10. Checklist do que falta para o painel ficar “completo e bonito”

- [ ] **Dashboard – Mensagens do Líder:** Botão “Editar” (ícone Pencil) ao lado do título, chamando `onEditLeaderMessage`.
- [ ] **Dashboard – Prêmios (opcional):** Se backend suportar: estado `prizes`, bloco “Ranking Mensal” com “Prêmios a serem pagos” (1° 2° 3°) e bônus por completar 100%.
- [ ] **Dashboard – Trend no ranking:** Se backend enviar variação do dia, exibir no ranking de entregas (ex.: “+2”).
- [ ] **EditGoalModal:** Se backend suportar: seção “Sistema de Prêmios” (1° 2° 3° + bônus), resumo e “Como Funciona”; props e callback com `prizes`.
- [ ] **Recruitment – Novos Membros:** Substituir placeholder por tabela “Novos Membros (30 dias)” com dados reais (novo endpoint ou extensão de existente).
- [ ] **Recruitment – Ret. 7d / 30d:** Se o backend enviar por recrutador, usar nas linhas do ranking em vez de valores fixos.
- [ ] **Server – Members:** Garantir `weeklyAttendance` (array 7 dias) e `recentDeliveries` para Farms.
- [ ] **Server – Prêmios (opcional):** Se for implementar prizes, definir schema (ex.: em `org_farm_settings`) e callbacks para ler/escrever.

---

## Conclusão

O projeto atual já está **funcional e conectado ao backend** (useOrgData, fetchNui, FarmProgressArc, abas, modais, PD, Bank). O que falta para se aproximar do original é sobretudo:

1. **UI:** Botão Editar no bloco “Mensagens do Líder” e, se quiser, visual dos Quick Actions como no original.
2. **Funcionalidade opcional:** Sistema de prêmios (meta + 1° 2° 3° + bônus) no Dashboard e no EditGoalModal, dependente de backend.
3. **Recruitment:** Bloco “Novos Membros (30 dias)” com dados reais e, se houver, retenção 7d/30d por recrutador.
4. **Dados do server:** `weeklyAttendance` e `recentDeliveries` em membros para Farms ficarem completos.

Prioridade sugerida: botão Editar (Mensagens do Líder) e lista de Novos Membros em Recruitment; em seguida prêmios e trends se o backend permitir.
