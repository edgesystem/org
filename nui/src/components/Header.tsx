import { TabType } from "../App";
import { Users, X, MessageCircle } from "lucide-react";
import { fetchNui } from "../lib/nui";
import logoSrc from "../assets/5f5380810e5937b8b262591e79df134e9a163312.png";
import headerImgSrc from "../assets/a3bed3c7260b6bcacb2be941323d9c68785af310.png";

// Helper function to safely format numbers
function safeFormatNumber(value: any): string {
  if (value == null || isNaN(Number(value))) return "0";
  try {
    return Number(value).toLocaleString('pt-BR');
  } catch {
    return "0";
  }
}

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onClose: () => void;
  bankBalance: number;
  membersOnline: number;
  maxMembers: number;
  orgLabel?: string;
}

export function Header({ activeTab, setActiveTab, onClose, bankBalance, membersOnline, maxMembers, orgLabel }: HeaderProps) {
  const tabs: TabType[] = ["INÍCIO", "MEMBROS", "FARMS", "RECRUTAMENTO", "BANCO", "PD"];

  const handleDiscordClick = () => {
    fetchNui("orgpanel:openDiscord");
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="relative w-full flex-shrink-0 h-[334px] bg-black">
      {/* Background header image */}
      <div className="absolute inset-0 h-[277px] pointer-events-none">
        <img
          src={headerImgSrc}
          alt="Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 border-b border-[rgba(161,18,18,0.3)]" />
      </div>

      {/* Header content */}
      <div className="relative px-8 pt-6">
        {/* Organization info */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={logoSrc}
            alt="Logo"
            className="w-[60px] h-[60px] rounded-lg object-cover"
          />
          <div>
            <p className="text-[#99a1af] text-xs font-['Arimo:Regular',sans-serif]">Organização</p>
            <h1 className="text-white text-4xl font-['Arimo:Bold',sans-serif] tracking-[0.9px]">
              {orgLabel || 'Carregando...'}
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
                <div className="text-[#00ff9d]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <path d="M10 1.66667V18.3333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d="M14.1667 4.16667H7.91667C7.14312 4.16667 6.40125 4.47396 5.85427 5.02094C5.30729 5.56792 5 6.30978 5 7.08333C5 7.85688 5.30729 8.59875 5.85427 9.14573C6.40125 9.69271 7.14312 10 7.91667 10H12.0833C12.8569 10 13.5987 10.3073 14.1457 10.8543C14.6927 11.4013 15 12.1431 15 12.9167C15 13.6902 14.6927 14.4321 14.1457 14.9791C13.5987 15.526 12.8569 15.8333 12.0833 15.8333H5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </svg>
                </div>
                <p className="text-[#00ff9d] text-2xl font-['Arimo:Bold',sans-serif]">
                  {safeFormatNumber(bankBalance)}
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
                <p className="text-white text-2xl font-['Arimo:Bold',sans-serif]">{membersOnline}/{maxMembers}</p>
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