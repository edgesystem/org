import { useState, useEffect, useCallback } from "react";
import { fetchNui } from "../lib/nui";
import type { OrgInfo, FarmConfig, FarmProgress, Transaction, BlacklistMember, CurrentPlayer } from "../types/orgpanel";

// Helper function to safely format dates
function safeFormatDate(date: Date | undefined | null, format: "date" | "time"): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return format === "date" ? "--/--/----" : "--:--";
  }
  try {
    if (format === "date") {
      return date.toLocaleDateString("pt-BR");
    }
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return format === "date" ? "--/--/----" : "--:--";
  }
}

// Helper function to safely format numbers
function safeToLocaleString(value: any): string {
  if (value == null || isNaN(Number(value))) return "0";
  try {
    return Number(value).toLocaleString("pt-BR");
  } catch {
    return "0";
  }
}

export function useOrgData() {
  const [orgInfo, setOrgInfo] = useState<OrgInfo | null>(null);
  const [farmConfig, setFarmConfig] = useState<FarmConfig | null>(null);
  const [farmProgress, setFarmProgress] = useState<FarmProgress | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [blacklist, setBlacklist] = useState<BlacklistMember[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    try {
      const [info, cfg, prog, tx, membersRes, bansRes, playerRes] = await Promise.all([
        fetchNui("orgpanel:getMyOrgInfo"),
        fetchNui("orgpanel:getFarmConfig"),
        fetchNui("orgpanel:getMyFarmProgress"),
        fetchNui("orgpanel:getTransactions"),
        fetchNui("orgpanel:getMembers"),
        fetchNui("orgpanel:getBannedMembers"),
        fetchNui("orgpanel:getCurrentPlayer"),
      ]);

      if (info) setOrgInfo(info);
      if (cfg) setFarmConfig(cfg);
      if (prog) setFarmProgress(prog);
      if (playerRes) setCurrentPlayer(playerRes);
      
      if (Array.isArray(tx)) {
        const mapped: Transaction[] = tx.map((row: any, idx: number) => {
          const created = row.created_at ? new Date(row.created_at) : null;
          return {
            id: String(row.id ?? `TRX-${idx + 1}`),
            type: row.transaction_type === "entrada" ? "deposit" : "withdraw",
            description: row.description ?? "",
            amount: row.transaction_type === "entrada" ? Number(row.amount) : -Number(row.amount),
            date: safeFormatDate(created, "date"),
            time: safeFormatDate(created, "time"),
          };
        });
        setTransactions(mapped);
      }

      if (Array.isArray(membersRes)) {
        const mappedMembers = membersRes.map((m: any) => ({
          id: String(m.citizenid || m.id || ""),
          name: m.name || "Desconhecido",
          rank: m.gradeName || "Membro",
          online: Boolean(m.online),
          deliveries: Number(m.deliveries || 0),
          playtime: Number(m.playtime || 0),
          weeklyTotal: Number(m.weeklyTotal || 0),
          dailyTotal: Number(m.dailyTotal || 0),
          weeklyAttendance: m.weeklyAttendance || [false, false, false, false, false, false, false],
          recentDeliveries: m.recentDeliveries || [],
          monthlyDeliveries: Number(m.monthlyDeliveries || 0),
          recruited: Number(m.recruited || 0),
          mugshot_url: m.mugshot_url || null,
        }));
        setMembers(mappedMembers);
      }

      if (Array.isArray(bansRes)) {
        const mappedBans: BlacklistMember[] = bansRes.map((b: any) => {
          const bannedDate = b.banned_at ? new Date(b.banned_at) : null;
          return {
            id: String(b.banned_citizenid),
            name: b.name || String(b.banned_citizenid || ""),
            reason: b.reason || "Sem motivo informado",
            bannedBy: String(b.banned_by || ""),
            date: safeFormatDate(bannedDate, "date"),
            severity: "medium",
          };
        });
        setBlacklist(mappedBans);
      }
    } catch (e) {
      console.error("Erro ao carregar dados da organizacao:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return {
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
  };
}
