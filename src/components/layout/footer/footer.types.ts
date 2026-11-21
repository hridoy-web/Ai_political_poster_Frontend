import { IconType } from "react-icons";

export type QuickLink =
    {
        name: string;
        href: string;
        badge?: string
    };

export type LegalLink = {
    name: string;
    href: string
};

export type SocialLink = {
    name: string;
    icon: IconType;
    href: string;
    color: string;
    hoverStyle: string
};