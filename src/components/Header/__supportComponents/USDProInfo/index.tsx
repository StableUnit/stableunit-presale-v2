import React from "react";
import { NavLink } from "react-router-dom";

import { useBonus } from "hooks";
import tokenLogo from "ui-kit/images/currency/USDPro.svg";

import "./styles.scss";

export const USDProInfo = () => {
    const { allocationNFT, discountNFT } = useBonus();

    return (
        <div className="usd-pro-info">
            <NavLink to="/">
                <img src={tokenLogo} width={48} height={48} />
            </NavLink>
            {allocationNFT || discountNFT ? (
                <div className="usd-pro-info__info">
                    Bonus:
                    <span className="usd-pro-info__info__details">
                        {discountNFT ?? 0}% Discount ; {allocationNFT?.toLocaleString() ?? 0} USDC Allocation
                    </span>
                </div>
            ) : null}
        </div>
    );
};
