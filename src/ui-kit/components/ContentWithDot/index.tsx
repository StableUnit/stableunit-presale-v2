import React from "react";
import cn from "classnames";

import "./styles.scss";

interface ContentWithDotProps {
    color: string;
    className?: string;
    children?: React.ReactNode;
}

export const ContentWithDot = ({ color, children, className, ...props }: ContentWithDotProps) => {
    return (
        <div className={cn("content-with-dot", className)} {...props}>
            <div className="content-with-dot__dot" style={{ backgroundColor: color }} />
            <div className="content-with-dot__content">{children}</div>
        </div>
    );
};
