import { useEffect, useState, ReactNode } from "react";
import { TrendingUp, Clock, Crown, Radio, MapPin, Settings, Trophy, Pencil } from "lucide-react";

interface DashboardProps {
  onDeliverGoal: () => void;
  onEditGoal: () => void;
  onEditLeaderMessage: () => void;
  maxGoal: number;
  pricePerUnit: number;
  leaderMessage: string;
  members: any[];
  farmProgress: any;
  FarmProgressComponent?: ReactNode;
}

export function Dashboard({ onDeliverGoal, onEditGoal, onEditLeaderMessage, maxGoal, pricePerUnit, leaderMessage, members, farmProgress, FarmProgressComponent }: DashboardProps) {
  const [goalAmount, setGoalAmount] = useState(0);

  // Sincronizar goalAmount com farmProgress.realProgress se disponível
  useEffect(() => {
    if (farmProgress && typeof farmProgress.realProgress === 'number') {
      setGoalAmount(farmProgress.realProgress);
    }
  }, [farmProgress]);

  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysUntilEndOfMonth = Math.ceil((lastDayOfMonth.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Dados reais dos rankings
  const leaders = members
    .filter(member => 
      member.rank && 
      (member.rank.toLowerCase().includes("líder") || 
       member.rank.toLowerCase().includes("lider"))
    );

  const farmRanking = [...members]
    .sort((a, b) => (b.dailyTotal || 0) - (a.dailyTotal || 0))
    .slice(0, 5)
    .map((m, i) => ({
      position: i + 1,
      name: m.name || "Desconhecido",
      amount: m.dailyTotal || 0,
    }));

  const timeRanking = [...members]
    .sort((a, b) => (b.playtime || 0) - (a.playtime || 0))
    .slice(0, 5)
    .map((m, i) => ({
      position: i + 1,
      id: m.id || m.citizenid || "N/A",
      name: m.name || "Desconhecido",
      time: `${Math.floor((m.playtime || 0) / 60)}h ${Math.floor((m.playtime || 0) % 60)}min`
    }));

  const topMonthly = [...members]
    .sort((a, b) => (b.weeklyTotal || 0) - (a.weeklyTotal || 0))
    .slice(0, 3);

  // Calcular reward real baseado no progresso atual
  const currentReward = maxGoal > 0 
    ? (goalAmount / maxGoal) * pricePerUnit 
    : 0;

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Column - Rankings */}
      <div className="space-y-6">
        {/* Farm Ranking */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Ranking | Entregas Hoje
            </h2>
          </div>
          <div className="space-y-3">
            {farmRanking.length > 0 ? (
              farmRanking.map((member) => (
                <div
                  key={member.position}
                  className="bg-[rgba(0,0,0,0.54)] rounded-[10px] px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#d4af37] text-base font-['Arimo:Bold',sans-serif] w-6">
                      {member.position}°
                    </span>
                    <span className="text-white text-base font-['Arimo:Regular',sans-serif]">
                      {member.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-base font-['Arimo:Bold',sans-serif]">
                      {member.amount}
                    </span>
                    <div className="text-[#99A1AF]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                        <path d="M8 2L10 6L14 6.66667L11 9.66667L11.6667 14L8 12L4.33333 14L5 9.66667L2 6.66667L6 6L8 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-[#99a1af] text-sm">Nenhuma entrega registrada hoje</p>
              </div>
            )}
          </div>
        </div>

        {/* Time Ranking */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Ranking | Tempo Jogado
            </h2>
          </div>
          <div className="space-y-3">
            {timeRanking.length > 0 ? (
              timeRanking.map((member) => (
                <div
                  key={member.position}
                  className="bg-[rgba(0,0,0,0.54)] rounded-[10px] px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#d4af37] text-base font-['Arimo:Bold',sans-serif] w-6">
                      {member.position}°
                    </span>
                    <div>
                      <span className="text-white text-base font-['Arimo:Regular',sans-serif]">
                        {member.name}
                      </span>
                    </div>
                  </div>
                  <span className="text-white text-sm">{member.time}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-[#99a1af] text-sm">Nenhum dado de tempo disponível</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Middle Column - Daily Goal */}
      <div className="space-y-6">
        {FarmProgressComponent}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              META DIÁRIA
            </h2>
            <button
              onClick={onEditGoal}
              className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 transition-colors rounded-lg p-2"
              title="Configurar meta"
            >
              <Settings className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Circular progress */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(161,18,18,0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#B31B1B"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${Math.min((goalAmount / Math.max(maxGoal, 1)) * 351.86, 351.86)} 351.86`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-3xl font-['Arimo:Bold',sans-serif]">
                  {goalAmount.toLocaleString('pt-BR')}
                </span>
                <span className="text-[#99a1af] text-sm">/{maxGoal.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>

          {/* Info display */}
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-[#99a1af] text-sm mb-1">Você receberá</p>
              <p className="text-white text-3xl font-['Arimo:Bold',sans-serif]">
                R$ {currentReward.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="mt-2 text-xs text-[#99a1af]">
                <p>
                  ({goalAmount.toLocaleString('pt-BR')} × R$ {(pricePerUnit / Math.max(maxGoal, 1)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                </p>
              </div>
            </div>

            {/* Info box */}
            <div className="bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] rounded-lg p-3">
              <p className="text-[#D4AF37] text-xs font-['Arimo:Bold',sans-serif] mb-1">
                📋 Configuração Atual
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#99a1af]">Meta:</span>
                  <span className="text-white">{maxGoal.toLocaleString('pt-BR')} entregas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#99a1af]">Valor total:</span>
                  <span className="text-white">R$ {pricePerUnit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#99a1af]">Por entrega:</span>
                  <span className="text-white">R$ {(pricePerUnit / Math.max(maxGoal, 1)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance section */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
                Ranking Semanal
              </h2>
            </div>
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-lg">
              <p className="text-[#D4AF37] text-xs font-['Arimo:Bold',sans-serif]">
                {daysUntilEndOfMonth} {daysUntilEndOfMonth === 1 ? 'dia' : 'dias'} restantes
              </p>
            </div>
          </div>
          
          <p className="text-[#99a1af] text-xs mb-4">
            Top 3 que mais farmaram na semana
          </p>

          <div className="space-y-3 mb-4">
            {topMonthly.length > 0 ? (
              topMonthly.map((member, index) => {
                const colors = [
                  { bg: 'from-[#FFD700]/10', border: 'border-[#FFD700]', text: 'text-[#FFD700]', medal: '🥇' },
                  { bg: 'from-[#C0C0C0]/10', border: 'border-[#C0C0C0]', text: 'text-[#C0C0C0]', medal: '🥈' },
                  { bg: 'from-[#CD7F32]/10', border: 'border-[#CD7F32]', text: 'text-[#CD7F32]', medal: '🥉' },
                ];
                const color = colors[index] || colors[2];

                return (
                  <div 
                    key={member.id || index}
                    className={`flex items-center justify-between p-3 rounded-lg bg-gradient-to-r ${color.bg} to-transparent border-l-2 ${color.border}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{color.medal}</span>
                      <div>
                        <p className={`text-sm font-['Arimo:Bold',sans-serif] ${color.text}`}>
                          {member.name || "Desconhecido"}
                        </p>
                        <p className="text-[#99a1af] text-xs">ID: {member.id || member.citizenid || "N/A"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-['Arimo:Bold',sans-serif] ${color.text}`}>
                        {(member.weeklyTotal || 0).toLocaleString('pt-BR')}
                      </p>
                      <p className="text-[#99a1af] text-xs">entregas</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6">
                <p className="text-[#99a1af] text-sm">Nenhuma entrega registrada esta semana</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Messages and Leaders */}
      <div className="space-y-6">
        {/* Leader Messages */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Mensagens do Líder
            </h2>
          </div>
          <div className="space-y-2">
            {leaderMessage ? (
              leaderMessage.split('\n').map((line, index) => (
                <p key={index} className="text-white text-sm">
                  {line}
                </p>
              ))
            ) : (
              <p className="text-[#99a1af] text-sm">Nenhuma mensagem definida</p>
            )}
          </div>
        </div>

        {/* Organization Leaders */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif] mb-4">
            Líderes da Organização
          </h2>
          <div className="space-y-3">
            {leaders.length > 0 ? (
              leaders.map((leader, index) => (
                <div key={leader.id || index} className="bg-[rgba(0,0,0,0.54)] rounded-[10px] px-4 py-3 flex items-center gap-3">
                  <Crown className="w-5 h-5 text-[#D4AF37]" />
                  <div className="flex-1">
                    <p className="text-[#D4AF37] text-xs">{leader.rank}</p>
                    <p className="text-white text-base">{leader.name || "Desconhecido"}</p>
                  </div>
                  {leader.online && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#00ff9d]" />
                      <span className="text-[#00ff9d] text-xs">Online</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-[rgba(0,0,0,0.54)] rounded-[10px] px-4 py-6 text-center">
                <p className="text-[#99a1af] text-sm">Nenhum líder encontrado</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6 hover:border-[rgba(161,18,18,0.6)] transition-colors">
            <Radio className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
            <p className="text-white text-sm font-['Arimo:Bold',sans-serif]">Rádio</p>
            <button className="w-full mt-3 bg-[#a11212] hover:bg-[#8a0f0f] transition-colors rounded-lg py-2 text-white text-sm">
              Entrar
            </button>
          </button>

          <button className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6 hover:border-[rgba(161,18,18,0.6)] transition-colors">
            <MapPin className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
            <p className="text-white text-sm font-['Arimo:Bold',sans-serif]">Localização</p>
            <button className="w-full mt-3 bg-[#a11212] hover:bg-[#8a0f0f] transition-colors rounded-lg py-2 text-white text-sm">
              Marcar
            </button>
          </button>
        </div>
      </div>
    </div>
  );
}
