import React, { useContext } from "react";
import Modal from "react-modal";
import cn from "classnames";

import { Actions } from "reducer";
import { NetworkImage } from "ui-kit";
import { DispatchContext, StateContext } from "reducer/constants";
import { CloseIcon, ConnectedIcon, ArrowRightIcon } from "ui-kit/images/icons";
import {
    changeNetworkAtMetamask,
    getIdByNetworkName,
    getNetworkNameById,
    NETWORK,
    networkNames,
    NetworkType,
    supportedNetworks,
} from "utils/network";

import "./styles.scss";

export const NetworkModal = () => {
    const { chainId, isNetworkModalVisible } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const renderIcon = (network: NetworkType) => {
        if (!supportedNetworks.includes(network)) {
            return null;
        }
        if (getNetworkNameById(chainId) === network) {
            return <ConnectedIcon />;
        }

        return <ArrowRightIcon />;
    };

    const handleClose = () => {
        dispatch({ type: Actions.SetIsNetworkModalVisible, payload: false });
    };

    return (
        /* @ts-ignore */
        <Modal
            isOpen={isNetworkModalVisible}
            onRequestClose={handleClose}
            className="network-modal"
            overlayClassName="network-modal-overlay"
        >
            <CloseIcon className="network-modal__close" onClick={handleClose} />
            <div className="network-modal__title">Change a network</div>
            {Object.keys(NETWORK).map((network) => {
                if (network === NETWORK.unsupported) {
                    return null;
                }

                const selectedNetworkId = getIdByNetworkName(network as NetworkType);

                return (
                    <div
                        key={network}
                        className={cn("network-modal__network", {
                            "network-modal__network--selected": getNetworkNameById(chainId) === network,
                            "network-modal__network--disabled": !supportedNetworks.includes(network as NetworkType),
                        })}
                        onClick={() => changeNetworkAtMetamask(selectedNetworkId)}
                    >
                        <div className="network-modal__network__content">
                            <NetworkImage chainId={selectedNetworkId} width={28} height={28} />
                            <div className="network-modal__network__name">{networkNames[network]}</div>
                        </div>
                        {renderIcon(network as NetworkType)}
                    </div>
                );
            })}
        </Modal>
    );
};
