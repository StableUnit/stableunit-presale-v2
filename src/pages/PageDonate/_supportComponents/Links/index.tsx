import React from "react";

import { GradientBorder, GradientHref } from "ui-kit";
import { getEtherscanAddress } from "utils/network";

import "./styles.scss";

export const Links = () => {
    return (
        <GradientBorder borderRadius={24} className="links-container">
            <div className="links">
                <div className="links__title">Links</div>
                <div className="links__section">
                    <GradientHref
                        target="_blank"
                        href={getEtherscanAddress("0x666666679eb68ffef7244859a2016B0D28664998")}
                    >
                        VeSuDAOv2
                    </GradientHref>
                    <GradientHref
                        target="_blank"
                        href={getEtherscanAddress("0x77777775EafA272a49Da81b74f832f45dFe0917B")}
                    >
                        SuDAOv2
                    </GradientHref>
                    <GradientHref
                        target="_blank"
                        href={getEtherscanAddress("0x555555ABe05BE44e1e70DB3206f0b71B1082de2f")}
                    >
                        SuDAOUpgrader
                    </GradientHref>
                    <GradientHref
                        target="_blank"
                        href={getEtherscanAddress("0x7bF6b2E5C70bd2F3e8CbE51635bB5b40f5E86e02")}
                    >
                        SuDAO
                    </GradientHref>
                </div>
            </div>
        </GradientBorder>
    );
};
