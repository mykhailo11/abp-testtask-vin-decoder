import type { ReactNode } from "react";
import styles from "@/components/utils/Loading.module.scss";

type Props = {
    className?: string
};

export default function Loading({ className }: Props): ReactNode {
    return (
        <div className={`${styles["loader-wrapper"]} ${className}`}>
            <div className={styles["spinner"]} />
        </div>
    );
}
