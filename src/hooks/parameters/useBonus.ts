import { useContext, useEffect, useState } from "react";
import BigNumber from "bignumber.js";

import { StateContext } from "reducer/constants";
import { toHRNumber } from "utils/bigNumber";
import { BonusFactory } from "utils/api";
import { useAccessNFTs } from "./useAccessNFTs";

export const useBonus = () => {
    const { distributionStaticData } = useContext(StateContext);
    const accessNFTs = useAccessNFTs();
    const [allocationNFTBN, setAllocationNFTBN] = useState<BigNumber>();
    const [discountNFTBN, setDiscountNFTBN] = useState<BigNumber>();
    // const [allocationUserBN, setAllocationUserBN] = useState<BigNumber>();
    // const [discountUserBN, setDiscountUserBN] = useState<BigNumber>();

    const updateData = async () => {
        if (accessNFTs && accessNFTs.length > 0) {
            if (!allocationNFTBN && !discountNFTBN) {
                console.log(accessNFTs[0]);
                // setAllocationUserBN(await BonusFactory.getAllocation(currentAddress));
                // setDiscountUserBN(await BonusFactory.getDiscount(currentAddress));
                setAllocationNFTBN(await BonusFactory.getNftAllocation(accessNFTs[0]));
                setDiscountNFTBN(await BonusFactory.getNftDiscount(accessNFTs[0]));
            }
        } else {
            setAllocationNFTBN(undefined);
            setDiscountNFTBN(undefined);
        }
    };

    useEffect(() => {
        updateData();
    }, [accessNFTs]);

    return {
        allocationNFT:
            allocationNFTBN && distributionStaticData
                ? toHRNumber(allocationNFTBN, distributionStaticData.decimals)
                : undefined,
        discountNFT: discountNFTBN ? toHRNumber(discountNFTBN.multipliedBy(100), 18) : undefined,
        // allocationUser: allocationBN ? toHRNumber(allocationBN, 18) : undefined,
        // discountUser: discountBN ? toHRNumber(discountBN.multipliedBy(100), 18) : undefined,
    };
};
