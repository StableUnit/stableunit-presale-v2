import React, { useContext, useState } from "react";
import BigNumber from "bignumber.js";

import { ButtonGradient, GradientBorder, LoaderLine, ProgressBar, Tooltip } from "ui-kit";
import { useEnoughAllowance, useGlobalUpdate, useLoader, useTotalDonation } from "hooks";
import { TokenInput } from "components/TokenInput";
import { StateContext } from "reducer/constants";
import { getAddress } from "utils/currency";
import { CommonFactory, DistributorFactory } from "utils/api";
import { addSuccessNotification } from "utils/notification";
import { fromHRNumber, toHRNumber } from "utils/bigNumber";

import "./styles.scss";

export const Donate = () => {
    const { distributionStaticData, chainId } = useContext(StateContext);
    const { update } = useGlobalUpdate();
    const { totalDonationBN } = useTotalDonation();
    const [tokenValue, setTokenValue] = useState<number>();
    const tokenAddress = getAddress("DAI", chainId) as string;
    const { isEnoughAllowance, setIsEnoughAllowance } = useEnoughAllowance(tokenAddress);
    const { isLoading: isApproveLoading, start: startApproveLoader, stop: stopApproveLoader } = useLoader();
    const { isLoading: isDonateLoading, start: startDonateLoader, stop: stopDonateLoader } = useLoader();

    const startDate = new Date(distributionStaticData?.startTimestamp ?? 0).toLocaleDateString();
    const endDate = new Date(distributionStaticData?.deadlineTimestamp ?? 0).toLocaleDateString();

    const goal = new BigNumber(distributionStaticData?.donationGoalMin ?? 0);
    const percent = distributionStaticData ? totalDonationBN?.multipliedBy(100).div(goal).toNumber() : 0;

    const handleTokenValueChange = (newTokenValue?: number) => {
        setTokenValue(newTokenValue);
    };

    const handleApprove = async () => {
        startApproveLoader();
        await CommonFactory.approve(tokenAddress);
        setIsEnoughAllowance(true);
        addSuccessNotification("Approve finished successfully");
        stopApproveLoader();
    };

    const handleContribute = async () => {
        if (!tokenValue) {
            return;
        }
        const amount = fromHRNumber(tokenValue, 18);
        startDonateLoader();
        // TODO: nft requirement
        await DistributorFactory.participate(amount, "");
        update();
        addSuccessNotification("Donate finished successfully");
        stopDonateLoader();
    };

    return (
        <GradientBorder borderRadius={24} className="donate-container">
            <div className="donate">
                <div className="donate__section">
                    <div className="donate__section__title">Start</div>
                    <div className="donate__section__description">
                        {distributionStaticData ? startDate : <LoaderLine height={26} width={105} />}
                    </div>
                </div>
                <div className="donate__section">
                    <div className="donate__section__title">End</div>
                    <div className="donate__section__description">
                        {distributionStaticData ? endDate : <LoaderLine height={26} width={105} />}
                    </div>
                </div>

                <div className="donate__section">
                    <div className="donate__section__title">
                        Goal&nbsp;
                        <Tooltip id="goal">
                            <span>Percent of IDO goal</span>
                        </Tooltip>
                    </div>
                    <ProgressBar className="donate__progress-bar" percent={percent ?? 0} />
                </div>

                <TokenInput
                    className="donate__token-input"
                    isTokenFixed
                    tokenName="DAI"
                    onValueChange={handleTokenValueChange}
                    value={tokenValue}
                />

                <div className="donate__subtitle">
                    {distributionStaticData ? (
                        `${distributionStaticData?.minimumDonationUsd} USDC minimum donation`
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </div>

                <div className="donate__section">
                    <div className="donate__section__title">Total VeSuDAO reward</div>
                    <div className="donate__section__description--large">0</div>
                </div>

                <div className="donate__button-container">
                    <ButtonGradient
                        loading={isApproveLoading}
                        disabled={isEnoughAllowance}
                        className="donate__button"
                        onClick={handleApprove}
                    >
                        Approve
                    </ButtonGradient>
                    <ButtonGradient
                        loading={isDonateLoading}
                        disabled={
                            !distributionStaticData ||
                            !isEnoughAllowance ||
                            !tokenValue ||
                            tokenValue < toHRNumber(new BigNumber(distributionStaticData.minimumDonationUsd), 18)
                        }
                        className="donate__button"
                        onClick={handleContribute}
                    >
                        Contribute
                    </ButtonGradient>
                </div>
            </div>
        </GradientBorder>
    );
};
