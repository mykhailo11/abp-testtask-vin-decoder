import type { Data } from "@/hooks/useDataFetch";
import type { VinCodeData } from "@/service/VinCodeService";
import { Fragment, type ReactNode } from "react";

type Props = {
    data: Data<VinCodeData>;
};

export default function VinCodeInfoEntries({ data }: Props): ReactNode {
    return (
        <>
            {data.data ? (
                <div className="tiny grid grid-col-2 gap-2 items-start">
                    {data.data && Object.entries(data.data).map(([key, value], index: number) => (
                        <Fragment key={index}>
                            <div className="fnt-w-4">{key}:</div>
                            <div className="fnt-w-1">{value}</div>
                        </Fragment>        
                    ))}
                </div>
            ) : (
                <div>No decoded VIN data available.</div>
            )}
        </>
    );
}
