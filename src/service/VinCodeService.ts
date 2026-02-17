type VinCodeResponse = {
    Results: {
        Value: string | null;
        ValueId: string | null;
        Variable: string | null;
        VariableId: number;
    }[];
};

type VinCodeVariableResponse = {
    Results: {
        DataType: string;
        Description: string;
        ID: number;
        Name: string;
        GroupName: string | undefined;
    }[];
};

export type VinCodeData = Record<string, string>;
export type VinCodeVariableData = {
    dataType: string;
    description: string;
    id: number;
    name: string;
    groupName: string | undefined;
}[];

export interface VinCodeService {
    mapVinCode(data: VinCodeResponse): VinCodeData;
    mapVinCodeVariables(data: VinCodeVariableResponse): VinCodeVariableData;
}

class VinCodeServiceImpl implements VinCodeService {
    constructor() {}

    public mapVinCode(data: VinCodeResponse): VinCodeData {
        this.checkErrors(data);
        return this.transformData(data);
    }

    public mapVinCodeVariables(data: VinCodeVariableResponse): VinCodeVariableData {
        return this.transformVariablesData(data);
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
        return Object.fromEntries(
            data.Results.filter(({ Value, Variable }) => Value && Value !== null && !Variable?.toLocaleLowerCase().startsWith("error")).map(({ Variable, Value }) => [Variable, Value]),
        );
    }

    private transformVariablesData(data: VinCodeVariableResponse): VinCodeVariableData {
        return data.Results.map((item) => ({
            dataType: item.DataType,
            description: item.Description,
            id: item.ID,
            name: item.Name,
            groupName: item.GroupName,
        }));
    }
}

export const vinCodeService: VinCodeService = new VinCodeServiceImpl();
