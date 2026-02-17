import type { ValueBunlde } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

type Props = {
    key: string;
};

function useLocalSorage<some>({ key }: Props): ValueBunlde<some> {
    const [current, setCurrent] = useState<some>();
    useEffect(() => {
        const value: string | null = localStorage.getItem(key);
        if (value) {
            try {
                const parsedHistory: some = JSON.parse(value);
                setCurrent(parsedHistory);
            } catch {
                localStorage.removeItem(key);
            }
        }
    }, [key]);

    const setValue: (value: some | undefined) => void = useCallback(
        (value: some | undefined) => {
            setCurrent(value);
            localStorage.setItem(key, JSON.stringify(value));
        },
        [key],
    );

    return {
        value: current,
        setValue: setValue,
    };
}

export default useLocalSorage;
