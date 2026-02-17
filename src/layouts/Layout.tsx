import type { Translator, NavItem } from "@/types/types";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import navigation from "@/config/navigation.json";
import styles from "@/layouts/Layout.module.scss";

export default function Layout(): ReactNode {
    const { t }: Translator = useTranslation("translation");
    const navigationItems: Array<ReactNode> = Object.values(navigation)
        .filter(({ skip }: NavItem) => !skip)
        .map(
            (item: NavItem, index: number): ReactNode => (
                <NavLink key={index} to={item.path}>
                    {t(`navigation.${item.key}`)}
                </NavLink>
            ),
        );
    return (
        <div className="flex-col min-h-screen">
            <nav className={`${styles["header"]} flex gap-3 p-4`}>
                <div className="item-grow fnt-w-4">{t("title")}</div>
                {navigationItems}
            </nav>
            <div className="layout center item-grow p-4">
                <Outlet />
            </div>
        </div>
    );
}
