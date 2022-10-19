export const MONTH = 30 * 24 * 60 * 60;

export const isFloat = (str: string) => {
    if (!str) {
        return false;
    }

    const splits = str.split(".");
    if (splits.length > 2) {
        return false;
    }

    const firstPartIsCorrect = /^\d+$/.test(splits[0]);
    const secondPartIsCorrect = !splits[1] || splits[1].length === 0 || /^\d+$/.test(splits[1]);

    return firstPartIsCorrect && secondPartIsCorrect;
};
