import { useState, useEffect, useMemo } from "react";
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
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useOrgData } from "./hooks/useOrgData";
import { fetchNui, closePanel } from "./utils/fetchNui";
import type { Member, BlacklistMember, BankOperationResponse, ClaimFarmRewardResponse, StandardResponse, OrgInfo } from "./types/orgpanel";

export type TabType = "INÍCIO" | "MEMBROS" | "FARMS" | "RECRUTAMENTO" | "BANCO" | "PD";

// ✅ MINI TASK 1: Safe initial state
const INITIAL_ORG_INFO: OrgInfo = {
  orgName: '',
  label: '',
  myGrade: 0,
  myGradeName: '',
  isBoss: false,
  bankAuth: false,
  isRecruiter: false,
  balance: 0,
};

export default function App() {
  // ✅ MINI TASK 3: Visibility gate - painel só renderiza quando autorizado
  const [isVisible, setIsVisible] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  // ✅ MINI TASK 2: Normalized orgInfo state
  const [normalizedOrgInfo, setNormalizedOrgInfo] = useState<OrgInfo>(INITIAL_ORG_INFO);

  // Hook central de dados (fonte única)
  const {
    orgInfo,
    overview,
    farmConfig,
    farmProgress,
    members,
    transactions,
    blacklist,
    currentPlayer,
    loading,
    error,
    refreshData,
    setMembers,
    setBlacklist,
    farmDeliveries,
    farmStats,
    weeklyAttendance,
    recruiterStats,
    newMembers,
    recruitmentOverview,
  } = useOrgData();

  // UI States
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
  const [selectedMemberForBan, setSelectedMemberForBan] = useState<Member | null>(null);
  const [selectedMemberForUnban, setSelectedMemberForUnban] = useState<BlacklistMember | null>(null);
  const [bannedMemberName, setBannedMemberName] = useState("");
  const [slotLimitInfo, setSlotLimitInfo] = useState({ rank: "", currentCount: 0, limit: 0 });
  const [leaderMessage, setLeaderMessage] = useState("Rádio: 320, 321, 323\nJaqueta: 664 textura25\nCalça: 27a textura\nMochila 22 textura 5");

  // ✅ MINI TASK 2: Normalize NUI payload before state update
  const normalizeOrgInfo = (data: any): OrgInfo => {
    if (!data || typeof data !== 'object') {
      return INITIAL_ORG_INFO;
    }

    const balanceValue = data.balance;
    const balanceNumber = typeof balanceValue === 'number' 
      ? balanceValue 
      : typeof balanceValue === 'string' 
        ? parseFloat(balanceValue) || 0 
        : 0;

    return {
      orgName: data.orgName ?? '',
      label: data.label ?? '',
      myGrade: data.myGrade ?? 0,
      myGradeName: data.myGradeName ?? '',
      isBoss: data.isBoss ?? false,
      bankAuth: data.bankAuth ?? false,
      isRecruiter: data.isRecruiter ?? false,
      balance: balanceNumber,
    };
  };

  // ✅ MINI TASK 2: Update normalized data when orgInfo changes
  useEffect(() => {
    if (orgInfo) {
      setNormalizedOrgInfo(normalizeOrgInfo(orgInfo));
      setIsDataReady(true);
    }
  }, [orgInfo]);

  /**
   * ✅ MINI TASK 7: Listener para mensagens NUI (abertura do painel)
   */
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { action, data } = event.data ?? {};

      if (action === 'openPanel' && data) {
        // ✅ Normalizar ANTES de setar visibilidade
        const normalized = normalizeOrgInfo(data);
        setNormalizedOrgInfo(normalized);
        setIsDataReady(true);
        setIsVisible(true);

        // Buscar dados adicionais
        refreshData().catch(() => {});
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refreshData]);

  /**
   * ✅ MINI TASK 7: Listener para ESC (fechar painel)
   */
  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isVisible]);

  /**
   * ✅ MINI TASK 7: Fechar painel com limpeza de estado
   */
  const handleClose = () => {
    setIsVisible(false);
    setIsDataReady(false);
    closePanel();
  };

  /**
   * ✅ MINI TASK 4: Safe currency formatter
   */
  const formatCurrency = (value: number | string | undefined | null): string => {
    const numValue = typeof value === 'number' 
      ? value 
      : typeof value === 'string' 
        ? parseFloat(value) || 0 
        : 0;
    return numValue.toLocaleString('pt-BR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  /**
   * ✅ MINI TASK 5: Tab-safe render helper
   */
  const renderTabContent = () => {
    if (!isDataReady || !normalizedOrgInfo.label) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Carregando dados...</div>
        </div>
      );
    }

    return (
      <>
        {activeTab === "INÍCIO" && (
          <ErrorBoundary fallback={<div className="p-8 text-center">Erro no Dashboard</div>}>
            <Dashboard
              onDeliverGoal={handleDeliverGoal}
              onEditGoal={handleEditGoal}
              onEditLeaderMessage={handleEditLeaderMessage}
              farmConfig={farmConfig}
              farmProgress={farmProgress}
              leaderMessage={leaderMessage}
              members={members}
            />
          </ErrorBoundary>
        )}
        {activeTab === "MEMBROS" && (
          <ErrorBoundary fallback={<div className="p-8 text-center">Erro em Membros</div>}>
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
              refreshData={refreshData}
            />
          </ErrorBoundary>
        )}
        {activeTab === "FARMS" && (
          <ErrorBoundary fallback={<div className="p-8 text-center">Erro em Farms</div>}>
            <Farms 
              farmDeliveries={farmDeliveries ?? []}
              farmStats={farmStats}
              weeklyAttendance={weeklyAttendance ?? []}
              farmConfig={farmConfig}
              farmProgress={farmProgress}
              isBoss={normalizedOrgInfo.isBoss}
              loading={loading}
              onEditGoal={handleEditGoal}
            />
          </ErrorBoundary>
        )}
        {activeTab === "RECRUTAMENTO" && (
          <ErrorBoundary fallback={<div className="p-8 text-center">Erro em Recrutamento</div>}>
            <Recruitment 
              recruiterStats={recruiterStats ?? []}
              newMembers={newMembers ?? []}
              recruitmentOverview={recruitmentOverview}
              loading={loading}
              canRecruit={normalizedOrgInfo.isRecruiter || normalizedOrgInfo.isBoss}
              onRecruit={handleRecruit}
            />
          </ErrorBoundary>
        )}
        {activeTab === "BANCO" && (
          <ErrorBoundary fallback={<div className="p-8 text-center">Erro no Banco</div>}>
            <Bank
              balance={normalizedOrgInfo.balance}
              transactions={transactions ?? []}
              onDeposit={() => handleBankOperation("deposit")}
              onWithdraw={() => handleBankOperation("withdraw")}
            />
          </ErrorBoundary>
        )}
        {activeTab === "PD" && (
          <ErrorBoundary fallback={<div className="p-8 text-center">Erro na PD</div>}>
            <PD 
              onUnbanMember={handleUnbanMember}
              blacklist={blacklist}
              setBlacklist={setBlacklist}
            />
          </ErrorBoundary>
        )}
      </>
    );
  };

  /**
   * ✅ AÇÃO: Coletar recompensa da farm
   */
  const handleDeliverGoal = async () => {
    try {
      const response = await fetchNui<ClaimFarmRewardResponse>('orgpanel:claimFarmReward');
      
      if (response?.success) {
        setShowSuccessModal(true);
        await refreshData();
      } else {
        alert(response?.message || 'Erro ao coletar recompensa');
      }
    } catch {
      alert('Erro ao coletar recompensa');
    }
  };

  /**
   * ✅ AÇÃO: Recrutar jogador
   */
  const handleRecruit = () => {
    setShowRecruitModal(true);
  };

  const confirmRecruit = async (playerData: { id: string; name: string; online: boolean }) => {
    try {
      const response = await fetchNui<StandardResponse>('orgpanel:recruitPlayer', {
        targetId: playerData.id,
      });

      if (response?.success) {
        setShowRecruitModal(false);
        await refreshData();
      } else {
        alert(response?.message || 'Erro ao recrutar jogador');
      }
    } catch {
      alert('Erro ao recrutar jogador');
    }
  };

  /**
   * ✅ AÇÃO: Banir membro
   */
  const handleBanMember = (member: Member) => {
    setSelectedMemberForBan(member);
    setShowBanModal(true);
  };

  const confirmBan = async (memberId: string, reason: string, severity: "critical" | "high" | "medium") => {
    try {
      const response = await fetchNui<StandardResponse>('orgpanel:banMember', {
        citizenid: memberId,
        reason,
      });

      if (response?.success) {
        setBannedMemberName(selectedMemberForBan?.name ?? '');
        setShowBanModal(false);
        setShowBanSuccessModal(true);
        await refreshData();
      } else {
        alert(response?.message || 'Erro ao banir membro');
      }
    } catch {
      alert('Erro ao banir membro');
    }
  };

  /**
   * ✅ AÇÃO: Desbanir membro
   */
  const handleUnbanMember = (member: BlacklistMember) => {
    setSelectedMemberForUnban(member);
    setShowUnbanModal(true);
  };

  const confirmUnban = async () => {
    if (!selectedMemberForUnban) return;

    try {
      const response = await fetchNui<StandardResponse>('orgpanel:unbanMember', {
        citizenid: selectedMemberForUnban.id,
      });

      if (response?.success) {
        setShowUnbanModal(false);
        await refreshData();
      } else {
        alert(response?.message || 'Erro ao desbanir membro');
      }
    } catch {
      alert('Erro ao desbanir membro');
    }
  };

  /**
   * ✅ AÇÃO: Operação bancária (depositar/sacar)
   */
  const handleBankOperation = (type: "deposit" | "withdraw") => {
    setBankOperation(type);
    setShowBankModal(true);
  };

  const confirmBankOperation = async (
    amount: number,
    memberName: string,
    description?: string,
    isTransfer?: boolean,
    transferTo?: string
  ) => {
    try {
      const eventName = bankOperation === "deposit" ? 'orgpanel:deposit' : 'orgpanel:withdraw';
      
      const response = await fetchNui<BankOperationResponse>(eventName, {
        amount,
        description,
      });

      if (response?.success) {
        setShowBankModal(false);
        await refreshData();
      } else {
        alert(response?.message || 'Erro na operação bancária');
      }
    } catch {
      alert('Erro na operação bancária');
    }
  };

  /**
   * ✅ AÇÃO: Editar configuração da meta
   */
  const handleEditGoal = () => {
    setShowEditGoalModal(true);
  };

  const confirmEditGoal = async (goalAmount: number, rewardPerUnit: number, prizes: any) => {
    try {
      const response = await fetchNui<StandardResponse>('orgpanel:updateFarmConfig', {
        dailyGoal: goalAmount,
        rewardPerUnit,
      });

      if (response?.success) {
        setShowEditGoalModal(false);
        await refreshData();
      } else {
        alert(response?.message || 'Erro ao atualizar meta');
      }
    } catch {
      alert('Erro ao atualizar meta');
    }
  };

  /**
   * ✅ AÇÃO: Editar mensagem do líder (estado local)
   */
  const handleEditLeaderMessage = () => {
    setShowEditLeaderMessageModal(true);
  };

  const confirmEditLeaderMessage = (newMessage: string) => {
    setLeaderMessage(newMessage);
    setShowEditLeaderMessageModal(false);
  };

  // ✅ MINI TASK 3: Visibility gate - não renderiza nada se não visível
  if (!isVisible) {
    return null;
  }

  // ✅ Loading state
  if (loading && !isDataReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Carregando...</div>
      </div>
    );
  }

  // ✅ Error state
  if (error && !isDataReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">Erro: {error}</div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-red-500 text-xl">Erro crítico no painel</div>
        </div>
      }
    >
      <div 
        className="min-h-screen bg-black relative overflow-hidden"
        style={{ display: 'block' }}
      >
        {/* Background gradient */}
        <div className="fixed inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-[#0a0404] via-black to-[#0f0505] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        </div>

        {/* ✅ MINI TASK 4: Safe Header with normalized data */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bankBalance={normalizedOrgInfo.balance}
          orgLabel={normalizedOrgInfo.label}
          onlineCount={overview?.onlineCount ?? 0}
          totalMembers={overview?.totalMembers ?? members.length}
          onClose={handleClose}
        />

        {/* ✅ MINI TASK 5: Tab content with protection */}
        <div className="relative z-10 pt-[334px] min-h-screen">
          <div className="px-8 pt-[30px] pb-16 overflow-y-auto" style={{ maxHeight: "calc(100vh - 334px)" }}>
            {renderTabContent()}
          </div>
        </div>

        {/* Modals - ✅ MINI TASK 4: Safe modal rendering */}
        {showSuccessModal && (
          <SuccessModal onClose={() => setShowSuccessModal(false)} />
        )}
        {showRecruitModal && (
          <RecruitModal 
            onClose={() => setShowRecruitModal(false)}
            onConfirm={confirmRecruit}
            existingMemberIds={members.map(m => m.citizenid)}
            blacklist={blacklist}
          />
        )}
        {showBanModal && selectedMemberForBan && (
          <BanModal
            member={selectedMemberForBan}
            onClose={() => setShowBanModal(false)}
            onConfirm={confirmBan}
          />
        )}
        {showUnbanModal && selectedMemberForUnban && (
          <UnbanModal
            member={selectedMemberForUnban}
            onClose={() => setShowUnbanModal(false)}
            onConfirm={confirmUnban}
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
        {showEditGoalModal && farmConfig && (
          <EditGoalModal
            currentGoal={farmConfig.dailyGoal}
            currentPricePerUnit={farmConfig.rewardPerUnit}
            currentPrizes={{
              first: 0,
              second: 0,
              third: 0,
              others: farmConfig.rewardFixed,
            }}
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
    </ErrorBoundary>
  );
}
