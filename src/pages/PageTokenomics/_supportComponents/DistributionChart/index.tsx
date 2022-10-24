import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import { ContentWithDot } from "ui-kit";
import { InfoContainer } from "components/InfoContainer";
import { COLORS } from "utils/chart";

import "./styles.scss";

export const DistributionChart = () => {
    const data = [
        { name: "Investors", value: 19 },
        { name: "Ecosystem growth & rewards", value: 28 },
        { name: "Development", value: 24 },
        { name: "DAO treasury", value: 29 },
    ];

    return (
        <InfoContainer
            title="Collateral structure"
            className="collateral-chart"
            classNameContent="collateral-chart__content"
        >
            <div className="collateral-chart__legend">
                {data.map(({ name }, index) => (
                    <ContentWithDot
                        key={name}
                        className="collateral-chart__legend__name"
                        color={COLORS[index % COLORS.length]}
                    >
                        {name}
                    </ContentWithDot>
                ))}
            </div>
            <PieChart width={150} height={150}>
                <Tooltip />
                <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={75} innerRadius={40} dataKey="value">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </InfoContainer>
    );
};
