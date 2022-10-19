import React, { useState } from "react";

import { ButtonGradient, GradientBorder, ProgressBar, Tooltip } from "ui-kit";
import { TokenInput } from "components/TokenInput";
import { useGlobalUpdate } from "hooks/useGlobalUpdate";

import "./styles.scss";

export const Donate = () => {
    const { update } = useGlobalUpdate();
    const [isApproved, setIsApproved] = useState(false);
    const [tokenValue, setTokenValue] = useState<number>();

    const currentDonation = 150000;
    const goal = 1000000;
    const percent = (currentDonation / goal) * 100;

    const handleTokenValueChange = (newTokenValue?: number) => {
        setTokenValue(newTokenValue);
    };

    const handleApprove = async () => {
        console.log("Approve");
    };

    const handleContribute = async () => {
        console.log("Donate");
        update();
    };

    // const getContractInfo = async () => {
    //     if (currentAddress && web3) {
    //         const tokenAddress = "0xfffffffff615bee8d0c7d329ebe0d444ab46ee5a";
    //         const contract = new web3.eth.Contract(CONTRACT_ERC20 as any, tokenAddress);
    //         const balance = await contract.methods.balanceOf(currentAddress).call();
    //         console.log(balance);
    //     }
    // };
    //
    // useEffect(() => {
    //     getContractInfo();
    // }, [currentAddress, web3]);

    return (
        <GradientBorder borderRadius={24} className="donate-container">
            <div className="donate">
                <div className="donate__section">
                    <div className="donate__section__title">Start</div>
                    <div className="donate__section__description">26 October 2022</div>
                </div>
                <div className="donate__section">
                    <div className="donate__section__title">End</div>
                    <div className="donate__section__description">07 November 2022</div>
                </div>

                <div className="donate__section">
                    <div className="donate__section__title">
                        Goal&nbsp;
                        <Tooltip id="goal">
                            <span>Percent of IDO goal</span>
                        </Tooltip>
                    </div>
                    <ProgressBar className="donate__progress-bar" percent={percent} />
                </div>

                <TokenInput
                    className="donate__token-input"
                    isTokenFixed
                    tokenName="DAI"
                    onValueChange={handleTokenValueChange}
                    value={tokenValue}
                />

                <div className="donate__subtitle">1000 USDC minimum donation</div>

                <div className="donate__section">
                    <div className="donate__section__title">Total VeSuDAO reward</div>
                    <div className="donate__section__description--large">0</div>
                </div>

                <div className="donate__button-container">
                    <ButtonGradient disabled={isApproved} className="donate__button" onClick={handleApprove}>
                        Approve
                    </ButtonGradient>
                    <ButtonGradient disabled={!isApproved} className="donate__button" onClick={handleContribute}>
                        Contribute
                    </ButtonGradient>
                </div>
            </div>
        </GradientBorder>
    );
};
