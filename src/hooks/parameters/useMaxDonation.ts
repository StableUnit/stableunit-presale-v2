import { useContext } from "react";

import { StateContext } from "reducer/constants";
import { CommonFactory, DistributorFactory } from "utils/api";
import { getAddress, getDecimals, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";
import { useAccessNFTs } from "./useAccessNFTs";

export const useMaxDonation = () => {
    const { currentAddress, distributionStaticData } = useContext(StateContext);
    const accessNFTs = useAccessNFTs();
    const maxDonationBN = useParameter(
        `maxDonation ${currentAddress}`,
        () => DistributorFactory.getMaximumDonationAmount(accessNFTs),
        accessNFTs
    );

    return {
        maxDonationBN,
        maxDonation:
            distributionStaticData?.decimals && maxDonationBN
                ? toHRNumber(maxDonationBN, distributionStaticData.decimals)
                : 0,
    };
};
