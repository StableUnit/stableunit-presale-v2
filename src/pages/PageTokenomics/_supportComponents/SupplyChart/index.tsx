import React from "react";
import { ComposedChart, XAxis, YAxis, Area, CartesianGrid, Tooltip } from "recharts";

import "./styles.scss";

interface TooltipProps {
    label: number;
    active: boolean;
}

const CustomTooltip = ({ active, label }: TooltipProps) => {
    if (active) {
        const distribution = getDistribution(label);
        const distributionOld = getDistribution(label - 1);

        const diff = distribution.supply - distributionOld.supply;
        return (
            <div className="supply-chart__custom-tooltip">
                <p>Month: {label.toLocaleString()}</p>
                <p>Total supply: {distribution.supply.toLocaleString()}</p>
                <p>Month Inflation: {(diff / distribution.supply) * 100}</p>
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

const getDistribution = (n: number) => ({
    supply: getSupply(n),
    months: n,
});

export const SupplyChart = () => {
    const data = new Array(20 * 12).fill(0).map((_, i) => getDistribution(4 * 12 + i + 1));

    return (
        <div className="supply-chart">
            <div className="info-container__title">Supply chart (after 4 years)</div>
            <div className="supply-chart__content">
                <ComposedChart
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
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="-12%" stopColor="#DBB0FF" stopOpacity={1} />
                            <stop offset="24%" stopColor="#C2DCFF" stopOpacity={1} />
                            <stop offset="63%" stopColor="#B4FFE0" stopOpacity={1} />
                            <stop offset="82%" stopColor="#FEFBDA" stopOpacity={1} />
                            <stop offset="110%" stopColor="#FECBFF" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    {/* @ts-ignore */}
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid vertical={false} stroke="#313131" />
                    <XAxis label={{ value: "Months", position: "bottom", offset: 0 }} dataKey="months" />
                    <YAxis
                        domain={[16000000, 21000000]}
                        label={{ value: "Total supply", angle: -90, position: "insideLeft" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="supply"
                        stroke=""
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorUv)"
                    />
                </ComposedChart>
            </div>
        </div>
    );
};
