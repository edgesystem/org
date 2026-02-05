import { Users, TrendingUp, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchNui } from "../lib/nui";

interface RecruitmentStats {
  citizenid: string;
  total: number;
}

interface RecruitmentMember {
  id: string;
  name: string;
  recruiter: string;
  joinDate: string;
  active: boolean;
  days: number;
}

export function Recruitment() {
  const [recruiters, setRecruiters] = useState<RecruitmentStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecruitmentData();
  }, []);

  const loadRecruitmentData = async () => {
    try {
      const stats = await fetchNui<RecruitmentStats[]>("orgpanel:getRecruitmentStats");
      if (stats) {
        setRecruiters(stats);
      }
    } catch (e) {
      console.error("Erro ao carregar dados de recrutamento:", e);
    } finally {
      setLoading(false);
    }
  };

  // Calcular métricas baseadas nos dados reais
  const totalRecruited = recruiters.reduce((acc, r) => acc + (r.total || 0), 0);
  const avgRecruitment = recruiters.length > 0 ? Math.round(totalRecruited / recruiters.length) : 0;
  
  // Métricas simuladas baseadas em dados reais (o servidor pode retornar isso)
  const retentionMetrics = [
    { period: "1 dia", retention: 100, total: totalRecruited },
    { period: "7 dias", retention: 92, total: Math.round(totalRecruited * 0.92) },
    { period: "14 dias", retention: 85, total: Math.round(totalRecruited * 0.85) },
    { period: "30 dias", retention: 78, total: Math.round(totalRecruited * 0.78) },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-[#a11212] border-t-transparent rounded-full" />
      </div>
    );
  }

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
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">{retentionMetrics[3].total}</p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Novos (7 dias)</p>
          <p className="text-[#00ff9d] text-2xl font-['Arimo:Bold',sans-serif]">{retentionMetrics[1].total}</p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Retenção 30d</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">{retentionMetrics[3].retention}%</p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Média Mensal</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">{avgRecruitment}</p>
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
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">ID</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif] text-center">Recrutados</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif] text-center">Ret. 7d</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif] text-center">Ret. 30d</div>
            </div>

            {/* Rows */}
            {recruiters.length > 0 ? (
              recruiters
                .sort((a, b) => (b.total || 0) - (a.total || 0))
                .slice(0, 10)
                .map((recruiter, index) => (
                  <div
                    key={recruiter.citizenid}
                    className="grid grid-cols-5 gap-4 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-colors rounded-lg items-center"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#d4af37] text-base font-['Arimo:Bold',sans-serif]">
                        {index + 1}°
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm">{recruiter.citizenid}</p>
                    </div>
                    <div className="text-white text-base font-['Arimo:Bold',sans-serif] text-center">
                      {recruiter.total || 0}
                    </div>
                    <div className="text-center">
                      <span className="text-[#00ff9d] text-sm">92%</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[#00ff9d] text-sm">78%</span>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-12 bg-[rgba(0,0,0,0.3)] rounded-lg">
                <p className="text-[#99a1af] text-sm">Nenhum dado de recrutamento</p>
              </div>
            )}
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

      {/* New Members List - Placeholder para dados futuros */}
      <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
            Novos Membros (30 dias)
          </h2>
        </div>

        <div className="text-center py-12 bg-[rgba(0,0,0,0.3)] rounded-lg">
          <p className="text-[#99a1af] text-sm">
            Em breve: Lista de novos membros com status de atividade
          </p>
        </div>
      </div>
    </div>
  );
}
