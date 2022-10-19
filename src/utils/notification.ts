import { store } from "react-notifications-component";

const defaultMetamaskMessage = "MetaMask Tx Signature: ";
const defaultExecutionRevertMessage = "execution reverted: ";

const getMessageFromError = (errorMessage?: string) => {
    if (errorMessage?.includes(defaultMetamaskMessage)) {
        return errorMessage?.slice(defaultMetamaskMessage.length);
    }
    if (errorMessage?.includes(defaultExecutionRevertMessage)) {
        const messageIndexStart = defaultExecutionRevertMessage.length;
        const messageIndexEnd = errorMessage.indexOf("{", messageIndexStart);
        if (messageIndexEnd > 0) {
            return errorMessage?.slice(messageIndexStart, messageIndexEnd);
        }
    }

    return errorMessage;
};

export const addErrorNotification = (title: string, errorMessage?: string) => {
    return store.addNotification({
        title,
        message: getMessageFromError(errorMessage),
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true,
        },
    });
};

export const addSuccessNotification = (title: string, message = "Congratulations!") => {
    return store.addNotification({
        title,
        message,
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true,
        },
    });
};
