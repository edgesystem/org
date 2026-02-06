# 🔧 PLANO DE AÇÕES CORRETIVAS
## Eliminação dos Mocks Restantes (Farms + Recruitment)

**Objetivo:** Atingir 100% backend integration eliminando os mocks de Farms.tsx e Recruitment.tsx

---

## 📊 SITUAÇÃO ATUAL

```
┌──────────────────────────────────────────────┐
│  STATUS ANTES DAS CORREÇÕES                  │
├──────────────────────────────────────────────┤
│  ✅ Backend Ready: 77.8%                     │
│  ❌ Mocks Críticos: 2 componentes            │
│  📝 Ações Necessárias: 5 integrações         │
└──────────────────────────────────────────────┘
```

---

## ✅ AÇÃO 1: Integrar Farms.tsx com Backend

### Problema Identificado:
**Arquivo:** `/components/Farms.tsx`
- ❌ Array `members` mockado (linhas 6-37)
- ❌ Array `recentDeliveries` mockado (linhas 39-47)
- ❌ Stats hardcoded (linhas 65-77)

### Solução:

#### 1.1 Adicionar Tipo TypeScript

**Arquivo:** `/types/orgpanel.ts`

```typescript
// Adicionar ao final do arquivo
export interface FarmDelivery {
  id: string;
  citizenid: string;
  name: string;
  quantity: number;
  item_name: string;
  delivered_at: number;
  date: string;
  time: string;
}

export interface FarmStats {
  totalWeekly: number;
  avgDaily: number;
  attendanceRate: number;
  deliveriesToday: number;
}

export interface MemberWeeklyAttendance {
  citizenid: string;
  name: string;
  weekly: boolean[]; // [seg, ter, qua, qui, sex, sab, dom]
  total: number;
}
```

#### 1.2 Atualizar Hook useOrgData

**Arquivo:** `/hooks/useOrgData.ts`

```typescript
// Adicionar imports
import type {
  // ... existing imports
  FarmDelivery,
  FarmStats,
  MemberWeeklyAttendance,
} from '../types/orgpanel';

// Adicionar ao interface UseOrgDataReturn
interface UseOrgDataReturn {
  // ... estados existentes
  farmDeliveries: FarmDelivery[];
  farmStats: FarmStats | null;
  weeklyAttendance: MemberWeeklyAttendance[];
  
  // ... funções existentes
}

// Adicionar aos estados
export function useOrgData(): UseOrgDataReturn {
  // ... estados existentes
  const [farmDeliveries, setFarmDeliveries] = useState<FarmDelivery[]>([]);
  const [farmStats, setFarmStats] = useState<FarmStats | null>(null);
  const [weeklyAttendance, setWeeklyAttendance] = useState<MemberWeeklyAttendance[]>([]);

  // Atualizar refreshData para buscar novos dados
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        // ... existing fetches
        farmDeliveriesData,
        farmStatsData,
        weeklyAttendanceData,
      ] = await Promise.all([
        // ... existing fetches
        fetchNui<FarmDelivery[]>('orgpanel:getFarmDeliveries'),
        fetchNui<FarmStats | null>('orgpanel:getFarmStats'),
        fetchNui<MemberWeeklyAttendance[]>('orgpanel:getWeeklyAttendance'),
      ]);

      // ... existing setters
      setFarmDeliveries(farmDeliveriesData || []);
      setFarmStats(farmStatsData);
      setWeeklyAttendance(weeklyAttendanceData || []);
    } catch (err) {
      // ... error handling
    }
  }, []);

  return {
    // ... existing returns
    farmDeliveries,
    farmStats,
    weeklyAttendance,
  };
}
```

#### 1.3 Reescrever Farms.tsx

**Arquivo:** `/components/Farms.tsx`

