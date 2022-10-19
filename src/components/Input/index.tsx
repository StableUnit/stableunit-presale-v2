import React, { FunctionComponent, SVGProps, useEffect, useState } from "react";

import { isFloat } from "utils/number";

import "./styles.scss";

interface Props {
    onChange?: (newValue?: number) => void;
    value?: number;
    text: string;
    Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

export const Input = ({ onChange, value, Icon, text }: Props) => {
    const [userDefinedValue, setUserDefinedValue] = useState<string>();

    useEffect(() => {
        // to work with "500." as with "500"
        if (value && `${value}` !== userDefinedValue && `${value}.` !== userDefinedValue) {
            setUserDefinedValue(value?.toString());
        }
    }, [value, userDefinedValue]);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) {
            return;
        }
        const newValue = e.target.value;
        if (!newValue) {
            setUserDefinedValue(undefined);
            onChange(undefined);
        } else if (isFloat(newValue)) {
            setUserDefinedValue(newValue);
            onChange(parseFloat(newValue));
        }
    };

    return (
        <div className="input">
            <div className="input__description">
                <Icon />
                <div className="input__text">{text}</div>
            </div>
            <input
                disabled={!onChange}
                className="input__input"
                value={userDefinedValue}
                onChange={handleValueChange}
                placeholder="0"
            />
        </div>
    );
};
