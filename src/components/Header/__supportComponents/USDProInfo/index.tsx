import React from "react";
import { NavLink } from "react-router-dom";

import { useBonus } from "hooks";
import tokenLogo from "ui-kit/images/currency/USDPro.svg";

import "./styles.scss";

export const USDProInfo = () => {
    const { allocationNFT, discountNFT, allocationUser, discountUser } = useBonus();

    const allocation = Math.max(allocationUser ?? 0, allocationNFT ?? 0);
    const discount = Math.max(discountUser ?? 0, discountNFT ?? 0);

    return (
        <div className="usd-pro-info">
            <NavLink to="/">
                <img src={tokenLogo} width={48} height={48} />
            </NavLink>
            {allocation || discount ? (
                <div className="usd-pro-info__info">
                    Bonus:
                    <span className="usd-pro-info__info__details">
                        {discount ?? 0}% Discount ; {allocation?.toLocaleString() ?? 0} USDC Allocation
                    </span>
                </div>
            ) : null}
        </div>
    );
};