```typescript
import { Calendar, Check, X, Clock } from "lucide-react";
import type { MemberWeeklyAttendance, FarmDelivery, FarmStats } from "../types/orgpanel";

interface FarmsProps {
  weeklyAttendance: MemberWeeklyAttendance[];
  farmDeliveries: FarmDelivery[];
  farmStats: FarmStats | null;
}

export function Farms({ weeklyAttendance, farmDeliveries, farmStats }: FarmsProps) {
  const weekDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-['Arimo:Bold',sans-serif] mb-2">
          Logística de Farms
        </h1>
        <p className="text-[#99a1af] text-sm">
          Monitoramento de assiduidade e volume de produção
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Total Semanal</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">
            {farmStats?.totalWeekly?.toLocaleString('pt-BR') || 0}
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Média Diária</p>
          <p className="text-[#00ff9d] text-2xl font-['Arimo:Bold',sans-serif]">
            {farmStats?.avgDaily || 0}
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Assiduidade</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">
            {farmStats?.attendanceRate || 0}%
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Entregas Hoje</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">
            {farmStats?.deliveriesToday || 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Weekly attendance calendar */}
        <div className="col-span-2 bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Calendário de Presença Semanal
            </h2>
          </div>

          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-9 gap-2 px-4 py-2 bg-[rgba(0,0,0,0.54)] rounded-lg">
              <div className="col-span-2 text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">
                Membro
              </div>
              {weekDays.map((day) => (
                <div key={day} className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif] text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Rows */}
            {weeklyAttendance.length > 0 ? (
              weeklyAttendance.map((member) => (
                <div
                  key={member.citizenid}
                  className="grid grid-cols-9 gap-2 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-colors rounded-lg items-center"
                >
                  <div className="col-span-2">
                    <p className="text-white text-sm">{member.name}</p>
                    <p className="text-[#99a1af] text-xs">ID: {member.citizenid}</p>
                  </div>
                  {member.weekly.map((attended, index) => (
                    <div key={index} className="flex justify-center">
                      {attended ? (
                        <div className="w-6 h-6 rounded-full bg-[#00ff9d]/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-[#00ff9d]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#a11212]/20 flex items-center justify-center">
                          <X className="w-4 h-4 text-[#a11212]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-[#99a1af] text-sm">Nenhum dado de presença disponível</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#00ff9d]/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#00ff9d]" />
              </div>
              <span className="text-[#99a1af] text-sm">Meta cumprida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#a11212]/20 flex items-center justify-center">
                <X className="w-3 h-3 text-[#a11212]" />
              </div>
              <span className="text-[#99a1af] text-sm">Meta não cumprida</span>
            </div>
          </div>
        </div>

        {/* Recent deliveries */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Últimas Entregas
            </h2>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {farmDeliveries.length > 0 ? (
              farmDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="bg-[rgba(0,0,0,0.54)] rounded-lg p-3 hover:bg-[rgba(0,0,0,0.7)] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-white text-sm font-['Arimo:Bold',sans-serif]">
                        {delivery.name}
                      </p>
                      <p className="text-[#99a1af] text-xs">ID: {delivery.citizenid}</p>
                    </div>
                    <div className="text-[#00ff9d] text-base font-['Arimo:Bold',sans-serif]">
                      {delivery.quantity}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#99a1af] text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{delivery.time}</span>
                    <span>•</span>
                    <span>{delivery.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-[#99a1af] text-sm">Nenhuma entrega recente</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### 1.4 Atualizar App.tsx

```typescript
// No componente App, passar props para Farms
{activeTab === "FARMS" && (
  <Farms 
    weeklyAttendance={weeklyAttendance}
    farmDeliveries={farmDeliveries}
    farmStats={farmStats}
  />
)}
```

#### 1.5 Implementar Backend Lua

**client.lua:**
```lua
RegisterNUICallback('orgpanel:getFarmDeliveries', function(data, cb)
    lib.callback('orgpanel:getFarmDeliveries', false, function(result)
        cb(result)
    end)
end)

RegisterNUICallback('orgpanel:getFarmStats', function(data, cb)
    lib.callback('orgpanel:getFarmStats', false, function(result)
        cb(result)
    end)
end)

RegisterNUICallback('orgpanel:getWeeklyAttendance', function(data, cb)
    lib.callback('orgpanel:getWeeklyAttendance', false, function(result)
        cb(result)
    end)
end)
```

**server.lua:**
```lua
-- Últimas entregas
lib.callback.register('orgpanel:getFarmDeliveries', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {} end

    local result = MySQL.query.await([[
        SELECT 
            fd.id,
            fd.citizenid,
            fd.quantity,
            fd.item_name,
            fd.delivered_at,
            p.charinfo
        FROM org_farm_deliveries fd
        LEFT JOIN players p ON fd.citizenid = p.citizenid
        WHERE fd.org_name = ?
        ORDER BY fd.delivered_at DESC
        LIMIT 10
    ]], { Player.PlayerData.job.name })

    local deliveries = {}
    for _, row in ipairs(result or {}) do
        local charinfo = json.decode(row.charinfo)
        table.insert(deliveries, {
            id = row.id,
            citizenid = row.citizenid,
            name = charinfo.firstname .. ' ' .. charinfo.lastname,
            quantity = row.quantity,
            item_name = row.item_name,
            delivered_at = row.delivered_at,
            date = os.date('%d/%m/%Y', row.delivered_at),
            time = os.date('%H:%M', row.delivered_at)
        })
    end

    return deliveries
end)

