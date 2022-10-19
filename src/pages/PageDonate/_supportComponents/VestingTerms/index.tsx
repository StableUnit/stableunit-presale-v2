import React from "react";

import { InfoContainer } from "components/InfoContainer";

import "./styles.scss";

export const VestingTerms = () => {
    const claimable = 5;
    const idoEndTimestamp = 1685677600000;
    const lockupMonths = 6;
    const vestingMonths = 18;

    return (
        <InfoContainer title="Vesting terms" className="vesting-terms" classNameContent="vesting-terms__content">
            <ul className="vesting-terms__list">
                <li>
                    {claimable}% Claimable at the IDO (No later than the{" "}
                    {new Date(idoEndTimestamp).toLocaleDateString()})
                </li>
                <li>{lockupMonths} months lock up</li>
                <li>{vestingMonths} Months</li>
            </ul>
        </InfoContainer>
    );
};
