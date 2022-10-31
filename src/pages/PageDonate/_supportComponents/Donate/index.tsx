import React, { useContext, useEffect, useMemo, useState } from "react";
import BigNumber from "bignumber.js";
import debounce from "lodash.debounce";

import { ButtonGradient, GradientBorder, LoaderLine, ProgressBar, Tooltip } from "ui-kit";
import { useEnoughAllowance, useGlobalUpdate, useLoader, useTotalDonation, useAccessNFTs } from "hooks";
import { TokenInput } from "components/TokenInput";
import { StateContext } from "reducer/constants";
import { CommonFactory, DistributorFactory } from "utils/api";
import { addSuccessNotification } from "utils/notification";
import { fromHRNumber, toHRNumber } from "utils/bigNumber";

import "./styles.scss";

interface Props {
    onConnect: () => void;
}

export const Donate = ({ onConnect }: Props) => {
    const { distributionStaticData, currentAddress } = useContext(StateContext);
    const { update } = useGlobalUpdate();
    const { totalDonationBN } = useTotalDonation();
    const [tokenValue, setTokenValue] = useState<number>();
    const { isEnoughAllowance, setIsEnoughAllowance } = useEnoughAllowance(distributionStaticData?.donationToken);
    const { isLoading: isApproveLoading, start: startApproveLoader, stop: stopApproveLoader } = useLoader();
    const { isLoading: isDonateLoading, start: startDonateLoader, stop: stopDonateLoader } = useLoader();
    const { isLoading: isRewardsLoading, start: startRewardsLoader, stop: stopRewardsLoader } = useLoader();
    const [rewards, setRewards] = useState(0);
    const accessNFTs = useAccessNFTs();

    const startDate = new Date((distributionStaticData?.startTimestamp ?? 0) * 1000).toLocaleDateString();
    const endDate = new Date((distributionStaticData?.deadlineTimestamp ?? 0) * 1000).toLocaleDateString();

    const goal = new BigNumber(distributionStaticData?.donationGoalMin ?? 0);
    const percent = distributionStaticData ? totalDonationBN?.multipliedBy(100).div(goal).toNumber() : 0;

    const minimumDonation = toHRNumber(
        new BigNumber(distributionStaticData?.minimumDonation ?? 0),
        distributionStaticData?.decimals ?? 18
    );

    const handleTokenValueChange = (newTokenValue?: number) => {
        setTokenValue(newTokenValue);
    };

    const handleApprove = async () => {
        startApproveLoader();
        await CommonFactory.approve(distributionStaticData?.donationToken);
        setIsEnoughAllowance(true);
        addSuccessNotification("Approve finished successfully");
        stopApproveLoader();
    };

    const handleContribute = async () => {
        if (!tokenValue || !accessNFTs?.length || !distributionStaticData) {
            return;
        }
        const amount = fromHRNumber(tokenValue, 18);
        startDonateLoader();
        await DistributorFactory.participate(amount, accessNFTs[0]);
        update();
        addSuccessNotification("Donate finished successfully");
        stopDonateLoader();
    };

    const handleContact = () => {
        window.open("https://t.me/stableunit", "_blank");
    };

    const updateRewards = useMemo(
        () =>
            debounce((value: number) => {
                startRewardsLoader();
                DistributorFactory.getRewardAmount(fromHRNumber(value, 18)).then((newRewards) => {
                    setRewards(newRewards ? toHRNumber(newRewards, 18) : 0);
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

    const hasAccessNFT = accessNFTs && accessNFTs.length > 0;

    const renderButtons = () => {
        if (!currentAddress) {
            return (
                <ButtonGradient className="donate__button" onClick={onConnect}>
                    Connect wallet
                </ButtonGradient>
            );
        }
        if (!hasAccessNFT) {
            return (
                <ButtonGradient className="donate__button" onClick={handleContact}>
                    Contact administrators
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
                    disabled={
                        !distributionStaticData || !isEnoughAllowance || !tokenValue || tokenValue < minimumDonation
                    }
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

                {distributionStaticData?.symbol ? (
                    <TokenInput
                        disabled={!hasAccessNFT}
                        className="donate__token-input"
                        isTokenFixed
                        tokenName={distributionStaticData.symbol}
                        onValueChange={handleTokenValueChange}
                        value={tokenValue}
                    />
                ) : (
                    <LoaderLine height={93} width={434} className="donate__token-input" />
                )}

                <div className="donate__subtitle">
                    <div>
                        {distributionStaticData ? (
                            `${minimumDonation} ${distributionStaticData.symbol}`
                        ) : (
                            <LoaderLine width={100} />
                        )}
                    </div>
                    <div>&nbsp; minimum donation</div>
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

                <div className="donate__button-container">{renderButtons()}</div>

                {!hasAccessNFT && currentAddress ? (
                    <div className="donate__subtitle--red">
                        You don't have access NFT for this presale.
                        <br />
                        Contact administrators to receive it.
                    </div>
                ) : null}
            </div>
        </GradientBorder>
    );
};
