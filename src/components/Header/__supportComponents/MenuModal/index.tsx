import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";

import cn from "classnames";
import { GradientHref, NetworkImage, ButtonGradient } from "ui-kit";
import { StateContext } from "reducer/constants";
import { ArrowRightIcon, CloseIcon } from "ui-kit/images/icons";
import { LinkType } from "utils/types";
import { getShortAddress } from "utils/network";

import { HeaderDropdown } from "../HeaderDropdown";
import { USDProInfo } from "../USDProInfo";

import "./styles.scss";

interface NetworkModalProps {
    onClose: () => void;
    onConnect: () => void;
    onDisconnect: () => void;
    openNetworkModal: () => void;
    visible: boolean;
    links: LinkType[];
}

export const MenuModal = ({
    onClose,
    visible,
    links,
    onDisconnect,
    onConnect,
    openNetworkModal,
}: NetworkModalProps) => {
    const location = useLocation();
    const { currentAddress, chainId } = useContext(StateContext);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible((v) => !v);
    };
    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };

    return (
        <Modal isOpen={visible} onRequestClose={onClose} className="menu-modal" overlayClassName="menu-modal-overlay">
            <div className="menu-modal__header">
                <USDProInfo />
                <CloseIcon className="menu-modal__close" onClick={onClose} />
            </div>
            <div className="menu-modal__content">
                {currentAddress ? (
                    <div className="menu-modal__address">
                        <div
                            onClick={toggleDropdown}
                            className={cn("menu-modal__address__button", {
                                "menu-modal__address__button--opened": isDropdownVisible,
                            })}
                        >
                            <div className="menu-modal__address__button__info">
                                <NetworkImage chainId={chainId} width={28} height={28} />
                                <div className="menu-modal__address__button__info__title">
                                    {getShortAddress(currentAddress)}
                                </div>
                            </div>
                            <ArrowRightIcon />
                        </div>
                        <HeaderDropdown
                            className="menu-modal__address__dropdown"
                            isInline
                            onDisconnect={onDisconnect}
                            onClose={closeDropdown}
                            visible={isDropdownVisible}
                            onOpenNetworkModal={openNetworkModal}
                        />
                    </div>
                ) : (
                    <ButtonGradient className="menu-modal__connect" onClick={onConnect}>
                        CONNECT WALLET
                    </ButtonGradient>
                )}

                <div className="menu-modal__links">
                    {links.map((link) => (
                        <GradientHref
                            key={link.text}
                            onClick={onClose}
                            href={link.href}
                            className="menu-modal__link"
                            disabled={location.pathname.includes(link.href)}
                        >
                            {link.text}
                        </GradientHref>
                    ))}
                </div>
            </div>
        </Modal>
    );
};
