import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { useBalance } from "hooks";
import { GradientHref } from "ui-kit";
import { StateContext } from "reducer/constants";
import tokenLogo from "ui-kit/images/currency/USDPro.svg";
import { MetamaskIcon } from "ui-kit/images/icons";
import { addToMetamask, getTokenByName } from "utils/currency";

import "./styles.scss";

export const USDProInfo = () => {
    const { currentAddress, chainId } = useContext(StateContext);
    const { balance } = useBalance("veSuDAO");

    const handleAddVeSuDAO = () => {
        const tokenMetadata = getTokenByName("veSuDAO", chainId);
        if (tokenMetadata) {
            addToMetamask({
                ...tokenMetadata,
                image: "https://stableunit.org/assets/img/logo.svg",
            });
        }
    };

    return (
        <div className="usd-pro-info">
            <NavLink to="/">
                <img src={tokenLogo} width={48} height={48} />
            </NavLink>
            <div className="usd-pro-info__info">
                {currentAddress && (
                    <>
                        <GradientHref className="usd-pro-info__info__title" onClick={handleAddVeSuDAO}>
                            <span>veSuDAO</span>
                            <MetamaskIcon />
                        </GradientHref>
                        <div className="usd-pro-info__info__description">{balance.toLocaleString()}</div>
                    </>
                )}
            </div>
        </div>
    );
};
