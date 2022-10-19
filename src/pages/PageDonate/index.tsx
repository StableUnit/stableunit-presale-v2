import React from "react";

import { GovernanceChart } from "pages/PageDonate/_supportComponents/GovernanceChart";
import { Donate } from "./_supportComponents/Donate";

import "./styles.scss";
import { VestingTerms } from "./_supportComponents/VestingTerms";

export const PageDonate = () => {
    return (
        <div className="profile-donate">
            <div className="profile-donate__content">
                <GovernanceChart />
                <Donate />
            </div>
            <VestingTerms />
        </div>
    );
};
