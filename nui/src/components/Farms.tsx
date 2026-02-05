import { Calendar, Check, X, Clock } from "lucide-react";

export function Farms() {
  const weekDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];
  
  const members = [
    {
      id: "97606",
      name: "Leonardo lima",
      weekly: [true, true, true, true, true, false, true],
      total: 450,
    },
    {
      id: "1968",
      name: "Patricio Belford",
      weekly: [true, true, false, true, true, true, true],
      total: 328,
    },
    {
      id: "63283",
      name: "Bonnie Snowden",
      weekly: [true, false, true, true, true, true, false],
      total: 308,
    },
    {
      id: "53430",
      name: "revoada FOX",
      weekly: [true, true, true, false, true, true, true],
      total: 186,
    },
    {
      id: "17232",
      name: "gabriel carvalho",
      weekly: [false, true, true, true, false, true, true],
      total: 156,
    },
  ];

  const recentDeliveries = [
    { id: "97606", name: "Leonardo lima", amount: 150, time: "14:32", date: "05/02/2026" },
    { id: "1968", name: "Patricio Belford", amount: 120, time: "13:45", date: "05/02/2026" },
    { id: "59778", name: "kevyn soares", amount: 80, time: "12:18", date: "05/02/2026" },
    { id: "53430", name: "revoada FOX", amount: 95, time: "11:22", date: "05/02/2026" },
    { id: "17232", name: "gabriel carvalho", amount: 110, time: "10:55", date: "04/02/2026" },
    { id: "63283", name: "Bonnie Snowden", amount: 130, time: "18:40", date: "04/02/2026" },
    { id: "42156", name: "alejandro miguel", amount: 75, time: "16:30", date: "04/02/2026" },
  ];

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
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">2,847</p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Média Diária</p>
          <p className="text-[#00ff9d] text-2xl font-['Arimo:Bold',sans-serif]">407</p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Assiduidade</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">82%</p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Entregas Hoje</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">87</p>
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
            {members.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-9 gap-2 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-colors rounded-lg items-center"
              >
                <div className="col-span-2">
                  <p className="text-white text-sm">{member.name}</p>
                  <p className="text-[#99a1af] text-xs">ID: {member.id}</p>
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
            ))}
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
                    {delivery.amount}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#99a1af] text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{delivery.time}</span>
                  <span>•</span>
                  <span>{delivery.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
