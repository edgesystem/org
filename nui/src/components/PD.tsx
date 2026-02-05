import { useState } from "react";
import { Shield, AlertTriangle, UserX, Calendar, RotateCcw } from "lucide-react";

interface PDProps {
  onUnbanMember: (member: any) => void;
  blacklist: any[];
  setBlacklist: (blacklist: any[]) => void;
}

interface SecurityLog {
  type: "blocked" | "warning" | "info" | "unban";
  message: string;
  time: string;
  date: string;
}

export function PD({ onUnbanMember, blacklist, setBlacklist }: PDProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([
    { type: "blocked", message: "Tentativa de recrutamento bloqueada - ID 45678 está na blacklist", time: "14:32", date: "05/02/2026" },
    { type: "warning", message: "Atividade suspeita detectada - múltiplas tentativas de saque", time: "11:20", date: "04/02/2026" },
    { type: "blocked", message: "Tentativa de recrutamento bloqueada - ID 23456 está na blacklist", time: "18:45", date: "03/02/2026" },
    { type: "info", message: "Novo membro adicionado à blacklist - ID 45678", time: "16:30", date: "28/01/2026" },
  ]);

  const filteredBlacklist = blacklist.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.includes(searchTerm)
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-[#a11212]/20 text-[#a11212] border-[#a11212]/40";
      case "high":
        return "bg-[#ff6b35]/20 text-[#ff6b35] border-[#ff6b35]/40";
      case "medium":
        return "bg-[#ffb84d]/20 text-[#ffb84d] border-[#ffb84d]/40";
      default:
        return "bg-[#99a1af]/20 text-[#99a1af] border-[#99a1af]/40";
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "critical":
        return "Crítico";
      case "high":
        return "Alto";
      case "medium":
        return "Médio";
      default:
        return "Baixo";
    }
  };

  const handleUnban = async (member: any, reason: string) => {
    try {
      const resp = await fetchNui("orgpanel:unbanMember", { citizenid: member.id });
      if (resp.success) {
        setBlacklist(blacklist.filter(m => m.id !== member.id));
        const now = new Date();
        setSecurityLogs([{
          type: "unban",
          message: `Membro ${member.name} (ID: ${member.id}) foi removido da blacklist. Motivo: ${reason}`,
          time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          date: now.toLocaleDateString('pt-BR'),
        }, ...securityLogs]);
      }
    } catch (e) {
      console.error("Erro ao desbanir membro:", e);
    }
  };
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-4">
          <p className="text-[#99a1af] text-xs mb-1">Status do Sistema</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff9d]" />
            <p className="text-[#00ff9d] text-base font-['Arimo:Bold',sans-serif]">Ativo</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Blacklist */}
        <div className="col-span-2 bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <UserX className="w-5 h-5 text-[#a11212]" />
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Lista Negra (Blacklist)
            </h2>
          </div>

          <div className="space-y-2">
            {/* Search bar */}
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Buscar na blacklist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg px-4 py-3 text-white placeholder:text-[#99a1af] focus:outline-none focus:border-[#a11212]"
              />
            </div>

            {/* Header */}
            <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-[rgba(0,0,0,0.54)] rounded-lg">
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">ID</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Nome</div>
              <div className="col-span-2 text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Motivo</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif]">Banido por</div>
              <div className="text-[#99a1af] text-sm font-['Arimo:Bold',sans-serif] text-right">Ações</div>
            </div>

            {/* Rows */}
            {filteredBlacklist.length > 0 ? (
              filteredBlacklist.map((entry) => (
                <div
                  key={entry.id}
                  className="grid grid-cols-6 gap-4 px-4 py-3 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-colors rounded-lg items-center"
                >
                  <div className="text-white text-sm font-mono">{entry.id}</div>
                  <div className="text-white text-sm">{entry.name}</div>
                  <div className="col-span-2 text-[#99a1af] text-sm">{entry.reason}</div>
                  <div className="text-white text-sm">{entry.bannedBy}</div>
                  <div className="flex items-center justify-end gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getSeverityColor(
                        entry.severity
                      )}`}
                    >
                      {getSeverityLabel(entry.severity)}
                    </span>
                    <button
                      onClick={() => onUnbanMember({ ...entry, onConfirm: handleUnban })}
                      className="bg-[#00ff9d]/20 hover:bg-[#00ff9d]/30 border border-[#00ff9d]/40 transition-colors rounded-lg p-2"
                      title="Desbanir membro"
                    >
                      <RotateCcw className="w-4 h-4 text-[#00ff9d]" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-[rgba(0,0,0,0.3)] rounded-lg">
                <p className="text-[#99a1af] text-sm">Nenhum membro na blacklist</p>
              </div>
            )}
          </div>

          {/* Security info */}
          <div className="mt-6 p-4 bg-[rgba(161,18,18,0.1)] border border-[rgba(161,18,18,0.3)] rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#a11212] mt-0.5" />
              <div>
                <p className="text-white text-sm font-['Arimo:Bold',sans-serif] mb-1">
                  Sistema de Segurança Ativado
                </p>
                <p className="text-[#99a1af] text-xs">
                  Todos os jogadores na blacklist são automaticamente bloqueados de qualquer
                  tentativa de recrutamento. O sistema verifica o ID em tempo real.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Logs */}
        <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif]">
              Logs de Segurança
            </h2>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {securityLogs.map((log, index) => (
              <div
                key={index}
                className="bg-[rgba(0,0,0,0.54)] rounded-lg p-3 hover:bg-[rgba(0,0,0,0.7)] transition-colors"
              >
                <div className="flex items-start gap-2 mb-2">
                  {log.type === "blocked" && (
                    <div className="w-2 h-2 rounded-full bg-[#a11212] mt-1.5" />
                  )}
                  {log.type === "warning" && (
                    <div className="w-2 h-2 rounded-full bg-[#ffb84d] mt-1.5" />
                  )}
                  {log.type === "info" && (
                    <div className="w-2 h-2 rounded-full bg-[#00ff9d] mt-1.5" />
                  )}
                  {log.type === "unban" && (
                    <div className="w-2 h-2 rounded-full bg-[#00ff9d] mt-1.5" />
                  )}
                  <p className="text-white text-sm flex-1">{log.message}</p>
                </div>
                <div className="flex items-center gap-2 text-[#99a1af] text-xs ml-4">
                  <Calendar className="w-3 h-3" />
                  <span>{log.date}</span>
                  <span>•</span>
                  <span>{log.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.05)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#a11212]" />
              <span className="text-[#99a1af] text-xs">Bloqueio crítico</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ffb84d]" />
              <span className="text-[#99a1af] text-xs">Alerta de segurança</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ff9d]" />
              <span className="text-[#99a1af] text-xs">Informação / Desbanimento</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
