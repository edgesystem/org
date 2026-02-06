import { useState } from "react";
import { TrendingUp, Clock, Crown, Radio, MapPin, Settings, Trophy, Pencil } from "lucide-react";
import { fetchNui } from "../utils/fetchNui";
import type { FarmConfig, FarmProgress, Member } from "../types/orgpanel";

interface DashboardProps {
  onDeliverGoal: () => void;
  onEditGoal: () => void;
  onEditLeaderMessage: () => void;
  farmConfig: FarmConfig | null;
  farmProgress: FarmProgress | null;
  leaderMessage: string;
  members: Member[];
}

export function Dashboard({ 
  onDeliverGoal, 
  onEditGoal, 
  onEditLeaderMessage, 
  farmConfig, 
  farmProgress, 
  leaderMessage, 
  members 
}: DashboardProps) {
  const [goalAmount, setGoalAmount] = useState(0);

  // Calcular dias restantes até o fim do mês
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysLeft = lastDay.getDate() - today.getDate();

  // Filtrar líderes (cargos que contêm "líder" no nome)
  const leaders = members
    .filter(member => 
      member.gradeName.toLowerCase().includes("líder")
    )
    .sort((a, b) => a.grade - b.grade) // Ordenar por grade (menor = mais alto)
    .slice(0, 3); // Top 3

  // Rankings
  const topDeliveriesToday = [...members]
    .sort((a, b) => (b.dailyTotal || 0) - (a.dailyTotal || 0))
    .slice(0, 3);

  const topPlaytime = [...members]
    .sort((a, b) => b.playtime - a.playtime)
    .slice(0, 3);

  const topWeekly = [...members]
    .sort((a, b) => (b.weeklyTotal || 0) - (a.weeklyTotal || 0))
    .slice(0, 3);

  // Valores da farm
  const maxGoal = farmConfig?.dailyGoal || 0;
  const currentQuantity = farmProgress?.currentQuantity || 0;
  const potentialReward = farmProgress?.potentialReward || 0;
  const rewardClaimed = farmProgress?.rewardClaimed || false;
  const progressPercent = maxGoal > 0 ? Math.min((currentQuantity / maxGoal) * 100, 100) : 0;

  // Ações rápidas
  const handleRadioClick = () => {
    fetchNui('orgpanel:openRadio').catch(console.error);
  };

  const handleWaypointClick = () => {
    fetchNui('orgpanel:setWaypoint').catch(console.error);
  };

  return (
    <div className="space-y-6">
      {/* Grid principal */}
      <div className="grid grid-cols-3 gap-6">
        {/* Coluna 1: Rankings */}
        <div className="space-y-6">
          {/* Entregas Hoje */}
          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.03)] to-[rgba(0,0,0,0.3)] backdrop-blur-lg rounded-[18px] border border-[rgba(161,18,18,0.2)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#B31B1B]" />
              <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
                Entregas Hoje
              </h2>
            </div>
            <div className="space-y-3">
              {topDeliveriesToday.length > 0 ? (
                topDeliveriesToday.map((member, index) => (
                  <div key={member.citizenid} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-['Arimo:Bold',sans-serif] ${
                      index === 0 ? 'bg-[#D4AF37] text-black' :
                      index === 1 ? 'bg-[#C0C0C0] text-black' :
                      'bg-[#CD7F32] text-black'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-['Arimo:Regular',sans-serif]">{member.name}</p>
                      <p className="text-[#99a1af] text-xs">{member.dailyTotal || 0} entregas</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#99a1af] text-sm text-center py-4">Nenhum dado disponível</p>
              )}
            </div>
          </div>

          {/* Tempo Jogado */}
          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.03)] to-[rgba(0,0,0,0.3)] backdrop-blur-lg rounded-[18px] border border-[rgba(161,18,18,0.2)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#B31B1B]" />
              <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
                Tempo Jogado
              </h2>
            </div>
            <div className="space-y-3">
              {topPlaytime.length > 0 ? (
                topPlaytime.map((member, index) => (
                  <div key={member.citizenid} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-['Arimo:Bold',sans-serif] ${
                      index === 0 ? 'bg-[#D4AF37] text-black' :
                      index === 1 ? 'bg-[#C0C0C0] text-black' :
                      'bg-[#CD7F32] text-black'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-['Arimo:Regular',sans-serif]">{member.name}</p>
                      <p className="text-[#99a1af] text-xs">{Math.floor(member.playtime / 60)}h {member.playtime % 60}min</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#99a1af] text-sm text-center py-4">Nenhum dado disponível</p>
              )}
            </div>
          </div>

          {/* Ranking Semanal */}
          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.03)] to-[rgba(0,0,0,0.3)] backdrop-blur-lg rounded-[18px] border border-[rgba(161,18,18,0.2)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-[#B31B1B]" />
              <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
                Ranking Semanal
              </h2>
            </div>
            <div className="space-y-3">
              {topWeekly.length > 0 ? (
                topWeekly.map((member, index) => (
                  <div key={member.citizenid} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-['Arimo:Bold',sans-serif] ${
                      index === 0 ? 'bg-[#D4AF37] text-black' :
                      index === 1 ? 'bg-[#C0C0C0] text-black' :
                      'bg-[#CD7F32] text-black'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-['Arimo:Regular',sans-serif]">{member.name}</p>
                      <p className="text-[#99a1af] text-xs">{member.weeklyTotal || 0} entregas</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#99a1af] text-sm text-center py-4">Nenhum dado disponível</p>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.1)]">
              <p className="text-[#99a1af] text-xs text-center">
                Restam {daysLeft} dias para o fim do mês
              </p>
            </div>
          </div>
        </div>

        {/* Coluna 2: Meta Diária + Líderes */}
        <div className="space-y-6">
          {/* Meta Diária */}
          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.03)] to-[rgba(0,0,0,0.3)] backdrop-blur-lg rounded-[18px] border border-[rgba(161,18,18,0.2)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
                Meta Diária
              </h2>
              <button
                onClick={onEditGoal}
                className="text-[#B31B1B] hover:text-[#8a0f0f] transition-colors"
                title="Configurar meta"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Progress ring */}
            <div className="relative w-48 h-48 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90">
                {/* Background circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="rgba(161, 18, 18, 0.2)"
                  strokeWidth="12"
                />
                {/* Progress circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="#B31B1B"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - progressPercent / 100)}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-white text-4xl font-['Arimo:Bold',sans-serif]">
                  {currentQuantity}
                </p>
                <p className="text-[#99a1af] text-sm">/ {maxGoal}</p>
                <p className="text-[#B31B1B] text-lg font-['Arimo:Bold',sans-serif] mt-2">
                  {progressPercent.toFixed(0)}%
                </p>
              </div>
            </div>

            {/* Slider controls */}
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-[#99a1af] text-sm mb-1">Recompensa estimada</p>
                <p className="text-white text-3xl font-['Arimo:Bold',sans-serif]">
                  ${potentialReward.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <button
                onClick={onDeliverGoal}
                disabled={rewardClaimed || currentQuantity === 0}
                className="w-full bg-[#a11212] hover:bg-[#8a0f0f] disabled:bg-[#4a0808] disabled:cursor-not-allowed transition-colors rounded-[10px] py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
              >
                {rewardClaimed ? 'Recompensa coletada' : 'Coletar Recompensa'}
              </button>
            </div>
          </div>

          {/* Líderes da Organização */}
          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.03)] to-[rgba(0,0,0,0.3)] backdrop-blur-lg rounded-[18px] border border-[rgba(161,18,18,0.2)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
                Líderes da Organização
              </h2>
            </div>
            <div className="space-y-3">
              {leaders.length > 0 ? (
                leaders.map((leader) => (
                  <div key={leader.citizenid} className="bg-[rgba(0,0,0,0.3)] rounded-lg p-4 border border-[rgba(212,175,55,0.2)]">
                    <div className="flex items-center gap-3 mb-2">
                      <Crown className="w-4 h-4 text-[#D4AF37]" />
                      <p className="text-[#D4AF37] text-sm font-['Arimo:Bold',sans-serif]">{leader.gradeName}</p>
                    </div>
                    <p className="text-white text-base mb-1">{leader.citizenid} | {leader.name}</p>
                    {leader.online && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00ff9d]" />
                        <p className="text-[#00ff9d] text-xs">Online</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#99a1af] text-sm">Nenhum líder definido</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Coluna 3: Mensagem do Líder + Ações Rápidas */}
        <div className="space-y-6">
          {/* Mensagem do Líder */}
          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.03)] to-[rgba(0,0,0,0.3)] backdrop-blur-lg rounded-[18px] border border-[rgba(161,18,18,0.2)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
                Mensagem do Líder
              </h2>
              <button
                onClick={onEditLeaderMessage}
                className="text-[#B31B1B] hover:text-[#8a0f0f] transition-colors"
                title="Editar mensagem"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-[rgba(0,0,0,0.3)] rounded-lg p-4 border border-[rgba(161,18,18,0.2)]">
              <pre className="text-white text-sm font-['Arimo:Regular',sans-serif] whitespace-pre-wrap">
                {leaderMessage}
              </pre>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="bg-gradient-to-b from-[rgba(255,255,255,0.03)] to-[rgba(0,0,0,0.3)] backdrop-blur-lg rounded-[18px] border border-[rgba(161,18,18,0.2)] p-6">
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif] mb-4">
              Ações Rápidas
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleRadioClick}
                className="w-full bg-[rgba(161,18,18,0.2)] hover:bg-[rgba(161,18,18,0.3)] transition-colors border border-[rgba(161,18,18,0.4)] rounded-[10px] px-4 py-3 text-white text-sm font-['Arimo:Regular',sans-serif] flex items-center gap-3"
              >
                <Radio className="w-5 h-5" />
                Entrar no Rádio
              </button>
              <button
                onClick={handleWaypointClick}
                className="w-full bg-[rgba(161,18,18,0.2)] hover:bg-[rgba(161,18,18,0.3)] transition-colors border border-[rgba(161,18,18,0.4)] rounded-[10px] px-4 py-3 text-white text-sm font-['Arimo:Regular',sans-serif] flex items-center gap-3"
              >
                <MapPin className="w-5 h-5" />
                Marcar Localização
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
