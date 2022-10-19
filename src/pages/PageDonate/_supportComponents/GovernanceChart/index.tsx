import React from "react";
import { PieChart, Pie, Cell } from "recharts";

import { ContentWithDot } from "ui-kit";
import { InfoContainer } from "components/InfoContainer";
import { COLORS } from "utils/chart";

import "./styles.scss";

export const GovernanceChart = () => {
    const data = [
        { name: "A-NFT", value: 33 },
        { name: "C-NFT", value: 33 },
        { name: "OG-NFT", value: 33 },
    ];

    return (
        <InfoContainer
            title="Rewards per donations"
            className="governance-chart"
            classNameContent="governance-chart__content"
        >
            <div className="governance-chart__legend">
                {data
                    ? data.map(({ name }, index) => (
                          <ContentWithDot
                              key={name}
                              className="governance-chart__legend__name"
                              color={COLORS[index % COLORS.length]}
                          >
                              {name}
                          </ContentWithDot>
                      ))
                    : "No data"}
            </div>
            <PieChart width={150} height={150}>
                <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={75} innerRadius={40} dataKey="value">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </InfoContainer>
    );
};
