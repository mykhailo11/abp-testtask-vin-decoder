import type { ReactNode } from "react";
import Card from "@/components/cards/Card";
import useDataFetch, { type Data } from "@/hooks/useDataFetch";
import properties from "@/config/properties.json";
import Loading from "@/components/utils/Loading";
import { vinCodeService, type VinCodeVariableData } from "@/service/VinCodeService";
import Table from "@/components/data/table/Table";
import { useNavigate } from "react-router-dom";
import navigation from "@/config/navigation.json";
import { format } from "@/util/Util";

export default function Variables(): ReactNode {
    const variables: Data<VinCodeVariableData> = useDataFetch<VinCodeVariableData>(
        {
            url: properties.vinCodeApi.baseUrl + properties.vinCodeApi.endpoints.variablesList,
            mapping: (data) => vinCodeService.mapVinCodeVariables(data),
        },
        [],
    );
    const navigate = useNavigate();

    const clickRow = (item: Record<string, string | number | undefined>) =>
        navigate(
            format(navigation.variable.path, item.id),
            /**
             * It is better not to pass state object, but retreive specific record by its ID.
             * There is no such API for VIN code variable, so I decided to pass state
             * directly to not to retreive all the records again for taking only the needed one
             */
            { state: item },
        );

    return (
        <Card className="flex-col gap-2">
            {variables.loading && <Loading className="flex center h-full" />}
            {!variables.loading && variables.ok && (
                <Table
                    columns={{
                        id: "variables.id",
                        name: "variables.name",
                        dataType: "variables.data-type",
                        groupName: "variables.group-name",
                    }}
                    data={variables.data ?? []}
                    click={clickRow}
                />
            )}
            {!variables.loading && !variables.ok && <div className="error tiny">{variables.message}</div>}
        </Card>
    );
}
