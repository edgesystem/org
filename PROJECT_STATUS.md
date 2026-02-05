# Status do Projeto - Painel de Organização FiveM

## Estrutura de Pastas
- `/client`: Scripts client-side (Lua).
- `/server`: Scripts server-side (Lua).
- `/nui`: Frontend React/Vite.
- `/sql`: Migrações e estrutura do banco de dados.

## Banco de Dados (Tabelas Principais)
- `players`: Dados dos jogadores (citizenid, charinfo, job, gang, money).
- `org_accounts`: Saldo bancário das organizações.
- `org_transactions`: Histórico de depósitos e saques.
- `org_farm_progress`: Registro de entregas/progresso diário de farm.
- `org_farm_settings`: Configurações de metas e recompensas por org.
- `org_bans`: Membros banidos das organizações.

## Endpoints (NUI Callbacks / Server Callbacks)
- `orgpanel:getMyOrgInfo`: Retorna dados da org do jogador (nome, cargo, permissões).
- `orgpanel:getMembers`: Lista membros (online/offline) filtrados pela org.
- `orgpanel:getTransactions`: Histórico financeiro.
- `orgpanel:getFarmConfig`: Metas e valores de recompensa.
- `orgpanel:getMyFarmProgress`: Progresso atual do jogador logado.
- `orgpanel:claimFarmReward`: Resgate da recompensa de farm.

## Estado de Mock (Frontend)
- **Atualmente Mockado:** Saldo total, lista de membros, transações, progresso de farm, lista de bans.
- **Em Transição:** Integração com `useOrgData` para centralizar chamadas `fetchNui`.

## Lacunas e Próximos Passos
- Implementar `FarmProgressArc` real com SVG dinâmico.
- Sincronizar `mugshot_url` para fotos dos membros.
- Validar permissões `isboss` no servidor para ações críticas.
- Corrigir cálculo de `potentialReward` no backend.
