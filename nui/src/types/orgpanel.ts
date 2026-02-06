/**
 * Tipos TypeScript obrigatórios para integração com backend FiveM
 * Baseado na especificação técnica do org_panel
 */

export interface OrgInfo {
  orgName: string;
  label: string;
  myGrade: number;
  myGradeName: string;
  isBoss: boolean;
  bankAuth: boolean;
  isRecruiter: boolean;
  balance: number;
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "farm";
  description: string;
  amount: number;
  date: string;
  time: string;
  citizenid?: string;
  created_at?: number;
}

export interface BlacklistMember {
  id: string;
  name: string;
  reason: string;
  bannedBy: string;
  date: string;
  severity: "critical" | "high" | "medium";
}

export interface CurrentPlayer {
  citizenid: string;
  name: string;
  phone?: string;
}

export type RewardType = "per_unit" | "fixed";

export interface FarmConfig {
  enabled: boolean;
  dailyGoal: number;
  rewardType: RewardType;
  rewardPerUnit: number;
  rewardFixed: number;
  itemsAllowed: { name: string; min_qty?: number }[];
}

export interface FarmProgress {
  date: string;
  currentQuantity: number;
  rewardClaimed: boolean;
  dailyGoal: number;
  rewardType: RewardType;
  rewardPerUnit: number;
  rewardFixed: number;
  potentialReward: number;
}

export interface ClaimFarmRewardResponse {
  success: boolean;
  message: string;
  reward?: number;
  newBalance?: number;
  progress?: FarmProgress;
}

export interface BankOperationResponse {
  success: boolean;
  message: string;
  newBalance?: number;
}

export interface Member {
  citizenid: string;
  name: string;
  gradeName: string;
  grade: number;
  online: boolean;
  deliveries: number;
  playtime: number;
  weeklyTotal?: number;
  dailyTotal?: number;
  recruited: number;
  mugshot_url?: string;
}

export interface Overview {
  orgName: string;
  label: string;
  balance: number;
  onlineCount: number;
  totalMembers: number;
  rating: number;
  ratingCount: number;
  myGrade: number;
  myGradeName: string;
}

export interface PlayerInfo {
  id: string;
  name: string;
  level: number;
  playtime: number;
  online: boolean;
  vip: boolean;
  vipType?: string;
}

export interface FarmRankingEntry {
  rank: number;
  citizenid: string;
  name: string;
  total: number;
}

export interface RecruitmentStat {
  citizenid: string;
  total: number;
}

export interface RetentionMetric {
  period: string;
  retention: number;
  total: number;
}

export interface SecurityLog {
  type: string;
  message: string;
  time: string;
  date: string;
}

export interface BlockedTodayCount {
  count: number;
}

export interface StandardResponse {
  success: boolean;
  message?: string;
}

// Farms
export interface FarmDelivery {
  id: string;
  citizenid: string;
  name: string;
  quantity: number;
  item_name: string;
  delivered_at: number;
  date: string;
  time: string;
}

export interface FarmStats {
  totalWeekly: number;
  avgDaily: number;
  attendanceRate: number;
  deliveriesToday: number;
}

export interface MemberWeeklyAttendance {
  citizenid: string;
  name: string;
  weekly: boolean[]; // [seg, ter, qua, qui, sex, sab, dom]
  total: number;
}

// Recruitment
export interface RecruiterStats {
  citizenid: string;
  name: string;
  recruited: number;
  retention1d: number;
  retention7d: number;
  retention14d: number;
  retention30d: number;
}

export interface NewMember {
  citizenid: string;
  name: string;
  recruiterName: string;
  joinDate: string;
  joinTimestamp: number;
  active: boolean;
  daysInOrg: number;
}

export interface RecruitmentOverview {
  newLast1d: number;
  newLast7d: number;
  newLast14d: number;
  newLast30d: number;
  avgMonthly: number;
  retention1d: number;
  retention7d: number;
  retention14d: number;
  retention30d: number;
}