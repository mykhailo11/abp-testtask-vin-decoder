import styles from "@/components/buttons/Button.module.scss";
import type { Translator } from "@/types/types";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    type?: "submit" | "reset" | "button" | undefined
    value?: string | undefined
    disabled?: boolean
    onClick?: () => void
}

export default function Button({ type, value, disabled = false, onClick }: Props): ReactNode {
    const { t }: Translator = useTranslation("translation");
    return (
        <button onClick={onClick} disabled={disabled} className={`block w-fit p-1 p-x-3 border-r-1 button ${styles["button"]}`} type={type}>{value && t(value)}</button>
    )
};
