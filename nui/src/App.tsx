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
  const [orgInfo, setOrgInfo] = useState<OrgInfo | null>(null);
  const [farmConfig, setFarmConfig] = useState<FarmConfig | null>(null);
  const [farmProgress, setFarmProgress] = useState<FarmProgress | null>(null);
  const [bankBalance, setBankBalance] = useState(0);
  const [selectedMemberForBan, setSelectedMemberForBan] = useState<any>(null);
  const [selectedMemberForUnban, setSelectedMemberForUnban] = useState<any>(null);
  const [bannedMemberName, setBannedMemberName] = useState("");
  const [slotLimitInfo, setSlotLimitInfo] = useState({ rank: "", currentCount: 0, limit: 0 });
  const [leaderMessage, setLeaderMessage] = useState("Rádio: 320, 321, 323\nJaqueta: 664 textura25\nCalça: 27a textura\nMochila 22 textura 5");
  
  // Members state (carregado da NUI)
  const [members, setMembers] = useState<any[]>([]);
  
  // Blacklist state
  const [blacklist, setBlacklist] = useState<BlacklistMember[]>([]);
  
  // Transactions state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Goal configuration (NUI sobrescreve ao carregar)
  const [maxGoal, setMaxGoal] = useState(10000);
  const [pricePerUnit, setPricePerUnit] = useState(200);
  const [prizes, setPrizes] = useState({
    first: 5000,
    second: 3000,
    third: 2000,
    others: 500,
  });

  const handleDeliverGoal = () => {
    setShowSuccessModal(true);
  };

  const handleRecruit = () => {
    setShowRecruitModal(true);
  };

  const confirmRecruit = (playerData: any) => {
    // Adiciona o novo membro à lista com cargo "Novato"
    const newMember = {
      id: playerData.id,
      name: playerData.name,
      rank: "Novato",
      online: playerData.online,
      deliveries: 0,
      recruited: 0,
    };
    
    // Ordem hierárquica dos cargos
    const RANK_HIERARCHY: { [key: string]: number } = {
      "Líder 00": 0,
      "Líder 01": 1,
      "Líder 02": 2,
      "Supervisor": 3,
      "Gerente Geral": 4,
      "Gerente de Farm": 5,
      "Gerente de Recrutamento": 6,
      "Gerente da Rota": 7,
      "Recrutador": 8,
      "Elite": 9,
      "Membro Verificado": 10,
      "Membro": 11,
      "Novato": 12,
    };

    // Adiciona e reordena automaticamente
    const updatedMembers = [...members, newMember];
    const sortedMembers = updatedMembers.sort((a, b) => {
      const hierarchyA = RANK_HIERARCHY[a.rank] ?? 999;
      const hierarchyB = RANK_HIERARCHY[b.rank] ?? 999;
      
      // Se estão no mesmo cargo, ordena por deliveries (maior primeiro)
      if (hierarchyA === hierarchyB) {
        return b.deliveries - a.deliveries;
      }
      
      return hierarchyA - hierarchyB;
    });

    setMembers(sortedMembers);
    setShowRecruitModal(false);
  };

  const handleBanMember = (member: any) => {
    setSelectedMemberForBan(member);
    setShowBanModal(true);
  };

  const confirmBan = (memberId: string, reason: string, severity: "critical" | "high" | "medium") => {
    const now = new Date();
    const date = now.toLocaleDateString('pt-BR');
    
    // Create blacklist entry
    const newBlacklistEntry: BlacklistMember = {
      id: memberId,
      name: selectedMemberForBan.name,
      reason: reason,
      bannedBy: "Leonardo lima",
      date: date,
      severity: severity,
    };
    
    // Add to blacklist
    setBlacklist([newBlacklistEntry, ...blacklist]);
    
    // Store banned member name and show success modal
    setBannedMemberName(selectedMemberForBan.name);
    setShowBanModal(false);
    setShowBanSuccessModal(true);
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

  const reloadBankData = async () => {
    try {
      const [info, tx] = await Promise.all([
        fetchNui("orgpanel:getMyOrgInfo"),
        fetchNui("orgpanel:getTransactions"),
      ]);
      if (info) {
        setOrgInfo(info as OrgInfo);
        setBankBalance((info as OrgInfo).balance);
      }
      if (Array.isArray(tx)) {
        const mapped: Transaction[] = (tx as any[]).map((row, idx) => {
          const created = row.created_at ? new Date(row.created_at) : new Date();
          const date = created.toLocaleDateString("pt-BR");
          const time = created.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
          const type = row.transaction_type === "entrada" ? "deposit" : "withdraw";
          const amount = Number(row.amount) || 0;
          return {
            id: String(row.id ?? `TRX-${idx + 1}`),
            type,
            description: row.description ?? "",
            amount: type === "deposit" ? amount : -amount,
            date,
            time,
          };
        });
        setTransactions(mapped);
      }
    } catch (e) {
      console.error("Erro ao recarregar dados bancários", e);
    }
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

      if (!resp.success) {
        console.warn(resp.message);
        return;
      }

      if (typeof resp.newBalance === "number") {
        setBankBalance(resp.newBalance);
      }

      await reloadBankData();
      setShowBankModal(false);
    } catch (e) {
      console.error("Erro na operação bancária", e);
    }
  };

  const confirmEditGoal = (goalAmount: number, pricePerUnit: number, newPrizes: any) => {
    setMaxGoal(goalAmount);
    setPricePerUnit(pricePerUnit);
    setPrizes(newPrizes);
    setShowEditGoalModal(false);
  };

  const confirmEditLeaderMessage = (newMessage: string) => {
    setLeaderMessage(newMessage);
    setShowEditLeaderMessageModal(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const [info, cfg, prog, tx, membersRes, bansRes] = await Promise.all([
          fetchNui("orgpanel:getMyOrgInfo"),
          fetchNui("orgpanel:getFarmConfig"),
          fetchNui("orgpanel:getMyFarmProgress"),
          fetchNui("orgpanel:getTransactions"),
          fetchNui("orgpanel:getMembers"),
          fetchNui("orgpanel:getBannedMembers"),
        ]);

        if (info) {
          setOrgInfo(info as OrgInfo);
          setBankBalance((info as OrgInfo).balance);
        }
        if (cfg) {
          const c = cfg as FarmConfig;
          setFarmConfig(c);
          setMaxGoal(c.dailyGoal);
          if (c.rewardType === "per_unit") {
            setPricePerUnit(c.rewardPerUnit);
          }
        }
        if (prog) {
          setFarmProgress(prog as FarmProgress);
        }
        if (Array.isArray(tx)) {
          const mapped: Transaction[] = (tx as any[]).map((row, idx) => {
            const created = row.created_at ? new Date(row.created_at) : new Date();
            const date = created.toLocaleDateString("pt-BR");
            const time = created.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
            const type = row.transaction_type === "entrada" ? "deposit" : "withdraw";
            const amount = Number(row.amount) || 0;
            return {
              id: String(row.id ?? `TRX-${idx + 1}`),
              type,
              description: row.description ?? "",
              amount: type === "deposit" ? amount : -amount,
              date,
              time,
            };
          });
          setTransactions(mapped);
        }
        if (Array.isArray(membersRes)) {
          const mappedMembers = (membersRes as any[]).map((m) => ({
            id: String(m.citizenid),
            name: m.name || "Desconhecido",
            rank: "Membro",
            online: false,
            deliveries: 0,
            recruited: 0,
          }));
          setMembers(mappedMembers);
        }
        if (Array.isArray(bansRes)) {
          const mappedBans: BlacklistMember[] = (bansRes as any[]).map((b) => ({
            id: String(b.banned_citizenid),
            name: String(b.banned_citizenid),
            reason: b.reason || "Sem motivo informado",
            bannedBy: String(b.banned_by),
            date: b.banned_at ? new Date(b.banned_at).toLocaleDateString("pt-BR") : "",
            severity: "medium",
          }));
          setBlacklist(mappedBans);
        }
      } catch (e) {
        console.error("Erro ao carregar dados iniciais do painel", e);
      }
    })();
  }, []);

  const handleClaimFarmReward = async () => {
    try {
      const res = (await fetchNui("orgpanel:claimFarmReward")) as ClaimFarmRewardResponse;
      if (!res.success) {
        console.warn(res.message);
        return;
      }
      if (typeof res.newBalance === "number") {
        setBankBalance(res.newBalance);
      }
      if (res.progress) {
        setFarmProgress(res.progress);
      }
    } catch (e) {
      console.error("Erro ao coletar recompensa de farm", e);
    }
  };

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
        bankBalance={bankBalance}
      />

      {/* Scrollable Content Area */}
      <div className="relative z-10 pt-[334px] min-h-screen">
        <div className="px-8 pt-[30px] pb-16 overflow-y-auto" style={{ maxHeight: "calc(100vh - 334px)" }}>
          {activeTab === "INÍCIO" && (
            <Dashboard
              onDeliverGoal={handleDeliverGoal}
              onEditGoal={handleEditGoal}
              onEditLeaderMessage={handleEditLeaderMessage}
              maxGoal={maxGoal}
              pricePerUnit={pricePerUnit}
              prizes={prizes}
              leaderMessage={leaderMessage}
              members={members}
              FarmProgressComponent={
                farmProgress && farmConfig ? (
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
              balance={bankBalance}
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