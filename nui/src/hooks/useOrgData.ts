/**
 * Hook central de dados do painel
 * FONTE ÚNICA DE DADOS - todos os componentes devem consumir daqui
 */

import { useState, useCallback } from 'react';
import { fetchNui } from '../utils/fetchNui';
import type {
  OrgInfo,
  FarmConfig,
  FarmProgress,
  Member,
  Transaction,
  BlacklistMember,
  CurrentPlayer,
  Overview,
  FarmDelivery,
  FarmStats,
  MemberWeeklyAttendance,
  RecruiterStats,
  NewMember,
  RecruitmentOverview,
} from '../types/orgpanel';

interface UseOrgDataReturn {
  // Estados
  orgInfo: OrgInfo | null;
  overview: Overview | null;
  farmConfig: FarmConfig | null;
  farmProgress: FarmProgress | null;
  members: Member[];
  transactions: Transaction[];
  blacklist: BlacklistMember[];
  currentPlayer: CurrentPlayer | null;
  farmDeliveries: FarmDelivery[];
  farmStats: FarmStats | null;
  weeklyAttendance: MemberWeeklyAttendance[];
  recruiterStats: RecruiterStats[];
  newMembers: NewMember[];
  recruitmentOverview: RecruitmentOverview | null;
  loading: boolean;
  error: string | null;

  // Funções
  refreshData: () => Promise<void>;
  setMembers: (members: Member[]) => void;
  setBlacklist: (blacklist: BlacklistMember[]) => void;
}

export function useOrgData(): UseOrgDataReturn {
  const [orgInfo, setOrgInfo] = useState<OrgInfo | null>(null);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [farmConfig, setFarmConfig] = useState<FarmConfig | null>(null);
  const [farmProgress, setFarmProgress] = useState<FarmProgress | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [blacklist, setBlacklist] = useState<BlacklistMember[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer | null>(null);
  const [farmDeliveries, setFarmDeliveries] = useState<FarmDelivery[]>([]);
  const [farmStats, setFarmStats] = useState<FarmStats | null>(null);
  const [weeklyAttendance, setWeeklyAttendance] = useState<MemberWeeklyAttendance[]>([]);
  const [recruiterStats, setRecruiterStats] = useState<RecruiterStats[]>([]);
  const [newMembers, setNewMembers] = useState<NewMember[]>([]);
  const [recruitmentOverview, setRecruitmentOverview] = useState<RecruitmentOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * ✅ Helper silencioso para callbacks que não existem no servidor
   */
  const safeFetchNui = async <T,>(event: string, fallback: T): Promise<T> => {
    try {
      const result = await fetchNui<T>(event);
      return result !== null ? result : fallback;
    } catch {
      // Silencioso - callback inexistente é esperado em dev
      return fallback;
    }
  };

  /**
   * Busca todos os dados do backend
   * Chamado na montagem e após qualquer ação que altere dados
   */
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Buscar dados em paralelo para melhor performance
      const [
        orgInfoData,
        overviewData,
        farmConfigData,
        farmProgressData,
        membersData,
        transactionsData,
        bannedMembersData,
        currentPlayerData,
        farmDeliveriesData,
        farmStatsData,
        weeklyAttendanceData,
        recruiterStatsData,
        newMembersData,
        recruitmentOverviewData,
      ] = await Promise.all([
        safeFetchNui<OrgInfo | null>('orgpanel:getMyOrgInfo', null),
        safeFetchNui<Overview | null>('orgpanel:getOverview', null),
        safeFetchNui<FarmConfig | null>('orgpanel:getFarmConfig', null),
        safeFetchNui<FarmProgress | null>('orgpanel:getMyFarmProgress', null),
        safeFetchNui<Member[]>('orgpanel:getMembers', []),
        safeFetchNui<any[]>('orgpanel:getTransactions', []),
        safeFetchNui<any[]>('orgpanel:getBannedMembers', []),
        safeFetchNui<CurrentPlayer | null>('orgpanel:getCurrentPlayer', null),
        safeFetchNui<FarmDelivery[]>('orgpanel:getFarmDeliveries', []),
        safeFetchNui<FarmStats | null>('orgpanel:getFarmStats', null),
        safeFetchNui<MemberWeeklyAttendance[]>('orgpanel:getWeeklyAttendance', []),
        safeFetchNui<RecruiterStats[]>('orgpanel:getRecruiterStats', []),
        safeFetchNui<NewMember[]>('orgpanel:getNewMembers', []),
        safeFetchNui<RecruitmentOverview | null>('orgpanel:getRecruitmentOverview', null),
      ]);

      // Atualizar estados
      setOrgInfo(orgInfoData);
      setOverview(overviewData);
      setFarmConfig(farmConfigData);
      setFarmProgress(farmProgressData);
      setMembers(membersData || []);

      // Mapear transações para o formato correto
      const mappedTransactions: Transaction[] = (transactionsData || []).map((tx: any) => ({
        id: tx.id || String(tx.created_at),
        type: tx.transaction_type || tx.type,
        description: tx.description,
        amount: tx.amount,
        date: tx.created_at ? new Date(tx.created_at * 1000).toLocaleDateString('pt-BR') : '',
        time: tx.created_at ? new Date(tx.created_at * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '',
        citizenid: tx.citizenid,
        created_at: tx.created_at,
      }));
      setTransactions(mappedTransactions);

      // Mapear banidos para o formato correto
      const mappedBlacklist: BlacklistMember[] = (bannedMembersData || []).map((banned: any) => ({
        id: banned.banned_citizenid || banned.citizenid,
        name: banned.name,
        reason: banned.reason,
        bannedBy: banned.banned_by,
        date: banned.banned_at ? new Date(banned.banned_at * 1000).toLocaleDateString('pt-BR') : '',
        severity: banned.severity || 'medium',
      }));
      setBlacklist(mappedBlacklist);

      setCurrentPlayer(currentPlayerData);
      setFarmDeliveries(farmDeliveriesData);
      setFarmStats(farmStatsData);
      setWeeklyAttendance(weeklyAttendanceData);
      setRecruiterStats(recruiterStatsData);
      setNewMembers(newMembersData);
      setRecruitmentOverview(recruitmentOverviewData);
    } catch (err) {
      console.error('[useOrgData] Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // Estados
    orgInfo,
    overview,
    farmConfig,
    farmProgress,
    members,
    transactions,
    blacklist,
    currentPlayer,
    farmDeliveries,
    farmStats,
    weeklyAttendance,
    recruiterStats,
    newMembers,
    recruitmentOverview,
    loading,
    error,

    // Funções
    refreshData,
    setMembers,
    setBlacklist,
  };
}