-- Estatísticas de farm
lib.callback.register('orgpanel:getFarmStats', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return nil end

    local orgName = Player.PlayerData.job.name

    -- Total semanal
    local weeklyTotal = MySQL.scalar.await([[
        SELECT COALESCE(SUM(quantity), 0)
        FROM org_farm_deliveries
        WHERE org_name = ? AND YEARWEEK(delivered_at) = YEARWEEK(NOW())
    ]], { orgName })

    -- Entregas hoje
    local todayTotal = MySQL.scalar.await([[
        SELECT COALESCE(SUM(quantity), 0)
        FROM org_farm_deliveries
        WHERE org_name = ? AND DATE(delivered_at) = CURDATE()
    ]], { orgName })

    -- Assiduidade (membros que cumpriram meta essa semana)
    local attendanceRate = MySQL.scalar.await([[
        SELECT 
            ROUND((COUNT(DISTINCT CASE WHEN daily_quantity >= daily_goal THEN citizenid END) * 100.0) / COUNT(DISTINCT citizenid), 0)
        FROM org_farm_progress
        WHERE org_name = ? AND YEARWEEK(progress_date) = YEARWEEK(NOW())
    ]], { orgName }) or 0

    return {
        totalWeekly = weeklyTotal or 0,
        avgDaily = math.floor((weeklyTotal or 0) / 7),
        attendanceRate = attendanceRate,
        deliveriesToday = todayTotal or 0
    }
end)

-- Presença semanal
lib.callback.register('orgpanel:getWeeklyAttendance', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return {} end

    local orgName = Player.PlayerData.job.name

    -- Buscar top 10 membros por total semanal
    local result = MySQL.query.await([[
        SELECT 
            p.citizenid,
            p.charinfo,
            COALESCE(SUM(fd.quantity), 0) as total
        FROM players p
        LEFT JOIN org_farm_deliveries fd ON p.citizenid = fd.citizenid 
            AND YEARWEEK(fd.delivered_at) = YEARWEEK(NOW())
        WHERE JSON_UNQUOTE(JSON_EXTRACT(p.job, '$.name')) = ?
        GROUP BY p.citizenid
        ORDER BY total DESC
        LIMIT 10
    ]], { orgName })

    local attendance = {}
    for _, row in ipairs(result or {}) do
        local charinfo = json.decode(row.charinfo)
        
        -- Buscar presença por dia da semana (0=domingo, 1=segunda, ..., 6=sábado)
        local weekly = {false, false, false, false, false, false, false}
        
        local dailyResult = MySQL.query.await([[
            SELECT 
                DAYOFWEEK(delivered_at) as day_of_week,
                SUM(quantity) as daily_total
            FROM org_farm_deliveries
            WHERE citizenid = ? 
                AND org_name = ?
                AND YEARWEEK(delivered_at) = YEARWEEK(NOW())
            GROUP BY DAYOFWEEK(delivered_at)
        ]], { row.citizenid, orgName })

        -- Buscar meta diária
        local goal = MySQL.scalar.await('SELECT daily_goal FROM org_farm_settings WHERE org_name = ?', { orgName }) or 100

        for _, day in ipairs(dailyResult or {}) do
            local dayIndex = day.day_of_week == 1 and 7 or day.day_of_week - 1 -- Converter domingo=1 para domingo=7
            weekly[dayIndex] = day.daily_total >= goal
        end

        table.insert(attendance, {
            citizenid = row.citizenid,
            name = charinfo.firstname .. ' ' .. charinfo.lastname,
            weekly = weekly,
            total = row.total
        })
    end

    return attendance
end)
```

---

## ✅ AÇÃO 2: Integrar Recruitment.tsx com Backend

### Problema Identificado:
**Arquivo:** `/components/Recruitment.tsx`
- ❌ Array `recruiters` mockado (linhas 4-10)
- ❌ Array `newMembers` mockado (linhas 12-18)
- ❌ Array `retentionMetrics` mockado (linhas 20-25)

### Solução:

#### 2.1 Tipos já existem em orgpanel.ts
```typescript
export interface RecruitmentStat {
  citizenid: string;
  total: number;
}

export interface RetentionMetric {
  period: string;
  retention: number;
  total: number;
}
```

Adicionar:
```typescript
export interface NewMember {
  citizenid: string;
  name: string;
  recruiterName: string;
  joinDate: string;
  active: boolean;
  days: number;
}

export interface RecruiterStats extends RecruitmentStat {
  name: string;
  retention7d: number;
  retention30d: number;
}
```

#### 2.2 Atualizar useOrgData

```typescript
// Adicionar estados
const [recruiterStats, setRecruiterStats] = useState<RecruiterStats[]>([]);
const [newMembers, setNewMembers] = useState<NewMember[]>([]);
const [retentionMetrics, setRetentionMetrics] = useState<RetentionMetric[]>([]);

