import React from "react";

import "./styles.scss";
import { SupplyChart } from "./_supportComponents/SupplyChart";
import { DistributionChart } from "./_supportComponents/DistributionChart";

export const PageTokenomics = () => {
    return (
        <div className="profile-tokenomics">
            <div className="profile-tokenomics__title">Tokenimics</div>
            <SupplyChart />
            <DistributionChart />
        </div>
    );
};
