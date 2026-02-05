import { useState, useEffect } from "react";
import { fetchNui } from "../lib/nui";
import type { OrgInfo, FarmConfig, FarmProgress, Transaction, BlacklistMember } from "../types/orgpanel";

export function useOrgData() {
  const [orgInfo, setOrgInfo] = useState<OrgInfo | null>(null);
  const [farmConfig, setFarmConfig] = useState<FarmConfig | null>(null);
  const [farmProgress, setFarmProgress] = useState<FarmProgress | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [blacklist, setBlacklist] = useState<BlacklistMember[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const [info, cfg, prog, tx, membersRes, bansRes] = await Promise.all([
        fetchNui("orgpanel:getMyOrgInfo"),
        fetchNui("orgpanel:getFarmConfig"),
        fetchNui("orgpanel:getMyFarmProgress"),
        fetchNui("orgpanel:getTransactions"),
        fetchNui("orgpanel:getMembers"),
        fetchNui("orgpanel:getBannedMembers"),
      ]);

      if (info) setOrgInfo(info);
      if (cfg) setFarmConfig(cfg);
      if (prog) setFarmProgress(prog);
      
      if (Array.isArray(tx)) {
        const mapped: Transaction[] = tx.map((row: any, idx: number) => {
          const created = row.created_at ? new Date(row.created_at) : new Date();
          return {
            id: String(row.id ?? `TRX-${idx + 1}`),
            type: row.transaction_type === "entrada" ? "deposit" : "withdraw",
            description: row.description ?? "",
            amount: row.transaction_type === "entrada" ? Number(row.amount) : -Number(row.amount),
            date: created.toLocaleDateString("pt-BR"),
            time: created.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          };
        });
        setTransactions(mapped);
      }

      if (Array.isArray(membersRes)) {
        const mappedMembers = membersRes.map((m: any) => ({
          id: String(m.citizenid),
          name: m.name || "Desconhecido",
          rank: m.gradeName || "Membro",
          online: m.online || false,
          deliveries: m.deliveries || 0,
          recruited: m.recruited || 0,
          mugshot_url: m.mugshot_url || null,
        }));
        setMembers(mappedMembers);
      }

      if (Array.isArray(bansRes)) {
        const mappedBans: BlacklistMember[] = bansRes.map((b: any) => ({
          id: String(b.banned_citizenid),
          name: b.name || String(b.banned_citizenid),
          reason: b.reason || "Sem motivo informado",
          bannedBy: String(b.banned_by),
          date: b.banned_at ? new Date(b.banned_at).toLocaleDateString("pt-BR") : "",
          severity: "medium",
        }));
        setBlacklist(mappedBans);
      }
    } catch (e) {
      console.error("Erro ao carregar dados da organização:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return {
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
  };
}
