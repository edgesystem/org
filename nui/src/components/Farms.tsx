import { useState } from "react";
import { Calendar, Check, X, Clock, TrendingUp, Settings } from "lucide-react";
import type { 
  FarmDelivery, 
  FarmStats, 
  MemberWeeklyAttendance, 
  FarmConfig, 
  FarmProgress 
} from "../types/orgpanel";

interface FarmsProps {
  farmDeliveries: FarmDelivery[];
  farmStats: FarmStats | null;
  weeklyAttendance: MemberWeeklyAttendance[];
  farmConfig: FarmConfig | null;
  farmProgress: FarmProgress | null;
  isBoss: boolean;
  loading: boolean;
  onEditGoal: () => void;
}

export function Farms({ 
  farmDeliveries, 
  farmStats, 
  weeklyAttendance, 
  farmConfig, 
  farmProgress,
  isBoss,
  loading,
  onEditGoal 
}: FarmsProps) {
  const weekDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

  // Calcular progresso da meta pessoal
  const myProgress = farmProgress ? (farmProgress.currentQuantity / farmProgress.dailyGoal) * 100 : 0;
  const myProgressCapped = Math.min(myProgress, 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#a11212] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#99a1af] text-sm">Carregando dados de farms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header com botão de configuração */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold mb-2">
            Logística de Farms
          </h1>
          <p className="text-[#99a1af] text-sm">
            Monitoramento de assiduidade e volume de produção
          </p>
        </div>
        {isBoss && (
          <button
            onClick={onEditGoal}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-[#1a0a0a] to-[#0c0505] border border-[rgba(161,18,18,0.4)] rounded-xl hover:border-[#a11212] hover:shadow-[0_0_20px_rgba(161,18,18,0.3)] transition-all"
          >
            <Settings className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-white text-sm">Configurar Meta</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-4 hover:border-[#a11212] hover:shadow-[0_0_15px_rgba(161,18,18,0.2)] transition-all">
          <p className="text-[#99a1af] text-xs mb-1">Total Semanal</p>
          <p className="text-white text-2xl font-bold">
            {farmStats?.totalWeekly?.toLocaleString('pt-BR') || 0}
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-4 hover:border-[#00ff9d] hover:shadow-[0_0_15px_rgba(0,255,157,0.2)] transition-all">
          <p className="text-[#99a1af] text-xs mb-1">Média Diária</p>
          <p className="text-[#00ff9d] text-2xl font-bold">
            {farmStats?.avgDaily || 0}
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-4 hover:border-[#a11212] hover:shadow-[0_0_15px_rgba(161,18,18,0.2)] transition-all">
          <p className="text-[#99a1af] text-xs mb-1">Assiduidade</p>
          <p className="text-white text-2xl font-bold">
            {farmStats?.attendanceRate || 0}%
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-4 hover:border-[#a11212] hover:shadow-[0_0_15px_rgba(161,18,18,0.2)] transition-all">
          <p className="text-[#99a1af] text-xs mb-1">Entregas Hoje</p>
          <p className="text-white text-2xl font-bold">
            {farmStats?.deliveriesToday || 0}
          </p>
        </div>
      </div>

      {/* Minha Meta Diária */}
      {farmProgress && (
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-bold">
              Minha Meta Diária
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Progress Circle */}
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="none"
                  stroke="rgba(161,18,18,0.2)"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="none"
                  stroke={myProgressCapped >= 100 ? "#00ff9d" : "#a11212"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(myProgressCapped / 100) * 364} 364`}
                  className="transition-all duration-500"
                />
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-bold ${myProgressCapped >= 100 ? 'text-[#00ff9d]' : 'text-white'}`}>
                  {Math.floor(myProgressCapped)}%
                </span>
                <span className="text-[#99a1af] text-xs">completo</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#99a1af] text-sm">Quantidade Atual:</span>
                  <span className="text-white text-lg font-bold">{farmProgress.currentQuantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#99a1af] text-sm">Meta Diária:</span>
                  <span className="text-white text-lg font-bold">{farmProgress.dailyGoal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#99a1af] text-sm">Recompensa Potencial:</span>
                  <span className="text-[#00ff9d] text-lg font-bold">
                    ${farmProgress.potentialReward.toLocaleString('pt-BR')}
                  </span>
                </div>
                {farmProgress.rewardClaimed && (
                  <div className="flex items-center gap-2 text-[#00ff9d] text-sm">
                    <Check className="w-4 h-4" />
                    <span>Recompensa já coletada hoje</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Calendário de Presença Semanal */}
        <div className="col-span-2 bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-bold">
              Calendário de Presença Semanal
            </h2>
          </div>

          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-9 gap-2 px-4 py-2 bg-[rgba(0,0,0,0.54)] rounded-lg">
              <div className="col-span-2 text-[#99a1af] text-sm font-bold">
                Membro
              </div>
              {weekDays.map((day) => (
                <div key={day} className="text-[#99a1af] text-sm font-bold text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Rows */}
            {weeklyAttendance.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {weeklyAttendance.map((member) => (
                  <div
                    key={member.citizenid}
                    className="grid grid-cols-9 gap-2 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(161,18,18,0.1)] transition-colors rounded-lg items-center"
                  >
                    <div className="col-span-2">
                      <p className="text-white text-sm truncate">{member.name}</p>
                      <p className="text-[#99a1af] text-xs">ID: {member.citizenid}</p>
                    </div>
                    {member.weekly.map((attended, index) => (
                      <div key={index} className="flex justify-center">
                        {attended ? (
                          <div className="w-6 h-6 rounded-full bg-[#00ff9d]/20 flex items-center justify-center hover:scale-110 transition-transform">
                            <Check className="w-4 h-4 text-[#00ff9d]" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-[#a11212]/20 flex items-center justify-center hover:scale-110 transition-transform">
                            <X className="w-4 h-4 text-[#a11212]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-[#99a1af]/30 mx-auto mb-3" />
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

        {/* Últimas Entregas */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-xl border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-bold">
              Últimas Entregas
            </h2>
          </div>

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
            {farmDeliveries.length > 0 ? (
              farmDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="bg-[rgba(0,0,0,0.54)] rounded-lg p-3 hover:bg-[rgba(161,18,18,0.1)] hover:border-[#a11212] border border-transparent transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-bold truncate">
                        {delivery.name}
                      </p>
                      <p className="text-[#99a1af] text-xs">ID: {delivery.citizenid}</p>
                    </div>
                    <div className="text-[#00ff9d] text-base font-bold ml-2">
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
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-[#99a1af]/30 mx-auto mb-3" />
                <p className="text-[#99a1af] text-sm">Nenhuma entrega recente</p>
              </div>
            )}
          </div>
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
