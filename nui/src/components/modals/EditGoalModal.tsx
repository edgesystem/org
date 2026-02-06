import { useState } from "react";
import { Target, X, Trophy } from "lucide-react";

interface EditGoalModalProps {
  currentGoal: number;
  currentPricePerUnit: number;
  currentPrizes: {
    first: number;
    second: number;
    third: number;
    others: number;
  };
  onClose: () => void;
  onConfirm: (goalAmount: number, pricePerUnit: number, prizes: any) => void;
}

export function EditGoalModal({ currentGoal, currentPricePerUnit, currentPrizes, onClose, onConfirm }: EditGoalModalProps) {
  const [goalAmount, setGoalAmount] = useState(currentGoal.toString());
  const [pricePerDelivery, setPricePerDelivery] = useState(currentPricePerUnit.toString());
  const [firstPrize, setFirstPrize] = useState(currentPrizes.first.toString());
  const [secondPrize, setSecondPrize] = useState(currentPrizes.second.toString());
  const [thirdPrize, setThirdPrize] = useState(currentPrizes.third.toString());
  const [othersPrize, setOthersPrize] = useState(currentPrizes.others.toString());

  const handleConfirm = () => {
    const goal = parseInt(goalAmount);
    const price = parseFloat(pricePerDelivery);
    const prizes = {
      first: parseFloat(firstPrize),
      second: parseFloat(secondPrize),
      third: parseFloat(thirdPrize),
      others: parseFloat(othersPrize),
    };

    if (goal > 0 && price > 0 && prizes.first > 0 && prizes.second > 0 && prizes.third > 0 && prizes.others >= 0) {
      onConfirm(goal, price, prizes);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-[#1a0a0a] to-[#0c0505] rounded-[20px] border border-[rgba(161,18,18,0.4)] p-8 max-w-2xl w-full animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#99a1af] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
            <Target className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-white text-xl font-['Arimo:Bold',sans-serif]">
              Configurar Meta Diária
            </h2>
            <p className="text-[#99a1af] text-sm">
              Defina a quantidade de entregas e os prêmios
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Goal Amount */}
          <div>
            <label className="text-white text-sm font-['Arimo:Bold',sans-serif] mb-2 block">
              Meta de Entregas
            </label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              min="1"
              step="1"
              className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg px-4 py-3 text-white text-lg placeholder:text-[#99a1af] focus:outline-none focus:border-[#D4AF37]"
              placeholder="Ex: 2000"
            />
            <p className="text-[#99a1af] text-xs mt-1">
              Quantidade total que precisa farmar
            </p>
          </div>

          {/* Total Prize Pool */}
          <div>
            <label className="text-white text-sm font-['Arimo:Bold',sans-serif] mb-2 block">
              Valor Total da Meta
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#99a1af] text-lg">$</span>
              <input
                type="number"
                value={pricePerDelivery}
                onChange={(e) => setPricePerDelivery(e.target.value)}
                min="0"
                step="1000"
                className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg pl-8 pr-4 py-3 text-white text-lg placeholder:text-[#99a1af] focus:outline-none focus:border-[#D4AF37]"
                placeholder="Ex: 200000"
              />
            </div>
            <p className="text-[#99a1af] text-xs mt-1">
              Valor que será dividido proporcionalmente
            </p>
            {goalAmount && pricePerDelivery && parseFloat(goalAmount) > 0 && (
              <p className="text-[#D4AF37] text-xs mt-2">
                💡 Cada entrega vale: ${(parseFloat(pricePerDelivery) / parseFloat(goalAmount)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            )}
          </div>

          {/* Prize Configuration */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-white text-base font-['Arimo:Bold',sans-serif]">
                Sistema de Prêmios
              </h3>
            </div>

            {/* Daily Completion Bonus */}
            <div className="mb-6">
              <p className="text-[#00ff9d] text-sm font-['Arimo:Bold',sans-serif] mb-2">
                🎯 Prêmio Diário (Completar Meta)
              </p>
              <div className="bg-gradient-to-br from-[#00ff9d]/10 to-transparent border border-[#00ff9d]/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#00ff9d]/20 flex items-center justify-center">
                    <span className="text-[#00ff9d] text-sm font-['Arimo:Bold',sans-serif]">✓</span>
                  </div>
                  <label className="text-[#00ff9d] text-sm font-['Arimo:Bold',sans-serif]">
                    Bônus por Completar 100%
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#99a1af]">$</span>
                  <input
                    type="number"
                    value={othersPrize}
                    onChange={(e) => setOthersPrize(e.target.value)}
                    min="0"
                    step="100"
                    className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(0,255,157,0.3)] rounded-lg pl-7 pr-4 py-2 text-white focus:outline-none focus:border-[#00ff9d]"
                  />
                </div>
                <p className="text-[#99a1af] text-xs mt-2">
                  Bônus adicional pago DIARIAMENTE ao completar 100% da meta
                </p>
              </div>
            </div>

            {/* Monthly Ranking Prizes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#D4AF37] text-sm font-['Arimo:Bold',sans-serif]">
                  🏆 Prêmios do Ranking Mensal
                </p>
                <span className="text-[#99a1af] text-xs bg-[rgba(212,175,55,0.1)] px-2 py-1 rounded">
                  Pago automaticamente no fim do mês
                </span>
              </div>
              <p className="text-[#99a1af] text-xs mb-3">
                Os 3 membros que mais farmarem durante o mês inteiro recebem premiação extra
              </p>

              <div className="grid grid-cols-3 gap-3">
                {/* First Place */}
                <div className="bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/30 rounded-lg p-3 transition-all duration-300 hover:scale-105 hover:border-[#FFD700]/60 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                      <span className="text-[#FFD700] text-xs font-['Arimo:Bold',sans-serif]">1°</span>
                    </div>
                    <label className="text-[#FFD700] text-xs font-['Arimo:Bold',sans-serif]">
                      1° Lugar
                    </label>
                  </div>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#99a1af] text-xs">$</span>
                    <input
                      type="number"
                      value={firstPrize}
                      onChange={(e) => setFirstPrize(e.target.value)}
                      min="0"
                      step="1000"
                      className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(255,215,0,0.3)] rounded-lg pl-6 pr-2 py-2 text-white text-sm focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>
                </div>

                {/* Second Place */}
                <div className="bg-gradient-to-br from-[#00B8FF]/10 to-transparent border border-[#00B8FF]/30 rounded-lg p-3 transition-all duration-300 hover:scale-105 hover:border-[#00B8FF]/60 hover:shadow-[0_0_20px_rgba(0,184,255,0.3)] cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[#00B8FF]/20 flex items-center justify-center">
                      <span className="text-[#00B8FF] text-xs font-['Arimo:Bold',sans-serif]">2°</span>
                    </div>
                    <label className="text-[#00B8FF] text-xs font-['Arimo:Bold',sans-serif]">
                      2° Lugar
                    </label>
                  </div>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#99a1af] text-xs">$</span>
                    <input
                      type="number"
                      value={secondPrize}
                      onChange={(e) => setSecondPrize(e.target.value)}
                      min="0"
                      step="1000"
                      className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(0,184,255,0.3)] rounded-lg pl-6 pr-2 py-2 text-white text-sm focus:outline-none focus:border-[#00B8FF]"
                    />
                  </div>
                </div>

                {/* Third Place */}
                <div className="bg-gradient-to-br from-[#CD7F32]/10 to-transparent border border-[#CD7F32]/30 rounded-lg p-3 transition-all duration-300 hover:scale-105 hover:border-[#CD7F32]/60 hover:shadow-[0_0_20px_rgba(205,127,50,0.3)] cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[#CD7F32]/20 flex items-center justify-center">
                      <span className="text-[#CD7F32] text-xs font-['Arimo:Bold',sans-serif]">3°</span>
                    </div>
                    <label className="text-[#CD7F32] text-xs font-['Arimo:Bold',sans-serif]">
                      3° Lugar
                    </label>
                  </div>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#99a1af] text-xs">$</span>
                    <input
                      type="number"
                      value={thirdPrize}
                      onChange={(e) => setThirdPrize(e.target.value)}
                      min="0"
                      step="1000"
                      className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(205,127,50,0.3)] rounded-lg pl-6 pr-2 py-2 text-white text-sm focus:outline-none focus:border-[#CD7F32]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] rounded-lg p-4">
            <p className="text-[#D4AF37] text-sm font-['Arimo:Bold',sans-serif] mb-3">
              📊 Resumo da Configuração
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[#99a1af]">Meta diária:</p>
                <p className="text-white font-['Arimo:Bold',sans-serif]">{goalAmount} entregas</p>
              </div>
              <div>
                <p className="text-[#99a1af]">Bônus por completar:</p>
                <p className="text-[#00ff9d] font-['Arimo:Bold',sans-serif]">
                  ${parseFloat(othersPrize || "0").toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-[#99a1af]">1° Lugar (mensal):</p>
                <p className="text-[#FFD700] font-['Arimo:Bold',sans-serif]">
                  ${parseFloat(firstPrize || "0").toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-[#99a1af]">2° Lugar (mensal):</p>
                <p className="text-[#00B8FF] font-['Arimo:Bold',sans-serif]">
                  ${parseFloat(secondPrize || "0").toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-[#99a1af]">3° Lugar (mensal):</p>
                <p className="text-[#CD7F32] font-['Arimo:Bold',sans-serif]">
                  ${parseFloat(thirdPrize || "0").toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            
            {/* Example Calculation */}
            <div className="mt-4 pt-4 border-t border-[rgba(212,175,55,0.3)]">
              <p className="text-[#D4AF37] text-xs font-['Arimo:Bold',sans-serif] mb-2">
                💡 Como Funciona (Sistema de Divisão)
              </p>
              <div className="space-y-2 text-xs">
                {goalAmount && pricePerDelivery && parseFloat(goalAmount) > 0 && parseFloat(pricePerDelivery) > 0 && (
                  <>
                    <div className="space-y-1">
                      <p className="text-[#99a1af]">Valor por entrega: ${pricePerDelivery} ÷ {goalAmount} = ${(parseFloat(pricePerDelivery) / parseFloat(goalAmount)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[#99a1af]">Exemplo: Farmou {Math.floor(parseFloat(goalAmount) * 0.75)} entregas (75%):</p>
                      <p className="text-white font-['Arimo:Bold',sans-serif] pl-4">
                        Recebe: ${(Math.floor(parseFloat(goalAmount) * 0.75) * (parseFloat(pricePerDelivery) / parseFloat(goalAmount))).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-[#99a1af] text-xs pl-4">
                        ({Math.floor(parseFloat(goalAmount) * 0.75)} × ${(parseFloat(pricePerDelivery) / parseFloat(goalAmount)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[#99a1af]">✓ Completou {goalAmount} entregas (100%):</p>
                      <p className="text-[#00ff9d] font-['Arimo:Bold',sans-serif] pl-4">
                        Recebe: ${(parseFloat(pricePerDelivery) + parseFloat(othersPrize || "0")).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-[#99a1af] text-xs pl-4">
                        (${parseFloat(pricePerDelivery).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} valor total) + ${parseFloat(othersPrize || "0").toLocaleString('pt-BR', { minimumFractionDigits: 2 })} bônus
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-[rgba(0,0,0,0.54)] hover:bg-[rgba(0,0,0,0.7)] border border-[rgba(161,18,18,0.4)] transition-colors rounded-[10px] py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 text-[#D4AF37] transition-colors rounded-[10px] py-3 text-base font-['Arimo:Regular',sans-serif]"
          >
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
}