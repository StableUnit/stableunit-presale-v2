import React, { FC, useContext } from "react";

import { StateContext } from "reducer/constants";
import { getNetworkNameById, networkNames, NetworkType, supportedNetworks } from "utils/network";
import { NetworkImage } from "../NetworkImage";
import { ButtonGray } from "../ButtonGray";

import "./styles.scss";

type Props = {
    onClick: () => void;
};

export const NetworkChanger: FC<Props> = ({ onClick }) => {
    const { chainId } = useContext(StateContext);
    const networkName = getNetworkNameById(chainId) as NetworkType;
    if (chainId && !supportedNetworks.includes(networkName)) {
        return (
            <div className="network-changer-wrong" onClick={onClick}>
                Wrong network
            </div>
        );
    }

    return (
        <ButtonGray onClick={onClick} disabled={!chainId} className="network-changer">
            <NetworkImage chainId={chainId} width={24} height={24} />
            <div className="network-changer__value">{networkName ? networkNames[networkName] : "Select network"}</div>
        </ButtonGray>
    );
};
