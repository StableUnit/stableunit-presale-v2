import React from "react";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from "recharts";

interface TooltipProps {
    label: number;
    active: boolean;
}

const CustomTooltip = ({ active, label }: TooltipProps) => {
    if (active) {
        const distribution = getDistribution(label);
        const distributionOld = getDistribution(label - 1);

        return (
            <div className="supply-chart__custom-tooltip">
                <p>Month: {label.toLocaleString()}</p>
                <p>Total supply: {distribution.supply.toLocaleString()}</p>
                <p>Investors: {distribution.investors.toLocaleString()}</p>
                <p>Ecosystem growth & rewards: {distribution.ecosystem.toLocaleString()}</p>
                <p>Development: {distribution.dev.toLocaleString()}</p>
                <p>DAO treasury: {distribution.treasury.toLocaleString()}</p>
            </div>
        );
    }

    return null;
};

const getSupply = (x: number) => {
    if (x < 48) {
        return x * 333333;
    }

    let res = 16000000;
    for (let i = 0; i < x - 48; i += 1) {
        const step = 2 ** (Math.floor(i / 48) + 1);
        res += 5000000 / step / 48;
    }
    return res;
};

// TODO: add real supply
const getDistribution = (n: number) => {
    const supply = getSupply(n);

    return {
        supply,
        months: n,
        investors: 0.19 * supply,
        ecosystem: 0.28 * supply,
        dev: 0.24 * supply,
        treasury: 0.29 * supply,
    };
};

export const SupplyChartInSegments = () => {
    const data = new Array(4 * 12).fill(0).map((_, i) => getDistribution(i + 1));

    return (
        <div className="supply-chart">
            <div className="info-container__title">Supply chart (first 4 years)</div>
            <div className="supply-chart__content">
                <BarChart
                    width={1000}
                    height={500}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    {/* @ts-ignore */}
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid vertical={false} stroke="#313131" />
                    <XAxis label={{ value: "Months", position: "bottom", offset: 0 }} dataKey="months" />
                    <YAxis type="number" label={{ value: "Total supply", angle: -90, position: "insideLeft" }} />
                    <Bar type="monotone" dataKey="investors" stackId="1" fill="#FC7557" />
                    <Bar type="monotone" dataKey="dev" stackId="1" fill="#82ca9d" />
                    <Bar type="monotone" dataKey="ecosystem" stackId="1" fill="#ffc658" />
                    <Bar type="monotone" dataKey="treasury" stackId="1" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
};
