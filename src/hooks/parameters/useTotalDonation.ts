import { DistributorFactory } from "utils/api";
import { toHRNumber } from "utils/bigNumber";

import { useParameter } from "./useParameter";

export const useTotalDonation = () => {
    const totalDonationBN = useParameter("totalDistribution", () => DistributorFactory.getTotalDonation());

    return {
        totalDonationBN,
        totalDonation: totalDonationBN ? toHRNumber(totalDonationBN, 18) : 0,
    };
};
