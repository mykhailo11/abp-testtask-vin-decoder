import type { Translator } from "@/types/types";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import Card from "@/components/cards/Card";
import type { VinCodeVariableData } from "@/service/VinCodeService";
import { useLocation} from "react-router-dom";
import RecordSection from "@/components/data/record/RecordSection";
import styles from "@/layouts/variables/Variable.module.scss";

type VariableEntry = VinCodeVariableData[number];

export default function Variable(): ReactNode {
    const { t }: Translator = useTranslation("translation");
    const descriptionRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const variable: VariableEntry | undefined = location.state as VariableEntry | undefined;
    /**
     * Description field is an HTML string, so in order render it correctly
     * I put it as innerHTML property of a div element
     */
    useEffect(
        () => {
            if (descriptionRef.current) {
                descriptionRef.current.innerHTML = variable?.description ?? "";
            }
        },
        [variable]
    );
    return (
        <Card className={`flex-col gap-2 ${styles["variable"]}`}>
            {variable ? (
                <>
                    <div>{variable.name}</div>
                    <RecordSection className={`${styles["record"]} p-b-2`} data={{
                        "variables.id": variable.id,
                        "variables.data-type": variable.dataType,
                        "variables.group-name": variable.groupName
                    }} />
                    <div>{t("variables.description")}</div>
                    <div ref={descriptionRef} className="tiny">{variable.description}</div>
                </>
            ) : <div className="tiny error">{t("errors.no-result")}</div>}
        </Card>
    );
}
