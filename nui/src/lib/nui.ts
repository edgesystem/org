import type { OrgInfo, FarmConfig, FarmProgress, ClaimFarmRewardResponse, BankOperationResponse } from "../types/orgpanel";

type NuiEvents =
  | "orgpanel:getMyOrgInfo"
  | "orgpanel:getOverview"
  | "orgpanel:getFarmConfig"
  | "orgpanel:getMyFarmProgress"
  | "orgpanel:claimFarmReward"
  | "orgpanel:getMembers"
  | "orgpanel:getFarmRanking"
  | "orgpanel:getTransactions"
  | "orgpanel:getRecruitmentStats"
  | "orgpanel:getBannedMembers"
  | "orgpanel:deposit"
  | "orgpanel:withdraw"
  | "orgpanel:changeMemberGrade"
  | "orgpanel:recruitPlayer"
  | "orgpanel:banMember"
  | "orgpanel:unbanMember"
  | "orgpanel:updateFarmConfig";

type RecruitmentStats = { citizenid: string; total: number }[];

type NuiEventResult<T extends NuiEvents> =
  T extends "orgpanel:getMyOrgInfo" ? OrgInfo | null
    : T extends "orgpanel:getOverview" ? { orgName: string; label: string; balance: number; onlineCount: number; totalMembers: number; rating: number; ratingCount: number; myGrade: number; myGradeName: string } | null
    : T extends "orgpanel:getFarmConfig" ? FarmConfig | null
    : T extends "orgpanel:getMyFarmProgress" ? FarmProgress | null
    : T extends "orgpanel:claimFarmReward" ? ClaimFarmRewardResponse
    : T extends "orgpanel:getFarmRanking" ? { rank: number; citizenid: string; name: string; total: number }[] | null
    : T extends "orgpanel:getRecruitmentStats" ? RecruitmentStats
    : T extends "orgpanel:deposit" | "orgpanel:withdraw" ? BankOperationResponse
    : T extends "orgpanel:changeMemberGrade" ? { success: boolean; message?: string }
    : T extends "orgpanel:banMember" | "orgpanel:unbanMember" | "orgpanel:updateFarmConfig" ? { success: boolean; message?: string }
    : any;

export async function fetchNui<T extends NuiEvents>(
  eventName: T,
  data?: any
): Promise<NuiEventResult<T>> {
  const isEnvBrowser = typeof (window as any).GetParentResourceName !== "function";

  const resourceName = isEnvBrowser
    ? "nui-dev"
    : (window as any).GetParentResourceName();

  const resp = await fetch(`https://${resourceName}/${eventName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data ?? {}),
  });

  if (!resp.ok) {
    throw new Error(`NUI callback ${eventName} falhou: ${resp.status}`);
  }

  return (await resp.json()) as NuiEventResult<T>;
}
