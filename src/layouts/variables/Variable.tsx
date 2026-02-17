import type { Translator } from "@/types/types";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export default function Variable(): ReactNode {
    const { t }: Translator = useTranslation();
    return (
        <>{t("variable")}</>  
    );
}