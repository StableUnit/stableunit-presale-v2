import React, { useContext, useEffect, useState } from "react";

import { ButtonGradient, GradientBorder } from "ui-kit";
import { useEnoughAllowance, useGlobalUpdate, useLoader } from "hooks";
import { TokenInput } from "components/TokenInput";
import SuDAO from "contracts/SuDAO.json";
import { StateContext } from "reducer/constants";
import { CommonFactory, DistributorFactory } from "utils/api";
import { addErrorNotification, addSuccessNotification } from "utils/notification";
import { fromHRNumber } from "utils/bigNumber";

import "./styles.scss";

interface Props {
    onConnect: () => void;
}

export const Donate = ({ onConnect }: Props) => {
    const { currentAddress } = useContext(StateContext);
    const { update } = useGlobalUpdate();
    const [tokenValue, setTokenValue] = useState<number>();
    const { isEnoughAllowance, setIsEnoughAllowance } = useEnoughAllowance(SuDAO.address);
    const { isLoading: isApproveLoading, start: startApproveLoader, stop: stopApproveLoader } = useLoader();
    const { isLoading: isDonateLoading, start: startDonateLoader, stop: stopDonateLoader } = useLoader();
    const [rewards, setRewards] = useState(0);
    const [usdBalance, setUSDBalance] = useState(0);

    const handleTokenValueChange = (newTokenValue?: number) => {
        setTokenValue(newTokenValue);
    };

    const handleApprove = async () => {
        try {
            startApproveLoader();
            await CommonFactory.approve(SuDAO.address);
            setIsEnoughAllowance(true);
            addSuccessNotification("Approve finished successfully");
            stopApproveLoader();
        } catch (e) {
            addErrorNotification("Approve error", e.message);
            stopApproveLoader();
        }
    };

    const handleContribute = async () => {
        if (!tokenValue) return;
        try {
            startDonateLoader();
            await DistributorFactory.participate(fromHRNumber(tokenValue, 18));
            update();
            addSuccessNotification("Donate finished successfully");
            stopDonateLoader();
        } catch (e) {
            addErrorNotification("Donate error", e.message);
            stopDonateLoader();
        }
    };

    useEffect(() => {
        if (tokenValue !== undefined) {
            setRewards((tokenValue * 100 * 16) / 21);
        }
    }, [tokenValue]);

    const renderButtons = () => {
        if (!currentAddress) {
            return (
                <ButtonGradient className="donate__button" onClick={onConnect}>
                    Connect wallet
                </ButtonGradient>
            );
        }

        return (
            <>
                <ButtonGradient
                    loading={isApproveLoading}
                    disabled={isEnoughAllowance}
                    className="donate__button"
                    onClick={handleApprove}
                >
                    {isApproveLoading ? "Loading..." : "Approve"}
                </ButtonGradient>
                <ButtonGradient
                    loading={isDonateLoading}
                    disabled={!isEnoughAllowance || !tokenValue || tokenValue > usdBalance}
                    className="donate__button"
                    onClick={handleContribute}
                >
                    {isDonateLoading ? "Loading..." : "Contribute"}
                </ButtonGradient>
            </>
        );
    };

    return (
        <GradientBorder borderRadius={24} className="donate-container">
            <div className="donate">
                <TokenInput
                    onBalanceChange={(balance) => setUSDBalance(balance)}
                    className="donate__token-input"
                    isTokenFixed
                    tokenName="SuDAO"
                    onValueChange={handleTokenValueChange}
                    value={tokenValue}
                />

                <div className="donate__section" style={{ height: 42 }}>
                    <div className="donate__section__title">Total VeSuDAO reward</div>
                    <div className="donate__section__description--large">
                        {rewards.toLocaleString([], { maximumFractionDigits: 2 })}
                    </div>
                </div>

                <div className="donate__button-container">{renderButtons()}</div>
            </div>
        </GradientBorder>
    );
};
