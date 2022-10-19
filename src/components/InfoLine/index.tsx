import React from "react";
import cn from "classnames";

import "./styles.scss";

interface InfoLineProps {
    title: string;
    value: string;
    color?: "green" | "red";
    className?: string;
    size?: "m" | "s";
}

export const InfoLine = ({ title, value, color, className, size = "m" }: InfoLineProps) => (
    <div className={cn("info-line", `info-line-${size}`, className)}>
        <div className="info-line__title">{title}</div>
        <div className={cn("info-line__value", color && `${color}-color`)}>{value}</div>
    </div>
);
