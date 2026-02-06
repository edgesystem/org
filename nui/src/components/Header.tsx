import { DollarSign, Users, X, MessageCircle } from "lucide-react";
import { fetchNui } from "../utils/fetchNui";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  bankBalance: number;
  orgLabel: string;
  onlineCount: number;
  totalMembers: number;
  onClose: () => void;
}

export function Header({ activeTab, setActiveTab, bankBalance, orgLabel, onlineCount, totalMembers, onClose }: HeaderProps) {
  const tabs: string[] = ["INÍCIO", "MEMBROS", "FARMS", "RECRUTAMENTO", "BANCO", "PD"];

  const handleDiscordClick = () => {
    fetchNui('orgpanel:openDiscord').catch(console.error);
  };

  const handleCloseClick = () => {
    onClose();
  };

  // ✅ FIX: Converter balance para number (pode vir como string do servidor)
  const balanceNumber = typeof bankBalance === 'string' ? parseFloat(bankBalance) : bankBalance;
  const balanceFormatted = !isNaN(balanceNumber) 
    ? balanceNumber.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '0.00';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[334px] bg-black">
      {/* Background header - usando gradiente em vez de imagem */}
      <div className="absolute inset-0 h-[277px]">
        <div className="w-full h-full bg-gradient-to-b from-[#1a0505] via-[#0f0303] to-black opacity-90" />
        <div className="absolute inset-0 border-b border-[rgba(161,18,18,0.3)]" />
      </div>

      {/* Header content */}
      <div className="relative px-8 pt-6">
        {/* Organization info */}
        <div className="flex items-center gap-3 mb-6">
          {/* Logo placeholder - usando gradiente */}
          <div className="w-[60px] h-[60px] rounded-lg bg-gradient-to-br from-[#a11212] to-[#5a0a0a] flex items-center justify-center border border-[rgba(161,18,18,0.5)]">
            <Users className="w-8 h-8 text-white/80" />
          </div>
          <div>
            <p className="text-[#99a1af] text-xs font-['Arimo:Regular',sans-serif]">Organização</p>
            <h1 className="text-white text-4xl font-['Arimo:Bold',sans-serif] tracking-[0.9px]">
              {orgLabel}
            </h1>
          </div>
        </div>

        {/* Stats cards and action buttons */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex-1" />
          
          <div className="flex gap-6">
            {/* Bank balance */}
            <div className="bg-gradient-to-b from-[#1a0a0a] to-[#0c0505] rounded-[14px] border border-[rgba(161,18,18,0.4)] px-6 py-3 min-w-[220px]">
              <p className="text-[#99a1af] text-xs font-['Arimo:Regular',sans-serif] mb-1">
                Saldo bancário
              </p>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#00ff9d]" />
                <p className="text-[#00ff9d] text-2xl font-['Arimo:Bold',sans-serif]">
                  {balanceFormatted}
                </p>
              </div>
            </div>

            {/* Members online */}
            <div className="bg-gradient-to-b from-[#1a0a0a] to-[#0c0505] rounded-[14px] border border-[rgba(161,18,18,0.4)] px-6 py-3 min-w-[160px]">
              <p className="text-[#99a1af] text-xs font-['Arimo:Regular',sans-serif] mb-1">
                Membros online
              </p>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">{onlineCount}/{totalMembers}</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {/* Discord button */}
            <button
              onClick={handleDiscordClick}
              className="bg-[#5865F2] hover:bg-[#4752C4] transition-colors rounded-[10px] w-12 h-12 flex items-center justify-center"
              title="Entrar no Discord"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </button>
            
            {/* Close button */}
            <button
              onClick={handleCloseClick}
              className="bg-[#1a0a0a] hover:bg-[#250d0d] transition-colors border border-[rgba(161,18,18,0.4)] rounded-[10px] w-12 h-12 flex items-center justify-center"
              title="Fechar"
            >
              <X className="w-5 h-5 text-[#A11212]" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-black border-b border-[rgba(255,255,255,0.05)] px-8">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative py-4 text-base font-['Arimo:Regular',sans-serif] transition-colors"
            >
              <span className={activeTab === tab ? "text-white" : "text-[#6a7282]"}>
                {tab}
              </span>
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a11212] via-[#c0392b] to-[#a11212] shadow-[0px_0px_10px_0px_rgba(161,18,18,0.8)]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
