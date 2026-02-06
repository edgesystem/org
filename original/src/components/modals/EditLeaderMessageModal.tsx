import { useState } from "react";
import { X } from "lucide-react";

interface EditLeaderMessageModalProps {
  currentMessage: string;
  onClose: () => void;
  onConfirm: (message: string) => void;
}

export function EditLeaderMessageModal({ currentMessage, onClose, onConfirm }: EditLeaderMessageModalProps) {
  const [message, setMessage] = useState(currentMessage);
  const maxChars = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(message);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-gradient-to-b from-[#1a0a0a] to-[#0c0505] rounded-[14px] border border-[rgba(161,18,18,0.4)] w-full max-w-[500px] mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(161,18,18,0.3)]">
          <h2 className="text-white text-xl font-['Arimo:Bold',sans-serif]">
            Editar Mensagem do Líder
          </h2>
          <button
            onClick={onClose}
            className="text-[#99a1af] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[#99a1af] text-sm mb-2">
                Mensagem
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
                className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.3)] rounded-lg px-4 py-3 text-white text-sm resize-none focus:outline-none focus:border-[rgba(161,18,18,0.6)] transition-colors"
                rows={8}
                placeholder="Digite a mensagem para os membros..."
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-[#99a1af] text-xs">
                  Máximo de {maxChars} caracteres
                </span>
                <span className={`text-xs ${message.length >= maxChars ? 'text-[#B31B1B]' : 'text-[#99a1af]'}`}>
                  {message.length}/{maxChars}
                </span>
              </div>
            </div>

            <div className="bg-[rgba(161,18,18,0.1)] border border-[rgba(161,18,18,0.3)] rounded-lg p-3">
              <p className="text-[#99a1af] text-xs">
                💡 <strong className="text-white">Dica:</strong> Use quebras de linha para separar informações importantes como códigos de rádio, uniformes, etc.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[rgba(0,0,0,0.54)] hover:bg-[rgba(0,0,0,0.7)] border border-[rgba(161,18,18,0.3)] transition-colors rounded-[10px] px-6 py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#a11212] hover:bg-[#8a0f0f] transition-colors rounded-[10px] px-6 py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
