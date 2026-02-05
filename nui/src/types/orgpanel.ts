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

