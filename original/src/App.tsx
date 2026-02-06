import { useState } from "react";
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
  const [bankBalance, setBankBalance] = useState(9601630.00);
  const [selectedMemberForBan, setSelectedMemberForBan] = useState<any>(null);
  const [selectedMemberForUnban, setSelectedMemberForUnban] = useState<any>(null);
  const [bannedMemberName, setBannedMemberName] = useState("");
  const [slotLimitInfo, setSlotLimitInfo] = useState({ rank: "", currentCount: 0, limit: 0 });
  const [leaderMessage, setLeaderMessage] = useState("Rádio: 320, 321, 323\nJaqueta: 664 textura25\nCalça: 27a textura\nMochila 22 textura 5");
  
  // Members state
  const [members, setMembers] = useState<any[]>([
    { id: "97606", name: "Leonardo lima", rank: "Líder 00", online: true, deliveries: 450, recruited: 12 },
    { id: "1968", name: "Patricio Belford", rank: "Líder 01", online: true, deliveries: 428, recruited: 10 },
    { id: "2154", name: "Mariana Costa", rank: "Líder 02", online: true, deliveries: 398, recruited: 9 },
    { id: "3287", name: "Ricardo Souza", rank: "Líder 03", online: false, deliveries: 375, recruited: 8 },
    { id: "4523", name: "Amanda Silva", rank: "Supervisor", online: true, deliveries: 352, recruited: 7 },
    { id: "5698", name: "Carlos Mendes", rank: "Supervisor", online: false, deliveries: 340, recruited: 6 },
    { id: "6741", name: "Julia Santos", rank: "Gerente Geral", online: true, deliveries: 328, recruited: 8 },
    { id: "63283", name: "Bonnie Snowden", rank: "Gerente de Farm", online: false, deliveries: 308, recruited: 5 },
    { id: "53430", name: "revoada FOX", rank: "Gerente de Farm", online: true, deliveries: 295, recruited: 5 },
    { id: "8974", name: "Fernando Lima", rank: "Gerente de Recrutamento", online: true, deliveries: 280, recruited: 15 },
    { id: "9632", name: "Patricia Rocha", rank: "Gerente da Rota", online: false, deliveries: 268, recruited: 4 },
    { id: "10258", name: "Bruno Alves", rank: "Gerente da Rota", online: true, deliveries: 255, recruited: 3 },
    { id: "11479", name: "Camila Dias", rank: "Recrutador", online: true, deliveries: 240, recruited: 12 },
    { id: "12635", name: "Diego Martins", rank: "Recrutador", online: false, deliveries: 228, recruited: 10 },
    { id: "13847", name: "Fernanda Barros", rank: "Recrutador", online: true, deliveries: 215, recruited: 9 },
    { id: "14921", name: "Gustavo Pinto", rank: "Elite", online: true, deliveries: 200, recruited: 6 },
    { id: "15673", name: "Helena Cardoso", rank: "Elite", online: false, deliveries: 195, recruited: 5 },
    { id: "17232", name: "gabriel carvalho", rank: "Elite", online: false, deliveries: 188, recruited: 4 },
    { id: "16842", name: "Isabela Reis", rank: "Elite", online: true, deliveries: 178, recruited: 3 },
    { id: "18742", name: "Igor Nunes", rank: "Elite", online: true, deliveries: 172, recruited: 3 },
    { id: "19856", name: "Juliana Freitas", rank: "Membro Verificado", online: false, deliveries: 165, recruited: 2 },
    { id: "20934", name: "Lucas Moreira", rank: "Membro Verificado", online: true, deliveries: 158, recruited: 2 },
    { id: "21487", name: "Marina Ribeiro", rank: "Membro Verificado", online: false, deliveries: 145, recruited: 1 },
    { id: "59778", name: "kevyn soares", rank: "Membro Verificado", online: true, deliveries: 134, recruited: 1 },
    { id: "23615", name: "Nicolas Fernandes", rank: "Membro Verificado", online: true, deliveries: 128, recruited: 1 },
    { id: "24789", name: "Olivia Castro", rank: "Membro", online: false, deliveries: 118, recruited: 0 },
    { id: "25943", name: "Paulo Gomes", rank: "Membro", online: true, deliveries: 112, recruited: 0 },
    { id: "26157", name: "Renata Azevedo", rank: "Membro", online: false, deliveries: 105, recruited: 0 },
    { id: "42156", name: "alejandro miguel", rank: "Membro", online: false, deliveries: 98, recruited: 0 },
    { id: "28364", name: "Sergio Campos", rank: "Membro", online: true, deliveries: 92, recruited: 0 },
    { id: "29517", name: "Tatiana Vieira", rank: "Membro", online: false, deliveries: 85, recruited: 0 },
    { id: "30682", name: "Vinicius Teixeira", rank: "Membro", online: true, deliveries: 78, recruited: 0 },
    { id: "31845", name: "Wesley Santos", rank: "Membro", online: false, deliveries: 72, recruited: 0 },
    { id: "32971", name: "Yasmin Oliveira", rank: "Membro", online: true, deliveries: 68, recruited: 0 },
    { id: "33126", name: "Zeca Pereira", rank: "Novato", online: false, deliveries: 62, recruited: 0 },
    { id: "28934", name: "maria santos", rank: "Novato", online: true, deliveries: 58, recruited: 0 },
    { id: "35489", name: "André Lopes", rank: "Novato", online: false, deliveries: 52, recruited: 0 },
    { id: "36524", name: "Bruna Cavalcanti", rank: "Novato", online: true, deliveries: 48, recruited: 0 },
    { id: "37691", name: "Cristiano Ramos", rank: "Novato", online: false, deliveries: 42, recruited: 0 },
    { id: "38847", name: "Daniela Correia", rank: "Novato", online: true, deliveries: 38, recruited: 0 },
    { id: "39925", name: "Eduardo Machado", rank: "Novato", online: false, deliveries: 35, recruited: 0 },
    { id: "40163", name: "Fabiana Monteiro", rank: "Novato", online: true, deliveries: 30, recruited: 0 },
    { id: "41278", name: "Guilherme Batista", rank: "Novato", online: false, deliveries: 28, recruited: 0 },
    { id: "42395", name: "Heitor Duarte", rank: "Novato", online: true, deliveries: 25, recruited: 0 },
    { id: "43512", name: "Isabel Farias", rank: "Novato", online: false, deliveries: 22, recruited: 0 },
    { id: "44628", name: "Jorge Cunha", rank: "Novato", online: true, deliveries: 18, recruited: 0 },
    { id: "45739", name: "Kelly Moura", rank: "Novato", online: false, deliveries: 15, recruited: 0 },
    { id: "46854", name: "Leonardo Reis", rank: "Novato", online: true, deliveries: 12, recruited: 0 },
    { id: "47962", name: "Melissa Fonseca", rank: "Novato", online: false, deliveries: 8, recruited: 0 },
  ]);
  
  // Blacklist state
  const [blacklist, setBlacklist] = useState<BlacklistMember[]>([
    {
      id: "45678",
      name: "João Silva",
      reason: "Limpou baú",
      bannedBy: "Leonardo lima",
      date: "28/01/2026",
      severity: "high",
    },
    {
      id: "23456",
      name: "Pedro Oliveira",
      reason: "Traição - passou informações",
      bannedBy: "Patricio Belford",
      date: "15/01/2026",
      severity: "critical",
    },
    {
      id: "34567",
      name: "Lucas Santos",
      reason: "Roubo de veículo da org",
      bannedBy: "Leonardo lima",
      date: "10/01/2026",
      severity: "high",
    },
    {
      id: "56789",
      name: "Rafael Costa",
      reason: "Inatividade prolongada sem aviso",
      bannedBy: "Bonnie Snowden",
      date: "05/01/2026",
      severity: "medium",
    },
    {
      id: "67890",
      name: "Thiago Alves",
      reason: "Conflito com membros",
      bannedBy: "Patricio Belford",
      date: "02/01/2026",
      severity: "medium",
    },
  ]);
  
  // Transactions state
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "TRX-001", type: "deposit", description: "Depósito - Leonardo lima", amount: 50000, date: "05/02/2026", time: "14:32" },
    { id: "TRX-002", type: "farm", description: "Farms - Entrega coletiva", amount: 125000, date: "05/02/2026", time: "12:00" },
    { id: "TRX-003", type: "withdraw", description: "Saque - Patricio Belford", amount: -25000, date: "04/02/2026", time: "18:45" },
    { id: "TRX-004", type: "deposit", description: "Depósito - Bonnie Snowden", amount: 30000, date: "04/02/2026", time: "16:20" },
    { id: "TRX-005", type: "farm", description: "Farms - Entrega coletiva", amount: 98000, date: "05/02/2026", time: "12:00" },
    { id: "TRX-006", type: "withdraw", description: "Saque - revoada FOX", amount: -15000, date: "03/02/2026", time: "20:15" },
    { id: "TRX-007", type: "deposit", description: "Depósito - gabriel carvalho", amount: 22000, date: "03/02/2026", time: "15:30" },
    { id: "TRX-008", type: "farm", description: "Farms - Entrega coletiva", amount: 110000, date: "03/02/2026", time: "12:00" },
  ]);
  
  // Goal configuration
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

  const confirmBankOperation = (amount: number, memberName: string, description?: string, isTransfer?: boolean, transferTo?: string) => {
    const now = new Date();
    const date = now.toLocaleDateString('pt-BR');
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    // Update balance
    if (bankOperation === "deposit") {
      setBankBalance(bankBalance + amount);
    } else {
      setBankBalance(bankBalance - amount);
    }
    
    // Create transaction description based on operation type
    let transactionDescription: string;
    
    if (bankOperation === "deposit") {
      // Depósito: "Depósito - Tio Han - [Descrição]"
      transactionDescription = description 
        ? `Depósito - ${memberName} - ${description}`
        : `Depósito - ${memberName}`;
    } else if (isTransfer && transferTo) {
      // Transferência: "Tio Han transferiu $X para [Membro] - [Motivo]"
      transactionDescription = description 
        ? `${memberName} transferiu para ${transferTo} - ${description}`
        : `${memberName} transferiu para ${transferTo}`;
    } else {
      // Saque pessoal: "Tio Han sacou $X - [Motivo]"
      transactionDescription = description 
        ? `${memberName} sacou - ${description}`
        : `${memberName} sacou`;
    }
    
    const newTransaction: Transaction = {
      id: `TRX-${String(transactions.length + 1).padStart(3, '0')}`,
      type: bankOperation,
      description: transactionDescription,
      amount: bankOperation === "deposit" ? amount : -amount,
      date,
      time,
    };
    
    // Add to beginning of transactions list
    setTransactions([newTransaction, ...transactions]);
    setShowBankModal(false);
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