import React, { useContext, useEffect, useMemo, useState } from "react";
import BigNumber from "bignumber.js";
import debounce from "lodash.debounce";

import { ButtonGradient, GradientBorder, LoaderLine, ProgressBar, Tooltip } from "ui-kit";
import { useEnoughAllowance, useGlobalUpdate, useLoader, useTotalDonation, useAccessNFTs } from "hooks";
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
    const { isLoading: isRewardsLoading, start: startRewardsLoader, stop: stopRewardsLoader } = useLoader();
    const [rewards, setRewards] = useState(0);
    const accessNFTs = useAccessNFTs();

    const startDate = new Date((distributionStaticData?.startTimestamp ?? 0) * 1000).toLocaleDateString();
    const endDate = new Date((distributionStaticData?.deadlineTimestamp ?? 0) * 1000).toLocaleDateString();

    const goal = new BigNumber(distributionStaticData?.donationGoalMin ?? 0);
    const percent = distributionStaticData ? totalDonationBN?.multipliedBy(100).div(goal).toNumber() : 0;

    // TODO: fix decimals
    const minimumDonation = toHRNumber(new BigNumber(distributionStaticData?.minimumDonation ?? 0), 18);

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
        if (!tokenValue || !accessNFTs?.length) {
            return;
        }
        const amount = fromHRNumber(tokenValue, 18);
        startDonateLoader();
        await DistributorFactory.participate(amount, accessNFTs[0]);
        update();
        addSuccessNotification("Donate finished successfully");
        stopDonateLoader();
    };

    const updateRewards = useMemo(
        () =>
            debounce((value: number) => {
                startRewardsLoader();
                DistributorFactory.getRewardAmount(fromHRNumber(value, 18)).then((newRewards) => {
                    setRewards(newRewards);
                    stopRewardsLoader();
                });
            }, 500),
        []
    );

    useEffect(() => {
        if (tokenValue !== undefined) {
            updateRewards(tokenValue);
        }
    }, [tokenValue, updateRewards]);

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
                    {distributionStaticData ? `${minimumDonation} USDC minimum donation` : <span>&nbsp;</span>}
                </div>

                <div className="donate__section" style={{ height: 42 }}>
                    <div className="donate__section__title">Total VeSuDAO reward</div>
                    {isRewardsLoading ? (
                        <LoaderLine height={20} width={100} borderRadius={8} />
                    ) : (
                        <div className="donate__section__description--large">
                            {rewards.toLocaleString([], { maximumFractionDigits: 6 })}
                        </div>
                    )}
                </div>

                <div className="donate__button-container">
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
                        disabled={
                            !accessNFTs?.length ||
                            !distributionStaticData ||
                            !isEnoughAllowance ||
                            !tokenValue ||
                            tokenValue < minimumDonation
                        }
                        className="donate__button"
                        onClick={handleContribute}
                    >
                        {isDonateLoading ? "Loading..." : "Contribute"}
                    </ButtonGradient>
                </div>
                {accessNFTs && accessNFTs.length === 0 ? (
                    <div className="donate__subtitle--red">You don't have access NFT for this presale</div>
                ) : null}
            </div>
        </GradientBorder>
    );
};
