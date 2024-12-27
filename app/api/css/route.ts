import {
    createUnexpectedServerResponseErrorWithCode,
    crudWrapper,
    ErrorWithCode
} from "@/lib/utils";
import {match, P} from "ts-pattern";
import sql from "@/lib/sql";


export const GET = crudWrapper<{
    id: number,
    html: string,
    css: string,
}[]>(async (request) => {

    const urlSearchParams = new URLSearchParams(new URL(request.url).search);

    const rawIDs = urlSearchParams.getAll("id");

    if (!rawIDs.every(e => /^\d+$/.test(e))) {
        return new ErrorWithCode("Query param(s) `id` contains non-integer value", 400);
    }

    const ids: number[] = rawIDs.map(e => Number.parseInt(e));

    const ret: {
        id: number,
        html: string,
        css: string,
    }[] | ErrorWithCode = match(await sql`SELECT id, html, css FROM css where id = ANY(${ids})`)
        .with(P.array({
            id: P.number,
            html: P.string,
            css: P.string,
        }), it => it)
        .otherwise(createUnexpectedServerResponseErrorWithCode);

    return ret;
});