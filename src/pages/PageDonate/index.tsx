import React from "react";

import { PriceChart } from "./_supportComponents/PriceChart";
import { Donate } from "./_supportComponents/Donate";
import { VestingTerms } from "./_supportComponents/VestingTerms";

import "./styles.scss";

interface Props {
    onConnect: () => void;
}

export const PageDonate = ({ onConnect }: Props) => {
    return (
        <div className="profile-donate">
            <div className="profile-donate__content">
                <PriceChart />
                <Donate onConnect={onConnect} />
            </div>
            <VestingTerms />
        </div>
    );
};
