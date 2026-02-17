import styles from "@/components/data/table/Table.module.scss";
import type { Translator } from "@/types/types";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    columns: Record<string, string>;
    data: Record<string, string | number | undefined>[];
    click?: (entry: Record<string, string | number | undefined>) => void
};

export default function Table({ data, columns, click }: Props): ReactNode {
    const { t }: Translator = useTranslation("translation");
    return (
        <div className={styles["table"]}>
            <table>
                <thead>
                    <tr>
                        {Object.entries(columns).map(([, value], index: number) => (
                            <th className="p-1" key={index}>{t(value)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="tiny">
                    {data.map((item: Record<string, string | number | undefined>, index: number) => (
                        <tr key={index} onClick={() => click?.(item)}>
                            {Object.keys(columns).map((key: string) => (
                                <td className="p-1" key={`${key}-${index}`}>{item[key] ?? "-"}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
