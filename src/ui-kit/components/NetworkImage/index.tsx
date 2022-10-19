import React from "react";
import {
    DefaultImage,
    EthImage,
    ETHTestnetImage,
    PolygonImage,
    HarmonyImage,
    FantomImage,
    BscImage,
    AvalancheImage,
    AuroraImage,
} from "ui-kit/images/network";
import { getNetworkNameById, NETWORK, NetworkType } from "utils/network";

interface NetworkImageProps {
    chainId?: number;
    width?: number;
    height?: number;
}

const getNetworkImage = (network?: NetworkType) => {
    switch (network?.toLowerCase()) {
        case NETWORK.eth:
            return EthImage;
        case NETWORK.goerli:
            return ETHTestnetImage;
        case NETWORK.polygon:
            return PolygonImage;
        case NETWORK.fantom:
            return FantomImage;
        case NETWORK.bsc:
            return BscImage;
        case NETWORK.avalanche:
            return AvalancheImage;
        case NETWORK.aurora:
            return AuroraImage;
        case NETWORK.harmony:
            return HarmonyImage;
        default:
            return DefaultImage;
    }
};

export const NetworkImage = ({ chainId, width = 32, height = 32 }: NetworkImageProps) => {
    if (!chainId) {
        return null;
    }

    const Icon = getNetworkImage(getNetworkNameById(chainId));
    return <Icon width={width} height={height} />;
};
