import Card from "@/components/cards/Card";
import useDataFetch, { type Data } from "@/hooks/useDataFetch";
import { type ReactNode } from "react";
import properties from "@/config/properties.json";
import { format } from "@/util/Util";
import Loading from "@/components/utils/Loading";
import { vinCodeService } from "@/service/VinCodeService";
import VinCodeInfoEntries from "@/layouts/home/vin-code-info/VinCodeInfoEntries";

type Props = {
    className?: string
    vinCode: string
};

type VinCodeData = Record<string, string>;

export default function VinCodeInfo({ className, vinCode }: Props): ReactNode {
    const vinCodeInfo: Data<VinCodeData> = useDataFetch<VinCodeData>({
        url: properties.vinCodeApi.baseUrl + format(properties.vinCodeApi.endpoints.decodeVin, vinCode),
        mapping: (data) => vinCodeService.map(data)
    }, [vinCode]);

    return (
        <Card className={className}>
            { vinCodeInfo.loading && <Loading className="flex center h-full"/> }
            { vinCodeInfo.ok ? <VinCodeInfoEntries data={vinCodeInfo}/> : <div className="error tiny">{vinCodeInfo.message}</div> }
        </Card>
    );
}
