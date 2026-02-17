type VinCodeResponse = {
    Results: {
        Value: string | null;
        ValueId: string | null;
        Variable: string | null;
        VariableId: number;
    }[];
};

export type VinCodeData = Record<string, string>;

export interface VinCodeService {
    map(data: VinCodeResponse): VinCodeData;
}

class VinCodeServiceImpl implements VinCodeService {
    
    constructor() {}

    public map(data: VinCodeResponse): VinCodeData {
        console.log(this);
        this.checkErrors(data);
        return this.transformData(data);
    }

    private checkErrors(data: VinCodeResponse) {
        const error = data.Results.find(({ Variable, Value }) => Variable?.toLocaleLowerCase() === "error code" && Value !== "0");
        if (error) {
            const errorText: string | null | undefined = data.Results.find(({ Variable }) => Variable?.toLocaleLowerCase() === "error text")?.Value;
            const errorTextFormatted: string = errorText?.split(/;\s(?=\d+\s-)/).join("\n\n") ?? `${error.Value}`;
            throw new Error(`Error:\n\n${errorTextFormatted}`);
        }
    }

    private transformData(data: VinCodeResponse): VinCodeData {
        return Object.fromEntries(data.Results
            .filter(({ Value, Variable }) => Value && Value !== null && !Variable?.toLocaleLowerCase().startsWith("error"))
            .map(({ Variable, Value }) => [Variable, Value]));
    }

}

export const vinCodeService: VinCodeService = new VinCodeServiceImpl();
