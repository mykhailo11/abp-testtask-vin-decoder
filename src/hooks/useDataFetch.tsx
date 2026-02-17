import { useEffect, useState } from "react";


// TODO: add cache to prevent infinite loop, make it in an elegant way withing this file

type Props<some> = {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: object;
    mapping?: (data: any) => some;
};

export type Data<some> = {
    loading: boolean;
    ok: boolean;
    message?: string;
    data?: some;
};

async function fetchData<some>({ url, body, method = "GET", mapping }: Props<some>): Promise<Data<some>> {
    try {
        const response = await fetch(url, { method, body: JSON.stringify(body) });
        if (response.ok) {
            const data: any = await response.json();
            return { ok: true, loading: false, data: mapping?.(data) ?? data };
        } else {
            throw new Error(`Error occured during fetch: ${response.status}`);
        }
    } catch (error: any) {
        return { ok: false, loading: false, message: error.message };
    }
}

function useDataFetch<some>(props: Props<some>, key: any[]): Data<some> {
    const [state, setState] = useState<Data<some>>({ ok: false, loading: true })
    useEffect(() => { 
        setState({ ok: false, loading: true });
        fetchData<some>(props).then(data => setState(data))
    }, key)
    return state;
}

export default useDataFetch;
