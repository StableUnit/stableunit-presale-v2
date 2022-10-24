import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import cn from "classnames";

import { useDevice } from "hooks";
import { Actions } from "reducer";
import { GradientHref, ButtonGray, Button, NetworkChanger } from "ui-kit";
import { DispatchContext, StateContext } from "reducer/constants";
import { ArrowDownIcon, BurgerIcon } from "ui-kit/images/icons";

import { LinkType } from "utils/types";
import { getShortAddress } from "utils/network";

import { MenuModal } from "./__supportComponents/MenuModal";
import { USDProInfo } from "./__supportComponents/USDProInfo";
import { HeaderDropdown } from "./__supportComponents/HeaderDropdown";

import "./styles.scss";

interface HeaderProps {
    onConnect: () => void;
    onDisconnect: () => void;
}

const LINKS: LinkType[] = [
    {
        href: "/donate",
        text: "Donate",
        isDesktop: true,
        isMobile: true,
    },
    {
        href: "/tokenomics",
        text: "Tokenomics",
        isDesktop: true,
        isMobile: true,
    },
];

export const Header = ({ onConnect, onDisconnect }: HeaderProps) => {
    const { isMobile } = useDevice();
    const { currentAddress, chainId, isNetworkModalVisible } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const [oldChainId, setOldChainId] = useState<number>();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);
    const location = useLocation();

    const openDropdown = () => {
        setIsDropdownVisible(true);
    };
    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };

    const openNetworkModal = () => {
        setOldChainId(chainId);
        dispatch({ type: Actions.SetIsNetworkModalVisible, payload: true });
    };

    const openMenuModal = () => {
        setIsMenuModalVisible(true);
    };
    const closeMenuModal = () => {
        setIsMenuModalVisible(false);
    };

    useEffect(() => {
        if (isNetworkModalVisible && chainId !== oldChainId) {
            setOldChainId(chainId);
            dispatch({ type: Actions.SetIsNetworkModalVisible, payload: false });
        }
    }, [isNetworkModalVisible, chainId, oldChainId, dispatch]);

    return (
        <div className={cn("header", "header-mobile")}>
            <USDProInfo />

            <div className="header__section">
                {!isMobile && (
                    <>
                        <div className="header__links">
                            {LINKS.filter((v) => v.isDesktop).map(({ href, text }) => {
                                if (!chainId) {
                                    return null;
                                }
                                const isSelected = location.pathname.includes(href);
                                return (
                                    <GradientHref
                                        id={`links-${text.toLowerCase()}`}
                                        className={cn("header__link", { "header__link--selected": isSelected })}
                                        key={text}
                                        href={href}
                                        disabled={isSelected}
                                    >
                                        {text}
                                    </GradientHref>
                                );
                            })}
                        </div>
                        <NetworkChanger onClick={openNetworkModal} />
                    </>
                )}

                {currentAddress ? (
                    <div>
                        <ButtonGray onClick={openDropdown} className="header__address-button">
                            <div className="header__address-button__title">{getShortAddress(currentAddress)}</div>
                            <ArrowDownIcon />
                        </ButtonGray>
                        <HeaderDropdown
                            isInline={false}
                            onDisconnect={onDisconnect}
                            onClose={closeDropdown}
                            visible={isDropdownVisible}
                            onOpenNetworkModal={openNetworkModal}
                        />
                    </div>
                ) : (
                    <Button className="header__connect" id="connect-button" onClick={onConnect}>
                        Connect wallet
                    </Button>
                )}

                {isMobile && <BurgerIcon className="header__menu" onClick={openMenuModal} />}
            </div>

            <MenuModal
                visible={isMenuModalVisible}
                onClose={closeMenuModal}
                links={LINKS.filter((v) => v.isMobile)}
                openNetworkModal={openNetworkModal}
                onDisconnect={onDisconnect}
                onConnect={onConnect}
            />
        </div>
    );
};
