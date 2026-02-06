import { useState } from "react";
import { Target, X } from "lucide-react";

// Helper function to safely format numbers
function safeFormatNumber(value: any, decimals: number = 0): string {
  if (value == null || isNaN(Number(value))) return decimals > 0 ? "0,00" : "0";
  try {
    return Number(value).toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  } catch {
    return decimals > 0 ? "0,00" : "0";
  }
}

interface EditGoalModalProps {
  currentGoal: number;
  currentPricePerUnit: number;
  onClose: () => void;
  onConfirm: (goalAmount: number, pricePerUnit: number) => void;
}

export function EditGoalModal({ currentGoal, currentPricePerUnit, onClose, onConfirm }: EditGoalModalProps) {
  const [goalAmount, setGoalAmount] = useState(currentGoal.toString());
  const [pricePerDelivery, setPricePerDelivery] = useState(currentPricePerUnit.toString());

  const handleConfirm = () => {
    const goal = parseInt(goalAmount);
    const price = parseFloat(pricePerDelivery);

    if (goal > 0 && price > 0) {
      onConfirm(goal, price);
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
              Defina a quantidade de entregas e o valor total
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
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#99a1af] text-lg">R$</span>
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
              Valor que será dividido proporcionalmente entre os membros
            </p>
            {goalAmount && pricePerDelivery && parseFloat(goalAmount) > 0 && (
              <p className="text-[#D4AF37] text-xs mt-2">
                💡 Cada entrega vale: R$ {safeFormatNumber(parseFloat(pricePerDelivery) / parseFloat(goalAmount), 2)}
              </p>
            )}
          </div>

          {/* Resumo premium */}
          <div className="bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] rounded-lg p-4">
            <p className="text-[#D4AF37] text-sm font-['Arimo:Bold',sans-serif] mb-3">
              📊 Resumo da Configuração
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[#99a1af]">Meta diária:</p>
                <p className="text-white font-['Arimo:Bold',sans-serif]">{goalAmount || 0} entregas</p>
              </div>
              <div>
                <p className="text-[#99a1af]">Valor total:</p>
                <p className="text-white font-['Arimo:Bold',sans-serif]">R$ {safeFormatNumber(parseFloat(pricePerDelivery) || 0, 2)}</p>
              </div>
              <div>
                <p className="text-[#99a1af]">Por entrega:</p>
                <p className="text-[#00ff9d] font-['Arimo:Bold',sans-serif]">
                  R$ {goalAmount && parseFloat(goalAmount) > 0 ? safeFormatNumber(parseFloat(pricePerDelivery) / parseFloat(goalAmount), 2) : "0,00"}
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[rgba(212,175,55,0.2)]">
              <p className="text-[#99a1af] text-xs">
                O valor é pago proporcionalmente às entregas. Quem completar 100% da meta recebe o valor total.
              </p>
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
