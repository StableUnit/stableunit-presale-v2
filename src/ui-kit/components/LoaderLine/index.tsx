import React from "react";
import cn from "classnames";

import "./styles.scss";

interface LoaderLineProps {
    width?: number;
    height?: number;
    borderRadius?: number;
    className?: string;
}

export const LoaderLine = ({ width = 80, height = 12, borderRadius = 4, className }: LoaderLineProps) => (
    <div className={cn("loader-line", className)} style={{ width, height, borderRadius }} />
);
