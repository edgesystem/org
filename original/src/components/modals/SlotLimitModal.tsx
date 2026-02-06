import { X, AlertTriangle } from "lucide-react";

interface SlotLimitModalProps {
  onClose: () => void;
  rank: string;
  currentCount: number;
  limit: number;
}

export function SlotLimitModal({ onClose, rank, currentCount, limit }: SlotLimitModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-[#1a0a0a] to-[#0c0505] rounded-[20px] border border-[rgba(161,18,18,0.4)] p-8 max-w-md w-full animate-in fade-in zoom-in duration-200 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#99a1af] hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#B31B1B]/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#B31B1B]" />
          </div>
          <div>
            <h2 className="text-white text-xl font-['Arimo:Bold',sans-serif]">
              Limite de Vagas Excedido
            </h2>
            <p className="text-[#99a1af] text-sm">
              Este cargo atingiu a capacidade máxima
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6 space-y-4">
          {/* Info box */}
          <div className="bg-[rgba(179,27,27,0.1)] border border-[rgba(179,27,27,0.3)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#99a1af] text-sm">Cargo:</span>
              <span className="text-white text-base font-['Arimo:Bold',sans-serif]">
                {rank}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#99a1af] text-sm">Vagas ocupadas:</span>
              <span className="text-[#B31B1B] text-base font-['Arimo:Bold',sans-serif]">
                {currentCount} / {limit}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[rgba(161,18,18,0.3)]">
              <p className="text-[#ff6b6b] text-xs">
                ⚠️ O limite máximo de {limit} {limit === 1 ? 'vaga' : 'vagas'} para este cargo foi atingido.
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(161,18,18,0.2)] rounded-lg p-4">
            <p className="text-[#99a1af] text-xs mb-3 font-['Arimo:Bold',sans-serif]">
              📋 Sugestões:
            </p>
            <ul className="space-y-2 text-xs text-[#99a1af]">
              <li className="flex items-start gap-2">
                <span className="text-[#B31B1B] mt-0.5">•</span>
                <span>Promova um membro deste cargo para liberar uma vaga</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B31B1B] mt-0.5">•</span>
                <span>Escolha outro cargo disponível para o membro</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B31B1B] mt-0.5">•</span>
                <span>Verifique os limites de vagas na hierarquia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={onClose}
          className="w-full bg-[#a11212] hover:bg-[#8a0f0f] transition-colors rounded-[10px] py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
        >
          Entendi
        </button>

        {/* Footer info */}
        <div className="mt-4 p-3 bg-[rgba(161,18,18,0.1)] border border-[rgba(161,18,18,0.3)] rounded-lg">
          <p className="text-[#99a1af] text-xs text-center">
            ℹ️ Capacidade total da organização: 149 membros
          </p>
        </div>
      </div>
    </div>
  );
}