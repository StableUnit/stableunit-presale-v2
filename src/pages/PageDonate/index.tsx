import React from "react";

import { PriceChart } from "./_supportComponents/PriceChart";
import { Donate } from "./_supportComponents/Donate";
import { VestingTerms } from "./_supportComponents/VestingTerms";

import "./styles.scss";

export const PageDonate = () => {
    return (
        <div className="profile-donate">
            <div className="profile-donate__content">
                <PriceChart />
                <Donate />
            </div>
            <VestingTerms />
        </div>
    );
};
