import React from "react";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { Whisper, Tooltip as TooltipRs } from "rsuite";

type Props = {
    id: string;
    children: React.ReactElement;
    onClick?: () => void;
};

export const Tooltip = ({ children, id, onClick }: Props) => {
    return (
        <Whisper
            onClick={onClick}
            placement="top"
            controlId={id}
            trigger="hover"
            speaker={<TooltipRs>{children}</TooltipRs>}
        >
            <InfoOutlineIcon />
        </Whisper>
    );
};
