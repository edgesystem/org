import { CheckCircle } from "lucide-react";

interface BanSuccessModalProps {
  memberName: string;
  onClose: () => void;
}

export function BanSuccessModal({ memberName, onClose }: BanSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-[#1a0a0a]/95 to-[#0c0505]/95 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-8 max-w-md w-full mx-4 shadow-2xl animate-in zoom-in duration-300">
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Pulsing background */}
            <div className="absolute inset-0 bg-[#a11212] rounded-full opacity-20 animate-ping" />
            
            {/* Icon container */}
            <div className="relative bg-gradient-to-br from-[#a11212] to-[#8a0f0f] rounded-full p-4 animate-in zoom-in duration-500">
              <CheckCircle className="w-12 h-12 text-white animate-in zoom-in duration-700" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-3 mb-8">
          <h2 className="text-white text-2xl font-['Arimo:Bold',sans-serif]">
            Banido da Organização
          </h2>
          <p className="text-[#99a1af] text-sm">
            O membro <span className="text-white font-['Arimo:Bold',sans-serif]">{memberName}</span> foi removido com sucesso e adicionado à blacklist.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full bg-[#a11212] hover:bg-[#8a0f0f] transition-colors rounded-[10px] px-6 py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
