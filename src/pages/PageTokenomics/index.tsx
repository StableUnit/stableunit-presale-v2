import React from "react";

import "./styles.scss";
import { SupplyChartInSegments } from "./_supportComponents/SupplyChartInSegments";
import { SupplyChart } from "./_supportComponents/SupplyChart";
import { DistributionChart } from "./_supportComponents/DistributionChart";

export const PageTokenomics = () => {
    return (
        <div className="profile-tokenomics">
            <div className="profile-tokenomics__title">Tokenimics</div>
            <SupplyChartInSegments />
            <SupplyChart />
            <DistributionChart />
        </div>
    );
};
