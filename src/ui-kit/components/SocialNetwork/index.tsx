import React from "react";

import { TgIcon, DiscordIcon, MediumIcon, TwitterIcon, GithubIcon } from "../../images/social";

interface SocialNetworkProps {
    name: string;
    width?: number;
    height?: number;
}

const SOCIAL_NETWORKS: Record<string, { href: string; icon: React.ReactNode }> = {
    tg: {
        href: "https://t.me/stableunit",
        icon: TgIcon,
    },
    discord: {
        href: "https://discord.gg/puMeUhUpJf",
        icon: DiscordIcon,
    },
    medium: {
        href: "https://blog.stableunit.org/",
        icon: MediumIcon,
    },
    twitter: {
        href: "https://twitter.com/stableunitdao",
        icon: TwitterIcon,
    },
    github: {
        href: "https://github.com/StableUnit",
        icon: GithubIcon,
    },
};

export const SocialNetwork = ({ name, width = 20, height = 20 }: SocialNetworkProps) => {
    const data = SOCIAL_NETWORKS[name];
    const Icon = data?.icon;

    return data ? (
        <a href={data.href} target="_blank" rel="noreferrer">
            {/* @ts-ignore */}
            <Icon style={{ width, height }} />
        </a>
    ) : null;
};
