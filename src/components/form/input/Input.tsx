import styles from "@/components/form/input/Input.module.scss";
import { useEffect, useState, type ReactNode } from "react";
import Validation from "@/components/form/validation/Validation";
import type { Translator, ValidationContext } from "@/types/types";
import { useTranslation } from "react-i18next";

type Props = {
    className?: string;
    label?: string;
    type?: string;
    value?: string | undefined;
    name?: string;
    id?: string;
    checked?: boolean;
    validation?: ValidationContext;
    change?: (value: string) => void;
};

export default function Input({ className, label, validation, id, type, value, name, checked, change }: Props): ReactNode {
    const { t }: Translator = useTranslation("translation");
    const [current, setCurrent] = useState<string | undefined>(value);
    useEffect(() => setCurrent(value), [value]);

    const handleChange = (nextValue: string): void => {
        setCurrent(nextValue);
        change?.(nextValue);
    };

    return (
        <Validation validation={validation} value={current} errorClass={styles["has-error"]}>
            {label && (
                <label htmlFor={id} className={`block tiny ${styles["label"]}`}>
                    {t(label)}
                </label>
            )}
            <input
                onChange={(event) => handleChange(event.target.value)}
                className={`p-1 block border-r-1 ${className} ${styles["input"]}`}
                type={type}
                value={current ?? ""}
                name={name}
                id={id}
                checked={checked}
            />
        </Validation>
    );
}
