import Card from "@/components/cards/Card";
import type { Translator } from "@/types/types";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import useHomeContext from "@/layouts/home/context/useHomeContext";
import styles from "@/layouts/home/history/History.module.scss";

type Props = {
    searchHistory?: string[];
    className?: string
};

export default function History({ searchHistory, className }: Props): ReactNode {
    const { t }: Translator = useTranslation("translation");
    const vinCodeSetValue = useHomeContext((state) => state.vinCode.setValue);
    return (
        <Card className={`flex-col gap-2 ${className}`}>
            <div className="">{t("search-history")}</div>
            <div className="flex-col tiny gap-1">
                {(!searchHistory || searchHistory.length === 0) && <div>{t("search-history-empty")}</div>}
                {searchHistory?.map((entry, index) => (
                    <div className={styles["history-item"]} key={index} onClick={() => vinCodeSetValue(entry)}>
                        {entry}
                    </div>
                ))}
            </div>
        </Card>
    );
}
