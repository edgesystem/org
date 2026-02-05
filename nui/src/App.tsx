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
    loading,
    refreshData,
    setMembers,
    setBlacklist
  } = useOrgData();

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
  const [leaderMessage, setLeaderMessage] = useState("Rádio: 320, 321, 323\nJaqueta: 664 textura25\nCalça: 27a textura\nMochila 22 textura 5");

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

  const confirmEditGoal = async (goalAmount: number, pricePerUnit: number, newPrizes: any) => {
    // Implementar callback de edição de meta se necessário no backend
    setShowEditGoalModal(false);
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      </div>

      {/* Fixed Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bankBalance={orgInfo?.balance ?? 0}
      />

      {/* Scrollable Content Area */}
      <div className="relative z-10 pt-[334px] min-h-screen">
        <div className="px-8 pt-[30px] pb-16 overflow-y-auto" style={{ maxHeight: "calc(100vh - 334px)" }}>
          {activeTab === "INÍCIO" && (
            <Dashboard
              onDeliverGoal={handleDeliverGoal}
              onEditGoal={handleEditGoal}
              onEditLeaderMessage={handleEditLeaderMessage}
              maxGoal={farmConfig?.dailyGoal ?? 0}
              pricePerUnit={farmConfig?.rewardPerUnit ?? 0}
              prizes={{ first: 0, second: 0, third: 0, others: 0 }}
              leaderMessage={leaderMessage}
              members={members}
              FarmProgressComponent={
                farmProgress ? (
                  <FarmProgressArc
                    dailyGoal={farmProgress.dailyGoal}
                    currentQuantity={farmProgress.currentQuantity}
                    potentialReward={farmProgress.potentialReward}
                    rewardClaimed={farmProgress.rewardClaimed}
                    onClaim={handleClaimFarmReward}
                  />
                ) : null
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
          {activeTab === "FARMS" && <Farms />}
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
        />
      )}
      {showEditGoalModal && (
        <EditGoalModal
          currentGoal={maxGoal}
          currentPricePerUnit={pricePerUnit}
          currentPrizes={prizes}
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
          currentMessage={leaderMessage}
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
  );
}