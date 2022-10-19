import React, { ReactNode, useContext } from "react";
import { SelectPicker } from "rsuite";
import { ItemDataType } from "rsuite/cjs/@types/common";

import { StateContext } from "reducer/constants";
import { BORROW_CURRENCY, getName, getSupportedTokens, getTokenIcon, SupportedTokensType } from "utils/currency";
import { DEFAULT_NETWORK_ID } from "utils/network";

import "./styles.scss";

interface TokenPickerProps {
    value: string;
    onTokenChange?: (newTokenName: SupportedTokensType) => void;
}

export const TokenPicker = ({ value, onTokenChange }: TokenPickerProps) => {
    const { chainId } = useContext(StateContext);

    const pickerTokens = getSupportedTokens(chainId ?? DEFAULT_NETWORK_ID)
        .filter((v) => v.symbol !== BORROW_CURRENCY)
        .map((v) => ({
            value: v.address,
            label: v.symbol,
        }));

    const handleTokenChange = (address: string) => {
        const newTokenName = getName(address, chainId);
        if (newTokenName && onTokenChange) {
            onTokenChange(newTokenName);
        }
    };

    const renderValue = (selectedValue: string, item: ItemDataType) => {
        const name = item?.label as SupportedTokensType;
        return (
            <div className="token-picker__selectedValue">
                <div className="token-picker__selectedValue__icon">{getTokenIcon(name)}</div>
                <div className="token-picker__selectedValue__label">{item?.label}</div>
            </div>
        );
    };

    const renderMenuItem = (label: ReactNode, item: ItemDataType) => {
        const name = item?.label as SupportedTokensType;
        return (
            <div className="token-picker__menu-item">
                <div className="token-picker__menu-item__icon">{getTokenIcon(name)}</div>
                <div className="token-picker__menu-item__label">{name}</div>
            </div>
        );
    };

    return (
        <SelectPicker
            searchable={false}
            className="token-picker"
            value={value}
            onChange={handleTokenChange}
            data={pickerTokens}
            renderValue={renderValue}
            renderMenuItem={renderMenuItem}
            menuClassName="token-picker__menu"
        />
    );
};