// No refreshData
fetchNui<RecruiterStats[]>('orgpanel:getRecruiterStats'),
fetchNui<NewMember[]>('orgpanel:getNewMembers'),
fetchNui<RetentionMetric[]>('orgpanel:getRetentionMetrics'),
```

#### 2.3 Reescrever Recruitment.tsx

```typescript
import { Users, TrendingUp, Award } from "lucide-react";
import type { RecruiterStats, NewMember, RetentionMetric } from "../types/orgpanel";

interface RecruitmentProps {
  recruiterStats: RecruiterStats[];
  newMembers: NewMember[];
  retentionMetrics: RetentionMetric[];
}

export function Recruitment({ recruiterStats, newMembers, retentionMetrics }: RecruitmentProps) {
  // Calcular stats agregados
  const stats = {
    newLast30Days: newMembers.filter(m => m.days <= 30).length,
    newLast7Days: newMembers.filter(m => m.days <= 7).length,
    retention30d: retentionMetrics.find(m => m.period === '30 dias')?.retention || 0,
    avgMonthly: Math.floor(newMembers.length / 1) // simplificado
  };

  return (
    <div className="space-y-6">
      {/* Stats com dados reais */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Novos (30 dias)</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">{stats.newLast30Days}</p>
        </div>
        {/* ... rest of stats using calculated values ... */}
      </div>

      {/* Rankings com dados reais */}
      {recruiterStats.map((recruiter, index) => (
        <div key={recruiter.citizenid}>
          {/* render com recruiter.name, recruiter.total, etc */}
        </div>
      ))}
    </div>
  );
}
```

#### 2.4 Backend Lua

Já está documentado no `LUA_IMPLEMENTATION_GUIDE.md` - basta implementar.

---

## ✅ AÇÃO 3: Persistir Mensagem do Líder (Opcional)

### Solução Rápida:

**1. Adicionar eventos ao useOrgData:**
```typescript
// Buscar mensagem
const leaderMsg = await fetchNui<string>('orgpanel:getLeaderMessage');
setLeaderMessage(leaderMsg || '');

// Salvar mensagem (chamar ao confirmar edit)
await fetchNui('orgpanel:updateLeaderMessage', { message: newMessage });
```

**2. Backend:**
```lua
lib.callback.register('orgpanel:getLeaderMessage', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    local result = MySQL.scalar.await('SELECT leader_message FROM org_accounts WHERE org_name = ?', { Player.PlayerData.job.name })
    return result or ''
end)

lib.callback.register('orgpanel:updateLeaderMessage', function(source, data)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player.PlayerData.job.isboss then
        return { success = false, message = 'Sem permissão' }
    end
    
    MySQL.update('UPDATE org_accounts SET leader_message = ? WHERE org_name = ?', {
        data.message,
        Player.PlayerData.job.name
    })
    
    return { success = true }
end)
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Farms.tsx
- [ ] Adicionar tipos (`FarmDelivery`, `FarmStats`, `MemberWeeklyAttendance`)
- [ ] Atualizar `useOrgData` com novos estados
- [ ] Adicionar 3 eventos ao `refreshData`: `getFarmDeliveries`, `getFarmStats`, `getWeeklyAttendance`
- [ ] Reescrever `Farms.tsx` para receber props
- [ ] Atualizar `App.tsx` para passar props
- [ ] Implementar callbacks no `client.lua`
- [ ] Implementar queries no `server.lua`
- [ ] Testar no jogo

### Recruitment.tsx
- [ ] Adicionar tipos (`NewMember`, `RecruiterStats`)
- [ ] Atualizar `useOrgData` com novos estados
- [ ] Adicionar 3 eventos ao `refreshData`: `getRecruiterStats`, `getNewMembers`, `getRetentionMetrics`
- [ ] Reescrever `Recruitment.tsx` para receber props
- [ ] Atualizar `App.tsx` para passar props
- [ ] Implementar callbacks no `client.lua`
- [ ] Implementar queries no `server.lua`
- [ ] Testar no jogo

### Leader Message (Opcional)
- [ ] Adicionar evento `getLeaderMessage` ao `useOrgData`
- [ ] Adicionar campo `leader_message` à tabela `org_accounts`
- [ ] Implementar `updateLeaderMessage` no `confirmEditLeaderMessage`
- [ ] Testar persistência

---

## 🎯 RESULTADO ESPERADO

```
┌──────────────────────────────────────────────┐
│  STATUS APÓS AS CORREÇÕES                    │
├──────────────────────────────────────────────┤
│  ✅ Backend Ready: 100%                      │
│  ✅ Mocks Críticos: 0                        │
│  ✅ Todas as telas integradas                │
│  ✅ Projeto pronto para produção             │
└──────────────────────────────────────────────┘
```

---

**TEMPO ESTIMADO:** 2-4 horas de desenvolvimento + 1 hora de testes

**PRIORIDADE:** 🔴 ALTA - Necessário antes do deploy em produção
