import React from "react";
import cn from "classnames";
import ArrowBackIcon from "@rsuite/icons/ArowBack";

import "./styles.scss";

interface ButtonProps {
    id?: string;
    className?: string;
    text?: string;
    disabled?: boolean;
    onClick?: () => void;
}

export const BackButton = ({ id, onClick, text, className, disabled }: ButtonProps) => (
    <div
        id={id}
        className={cn("back-button", className, { "button--disabled": disabled })}
        onClick={disabled ? undefined : onClick}
    >
        <ArrowBackIcon />
        <div className="back-button__text">{text ?? "Back"}</div>
    </div>
);
