import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { Members } from "./components/Members";
import { Farms } from "./components/Farms";
import { Recruitment } from "./components/Recruitment";
import { Bank } from "./components/Bank";
import { PD } from "./components/PD";
import { SuccessModal } from "./components/modals/SuccessModal";
import { RecruitModal } from "./components/modals/RecruitModal";
import { BanModal } from "./components/modals/BanModal";
import { UnbanModal } from "./components/modals/UnbanModal";
import { BankOperationModal } from "./components/modals/BankOperationModal";
import { EditGoalModal } from "./components/modals/EditGoalModal";
import { BanSuccessModal } from "./components/modals/BanSuccessModal";
import { EditLeaderMessageModal } from "./components/modals/EditLeaderMessageModal";
import { SlotLimitModal } from "./components/modals/SlotLimitModal";
import { FarmProgressArc } from "./components/FarmProgressArc";
import { fetchNui } from "./lib/nui";
import { useOrgData } from "./hooks/useOrgData";
import type { OrgInfo, FarmConfig, FarmProgress, ClaimFarmRewardResponse, BankOperationResponse } from "./types/orgpanel";

export type TabType = "INÍCIO" | "MEMBROS" | "FARMS" | "RECRUTAMENTO" | "BANCO" | "PD";

export interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "farm";
  description: string;
  amount: number;
  date: string;
  time: string;
}

export interface BlacklistMember {
  id: string;
  name: string;
  reason: string;
  bannedBy: string;
  date: string;
  severity: "critical" | "high" | "medium";
}

