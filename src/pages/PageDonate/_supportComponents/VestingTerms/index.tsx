import React, { useContext } from "react";
import BigNumber from "bignumber.js";

import { LoaderLine } from "ui-kit";
import { InfoContainer } from "components/InfoContainer";
import { StateContext } from "reducer/constants";
import { toHRNumber } from "utils/bigNumber";
import { MONTH } from "utils/time";

import "./styles.scss";

const VestingTermsLoading = () => (
    <InfoContainer title="Vesting terms" className="vesting-terms" classNameContent="vesting-terms__content">
        <ul className="vesting-terms__list">
            <li>
                <LoaderLine />
            </li>
            <li>
                <LoaderLine />
            </li>
            <li>
                <LoaderLine />
            </li>
        </ul>
    </InfoContainer>
);

export const VestingTerms = () => {
    const { distributionStaticData } = useContext(StateContext);

    if (!distributionStaticData) {
        return <VestingTermsLoading />;
    }

    const claimable = toHRNumber(new BigNumber(distributionStaticData.tgeUnlockRatio1e18).multipliedBy(100), 18);
    const endTimestamp =
        Number(distributionStaticData.startTimestamp) + Number(distributionStaticData.fullVestingSeconds);
    const lockupMonths = Math.round(distributionStaticData.cliffSeconds / MONTH);
    const vestingMonths = Math.round(distributionStaticData.fullVestingSeconds / MONTH);

    return (
        <InfoContainer title="Vesting terms" className="vesting-terms" classNameContent="vesting-terms__content">
            <ul className="vesting-terms__list">
                <li>
                    {claimable}% Claimable at the donation campaign (No later than the{" "}
                    {new Date(endTimestamp * 1000).toLocaleDateString()})
                </li>
                <li>{lockupMonths} months lock up</li>
                <li>{vestingMonths} Months</li>
            </ul>
        </InfoContainer>
    );
};
