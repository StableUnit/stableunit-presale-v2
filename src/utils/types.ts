export type LinkType = {
    href: string;
    text: string;
    isDesktop: boolean;
    isMobile: boolean;
};


export type TokenMetadata = {
    address: string;
    symbol: string;
    decimals: number;
    image?: string;
};

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;
