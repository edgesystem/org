import React from "react";

// Helper function to safely format numbers
function safeFormatNumber(value: any, decimals: number = 0): string {
  if (value == null || isNaN(Number(value))) return decimals > 0 ? "0,00" : "0";
  try {
    return Number(value).toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  } catch {
    return decimals > 0 ? "0,00" : "0";
  }
}

interface FarmProgressArcProps {
  dailyGoal: number;
  currentQuantity: number;
  potentialReward: number;
  rewardClaimed: boolean;
  onClaim: () => void;
}

export const FarmProgressArc: React.FC<FarmProgressArcProps> = ({
  dailyGoal,
  currentQuantity,
  potentialReward,
  rewardClaimed,
  onClaim,
}) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const totalProgress = Math.min(currentQuantity / Math.max(dailyGoal, 1), 1);
  const totalOffset = circumference - totalProgress * circumference;

  // Cores no tema do painel (vermelho/dourado)
  const getProgressColor = () => {
    if (totalProgress < 0.3) return "#22c55e";
    if (totalProgress < 0.6) return "#eab308";
    if (totalProgress < 0.9) return "#f97316";
    return "#a11212";
  };

  const canClaim = !rewardClaimed && currentQuantity >= dailyGoal && dailyGoal > 0;

  return (
    <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
      <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif] mb-4">
        Entrega de Farm
      </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="rgba(161,18,18,0.2)"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke={getProgressColor()}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={totalOffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="text-3xl font-['Arimo:Bold',sans-serif]">{currentQuantity}</span>
            <span className="text-xs text-[#99a1af] uppercase tracking-wider border-t border-[rgba(255,255,255,0.1)] mt-1 pt-1">
              Meta: {dailyGoal}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center w-full">
          <p className="text-[#99a1af] text-sm mb-1">Se completar agora:</p>
          <p className="text-white text-2xl font-['Arimo:Bold',sans-serif] text-[#00ff9d]">
            R$ {safeFormatNumber(potentialReward, 2)}
          </p>
          <button
            type="button"
            onClick={onClaim}
            disabled={!canClaim}
            className={`mt-4 w-full h-12 rounded-[10px] text-sm font-['Arimo:Bold',sans-serif] uppercase tracking-wider transition-all ${
              rewardClaimed
                ? "bg-[rgba(0,0,0,0.5)] text-[#99a1af] cursor-not-allowed border border-[rgba(161,18,18,0.2)]"
                : canClaim
                  ? "bg-[#00ff9d]/20 hover:bg-[#00ff9d]/30 border border-[#00ff9d]/40 text-[#00ff9d] shadow-[0_0_20px_rgba(0,255,157,0.2)]"
                  : "bg-[#a11212]/30 border border-[rgba(161,18,18,0.4)] text-[#99a1af] cursor-not-allowed"
            }`}
          >
            {rewardClaimed ? "Coletado" : canClaim ? "Coletar Recompensa" : "Complete a meta para coletar"}
          </button>
        </div>
      </div>
    </div>
  );
};
