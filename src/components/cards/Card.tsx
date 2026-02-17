import type { PropsWithChildren, ReactNode } from "react";
import styles from "@/components/cards/Card.module.scss";

type Props = PropsWithChildren & {
    className?: string
}

export default function Card({ children, className }: Props): ReactNode {
    return (
        <div className={`p-2 border-r-3 ${styles["card"]} ${className}`}>
            {children}
        </div>
    )
}