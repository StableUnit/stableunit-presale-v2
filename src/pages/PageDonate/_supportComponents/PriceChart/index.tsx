import React from "react";
import { ComposedChart, Line, XAxis, YAxis, Area, CartesianGrid, Tooltip } from "recharts";
import { useTotalDonation } from "hooks";

import "./styles.scss";

const getPrice = (x: number) => {
    if (x < 1e6) {
        return 1 / (0.9 + x * (0.15 * 1e-6) + x * x * (0.15 * 1e-12));
    }
    // return 750000000000000 / x ** 2.5;
    return 830000000000000000 / x ** 3;
    // return 25000000000 / x ** 1.8;
    // return 250000000 / x ** 1.5;
};

const DOT_STEP = 10000;

type DataType = {
    supply: number;
    rewardRatePast: number;
    rewardRateFuture: number;
};

interface DotProps {
    payload: DataType;
    cx: number;
    cy: number;
    stroke: string;
    value: any;
}

interface TooltipProps {
    label: number;
    active: boolean;
}

const CustomTooltip = ({ active, label }: TooltipProps) => {
    const totalSuUSD = 0;

    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="donation">Donation count: {label.toLocaleString()}</p>
                <p className="rewards">Reward per donation: {getPrice(label).toFixed(4).toLocaleString()}</p>
                <p className="rewards">Total SuUSD: {totalSuUSD}</p>
            </div>
        );
    }

    return null;
};

const CustomTooltip2 = ({ active, payload }: any) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="donation">Sum: {payload[0].payload.sum}</p>
                <p className="rewards">Price: {payload[0].payload.price}</p>
            </div>
        );
    }

    return null;
};

export const PriceChart = () => {
    const { totalDonation } = useTotalDonation();
    const currentSupplyPrice = getPrice(totalDonation);
    const data2 = [{ price: 0, sum: 0 }];
    const data = new Array(401).fill(0).map((_, i) => {
        const dotSupply = i * DOT_STEP;
        const isBeforeCurrentSupply = dotSupply < totalDonation;
        const price = getPrice(dotSupply);
        data2.push({ price: 1 / price, sum: data2[data2.length - 1].sum + price * DOT_STEP });

        return {
            supply: dotSupply,
            rewardRatePast: isBeforeCurrentSupply ? price : null,
            rewardRateFuture: isBeforeCurrentSupply ? null : price,
        };
    });

    data.push({ supply: totalDonation, rewardRatePast: currentSupplyPrice, rewardRateFuture: currentSupplyPrice });
    data.sort((a, b) => a.supply - b.supply);

    return (
        <div className="price-chart">
            <div className="info-container__title">Rewards per donation</div>
            <div className="price-chart__content">
                <ComposedChart
                    width={700}
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
                    <XAxis
                        type="number"
                        label={{ value: "Donations", position: "bottom", offset: 0 }}
                        dataKey="supply"
                    />
                    <YAxis type="number" label={{ value: "Reward rate", angle: -90, position: "insideLeft" }} />
                    <Line type="monotone" dataKey="rewardRatePast" stroke="#7A7A7A" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="rewardRateFuture" stroke="#7A7A7A" strokeWidth={2} dot={false} />
                    <Area
                        type="monotone"
                        dataKey="rewardRatePast"
                        stroke=""
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorUv)"
                    />
                </ComposedChart>

                <ComposedChart
                    width={700}
                    height={500}
                    data={data2}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <Tooltip content={<CustomTooltip2 />} />
                    <CartesianGrid vertical={false} stroke="#313131" />
                    <XAxis type="number" label={{ value: "Sum", position: "bottom", offset: 0 }} dataKey="sum" />
                    <YAxis type="number" label={{ value: "Price", angle: -90, position: "insideLeft" }} />
                    <Line type="monotone" dataKey="price" stroke="#7A7A7A" strokeWidth={2} dot={false} />
                </ComposedChart>
            </div>
        </div>
    );
};
