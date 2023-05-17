export interface ITierUser {
  currentExp: number;
  currentTier: string;
  nextExp: number;
  expExpiration: string;
  tierList: ITierStep[];
}

export interface ITierStep {
  image: string;
  name: string;
  rewards: IRewardTierStep[];
  exp: number;
}

interface IRewardTierStep {
  name: string;
  description: string;
}
