import React, { useContext, useEffect, useState } from "react";
import cn from "classnames";

import { useBalance } from "hooks";
import { StateContext } from "reducer/constants";
import { MaxButton } from "ui-kit/components/MaxButton";
import { getAddress, getTokenIcon, SupportedTokensType } from "utils/currency";
import { isFloat } from "utils/number";
import { DEFAULT_NETWORK_ID } from "utils/network";
import { TokenPicker } from "../TokenPicker";

import "./styles.scss";

interface TokenInputProps {
    id?: string;
    tokenName: SupportedTokensType;
    tokenNameText?: string;
    className?: string;
    onTokenChange?: (newTokenName: SupportedTokensType) => void;
    onValueChange: (v?: number) => void;
    onBalanceChange?: (v: number) => void;
    maxValue?: number;
    isTokenFixed?: boolean;
    disabled?: boolean;
    showBalance?: boolean;
    value?: number;
    headerContent?: React.ReactNode; // TODO: use only data for render HeaderContent
}

export const TokenInput = ({
    id,
    tokenName,
    tokenNameText,
    onTokenChange = () => null,
    onValueChange,
    className,
    disabled,
    isTokenFixed,
    showBalance = true,
    headerContent,
    onBalanceChange,
    maxValue,
    value,
}: TokenInputProps) => {
    const { chainId } = useContext(StateContext);
    const { balance } = useBalance(tokenName, true);
    const [userDefinedValue, setUserDefinedValue] = useState<string>();

    useEffect(() => {
        if (onBalanceChange && balance !== undefined) {
            onBalanceChange(balance);
        }
    }, [balance]);

    const handleMaxClick = () => {
        if (maxValue) {
            onValueChange(maxValue);
        } else if (balance) {
            onValueChange(balance);
        }
    };

    useEffect(() => {
        // to work with "500." as with "500"
        if (value && `${value}` !== userDefinedValue && `${value}.` !== userDefinedValue) {
            setUserDefinedValue(value?.toString());
        }
    }, [value, userDefinedValue]);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (!newValue) {
            setUserDefinedValue(undefined);
            onValueChange(undefined);
        } else if (isFloat(newValue)) {
            setUserDefinedValue(newValue);
            onValueChange(parseFloat(newValue));
        }
    };

    return (
        <div className={cn("token-input", className, { "token-input--disabled": disabled })} id={id}>
            {headerContent}
            {showBalance && balance !== undefined && (
                <div className="token-input__balance">
                    <div className="token-input__balance__value">Balance: {balance.toLocaleString()}</div>
                    <MaxButton onClick={handleMaxClick} />
                </div>
            )}
            <div className="token-input__data">
                {isTokenFixed ? (
                    <div className="token-input__data__fixed-token">
                        <div className="token-input__data__fixed-token__icon">{getTokenIcon(tokenName)}</div>
                        <div className="token-input__data__fixed-token__label">{tokenNameText || tokenName}</div>
                    </div>
                ) : (
                    <TokenPicker
                        value={getAddress(tokenName, chainId ?? DEFAULT_NETWORK_ID) ?? ""}
                        onTokenChange={onTokenChange}
                    />
                )}
                <input
                    disabled={disabled}
                    id={`${id}-input`}
                    value={userDefinedValue}
                    className="token-input__data__input"
                    onChange={handleValueChange}
                    placeholder="0"
                />
            </div>
        </div>
    );
};
