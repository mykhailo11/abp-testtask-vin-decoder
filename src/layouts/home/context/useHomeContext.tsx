import type { ValidationContext, ValueBunlde } from "@/types/types";
import { create } from "zustand";

type HomeContext = {
    valid: boolean;
    vinCodeValue?: string;
    vinCode: ValidationContext & ValueBunlde<string>;
};

const useHomeContext = create<HomeContext>((set) => ({
    valid: false,
    vinCode: {
        setValue: (value: string | undefined) => set((state) => ({ vinCode: { ...state.vinCode, value } })),
        valid: (value: boolean) => set(() => ({ valid: value })),
        validations: [
            {
                validate: (value: string | undefined) => value !== undefined,
            },
            {
                message: "errors.empty",
                validate: (value: string | undefined) => (value?.length ?? 0) > 0,
            },
            {
                message: "errors.length",
                validate: (value: string | undefined) => (value?.length ?? 0) === 17,
            },
            {
                message: "errors.invalid-characters",
                validate: (value: string | undefined) => value !== undefined && /^[A-HJ-NPR-Z0-9]{17}$/.test(value.toUpperCase()),
            },
        ],
    },
}));

export default useHomeContext;
