import { useState, useEffect } from "react";
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
import { useOrgData } from "./hooks/useOrgData";
import { fetchNui, closePanel } from "./utils/fetchNui";
import type { Member, BlacklistMember, BankOperationResponse, ClaimFarmRewardResponse, StandardResponse } from "./types/orgpanel";

export type TabType = "INÍCIO" | "MEMBROS" | "FARMS" | "RECRUTAMENTO" | "BANCO" | "PD";

export default function App() {
  // Visibilidade do painel
  const [isVisible, setIsVisible] = useState(false);

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

  /**
   * Listener para mensagens NUI (abertura do painel)
   */
  useEffect(() => {
    console.log('[DEBUG] NUI Listener registrado');
    
    const handleMessage = (event: MessageEvent) => {
      console.log('[DEBUG] Mensagem recebida:', JSON.stringify(event.data, null, 2));
      
      const { action, data } = event.data;

      if (action === 'openPanel') {
        console.log('[DEBUG] action === openPanel, setando isVisible = true');
        setIsVisible(true);
        
        // Buscar dados ao abrir
        try {
          refreshData();
        } catch (err) {
          console.error('[DEBUG] Erro no refreshData:', err);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Teste imediato
    console.log('[DEBUG] window.addEventListener aplicado');
    
    return () => {
      window.removeEventListener('message', handleMessage);
      console.log('[DEBUG] Listener removido');
    };
  }, [refreshData]);

  /**
   * Listener para ESC (fechar painel)
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isVisible]);

  /**
   * Fechar painel
   */
  const handleClose = () => {
    setIsVisible(false);
    closePanel(); // Chama orgpanel:close
  };

  /**
   * AÇÃO: Coletar recompensa da farm
   */
  const handleDeliverGoal = async () => {
    try {
      const response = await fetchNui<ClaimFarmRewardResponse>('orgpanel:claimFarmReward');
      
      if (response.success) {
        setShowSuccessModal(true);
        await refreshData(); // Atualizar dados após sucesso
      } else {
        alert(response.message || 'Erro ao coletar recompensa');
      }
    } catch (error) {
      console.error('[handleDeliverGoal] Error:', error);
      alert('Erro ao coletar recompensa');
    }
  };

  /**
   * AÇÃO: Recrutar jogador
   */
  const handleRecruit = () => {
    setShowRecruitModal(true);
  };

  const confirmRecruit = async (playerData: { id: string; name: string; online: boolean }) => {
    try {
      const response = await fetchNui<StandardResponse>('orgpanel:recruitPlayer', {
        targetId: playerData.id,
      });

      if (response.success) {
        setShowRecruitModal(false);
        await refreshData(); // Atualizar lista de membros
      } else {
        alert(response.message || 'Erro ao recrutar jogador');
      }
    } catch (error) {
      console.error('[confirmRecruit] Error:', error);
      alert('Erro ao recrutar jogador');
    }
  };

  /**
   * AÇÃO: Banir membro
   */
  const handleBanMember = (member: Member) => {
    setSelectedMemberForBan(member);
    setShowBanModal(true);
  };

  const confirmBan = async (memberId: string, reason: string, severity: "critical" | "high" | "medium") => {
    try {
      const response = await fetchNui<StandardResponse>('orgpanel:banMember', {
        citizenid: memberId,
        reason: reason,
      });

      if (response.success) {
        setBannedMemberName(selectedMemberForBan?.name || '');
        setShowBanModal(false);
        setShowBanSuccessModal(true);
        await refreshData(); // Atualizar listas
      } else {
        alert(response.message || 'Erro ao banir membro');
      }
    } catch (error) {
      console.error('[confirmBan] Error:', error);
      alert('Erro ao banir membro');
    }
  };

  /**
   * AÇÃO: Desbanir membro
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

      if (response.success) {
        setShowUnbanModal(false);
        await refreshData(); // Atualizar blacklist
      } else {
        alert(response.message || 'Erro ao desbanir membro');
      }
    } catch (error) {
      console.error('[confirmUnban] Error:', error);
      alert('Erro ao desbanir membro');
    }
  };

  /**
   * AÇÃO: Operação bancária (depositar/sacar)
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

      if (response.success) {
        setShowBankModal(false);
        await refreshData(); // Atualizar balance e transações
      } else {
        alert(response.message || 'Erro na operação bancária');
      }
    } catch (error) {
      console.error('[confirmBankOperation] Error:', error);
      alert('Erro na operação bancária');
    }
  };

  /**
   * AÇÃO: Editar configuração da meta
   */
  const handleEditGoal = () => {
    setShowEditGoalModal(true);
  };

  const confirmEditGoal = async (goalAmount: number, rewardPerUnit: number, prizes: any) => {
    try {
      const response = await fetchNui<StandardResponse>('orgpanel:updateFarmConfig', {
        dailyGoal: goalAmount,
        rewardPerUnit: rewardPerUnit,
      });

      if (response.success) {
        setShowEditGoalModal(false);
        await refreshData(); // Atualizar farmConfig
      } else {
        alert(response.message || 'Erro ao atualizar meta');
      }
    } catch (error) {
      console.error('[confirmEditGoal] Error:', error);
      alert('Erro ao atualizar meta');
    }
  };

  /**
   * AÇÃO: Editar mensagem do líder (estado local)
   */
  const handleEditLeaderMessage = () => {
    setShowEditLeaderMessageModal(true);
  };

  const confirmEditLeaderMessage = (newMessage: string) => {
    setLeaderMessage(newMessage);
    setShowEditLeaderMessageModal(false);
    // TODO: Se houver callback no backend para salvar, adicionar aqui
  };

  // ✅ USA CSS DISPLAY EM VEZ DE RETURN NULL

  // Loading state - mostra painel mesmo em carregando
  if (loading && !orgInfo) {
    return (
      <div 
        className="min-h-screen bg-black flex items-center justify-center"
        style={{ 
          display: isVisible ? 'flex' : 'none',
          pointerEvents: isVisible ? 'all' : 'none'
        }}
      >
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    );
  }

  // Error state - mostra painel mesmo com erro
  if (error && !orgInfo) {
    return (
      <div 
        className="min-h-screen bg-black flex items-center justify-center"
        style={{ 
          display: isVisible ? 'flex' : 'none',
          pointerEvents: isVisible ? 'all' : 'none'
        }}
      >
        <div className="text-red-500 text-2xl">Erro: {error}</div>
      </div>
    );
  }

  // ✅ WRAP TUDO EM TRY/CATCH
  try {
    return (
    <div 
      className="min-h-screen bg-black relative overflow-hidden"
      style={{ 
        display: isVisible ? 'block' : 'none',
        pointerEvents: isVisible ? 'all' : 'none'
      }}
    >
      {/* Background gradient em vez de imagem */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#0a0404] via-black to-[#0f0505] opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      </div>

      {/* Fixed Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bankBalance={orgInfo?.balance || 0}
        orgLabel={orgInfo?.label || ''}
        onlineCount={overview?.onlineCount || 0}
        totalMembers={overview?.totalMembers || members.length}
        onClose={handleClose}
      />

      {/* Scrollable Content Area */}
      <div className="relative z-10 pt-[334px] min-h-screen">
        <div className="px-8 pt-[30px] pb-16 overflow-y-auto" style={{ maxHeight: "calc(100vh - 334px)" }}>
          {activeTab === "INÍCIO" && (
            <Dashboard
              onDeliverGoal={handleDeliverGoal}
              onEditGoal={handleEditGoal}
              onEditLeaderMessage={handleEditLeaderMessage}
              farmConfig={farmConfig}
              farmProgress={farmProgress}
              leaderMessage={leaderMessage}
              members={members}
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
              refreshData={refreshData}
            />
          )}
          {activeTab === "FARMS" && (
            <Farms 
              farmDeliveries={farmDeliveries}
              farmStats={farmStats}
              weeklyAttendance={weeklyAttendance}
              farmConfig={farmConfig}
              farmProgress={farmProgress}
              isBoss={orgInfo?.isBoss || false}
              loading={loading}
              onEditGoal={handleEditGoal}
            />
          )}
          {activeTab === "RECRUTAMENTO" && (
            <Recruitment 
              recruiterStats={recruiterStats}
              newMembers={newMembers}
              recruitmentOverview={recruitmentOverview}
              loading={loading}
              canRecruit={orgInfo?.isRecruiter || orgInfo?.isBoss || false}
              onRecruit={handleRecruit}
            />
          )}
          {activeTab === "BANCO" && (
            <Bank
              balance={orgInfo?.balance || 0}
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
  );
  } catch (error) {
    console.error('[App] Erro crítico no render:', error);
    return (
      <div 
        className="min-h-screen bg-black flex items-center justify-center"
        style={{ 
          display: isVisible ? 'flex' : 'none',
          pointerEvents: isVisible ? 'all' : 'none'
        }}
      >
        <div className="text-red-500 text-xl">
          Erro ao renderizar painel. Verifique console F12.
        </div>
      </div>
    );
  }
}