export default function App() {
  const {
    orgInfo,
    farmConfig,
    farmProgress,
    members,
    transactions,
    blacklist,
    currentPlayer,
    loading,
    refreshData,
    setMembers,
    setBlacklist
  } = useOrgData();

  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("INÍCIO");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRecruitModal, setShowRecruitModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showUnbanModal, setShowUnbanModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [showBanSuccessModal, setShowBanSuccessModal] = useState(false);
  const [showEditLeaderMessageModal, setShowEditLeaderMessageModal] = useState(false);
  const [showSlotLimitModal, setShowSlotLimitModal] = useState(false);
  const [bankOperation, setBankOperation] = useState<"deposit" | "withdraw">("deposit");
  const [selectedMemberForBan, setSelectedMemberForBan] = useState<any>(null);
  const [selectedMemberForUnban, setSelectedMemberForUnban] = useState<any>(null);
  const [bannedMemberName, setBannedMemberName] = useState("");
  const [slotLimitInfo, setSlotLimitInfo] = useState({ rank: "", currentCount: 0, limit: 0 });
  const [leaderMessage, setLeaderMessage] = useState<string | null>(null);

  // Listen for NUI messages and keyboard events
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      console.log('[org_panel] NUI Message received:', data);

      if (data.action === 'openPanel') {
        console.log('[org_panel] Opening panel');
        setIsVisible(true);
        refreshData();
      }
    };

    // Handle ESC key to close panel
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('[org_panel] ESC pressed, closing panel');
        closePanel();
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [refreshData]);

  // Close panel: tell Lua to release focus and hide UI
  const closePanel = () => {
    setIsVisible(false);
    fetchNui("orgpanel:close").catch(console.error);
  };

  // Don't render anything if not visible
  if (!isVisible) {
    return null;
  }

  // DEBUG: Estilos inline para garantir visibilidade
  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '1200px',
    height: '90vh',
    maxHeight: '800px',
    backgroundColor: '#1a1a2e',
    zIndex: '9999',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    boxShadow: '0 0 50px rgba(0, 255, 136, 0.5)',
    overflow: 'hidden',
  };

  const handleDeliverGoal = () => {
    setShowSuccessModal(true);
  };

  const handleRecruit = () => {
    setShowRecruitModal(true);
  };

  const confirmRecruit = async (playerData: any) => {
    try {
      const resp = await fetchNui("orgpanel:recruitPlayer", { targetId: playerData.id });
      if (resp.success) {
        setShowRecruitModal(false);
        refreshData();
      }
    } catch (e) {
      console.error("Erro ao recrutar jogador:", e);
    }
  };

  const handleBanMember = (member: any) => {
    setSelectedMemberForBan(member);
    setShowBanModal(true);
  };

  const confirmBan = async (memberId: string, reason: string, severity: "critical" | "high" | "medium") => {
    try {
      const resp = await fetchNui("orgpanel:banMember", { citizenid: memberId, reason });
      if (resp.success) {
        setBannedMemberName(selectedMemberForBan.name);
        setShowBanModal(false);
        setShowBanSuccessModal(true);
        refreshData();
      }
    } catch (e) {
      console.error("Erro ao banir membro:", e);
    }
  };

  const handleUnbanMember = (member: any) => {
    setSelectedMemberForUnban(member);
    setShowUnbanModal(true);
  };

  const handleBankOperation = (type: "deposit" | "withdraw") => {
    setBankOperation(type);
    setShowBankModal(true);
  };

  const handleEditGoal = () => {
    setShowEditGoalModal(true);
  };

  const handleEditLeaderMessage = () => {
    setShowEditLeaderMessageModal(true);
  };

  const confirmBankOperation = async (
    amount: number,
    memberName: string,
    description?: string,
    isTransfer?: boolean,
    transferTo?: string
  ) => {
    try {
      let resp: BankOperationResponse;
      if (bankOperation === "deposit") {
        resp = (await fetchNui("orgpanel:deposit", { amount, description })) as BankOperationResponse;
      } else {
        resp = (await fetchNui("orgpanel:withdraw", { amount, description })) as BankOperationResponse;
      }

      if (resp.success) {
        refreshData();
        setShowBankModal(false);
      }
    } catch (e) {
      console.error("Erro na operação bancária", e);
    }
  };

  const confirmEditGoal = async (goalAmount: number, pricePerUnit: number) => {
    try {
      const resp = await fetchNui("orgpanel:updateFarmConfig", { 
        dailyGoal: goalAmount, 
        rewardPerUnit: pricePerUnit
      });
      if (resp.success) {
        refreshData();
        setShowEditGoalModal(false);
      }
    } catch (e) {
      console.error("Erro ao editar meta:", e);
    }
  };

  const confirmEditLeaderMessage = (newMessage: string) => {
    setLeaderMessage(newMessage);
    setShowEditLeaderMessageModal(false);
  };

  const handleClaimFarmReward = async () => {
    try {
      const res = (await fetchNui("orgpanel:claimFarmReward")) as ClaimFarmRewardResponse;
      if (res.success) {
        refreshData();
      }
    } catch (e) {
      console.error("Erro ao coletar recompensa de farm", e);
    }
  };

  if (loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-auto" style={panelStyle}>
      <div
        className="w-full max-w-[90vw] max-h-[90vh] bg-black relative flex flex-col rounded-[20px] shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
        style={{ maxWidth: '1280px', height: '100%', backgroundColor: '#0c0505' }}
      >
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(161, 18, 18, 0.4); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(161, 18, 18, 0.6); }
        `}</style>
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0c0505] via-[#1a0a0a] to-[#0c0505]" aria-hidden="true" />

        {/* Header no fluxo: ocupa espaço e não sobrepõe */}
        <header className="relative z-10 flex-shrink-0">
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onClose={closePanel}
            bankBalance={orgInfo?.balance ?? 0}
            membersOnline={members.filter(m => m.online).length}
            maxMembers={149}
            orgLabel={orgInfo?.label}
          />
        </header>

        {/* Área que rola: só esta div tem overflow */}
        <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar px-8 pt-6 pb-16">
          {activeTab === "INÍCIO" && (
            <Dashboard
              onDeliverGoal={handleDeliverGoal}
              onEditGoal={handleEditGoal}
              onEditLeaderMessage={handleEditLeaderMessage}
              maxGoal={farmConfig?.dailyGoal ?? 0}
              pricePerUnit={farmConfig?.rewardPerUnit ?? 0}
              leaderMessage={leaderMessage || ''}
              members={members}
              farmProgress={farmProgress}
              FarmProgressComponent={
                farmProgress ? (
                  <FarmProgressArc
                    dailyGoal={farmProgress.dailyGoal}
                    currentQuantity={farmProgress.currentQuantity}
                    potentialReward={farmProgress.potentialReward}
                    rewardClaimed={farmProgress.rewardClaimed}
                    onClaim={handleClaimFarmReward}
                  />
                ) : (
                  <div className="bg-gradient-to-b from-[#1a0a0a]/80 to-[#0c0505]/80 backdrop-blur-md rounded-[14px] border border-[rgba(161,18,18,0.4)] p-6">
                    <h2 className="text-white text-lg font-['Arimo:Bold',sans-serif] mb-4">Entrega de Farm</h2>
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-[#99a1af] text-sm text-center">Carregando seu progresso...</p>
                      <p className="text-[#99a1af] text-xs mt-2 text-center">Se não aparecer, verifique se está na organização.</p>
                    </div>
                  </div>
                )
              }
            />
          )}
          {activeTab === "MEMBROS" && (
            <Members 
              onRecruit={handleRecruit} 
              onBanMember={handleBanMember}
              blacklist={blacklist}
              members={members}
              setMembers={setMembers}
              onSlotLimitReached={(rank, currentCount, limit) => {
                setSlotLimitInfo({ rank, currentCount, limit });
                setShowSlotLimitModal(true);
              }}
            />
          )}
          {activeTab === "FARMS" && <Farms members={members} />}
          {activeTab === "RECRUTAMENTO" && <Recruitment />}
          {activeTab === "BANCO" && (
            <Bank
              balance={orgInfo?.balance ?? 0}
              transactions={transactions}
              onDeposit={() => handleBankOperation("deposit")}
              onWithdraw={() => handleBankOperation("withdraw")}
            />
          )}
          {activeTab === "PD" && (
            <PD 
              onUnbanMember={handleUnbanMember}
              blacklist={blacklist}
              setBlacklist={setBlacklist}
            />
          )}
        </div>

      {/* Modals */}
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
      {showRecruitModal && (
        <RecruitModal 
          onClose={() => setShowRecruitModal(false)}
          onConfirm={confirmRecruit}
          existingMemberIds={members.map(m => m.id)}
          blacklist={blacklist}
        />
      )}
      {showBanModal && (
        <BanModal
          member={selectedMemberForBan}
          onClose={() => setShowBanModal(false)}
          onConfirm={confirmBan}
        />
      )}
      {showUnbanModal && (
        <UnbanModal
          member={selectedMemberForUnban}
          onClose={() => setShowUnbanModal(false)}
        />
      )}
      {showBankModal && (
        <BankOperationModal
          type={bankOperation}
          onClose={() => setShowBankModal(false)}
          onConfirm={confirmBankOperation}
          members={members}
          currentPlayer={currentPlayer}
        />
      )}
      {showEditGoalModal && (
        <EditGoalModal
          currentGoal={farmConfig?.dailyGoal ?? 0}
          currentPricePerUnit={farmConfig?.rewardPerUnit ?? 0}
          onClose={() => setShowEditGoalModal(false)}
          onConfirm={confirmEditGoal}
        />
      )}
      {showBanSuccessModal && (
        <BanSuccessModal
          memberName={bannedMemberName}
          onClose={() => setShowBanSuccessModal(false)}
        />
      )}
      {showEditLeaderMessageModal && (
        <EditLeaderMessageModal
          currentMessage={leaderMessage || ''}
          onClose={() => setShowEditLeaderMessageModal(false)}
          onConfirm={confirmEditLeaderMessage}
        />
      )}
      {showSlotLimitModal && (
        <SlotLimitModal
          onClose={() => setShowSlotLimitModal(false)}
          rank={slotLimitInfo.rank}
          currentCount={slotLimitInfo.currentCount}
          limit={slotLimitInfo.limit}
        />
      )}
      </div>
    </div>
  );
}