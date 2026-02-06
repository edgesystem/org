import type { OrgInfo, FarmConfig, FarmProgress, ClaimFarmRewardResponse, BankOperationResponse } from "../types/orgpanel";

type NuiEvents =
  | "orgpanel:getMyOrgInfo"
  | "orgpanel:getOverview"
  | "orgpanel:getCurrentPlayer"
  | "orgpanel:getPlayerById"
  | "orgpanel:getFarmConfig"
  | "orgpanel:getMyFarmProgress"
  | "orgpanel:claimFarmReward"
  | "orgpanel:getMembers"
  | "orgpanel:getFarmRanking"
  | "orgpanel:getTransactions"
  | "orgpanel:getRecruitmentStats"
  | "orgpanel:getRetentionMetrics"
  | "orgpanel:getBannedMembers"
  | "orgpanel:getSecurityLogs"
  | "orgpanel:getBlockedTodayCount"
  | "orgpanel:deposit"
  | "orgpanel:withdraw"
  | "orgpanel:changeMemberGrade"
  | "orgpanel:recruitPlayer"
  | "orgpanel:banMember"
  | "orgpanel:unbanMember"
  | "orgpanel:updateFarmConfig"
  | "orgpanel:openRadio"
  | "orgpanel:setWaypoint"
  | "orgpanel:close"
  | "orgpanel:openDiscord";

type SecurityLog = { type: "blocked" | "warning" | "info" | "unban"; message: string; time: string; date: string };

type RecruitmentStats = { citizenid: string; total: number }[];

type RetentionMetric = { period: string; retention: number; total: number };

type NuiEventResult<T extends NuiEvents> =
  T extends "orgpanel:getMyOrgInfo" ? OrgInfo | null
    : T extends "orgpanel:getOverview" ? { orgName: string; label: string; balance: number; onlineCount: number; totalMembers: number; rating: number; ratingCount: number; myGrade: number; myGradeName: string } | null
    : T extends "orgpanel:getCurrentPlayer" ? { citizenid: string; name: string } | null
    : T extends "orgpanel:getPlayerById" ? { id: string; name: string; level: number; playtime: number; online: boolean; vip: boolean; vipType?: string } | null
    : T extends "orgpanel:getFarmConfig" ? FarmConfig | null
    : T extends "orgpanel:getMyFarmProgress" ? FarmProgress | null
    : T extends "orgpanel:claimFarmReward" ? ClaimFarmRewardResponse
    : T extends "orgpanel:getFarmRanking" ? { rank: number; citizenid: string; name: string; total: number }[] | null
    : T extends "orgpanel:getRecruitmentStats" ? RecruitmentStats
    : T extends "orgpanel:getRetentionMetrics" ? RetentionMetric[]
    : T extends "orgpanel:getSecurityLogs" ? SecurityLog[]
    : T extends "orgpanel:getBlockedTodayCount" ? { count: number }
    : T extends "orgpanel:deposit" | "orgpanel:withdraw" ? BankOperationResponse
    : T extends "orgpanel:changeMemberGrade" ? { success: boolean; message?: string }
    : T extends "orgpanel:banMember" | "orgpanel:unbanMember" | "orgpanel:updateFarmConfig" | "orgpanel:openRadio" | "orgpanel:setWaypoint" | "orgpanel:close" | "orgpanel:openDiscord" ? { success: boolean; message?: string }
    : any;

export async function fetchNui<T extends NuiEvents>(
  eventName: T,
  data?: any
): Promise<NuiEventResult<T>> {
  const isEnvBrowser = typeof (window as any).GetParentResourceName !== "function";

  // Obter o nome do recurso pai
  let resourceName: string;
  try {
    resourceName = isEnvBrowser
      ? "nui-dev"
      : (window as any).GetParentResourceName?.() || "orgpanel";
  } catch (e) {
    console.warn("[org_panel] Erro ao obter GetParentResourceName:", e);
    resourceName = "orgpanel";
  }

  console.log(`[org_panel] fetchNui: ${eventName} -> ${resourceName}`);

  const url = `https://${resourceName}/${eventName}`;
  
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data ?? {}),
    });

    if (!resp.ok) {
      throw new Error(`NUI callback ${eventName} falhou: ${resp.status} ${resp.statusText}`);
    }

    const result = await resp.json();
    console.log(`[org_panel] fetchNui resposta ${eventName}:`, result);
    return result as NuiEventResult<T>;
  } catch (e) {
    console.error(`[org_panel] fetchNui ERRO ${eventName}:`, e);
    throw e;
  }
}
