import React from "react";

import { addErrorNotification } from "utils/notification";

interface Props {
    children: any;
}

export class ErrorBoundary extends React.Component<Props> {
    componentDidCatch(error: Error) {
        addErrorNotification("Internal Error", error.message);
    }

    render() {
        const { children } = this.props;

        return children;
    }
}
