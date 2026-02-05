# PROJECT STATUS - ORG PANEL (05/02/2026)

## Arquitetura Atual

- Resource: org_panel
- Frontend: React/Vite → build em web/build ou nui/build
- Backend: Lua (ox_lib callbacks) + oxmysql
- Banco: players (real), tokyo_qjobsystem (JSON jobs/gangs), tabelas custom org_*

## Dados Reais (fontes confiáveis)

- players.citizenid → ID único
- players.charinfo → firstname, lastname (nome), possivelmente mugshot_url em metadata
- players.job / players.gang → JSON com name, label, grade.level, grade.name, isboss, bankAuth
- tokyo_qjobsystem → JSON array compartilhado (labels, grades completos)
- org_accounts → saldo da org (balance)
- org_transactions → extrato (entrada/saque)
- org_farm_progress → progresso diário por player/org/date

## Endpoints Implementados (server/main.lua)

- orgpanel:getMyOrgInfo → orgName, label, balance, myGrade, isBoss, bankAuth
- orgpanel:getFarmConfig → dailyGoal, rewardPerUnit, rewardFixed, itemsAllowed
- orgpanel:getMyFarmProgress → currentQuantity, rewardClaimed, potentialReward
- orgpanel:claimFarmReward → coleta, debita org_accounts, credita player.bank
- orgpanel:getMembers → citizenid, firstname, lastname, grade, online, playtime (parcial)
- orgpanel:getTransactions → extrato real
- orgpanel:deposit / withdraw → real, com permissão bankAuth
- orgpanel:changeMemberGrade / recruitPlayer / banMember / unbanMember → real, com permissão boss

## O que ainda é MOCKADO (prioridade para matar)

- Lista de membros: online = false, deliveries/recruited = 0, rank fixo
- Farm ranking: vazio ou fake
- Recruitment stats: fake
- Foto do player: não puxada (precisa mugshot_url)
- Atualização automática após ações (deposit, claim, etc.) → precisa refresh manual ou evento

## Plano de Ataque Imediato (ordem sugerida)

1. Testar conexão: /testorg → ver se retorna JSON real do backend
2. Implementar hook useOrgData no React (carregar tudo na mount + refresh após ações)
3. Ligar FarmProgressArc ao getMyFarmProgress + getFarmConfig
4. Adicionar mugshot na lista de membros (metadata.mugshot_url)
5. Enriquecer getMembers com: grade real (tokyo_qjobsystem), online (GetQBPlayers), deliveries (COUNT org_farm_deliveries)
6. Remover mocks restantes em Dashboard, Farms, Recruitment
7. Adicionar polling ou evento para atualizar progresso farm em tempo real (se necessário)

## Riscos / Gambiarras a evitar

- Cálculo de prêmio no client → sempre no server (anti-cheat)
- Confiar em client para validar saldo da org → sempre server
- Não validar isboss/bankAuth → brecha grave
- Não logar ações → impossível auditar depois

Próximo passo: rodar /testorg e colar o output aqui.