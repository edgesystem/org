import { useState } from "react";
import { UserPlus, X, Search, Crown, AlertCircle } from "lucide-react";

interface RecruitModalProps {
  onClose: () => void;
  onConfirm: (playerData: PlayerData) => void;
  existingMemberIds: string[];
  blacklist: BlacklistMember[];
}

interface BlacklistMember {
  id: string;
  name: string;
  reason: string;
  bannedBy: string;
  date: string;
  severity: "critical" | "high" | "medium";
}

interface PlayerData {
  id: string;
  name: string;
  vip: boolean;
  vipType?: "VIP Bronze" | "VIP Prata" | "VIP Ouro" | "VIP Platina" | "VIP Diamante";
  level: number;
  playtime: string;
  online: boolean;
}

export function RecruitModal({ onClose, onConfirm, existingMemberIds, blacklist }: RecruitModalProps) {
  const [playerId, setPlayerId] = useState("");
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setError("");
    setPlayerData(null);
    setIsSearching(true);

    // Simulate API delay
    setTimeout(() => {
      // 1. PRIMEIRA VERIFICAÇÃO: Lista Negra (PRIORIDADE MÁXIMA) - sincronizado com PD
      const blacklistedPlayer = blacklist.find(banned => banned.id === playerId);
      if (blacklistedPlayer) {
        setError(`Este jogador está na lista negra da aba PD (${blacklistedPlayer.name} - ${blacklistedPlayer.reason})`);
        setIsSearching(false);
        return;
      }

      // 2. SEGUNDA VERIFICAÇÃO: Já é membro da organização - sincronizado com Membros
      if (existingMemberIds.includes(playerId)) {
        setError("Este jogador já faz parte da organização");
        setIsSearching(false);
        return;
      }

      // 3. TERCEIRA VERIFICAÇÃO: ID inválido (não existe no servidor) - apenas ID 999999
      if (playerId === "999999") {
        setError("Jogador não encontrado no servidor - ID não existe");
        setIsSearching(false);
        return;
      }

      // 4. SUCESSO: Gerar dados do jogador válido
      const seed = parseInt(playerId) || 0;
      const randomNames = [
        "Carlos Eduardo", "Fernanda Silva", "Roberto Santos", "Ana Paula", "João Pedro",
        "Marina Costa", "Felipe Alves", "Juliana Mendes", "Ricardo Souza", "Patricia Lima",
        "Bruno Oliveira", "Camila Santos", "Diego Rocha", "Amanda Ferreira", "Lucas Martins",
        "Isabela Dias", "Rafael Cardoso", "Beatriz Nunes", "Thiago Barbosa", "Larissa Pinto",
        "Gustavo Reis", "Leticia Carvalho", "Rodrigo Gomes", "Gabriela Teixeira", "Vinicius Moreira"
      ];
      const vipTypes: Array<"VIP Bronze" | "VIP Prata" | "VIP Ouro" | "VIP Platina" | "VIP Diamante"> = [
        "VIP Bronze", "VIP Prata", "VIP Ouro", "VIP Platina", "VIP Diamante"
      ];
      const nameIndex = seed % randomNames.length;
      const hasVip = seed % 3 !== 0; // 66% de chance de ter VIP
      const vipIndex = seed % vipTypes.length;
      const level = 15 + (seed % 80); // Nível entre 15 e 95
      const hours = 50 + (seed % 650); // Horas entre 50 e 700
      const minutes = seed % 60;
      const isOnline = seed % 4 !== 0; // 75% de chance de estar online

      const data: PlayerData = {
        id: playerId,
        name: randomNames[nameIndex],
        vip: hasVip,
        vipType: hasVip ? vipTypes[vipIndex] : undefined,
        level,
        playtime: `${hours}h ${minutes}min`,
        online: isOnline,
      };

      setPlayerData(data);
      setIsSearching(false);
    }, 800);
  };

  const handleRecruit = () => {
    if (!playerData) return;
    onConfirm(playerData);
    onClose();
  };

  const getVipColor = (vipType?: string) => {
    switch (vipType) {
      case "VIP Bronze":
        return "text-[#CD7F32] bg-[#CD7F32]/20";
      case "VIP Prata":
        return "text-[#C0C0C0] bg-[#C0C0C0]/20";
      case "VIP Ouro":
        return "text-[#FFD700] bg-[#FFD700]/20";
      case "VIP Platina":
        return "text-[#E5E4E2] bg-[#E5E4E2]/20";
      case "VIP Diamante":
        return "text-[#B9F2FF] bg-[#B9F2FF]/20";
      default:
        return "text-[#99a1af] bg-[#99a1af]/20";
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
            <UserPlus className="w-6 h-6 text-[#a11212]" />
          </div>
          <div>
            <h2 className="text-white text-xl font-['Arimo:Bold',sans-serif]">
              Recrutar Membro
            </h2>
            <p className="text-[#99a1af] text-sm">
              Busque pelo ID do jogador
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="mb-6">
          <label className="text-white text-sm font-['Arimo:Bold',sans-serif] mb-2 block">
            ID do Jogador
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={playerId}
              onChange={(e) => {
                setPlayerId(e.target.value);
                setError("");
                setPlayerData(null);
              }}
              placeholder="Digite o ID do jogador..."
              className="flex-1 bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg px-4 py-2.5 text-white placeholder:text-[#99a1af] focus:outline-none focus:border-[#a11212]"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={!playerId.trim() || isSearching}
              className="bg-[#a11212] hover:bg-[#8a0f0f] disabled:bg-[#4a0808] disabled:cursor-not-allowed transition-colors rounded-lg px-4 py-2.5 text-white"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {/* Guia de Testes - Sincronizado com dados reais */}
          <div className="mt-3 p-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(161,18,18,0.2)] rounded-lg">
            <p className="text-[#99a1af] text-xs mb-2 font-['Arimo:Bold',sans-serif]">
              💡 Teste com IDs reais do sistema:
            </p>
            <div className="space-y-1.5 text-xs">
              <div>
                <p className="text-[#B31B1B] font-['Arimo:Bold',sans-serif] mb-0.5">
                  🚫 Blacklist (PD):
                </p>
                <p className="text-[#99a1af] ml-3">
                  45678 (João Silva), 23456 (Pedro Oliveira), 34567 (Lucas Santos)
                </p>
              </div>
              <div>
                <p className="text-[#FFD700] font-['Arimo:Bold',sans-serif] mb-0.5">
                  👥 Já é membro:
                </p>
                <p className="text-[#99a1af] ml-3">
                  97606 (Leonardo lima), 1968 (Patricio Belford), 63283 (Bonnie Snowden)
                </p>
              </div>
              <div>
                <p className="text-[#ff6b6b] font-['Arimo:Bold',sans-serif] mb-0.5">
                  ❌ ID inválido:
                </p>
                <p className="text-[#99a1af] ml-3">
                  999999 (não existe)
                </p>
              </div>
              <div>
                <p className="text-[#00ff9d] font-['Arimo:Bold',sans-serif] mb-0.5">
                  ✅ ID válido:
                </p>
                <p className="text-[#99a1af] ml-3">
                  12345, 54321, 88888, 77777
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-[rgba(179,27,27,0.1)] border border-[rgba(179,27,27,0.4)] rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#B31B1B] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#B31B1B] text-sm font-['Arimo:Bold',sans-serif] mb-1">
                  Erro na busca
                </p>
                <p className="text-[#ff6b6b] text-xs">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search result */}
        {playerData && (
          <div className="mb-6 bg-[rgba(0,0,0,0.54)] border border-[rgba(161,18,18,0.4)] rounded-lg p-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Header com nome e status */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white text-lg font-['Arimo:Bold',sans-serif] mb-1">
                  {playerData.name}
                </p>
                <p className="text-[#99a1af] text-sm">ID: {playerData.id}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
                playerData.online 
                  ? 'bg-[#00ff9d]/20 text-[#00ff9d]' 
                  : 'bg-[#99a1af]/20 text-[#99a1af]'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  playerData.online ? 'bg-[#00ff9d]' : 'bg-[#99a1af]'
                }`} />
                {playerData.online ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* VIP Badge */}
            {playerData.vip && playerData.vipType && (
              <div className="mb-4">
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${getVipColor(playerData.vipType)}`}>
                  <Crown className="w-4 h-4" />
                  <span className="text-sm font-['Arimo:Bold',sans-serif]">
                    {playerData.vipType}
                  </span>
                </div>
              </div>
            )}

            {/* Player info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[rgba(161,18,18,0.3)]">
              <div>
                <p className="text-[#99a1af] text-xs mb-1">Nível</p>
                <p className="text-white text-base font-['Arimo:Bold',sans-serif]">
                  {playerData.level}
                </p>
              </div>
              <div>
                <p className="text-[#99a1af] text-xs mb-1">Tempo jogado</p>
                <p className="text-white text-base font-['Arimo:Bold',sans-serif]">
                  {playerData.playtime}
                </p>
              </div>
              <div>
                <p className="text-[#99a1af] text-xs mb-1">Status VIP</p>
                <p className={`text-sm font-['Arimo:Bold',sans-serif] ${
                  playerData.vip ? 'text-[#FFD700]' : 'text-[#99a1af]'
                }`}>
                  {playerData.vip ? 'Sim' : 'Não'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-[rgba(0,0,0,0.54)] hover:bg-[rgba(0,0,0,0.7)] border border-[rgba(161,18,18,0.4)] transition-colors rounded-[10px] py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
          >
            Cancelar
          </button>
          <button
            onClick={handleRecruit}
            disabled={!playerData}
            className="flex-1 bg-[#a11212] hover:bg-[#8a0f0f] disabled:bg-[#4a0808] disabled:cursor-not-allowed transition-colors rounded-[10px] py-3 text-white text-base font-['Arimo:Regular',sans-serif]"
          >
            Confirmar Recrutamento
          </button>
        </div>

        {/* Warning */}
        <div className="mt-4 p-3 bg-[rgba(161,18,18,0.1)] border border-[rgba(161,18,18,0.3)] rounded-lg">
          <p className="text-[#99a1af] text-xs text-center">
            ⚠️ Sistema sincronizado com PD (Blacklist) e Lista de Membros
          </p>
        </div>
      </div>
    </div>
  );
}
