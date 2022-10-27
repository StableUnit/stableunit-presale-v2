import React, { useState } from "react";
import cn from "classnames";
import { ComposedChart, Line, XAxis, YAxis, Area, CartesianGrid, Tooltip } from "recharts";
import { useTotalDonation } from "hooks";
import { GradientHref } from "ui-kit";

import "./styles.scss";

const getPrice = (x: number) => {
    if (x < 1e6 * 1.1) {
        return 1.1 - x * 1e-7 * 3;
    }
    return 1000000000000000000 / x ** 3;
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
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="donation">Donation count: {label.toLocaleString()}</p>
                <p className="rewards">Reward per donation: {getPrice(label).toFixed(3).toLocaleString()}</p>
            </div>
        );
    }

    return null;
};

const CustomTooltipPrice = ({ active, payload }: any) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="donation">Total SuDAO tokens: {(+payload[0].payload.sum.toFixed(2)).toLocaleString()}</p>
                <p className="rewards">SuDAO per USD: {payload[0].payload.price.toFixed(3).toLocaleString()}</p>
            </div>
        );
    }

    return null;
};

export const PriceChart = () => {
    const [selectedTab, setSelectedTab] = useState<"rewards" | "price">("rewards");
    const { totalDonation } = useTotalDonation();
    const currentSupplyPrice = getPrice(totalDonation);
    const dataPrice = [] as { sum: number; price: number }[];
    const data = new Array(201).fill(0).map((_, i) => {
        const dotSupply = i * DOT_STEP;
        const isBeforeCurrentSupply = dotSupply < totalDonation;
        const price = getPrice(dotSupply);
        dataPrice.push({
            price: 1 / price,
            sum: (dataPrice.length ? dataPrice[dataPrice.length - 1].sum : 0) + price * DOT_STEP,
        });

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
            <div className="price-chart__navbar">
                <GradientHref
                    className={cn("price-chart__navbar__title", {
                        "price-chart__navbar__title--selected": selectedTab === "rewards",
                    })}
                    onClick={() => setSelectedTab("rewards")}
                >
                    Rewards per donation
                </GradientHref>
                <GradientHref
                    className={cn("price-chart__navbar__title", {
                        "price-chart__navbar__title--selected": selectedTab === "price",
                    })}
                    onClick={() => setSelectedTab("price")}
                >
                    Estimated Price
                </GradientHref>
            </div>
            <div className="price-chart__content">
                <div
                    className={cn("price-chart__content__chart", {
                        "price-chart__content__chart--visible": selectedTab === "rewards",
                    })}
                >
                    <ComposedChart
                        width={730}
                        height={450}
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
                </div>

                <div
                    className={cn("price-chart__content__chart", {
                        "price-chart__content__chart--visible": selectedTab === "price",
                    })}
                >
                    <ComposedChart
                        width={730}
                        height={450}
                        data={dataPrice}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <Tooltip content={<CustomTooltipPrice />} />
                        <CartesianGrid vertical={false} stroke="#313131" />
                        <XAxis type="number" label={{ value: "Sum", position: "bottom", offset: 0 }} dataKey="sum" />
                        <YAxis type="number" label={{ value: "Price", angle: -90, position: "insideLeft" }} />
                        <Line type="monotone" dataKey="price" stroke="#7A7A7A" strokeWidth={2} dot={false} />
                    </ComposedChart>
                </div>
            </div>
        </div>
    );
};
