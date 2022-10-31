import { useContext } from "react";
import { StateContext } from "reducer/constants";
import { DistributorFactory } from "utils/api";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useTotalDonation = () => {
    const { distributionStaticData } = useContext(StateContext);
    const totalDonationBN = useParameter("totalDonation", DistributorFactory.getTotalDonation);

    return {
        totalDonationBN,
        totalDonation:
            totalDonationBN && distributionStaticData
                ? toHRNumber(totalDonationBN, distributionStaticData.decimals)
                : 0,
    };
};
