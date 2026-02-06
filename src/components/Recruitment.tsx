import { Users, TrendingUp, Award, UserPlus, Activity } from "lucide-react";
import type { 
  RecruiterStats, 
  NewMember, 
  RecruitmentOverview 
} from "../types/orgpanel";

interface RecruitmentProps {
  recruiterStats: RecruiterStats[];
  newMembers: NewMember[];
  recruitmentOverview: RecruitmentOverview | null;
  loading: boolean;
  canRecruit: boolean;
  onRecruit: () => void;
}

export function Recruitment({ 
  recruiterStats, 
  newMembers, 
  recruitmentOverview,
  loading,
  canRecruit,
  onRecruit 
}: RecruitmentProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#a11212] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#99a1af] text-sm">Carregando dados de recrutamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header com botão de recrutar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold mb-2">
            Performance de Recrutamento
          </h1>
          <p className="text-[#99a1af] text-sm">
            Análise de crescimento e retenção de novos membros
          </p>
        </div>
        {canRecruit && (
          <button
            onClick={onRecruit}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00ff9d] to-[#00d97e] rounded-xl hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] transition-all"
          >
            <UserPlus className="w-4 h-4 text-black" />
            <span className="text-black text-sm font-bold">Recrutar Jogador</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-4 hover:border-[#a11212] hover:shadow-[0_0_15px_rgba(161,18,18,0.2)] transition-all">
          <p className="text-[#99a1af] text-xs mb-1">Novos (30 dias)</p>
          <p className="text-white text-2xl font-bold">
            {recruitmentOverview?.newLast30d || 0}
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-4 hover:border-[#00ff9d] hover:shadow-[0_0_15px_rgba(0,255,157,0.2)] transition-all">
          <p className="text-[#99a1af] text-xs mb-1">Novos (7 dias)</p>
          <p className="text-[#00ff9d] text-2xl font-bold">
            {recruitmentOverview?.newLast7d || 0}
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-4 hover:border-[#a11212] hover:shadow-[0_0_15px_rgba(161,18,18,0.2)] transition-all">
          <p className="text-[#99a1af] text-xs mb-1">Retenção 30d</p>
          <p className="text-white text-2xl font-bold">
            {recruitmentOverview?.retention30d || 0}%
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-4 hover:border-[#a11212] hover:shadow-[0_0_15px_rgba(161,18,18,0.2)] transition-all">
          <p className="text-[#99a1af] text-xs mb-1">Média Mensal</p>
          <p className="text-white text-2xl font-bold">
            {recruitmentOverview?.avgMonthly || 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Ranking de Recrutadores */}
        <div className="col-span-2 bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-bold">
              Ranking de Recrutadores
            </h2>
          </div>

          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-6 gap-4 px-4 py-2 bg-[rgba(0,0,0,0.54)] rounded-lg">
              <div className="text-[#99a1af] text-sm font-bold">Posição</div>
              <div className="text-[#99a1af] text-sm font-bold">Nome</div>
              <div className="text-[#99a1af] text-sm font-bold text-center">Recrutados</div>
              <div className="text-[#99a1af] text-sm font-bold text-center">Ret. 7d</div>
              <div className="text-[#99a1af] text-sm font-bold text-center">Ret. 14d</div>
              <div className="text-[#99a1af] text-sm font-bold text-center">Ret. 30d</div>
            </div>

            {/* Rows */}
            {recruiterStats.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {recruiterStats.map((recruiter, index) => {
                  const position = index + 1;
                  const medalColor = 
                    position === 1 ? "#D4AF37" : 
                    position === 2 ? "#C0C0C0" : 
                    position === 3 ? "#CD7F32" : 
                    "#99a1af";

                  return (
                    <div
                      key={recruiter.citizenid}
                      className="grid grid-cols-6 gap-4 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(161,18,18,0.1)] transition-colors rounded-lg items-center"
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-base font-bold"
                          style={{ color: medalColor }}
                        >
                          {position}°
                        </span>
                        {position <= 3 && (
                          <Award className="w-4 h-4" style={{ color: medalColor }} />
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm truncate">{recruiter.name}</p>
                        <p className="text-[#99a1af] text-xs">ID: {recruiter.citizenid}</p>
                      </div>
                      <div className="text-white text-base font-bold text-center">
                        {recruiter.recruited}
                      </div>
                      <div className="text-center">
                        <span className={`text-sm font-bold ${recruiter.retention7d >= 80 ? 'text-[#00ff9d]' : recruiter.retention7d >= 50 ? 'text-[#ffb84d]' : 'text-[#a11212]'}`}>
                          {recruiter.retention7d}%
                        </span>
                      </div>
                      <div className="text-center">
                        <span className={`text-sm font-bold ${recruiter.retention14d >= 70 ? 'text-[#00ff9d]' : recruiter.retention14d >= 40 ? 'text-[#ffb84d]' : 'text-[#a11212]'}`}>
                          {recruiter.retention14d}%
                        </span>
                      </div>
                      <div className="text-center">
                        <span className={`text-sm font-bold ${recruiter.retention30d >= 60 ? 'text-[#00ff9d]' : recruiter.retention30d >= 30 ? 'text-[#ffb84d]' : 'text-[#a11212]'}`}>
                          {recruiter.retention30d}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="w-12 h-12 text-[#99a1af]/30 mx-auto mb-3" />
                <p className="text-[#99a1af] text-sm">Nenhum recrutador encontrado</p>
              </div>
            )}
          </div>
        </div>

        {/* Métricas de Retenção */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-bold">
              Taxa de Retenção
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { period: "1 dia", value: recruitmentOverview?.retention1d || 0 },
              { period: "7 dias", value: recruitmentOverview?.retention7d || 0 },
              { period: "14 dias", value: recruitmentOverview?.retention14d || 0 },
              { period: "30 dias", value: recruitmentOverview?.retention30d || 0 },
            ].map((metric) => (
              <div key={metric.period} className="bg-[rgba(0,0,0,0.54)] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-bold">
                    {metric.period}
                  </span>
                  <span className={`text-lg font-bold ${
                    metric.value >= 80 ? 'text-[#00ff9d]' : 
                    metric.value >= 50 ? 'text-[#ffb84d]' : 
                    'text-[#a11212]'
                  }`}>
                    {metric.value}%
                  </span>
                </div>
                <div className="w-full bg-[rgba(161,18,18,0.2)] rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      metric.value >= 80 ? 'bg-[#00ff9d]' : 
                      metric.value >= 50 ? 'bg-[#ffb84d]' : 
                      'bg-[#a11212]'
                    }`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Novos Membros (30 dias) */}
      <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-white text-lg font-bold">
            Novos Membros (30 dias)
          </h2>
        </div>

        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 px-4 py-2 bg-[rgba(0,0,0,0.54)] rounded-lg">
            <div className="text-[#99a1af] text-sm font-bold">ID</div>
            <div className="text-[#99a1af] text-sm font-bold">Nome</div>
            <div className="text-[#99a1af] text-sm font-bold">Recrutador</div>
            <div className="text-[#99a1af] text-sm font-bold">Data de Entrada</div>
            <div className="text-[#99a1af] text-sm font-bold">Tempo</div>
            <div className="text-[#99a1af] text-sm font-bold">Status</div>
          </div>

          {/* Rows */}
          {newMembers.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {newMembers.map((member) => (
                <div
                  key={member.citizenid}
                  className="grid grid-cols-6 gap-4 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(161,18,18,0.1)] transition-colors rounded-lg items-center"
                >
                  <div className="text-white text-sm">{member.citizenid}</div>
                  <div className="text-white text-sm truncate">{member.name}</div>
                  <div className="text-[#99a1af] text-sm truncate">{member.recruiterName}</div>
                  <div className="text-white text-sm">{member.joinDate}</div>
                  <div className="text-white text-sm">{member.daysInOrg} dias</div>
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold ${
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
          ) : (
            <div className="text-center py-12">
              <Activity className="w-12 h-12 text-[#99a1af]/30 mx-auto mb-3" />
              <p className="text-[#99a1af] text-sm">Nenhum novo membro nos últimos 30 dias</p>
            </div>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a11212 0%, #c0392b 50%, #a11212 100%);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #c0392b 0%, #e74c3c 50%, #c0392b 100%);
        }
      `}</style>
    </div>
  );
}
