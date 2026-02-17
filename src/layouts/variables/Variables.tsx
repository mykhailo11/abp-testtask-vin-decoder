import type { Translator } from "@/types/types";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export default function Variables(): ReactNode {
    const { t }: Translator = useTranslation();
    return (
        <>{t("variables")}</>  
    );
}