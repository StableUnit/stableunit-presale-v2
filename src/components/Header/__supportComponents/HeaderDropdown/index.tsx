import React, { useContext } from "react";
import cn from "classnames";

import { NetworkImage } from "ui-kit";
import { StateContext } from "reducer/constants";
import { CopyIcon, DisconnectIcon } from "ui-kit/images/icons";

import "./styles.scss";

interface HeaderDropdownProps {
    onOpenNetworkModal: () => void;
    onDisconnect: () => void;
    onClose: () => void;
    visible: boolean;
    isInline?: boolean;
    className?: string;
}

const HeaderDropdownContent = ({
    onDisconnect,
    onOpenNetworkModal,
    isInline,
    className,
}: Omit<HeaderDropdownProps, "visible" | "onClose">) => {
    const { currentAddress, chainId } = useContext(StateContext);

    const handleCopyGenUrl = () => {
        if (currentAddress) {
            navigator.clipboard.writeText(currentAddress);
        }
    };

    return (
        <div className={cn("header-dropdown", className, { "header-dropdown--inline": isInline })}>
            <div className="header-dropdown__line" onClick={handleCopyGenUrl}>
                <CopyIcon />
                <div className="header-dropdown__line__text">Copy address</div>
            </div>
            <div className="header-dropdown__line">
                <NetworkImage chainId={chainId} width={16} height={16} />
                <div className="header-dropdown__line__text" onClick={onOpenNetworkModal}>
                    Select network
                </div>
            </div>
            <div className="header-dropdown__line" onClick={onDisconnect}>
                <DisconnectIcon />
                <div className="header-dropdown__line__text">Disconnect</div>
            </div>
        </div>
    );
};

export const HeaderDropdown = ({ visible, onClose, isInline, ...restProps }: HeaderDropdownProps) => {
    // eslint-disable-next-line no-nested-ternary
    return isInline ? (
        visible ? (
            <HeaderDropdownContent {...restProps} isInline />
        ) : null
    ) : (
        <div
            className={cn("header-dropdown-container", {
                "header-dropdown-container--visible": visible,
            })}
            onClick={onClose}
        >
            <HeaderDropdownContent {...restProps} />
        </div>
    );
};
