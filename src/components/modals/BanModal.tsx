import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface BanModalProps {
  member: any;
  onClose: () => void;
  onConfirm: (memberId: string, reason: string, severity: "critical" | "high" | "medium") => void;
}

export function BanModal({ member, onClose, onConfirm }: BanModalProps) {
  const [reason, setReason] = useState("");
  const [severity, setSeverity] = useState<"critical" | "high" | "medium">("medium");

  const handleBan = () => {
    if (reason.trim()) {
      onConfirm(member.id, reason, severity);
      onClose();
    }
  };

  if (!member) return null;

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

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#a11212]/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#a11212]" />
          </div>
          <div>
            <h2 className="text-white text-xl font-['Arimo:Bold',sans-serif]">
              Banir Membro
            </h2>
            <p className="text-[#99a1af] text-sm">
              Ação irreversível
            </p>
          </div>
        </div>

        {/* Member info */}
        <div className="bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg p-4 mb-6">
          <p className="text-white text-base font-['Arimo:Bold',sans-serif] mb-1">
            {member.name}
          </p>
          <p className="text-[#99a1af] text-sm">ID: {member.id}</p>
          <p className="text-[#99a1af] text-sm">Cargo: {member.rank}</p>
        </div>

        {/* Severity selection */}
        <div className="mb-4">
          <label className="text-white text-sm font-['Arimo:Bold',sans-serif] mb-2 block">
            Gravidade
          </label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as "critical" | "high" | "medium")}
            className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#a11212]"
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
            <option value="critical">Crítica</option>
          </select>
        </div>

        {/* Reason input */}
        <div className="mb-6">
          <label className="text-white text-sm font-['Arimo:Bold',sans-serif] mb-2 block">
            Motivo do Banimento
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Descreva o motivo do banimento..."
            rows={4}
            className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg px-4 py-3 text-white placeholder:text-[#99a1af] focus:outline-none focus:border-[#a11212] resize-none"
          />
          <p className="text-[#99a1af] text-xs mt-1">
            {reason.length}/200 caracteres
          </p>
        </div>

        {/* Warning */}
        <div className="bg-[rgba(161,18,18,0.1)] border border-[rgba(161,18,18,0.3)] rounded-lg p-4 mb-6">
          <p className="text-[#a11212] text-sm font-['Arimo:Bold',sans-serif] mb-1">
            ⚠️ Atenção
          </p>
          <p className="text-[#99a1af] text-xs">
            O membro será adicionado à blacklist e não poderá ser recrutado novamente.
            Esta ação não pode ser desfeita.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-[rgba(0,0,0,0.54)] hover:bg-[rgba(0,0,0,0.7)] border border-[rgba(161,18,18,0.4)] transition-colors rounded-[10px] py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
          >
            Cancelar
          </button>
          <button
            onClick={handleBan}
            disabled={!reason.trim()}
            className="flex-1 bg-[#a11212] hover:bg-[#8a0f0f] disabled:bg-[#4a0808] disabled:cursor-not-allowed transition-colors rounded-[10px] py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
          >
            Confirmar Banimento
          </button>
        </div>
      </div>
    </div>
  );
}