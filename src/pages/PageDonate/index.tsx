import React from "react";

import { RewardChart } from "./_supportComponents/RewardChart";
import { Donate } from "./_supportComponents/Donate";
import { VestingTerms } from "./_supportComponents/VestingTerms";

import "./styles.scss";

interface Props {
    onConnect: () => void;
}

export const PageDonate = ({ onConnect }: Props) => {
    return (
        <div className="profile-donate">
            <div className="profile-donate__content">
                <RewardChart />
                <Donate onConnect={onConnect} />
            </div>
            <VestingTerms />
        </div>
    );
};
