import { Calendar, Check, X, Clock } from "lucide-react";

// Helper function to safely format numbers
function safeFormatNumber(value: any): string {
  if (value == null || isNaN(Number(value))) return "0";
  try {
    return Number(value).toLocaleString('pt-BR');
  } catch {
    return "0";
  }
}

interface FarmsProps {
  members: any[];
}

export function Farms({ members }: FarmsProps) {
  const weekDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];
  
  // Dados REAIS calculados dos membros
  const sortedMembers = [...members].sort((a, b) => (b.weeklyTotal || 0) - (a.weeklyTotal || 0));
  
  const totalWeekly = members.reduce((acc, m) => acc + (m.weeklyTotal || 0), 0);
  const avgDaily = Math.floor(totalWeekly / 7);
  const attendance = members.length > 0 
    ? Math.floor((members.filter(m => (m.weeklyTotal || 0) > 0).length / members.length) * 100)
    : 0;
  const todayTotal = members.reduce((acc, m) => acc + (m.dailyTotal || 0), 0);

  const recentDeliveries = members.flatMap(m => (m.recentDeliveries || []).map((d: any) => ({
    ...d,
    id: m.id || m.citizenid || "N/A",
    name: m.name || "Desconhecido"
  }))).sort((a: any, b: any) => {
    const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return dateB - dateA;
  }).slice(0, 20);

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

      {/* Stats REAIS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Total Semanal</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">
            {safeFormatNumber(totalWeekly)}
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Média Diária</p>
          <p className="text-[#00ff9d] text-2xl font-['Arimo:Bold',sans-serif]">
            {safeFormatNumber(avgDaily)}
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Assiduidade</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">
            {attendance}%
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Entregas Hoje</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">
            {safeFormatNumber(todayTotal)}
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
            {sortedMembers.length > 0 ? (
              sortedMembers.slice(0, 10).map((member) => (
                <div
                  key={member.id || member.citizenid}
                  className="grid grid-cols-9 gap-2 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-colors rounded-lg items-center"
                >
                  <div className="col-span-2">
                    <p className="text-white text-sm">{member.name || "Desconhecido"}</p>
                    <p className="text-[#99a1af] text-xs">ID: {member.id || member.citizenid || "N/A"}</p>
                  </div>
                  {(member.weeklyAttendance || [false, false, false, false, false, false, false]).map((attended: boolean, index: number) => (
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
              <div className="text-center py-12">
                <p className="text-[#99a1af] text-sm">Nenhum membro encontrado</p>
                <p className="text-[#99a1af] text-xs mt-1">
                  Recrute membros para ver o calendário
                </p>
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

          {recentDeliveries.length > 0 ? (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {recentDeliveries.map((delivery, index) => (
                <div
                  key={index}
                  className="bg-[rgba(0,0,0,0.54)] rounded-lg p-3 hover:bg-[rgba(0,0,0,0.7)] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-white text-sm font-['Arimo:Bold',sans-serif]">
                        {delivery.name}
                      </p>
                      <p className="text-[#99a1af] text-xs">ID: {delivery.id}</p>
                    </div>
                    <div className="text-[#00ff9d] text-base font-['Arimo:Bold',sans-serif]">
                      {delivery.amount || 0}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#99a1af] text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{delivery.time || "--:--"}</span>
                    <span>•</span>
                    <span>{delivery.date || "--/--/----"}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#99a1af] text-sm">Nenhuma entrega registrada</p>
              <p className="text-[#99a1af] text-xs mt-1">
                As entregas aparecerão aqui
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
