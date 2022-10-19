import React from "react";
import { NavLink } from "react-router-dom";

import tokenLogo from "ui-kit/images/currency/USDPro.svg";

import "./styles.scss";

export const USDProInfo = () => {
    const discount = 20;
    const allocation = 15000;

    return (
        <div className="usd-pro-info">
            <NavLink to="/">
                <img src={tokenLogo} width={48} height={48} />
            </NavLink>
            <div className="usd-pro-info__info">
                Bonus:
                <span className="usd-pro-info__info__details">
                    {discount}% Discount ; {allocation.toLocaleString()} USDC Allocation
                </span>
            </div>
        </div>
    );
};
