import { Users, TrendingUp, Award } from "lucide-react";

export function Recruitment() {
  const recruiters = [
    { id: "97606", name: "Leonardo lima", recruited: 12, retention30d: 92, retention7d: 100 },
    { id: "1968", name: "Patricio Belford", recruited: 8, retention30d: 88, retention7d: 100 },
    { id: "63283", name: "Bonnie Snowden", recruited: 5, retention30d: 80, retention7d: 100 },
    { id: "53430", name: "revoada FOX", recruited: 3, retention30d: 100, retention7d: 100 },
    { id: "17232", name: "gabriel carvalho", recruited: 2, retention30d: 50, retention7d: 100 },
  ];

  const newMembers = [
    { id: "28934", name: "maria santos", recruiter: "Leonardo lima", joinDate: "01/02/2026", active: true, days: 4 },
    { id: "31245", name: "carlos mendes", recruiter: "Patricio Belford", joinDate: "30/01/2026", active: true, days: 6 },
    { id: "29876", name: "ana silva", recruiter: "Leonardo lima", joinDate: "28/01/2026", active: false, days: 8 },
    { id: "33421", name: "pedro costa", recruiter: "Bonnie Snowden", joinDate: "25/01/2026", active: true, days: 11 },
    { id: "30987", name: "julia ferreira", recruiter: "Leonardo lima", joinDate: "22/01/2026", active: true, days: 14 },
  ];

  const retentionMetrics = [
    { period: "1 dia", retention: 100, total: 12 },
    { period: "7 dias", retention: 92, total: 12 },
    { period: "14 dias", retention: 85, total: 11 },
    { period: "30 dias", retention: 78, total: 18 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-['Arimo:Bold',sans-serif] mb-2">
          Performance de Recrutamento
        </h1>
        <p className="text-[#99a1af] text-sm">
          Análise de crescimento e retenção de novos membros
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Novos (30 dias)</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">18</p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Novos (7 dias)</p>
          <p className="text-[#00ff9d] text-2xl font-['Arimo:Bold',sans-serif]">12</p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Retenção 30d</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">78%</p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Média Mensal</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">24</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recruiter Ranking */}
        <div className="col-span-2 bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Ranking de Recrutadores
            </h2>
          </div>

          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-5 gap-4 px-4 py-2 bg-[rgba(0,0,0,0.54)] rounded-lg">
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Posição</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Nome</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif] text-center">Recrutados</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif] text-center">Ret. 7d</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif] text-center">Ret. 30d</div>
            </div>

            {/* Rows */}
            {recruiters.map((recruiter, index) => (
              <div
                key={recruiter.id}
                className="grid grid-cols-5 gap-4 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-colors rounded-lg items-center"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#d4af37] text-base font-['Arimo:Bold',sans-serif]">
                    {index + 1}°
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm">{recruiter.name}</p>
                  <p className="text-[#99a1af] text-xs">ID: {recruiter.id}</p>
                </div>
                <div className="text-white text-base font-['Arimo:Bold',sans-serif] text-center">
                  {recruiter.recruited}
                </div>
                <div className="text-center">
                  <span className="text-[#00ff9d] text-sm">{recruiter.retention7d}%</span>
                </div>
                <div className="text-center">
                  <span className={`text-sm ${recruiter.retention30d >= 80 ? 'text-[#00ff9d]' : 'text-[#ffb84d]'}`}>
                    {recruiter.retention30d}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retention Metrics */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Taxa de Retenção
            </h2>
          </div>

          <div className="space-y-4">
            {retentionMetrics.map((metric) => (
              <div key={metric.period} className="bg-[rgba(0,0,0,0.54)] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-['Arimo:Bold',sans-serif]">
                    {metric.period}
                  </span>
                  <span className="text-[#00ff9d] text-lg font-['Arimo:Bold',sans-serif]">
                    {metric.retention}%
                  </span>
                </div>
                <div className="w-full bg-[rgba(161,18,18,0.2)] rounded-full h-2">
                  <div
                    className="bg-[#00ff9d] h-2 rounded-full transition-all"
                    style={{ width: `${metric.retention}%` }}
                  />
                </div>
                <p className="text-[#99a1af] text-xs mt-2">
                  {metric.total} novos membros
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Members List */}
      <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
            Novos Membros (30 dias)
          </h2>
        </div>

        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 px-4 py-2 bg-[rgba(0,0,0,0.54)] rounded-lg">
            <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">ID</div>
            <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Nome</div>
            <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Recrutador</div>
            <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Data de Entrada</div>
            <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Tempo</div>
            <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Status</div>
          </div>

          {/* Rows */}
          {newMembers.map((member) => (
            <div
              key={member.id}
              className="grid grid-cols-6 gap-4 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-colors rounded-lg items-center"
            >
              <div className="text-white text-sm">{member.id}</div>
              <div className="text-white text-sm">{member.name}</div>
              <div className="text-[#99a1af] text-sm">{member.recruiter}</div>
              <div className="text-white text-sm">{member.joinDate}</div>
              <div className="text-white text-sm">{member.days} dias</div>
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${
                    member.active
                      ? "bg-[#00ff9d]/20 text-[#00ff9d]"
                      : "bg-[#a11212]/20 text-[#a11212]"
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${member.active ? "bg-[#00ff9d]" : "bg-[#a11212]"}`} />
                  {member.active ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
