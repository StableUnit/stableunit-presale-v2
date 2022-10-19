import React from "react";
import cn from "classnames";

import "./styles.scss";

type Props = {
    className?: string;
    percent: number;
};

export const ProgressBar = ({ className, percent }: Props) => {
    return (
        <div className={cn("progress-bar-container", className)}>
            <div className="progress-bar" style={{ width: `${percent}%` }} />
            <div className="progress-bar__percent">{percent.toFixed(1)}%</div>
        </div>
    );
};
