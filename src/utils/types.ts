import { SupportedTokensType } from "./currency";

export type LinkType = {
    href: string;
    text: string;
    isDesktop: boolean;
    isMobile: boolean;
};

export type DistributionDataType = {
    startTimestamp_: number;
    deadlineTimestamp_: number;
    minimumDonation_: string;
    maximumDonation_: string;
    donationGoalMin_: string;
    donationGoalMax_: string;
    donationToken_: string;
    fullVestingSeconds_: number;
    cliffSeconds_: number;
    tgeUnlockRatio1e18_: string;
    vestingFrequencySeconds_: number;
};

export type DistributionDataTypeNormal = {
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

export const mapDistributionData = (data: DistributionDataType) =>
    ({
        startTimestamp: data.startTimestamp_,
        deadlineTimestamp: data.deadlineTimestamp_,
        minimumDonation: data.minimumDonation_,
        maximumDonation: data.maximumDonation_,
        donationGoalMin: data.donationGoalMin_,
        donationGoalMax: data.donationGoalMax_,
        donationToken: data.donationToken_,
        fullVestingSeconds: data.fullVestingSeconds_,
        cliffSeconds: data.cliffSeconds_,
        tgeUnlockRatio1e18: data.tgeUnlockRatio1e18_,
        vestingFrequencySeconds: data.vestingFrequencySeconds_,
    } as DistributionDataTypeNormal);

export type DistributionDataTypeExpanded = DistributionDataTypeNormal & {
    decimals: number;
    symbol: SupportedTokensType | undefined;
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
