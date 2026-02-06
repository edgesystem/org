import { CheckCircle2, X } from "lucide-react";

interface SuccessModalProps {
  onClose: () => void;
}

export function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-[#1a0a0a] to-[#0c0505] rounded-[20px] border border-[rgba(161,18,18,0.4)] p-8 max-w-md w-full animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#99a1af] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00ff9d]/20 mb-6">
            <CheckCircle2 className="w-12 h-12 text-[#00ff9d]" />
          </div>

          <h2 className="text-white text-2xl font-['Arimo:Bold',sans-serif] mb-3">
            Meta Entregue!
          </h2>

          <p className="text-[#99a1af] text-base mb-6">
            Sua entrega foi registrada com sucesso. Continue assim!
          </p>

          <div className="bg-[rgba(0,255,157,0.1)] border border-[rgba(0,255,157,0.2)] rounded-lg p-4 mb-6">
            <p className="text-[#99a1af] text-sm mb-1">Você ganhou</p>
            <p className="text-[#00ff9d] text-3xl font-['Arimo:Bold',sans-serif]">
              +$2,000.00
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#a11212] hover:bg-[#8a0f0f] transition-colors rounded-[10px] py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
