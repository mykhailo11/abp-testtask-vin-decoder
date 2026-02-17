import Button from "@/components/buttons/Button";
import Card from "@/components/cards/Card";
import Input from "@/components/form/input/Input";
import type { ValidationContext, ValueBunlde } from "@/types/types";
import { useState, type ReactNode } from "react";
import useHomeContext from "./context/useHomeContext";
import useLocalSorage from "@/hooks/useLocalStorage";
import properties from "@/config/properties.json";
import History from "@/layouts/home/history/History";
import styles from "@/layouts/home/Home.module.scss";
import VinCodeInfo from "./vin-code-info/VinCodeInfo";

export default function Home(): ReactNode {
    const vinCodeContext = useHomeContext<ValidationContext & ValueBunlde<string>>((state) => state.vinCode);
    const formValid = useHomeContext<boolean>((state) => state.valid);
    const searchHistory: ValueBunlde<Array<string>> = useLocalSorage({
        key: properties.vinCodeSearchHistoryKey,
    });
    const [vinCode, setVinCode] = useState<string | undefined>(vinCodeContext.value);
    const handleSearch = (): void => {
        if (formValid) {
            const normalizedVinCode: string = vinCodeContext.value?.trim().toUpperCase() ?? "";
            const clearArray: string[] = searchHistory.value?.filter((value) => value !== normalizedVinCode) ?? [];
            const history: Array<string> = [normalizedVinCode, ...clearArray].slice(0, properties.vinCodeSearchHistoryLimit);
            setVinCode(normalizedVinCode);
            searchHistory.setValue(history);
        }
    };

    return (
        <div className={`w-full gap-2 ${styles["home-layout"]}`}>
            <Card className="flex-col gap-2">
                <Input className="uppercase" id="vin-code" label="vin-code" validation={vinCodeContext} value={vinCodeContext.value} change={vinCodeContext.setValue} />
                <Button disabled={!formValid} value="search" type="button" onClick={handleSearch} />
            </Card>
            <History className={styles["vin-code-history"]} searchHistory={searchHistory.value} />
            { vinCode && <VinCodeInfo className={`${styles["vin-code-info"]}`} vinCode={vinCode}/> }
        </div>
    );
}
