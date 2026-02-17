import type { Translator } from "@/types/types";
import { Fragment, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    className?: string;
    emptyMessage?: string;
    data?: Record<string, string | number | undefined>;
};

export default function RecordSection({ data, emptyMessage, className }: Props): ReactNode {
    const { t }: Translator = useTranslation("translation");
    return (
        <>
            {data ? (
                <div className={`${className} tiny grid grid-col-2 gap-2 items-start`}>
                    {data && Object.entries(data).map(([key, value], index: number) => (
                        <Fragment key={index}>
                            <div className="fnt-w-4">{t(key)}:</div>
                            <div className="fnt-w-1">{value}</div>
                        </Fragment>        
                    ))}
                </div>
            ) : (
                <div>{t(emptyMessage ?? "errors.no-result")}</div>
            )}
        </>
    );
}
