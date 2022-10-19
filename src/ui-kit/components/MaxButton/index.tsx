import React from "react";

import "./styles.scss";

interface MaxButtonProps {
    onClick?: () => void;
}

export const MaxButton = ({ onClick }: MaxButtonProps) => {
    return (
        <div className="max-button" onClick={onClick}>
            MAX
        </div>
    );
};
