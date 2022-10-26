import { SupportedTokensType } from "./currency";

export type LinkType = {
    href: string;
    text: string;
    isDesktop: boolean;
    isMobile: boolean;
};

export type DistributionDataType = {
    startTimestamp: number;
    deadlineTimestamp: number;
    minimumDonation: string;
    maximumDonation: string;
    donationGoalMin: string;
    donationGoalMax: string;
    donationToken: string;
    fullVestingSeconds: number;
    cliffSeconds: number;
    tgeUnlockRatio1e18: string;
    vestingFrequencySeconds: number;
};

export type DistributionDataTypeExpanded = DistributionDataType & {
    decimals: number;
    symbol: SupportedTokensType;
};

export type TokenMetadata = {
    address: string;
    symbol: string;
    decimals: number;
    image?: string;
};

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;
