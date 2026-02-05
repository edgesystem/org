import React from "react";

interface Props {
  dailyGoal: number;
  currentQuantity: number;
  potentialReward: number;
  rewardClaimed: boolean;
  onClaim: () => void;
}

export const FarmProgressArc: React.FC<Props> = ({
  dailyGoal,
  currentQuantity,
  potentialReward,
  rewardClaimed,
  onClaim,
}) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const progress = dailyGoal > 0 ? Math.min(currentQuantity / dailyGoal, 1) : 0;
  const dash = `${progress * circumference} ${circumference}`;

  let color = "#00ff9d";
  if (progress < 0.33) color = "#a11212";
  else if (progress < 0.66) color = "#ffb84d";

  return (
    <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6 space-y-4">
      <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif] mb-2">
        Meta diária de farm
      </h2>

      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="rgba(161,18,18,0.2)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={dash}
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-3xl font-['Arimo:Bold',sans-serif]">
              {currentQuantity}
            </span>
            <span className="text-[#99a1af] text-sm">/ {dailyGoal}</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-[#99a1af] text-sm">
            Progresso atual:{" "}
            <span className="text-white font-['Arimo:Bold',sans-serif]">
              {currentQuantity} unidades
            </span>
          </p>
          <p className="text-[#99a1af] text-sm">
            Se completar agora, você receberá:{" "}
            <span className="text-[#00ff9d] font-['Arimo:Bold',sans-serif]">
              R$ {potentialReward.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </p>

          {!rewardClaimed && currentQuantity >= dailyGoal && (
            <button
              onClick={onClaim}
              className="mt-2 bg-[#00ff9d]/20 hover:bg-[#00ff9d]/30 border border-[#00ff9d]/40 transition-colors rounded-lg px-4 py-2 text-[#00ff9d] text-sm font-['Arimo:Bold',sans-serif]"
            >
              Coletar recompensa
            </button>
          )}

          {rewardClaimed && (
            <p className="text-[#00ff9d] text-xs mt-1">
              Recompensa de hoje já coletada.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

