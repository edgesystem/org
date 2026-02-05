import React from "react";
import { Button } from "./ui/button";

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
  
  // Progresso total da meta
  const totalProgress = Math.min(currentQuantity / Math.max(dailyGoal, 1), 1);
  const totalOffset = circumference - totalProgress * circumference;

  // Cor dinâmica baseada no progresso
  const getProgressColor = () => {
    if (totalProgress < 0.3) return "#22c55e"; // Verde
    if (totalProgress < 0.6) return "#eab308"; // Amarelo
    if (totalProgress < 0.9) return "#f97316"; // Laranja
    return "#ef4444"; // Vermelho
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-900/50 rounded-xl border border-white/10">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          {/* Arco Externo (Meta Total) */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-zinc-800"
          />
          {/* Arco Interno (Progresso Atual) */}
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
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white rotate-0">
          <span className="text-2xl font-bold">{currentQuantity}</span>
          <span className="text-xs text-zinc-400 uppercase tracking-widest border-t border-white/10 mt-1 pt-1">
            Meta: {dailyGoal}
          </span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-zinc-400 text-sm mb-1">Se completar agora:</p>
        <p className="text-white text-xl font-bold">R$ {potentialReward.toLocaleString('pt-BR')},00</p>
        
        <Button
          onClick={onClaim}
          disabled={rewardClaimed || currentQuantity < dailyGoal}
          className={`mt-4 w-full h-12 uppercase font-bold tracking-widest transition-all ${
            rewardClaimed 
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
              : "bg-green-600 hover:bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          }`}
        >
          {rewardClaimed ? "Coletado" : "Coletar Recompensa"}
        </Button>
      </div>
    </div>
  );
};
