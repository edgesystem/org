import { useState, ReactNode } from "react";
import { TrendingUp, Clock, Crown, Radio, MapPin, Settings, Trophy, Pencil } from "lucide-react";

interface DashboardProps {
  onDeliverGoal: () => void;
  onEditGoal: () => void;
  onEditLeaderMessage: () => void;
  maxGoal: number;
  pricePerUnit: number;
  prizes: {
    first: number;
    second: number;
    third: number;
    others: number;
  };
  leaderMessage: string;
  members: any[];
  FarmProgressComponent?: ReactNode;
}

export function Dashboard({ onDeliverGoal, onEditGoal, onEditLeaderMessage, maxGoal, pricePerUnit, prizes, leaderMessage, members, FarmProgressComponent }: DashboardProps) {
  const [goalAmount, setGoalAmount] = useState(0);

  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysUntilEndOfMonth = Math.ceil((lastDayOfMonth.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const leaders = members
    .filter(member => 
      member.rank.toLowerCase().includes("líder") || 
      member.rank.toLowerCase().includes("lider")
    );

  const farmRanking = [...members]
    .sort((a, b) => (b.deliveries || 0) - (a.deliveries || 0))
    .slice(0, 5)
    .map((m, i) => ({
      position: i + 1,
      name: m.name,
      amount: m.deliveries || 0,
      trend: "",
      trendUp: false
    }));

  const timeRanking = [...members]
    .sort((a, b) => (b.playtime || 0) - (a.playtime || 0))
    .slice(0, 5)
    .map((m, i) => ({
      position: i + 1,
      id: m.id,
      name: m.name,
      time: `${Math.floor((m.playtime || 0) / 60)}h ${Math.floor((m.playtime || 0) % 60)}min`
    }));

  const topMonthly = [...members]
    .sort((a, b) => (b.monthlyDeliveries || 0) - (a.monthlyDeliveries || 0))
    .slice(0, 3);

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Column - Rankings */}
      <div className="space-y-6">
        {/* Farm Ranking */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Ranking | Entrega de farm
            </h2>
          </div>
          <div className="space-y-3">
            {farmRanking.map((member) => (
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
                  {member.trend && (
                    <span className="text-[#00ff9d] text-sm flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {member.trend}
                    </span>
                  )}
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
            ))}
          </div>
        </div>

        {/* Time Ranking */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Ranking | Tempo jogado
            </h2>
          </div>
          <div className="space-y-3">
            {timeRanking.map((member) => (
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
                      {member.id} {member.name}
                    </span>
                  </div>
                </div>
                <span className="text-white text-sm">{member.time}</span>
              </div>
            ))}
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
                  strokeDasharray={`${(goalAmount / maxGoal) * 351.86} 351.86`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-3xl font-['Arimo:Bold',sans-serif]">
                  {goalAmount}
                </span>
                <span className="text-[#99a1af] text-sm">/{maxGoal}</span>
              </div>
            </div>
          </div>

          {/* Slider controls */}
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-[#99a1af] text-sm mb-1">Você receberá</p>
              <p className="text-white text-3xl font-['Arimo:Bold',sans-serif]">
                ${((goalAmount * (pricePerUnit / maxGoal)) + (goalAmount === maxGoal ? prizes.others : 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="mt-2 text-xs text-[#99a1af]">
                <p>
                  ({goalAmount} × ${(pricePerUnit / maxGoal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                  {goalAmount === maxGoal && (
                    <span className="text-[#00ff9d]"> + ${prizes.others.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} bônus</span>
                  )}
                </p>
              </div>
              {goalAmount === maxGoal && (
                <p className="text-[#00ff9d] text-xs mt-2">
                  ✓ Meta completa! Bônus de ${prizes.others.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} liberado
                </p>
              )}
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max={maxGoal}
              step="10"
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
              className="w-full h-2 bg-[rgba(161,18,18,0.2)] rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-lg"
            />

            <button
              onClick={onDeliverGoal}
              disabled={goalAmount === 0}
              className="w-full bg-[#a11212] hover:bg-[#8a0f0f] disabled:bg-[#4a0808] disabled:cursor-not-allowed transition-colors rounded-[10px] py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
            >
              Entregar
            </button>

            {/* Info box */}
            <div className="bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] rounded-lg p-3">
              <p className="text-[#D4AF37] text-xs font-['Arimo:Bold',sans-serif] mb-1">
                📋 Configuração Atual
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#99a1af]">Meta:</span>
                  <span className="text-white">{maxGoal} entregas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#99a1af]">Valor total:</span>
                  <span className="text-white">${pricePerUnit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#99a1af]">Valor por entrega:</span>
                  <span className="text-white">${(pricePerUnit / maxGoal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#99a1af]">Bônus (100%):</span>
                  <span className="text-[#00ff9d]">${prizes.others.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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
                Ranking Mensal
              </h2>
            </div>
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-lg">
              <p className="text-[#D4AF37] text-xs font-['Arimo:Bold',sans-serif]">
                {daysUntilEndOfMonth} {daysUntilEndOfMonth === 1 ? 'dia' : 'dias'} restantes
              </p>
            </div>
          </div>
          
          <p className="text-[#99a1af] text-xs mb-4">
            Top 3 que mais farmarem no mês ganham prêmio extra no último dia
          </p>

          <div className="space-y-3 mb-4">
            {topMonthly.map((member, index) => {
              const colors = [
                { bg: 'from-[#FFD700]/10', border: 'border-[#FFD700]', text: 'text-[#FFD700]', medal: '🥇' },
                { bg: 'from-[#C0C0C0]/10', border: 'border-[#C0C0C0]', text: 'text-[#C0C0C0]', medal: '🥈' },
                { bg: 'from-[#CD7F32]/10', border: 'border-[#CD7F32]', text: 'text-[#CD7F32]', medal: '🥉' },
              ];
              const color = colors[index];

              return (
                <div 
                  key={member.id} 
                  className={`flex items-center justify-between p-3 rounded-lg bg-gradient-to-r ${color.bg} to-transparent border-l-2 ${color.border}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{color.medal}</span>
                    <div>
                      <p className={`text-sm font-['Arimo:Bold',sans-serif] ${color.text}`}>
                        {member.name}
                      </p>
                      <p className="text-[#99a1af] text-xs">ID: {member.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-['Arimo:Bold',sans-serif] ${color.text}`}>
                      {member.monthlyFarms.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-[#99a1af] text-xs">farms</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[rgba(161,18,18,0.4)] pt-4">
            <p className="text-[#D4AF37] text-xs font-['Arimo:Bold',sans-serif] mb-2">
              💰 Prêmios a serem pagos:
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-[#FFD700]/10 to-transparent">
                <span className="text-[#FFD700] text-sm">🥇 1° Lugar</span>
                <span className="text-[#FFD700] text-sm font-['Arimo:Bold',sans-serif]">
                  ${prizes.first.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-[#C0C0C0]/10 to-transparent">
                <span className="text-[#C0C0C0] text-sm">🥈 2° Lugar</span>
                <span className="text-[#C0C0C0] text-sm font-['Arimo:Bold',sans-serif]">
                  ${prizes.second.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-[#CD7F32]/10 to-transparent">
                <span className="text-[#CD7F32] text-sm">🥉 3° Lugar</span>
                <span className="text-[#CD7F32] text-sm font-['Arimo:Bold',sans-serif]">
                  ${prizes.third.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Messages and Leaders */}
      <div className="space-y-6">
        {/* Leader Messages */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Mensagens do líder
            </h2>
            <button
              onClick={onEditLeaderMessage}
              className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 transition-colors rounded-lg p-2"
              title="Editar mensagem"
            >
              <Pencil className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
          <div className="space-y-2">
            {leaderMessage.split('\n').map((line, index) => (
              <p key={index} className="text-white text-sm">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Organization Leaders */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif] mb-4">
            Líderes da organização
          </h2>
          <div className="space-y-3">
            {leaders.length > 0 ? (
              leaders.map((leader, index) => (
                <div key={leader.id} className="bg-[rgba(0,0,0,0.54)] rounded-[10px] px-4 py-3 flex items-center gap-3">
                  <Crown className="w-5 h-5 text-[#D4AF37]" />
                  <div className="flex-1">
                    <p className="text-[#D4AF37] text-xs">{leader.rank}</p>
                    <p className="text-white text-base">{leader.id} | {leader.name}</p>
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
                <p className="text-[#99a1af] text-sm">Nenhum líder definido</p>
                <p className="text-[#99a1af] text-xs mt-1">
                  Promova membros para cargos de liderança
                </p>
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