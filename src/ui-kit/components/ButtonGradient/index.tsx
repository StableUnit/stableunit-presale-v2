import React from "react";
import cn from "classnames";

import { GradientBorder } from "../GradientBorder";

import "./styles.scss";

interface ButtonGradientProps {
    className?: string;
    padding?: string;
    text?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    width?: number;
    id?: string;
    children?: React.ReactNode;
}

export const ButtonGradient = ({
    onClick,
    padding,
    text,
    className,
    disabled,
    loading,
    id,
    children,
    width,
    ...props
}: ButtonGradientProps) => {
    return (
        <GradientBorder className={`${className}-container`} borderRadius={80}>
            <div
                id={id}
                className={cn("button-gradient", className, {
                    "button-gradient--disabled": disabled,
                    "button-gradient--loading": loading,
                })}
                onClick={disabled ? undefined : onClick}
                style={{ padding, width }}
                {...props}
            >
                <div className={cn("button-gradient__content", { "button-gradient--loading": loading })}>
                    <div className="button-gradient__text">{children ?? text}</div>
                </div>
            </div>
        </GradientBorder>
    );
};
