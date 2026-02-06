import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";

interface UnbanModalProps {
  member: any;
  onClose: () => void;
}

export function UnbanModal({ member, onClose }: UnbanModalProps) {
  const [reason, setReason] = useState("");

  const handleUnban = async () => {
    if (!reason.trim() || !member.onConfirm) return;
    try {
      await Promise.resolve(member.onConfirm(member, reason));
      onClose();
    } catch (e) {
      console.error("Erro ao desbanir:", e);
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
          <div className="w-12 h-12 rounded-full bg-[#00ff9d]/20 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-[#00ff9d]" />
          </div>
          <div>
            <h2 className="text-white text-xl font-['Arimo:Bold',sans-serif]">
              Desbanir Membro
            </h2>
            <p className="text-[#99a1af] text-sm">
              Remover da blacklist
            </p>
          </div>
        </div>

        {/* Member info */}
        <div className="bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-white text-base font-['Arimo:Bold',sans-serif] mb-1">
                {member.name}
              </p>
              <p className="text-[#99a1af] text-sm">ID: {member.id}</p>
            </div>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${
                member.severity === "critical"
                  ? "bg-[#a11212]/20 text-[#a11212] border-[#a11212]/40"
                  : member.severity === "high"
                  ? "bg-[#ff6b35]/20 text-[#ff6b35] border-[#ff6b35]/40"
                  : "bg-[#ffb84d]/20 text-[#ffb84d] border-[#ffb84d]/40"
              }`}
            >
              {member.severity === "critical" ? "Crítico" : member.severity === "high" ? "Alto" : "Médio"}
            </span>
          </div>
          
          <div className="space-y-2 pt-3 border-t border-[rgba(255,255,255,0.05)]">
            <div>
              <p className="text-[#99a1af] text-xs">Motivo do banimento</p>
              <p className="text-white text-sm">{member.reason}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[#99a1af] text-xs">Banido por</p>
                <p className="text-white text-sm">{member.bannedBy}</p>
              </div>
              <div>
                <p className="text-[#99a1af] text-xs">Data</p>
                <p className="text-white text-sm">{member.date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reason input */}
        <div className="mb-6">
          <label className="text-white text-sm font-['Arimo:Bold',sans-serif] mb-2 block">
            Justificativa do Desbanimento *
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explique o motivo para remover este membro da blacklist..."
            rows={4}
            className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg px-4 py-3 text-white placeholder:text-[#99a1af] focus:outline-none focus:border-[#00ff9d] resize-none"
          />
          <p className="text-[#99a1af] text-xs mt-1">
            {reason.length}/200 caracteres
          </p>
        </div>

        {/* Info box */}
        <div className="bg-[rgba(0,255,157,0.1)] border border-[rgba(0,255,157,0.2)] rounded-lg p-4 mb-6">
          <p className="text-[#00ff9d] text-sm font-['Arimo:Bold',sans-serif] mb-1">
            ℹ️ Informação
          </p>
          <p className="text-[#99a1af] text-xs">
            Ao desbanir, o membro será removido da blacklist e poderá ser recrutado novamente.
            Esta ação será registrada nos logs de segurança.
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
            onClick={handleUnban}
            disabled={!reason.trim()}
            className="flex-1 bg-[#00ff9d]/20 hover:bg-[#00ff9d]/30 border border-[#00ff9d]/40 text-[#00ff9d] disabled:bg-[#00ff9d]/10 disabled:text-[#00ff9d]/50 disabled:cursor-not-allowed transition-colors rounded-[10px] py-3 text-base font-['Arimo:Regular',sans-serif]"
          >
            Confirmar Desbanimento
          </button>
        </div>
      </div>
    </div>
  );
}
