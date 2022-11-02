import { useContext } from "react";

import { StateContext } from "reducer/constants";
import { CommonFactory, DistributorFactory } from "utils/api";
import { getAddress, getDecimals, SupportedTokensType } from "utils/currency";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useBonusRewarded = () => {
    const { chainId } = useContext(StateContext);
    const bonusRewardedBN = useParameter(`bonusRewarded`, DistributorFactory.getBonusRewarded, chainId);

    return {
        bonusRewardedBN,
        bonusRewarded: bonusRewardedBN ? toHRNumber(bonusRewardedBN, 18) : 0,
    };
};
