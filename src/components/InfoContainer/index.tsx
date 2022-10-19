import React from "react";
import cn from "classnames";

import "./styles.scss";

interface InfoContainerProps {
    children: React.ReactNode;
    title: string;
    className?: string;
    classNameContent?: string;
}

export const InfoContainer = ({ children, title, className, classNameContent }: InfoContainerProps) => (
    <div className={cn("info-container", className)}>
        <div className="info-container__title">{title}</div>
        <div className={cn("info-container__content", classNameContent)}>{children}</div>
    </div>
);
