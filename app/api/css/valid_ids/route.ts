import {
    createUnexpectedServerResponseErrorWithCode,
    crudWrapper,
    ErrorWithCode,
} from "@/lib/utils";
import {match, P} from "ts-pattern";
import sql from "@/lib/sql";

export const GET = crudWrapper<number[]>(async (request) => {

    const urlSearchParams = new URLSearchParams(new URL(request.url).search);

    function parseIntParam(v: string | null): number | null | undefined {
        if (v === null) return null;
        if (!/^\d+$/.test(v)) return undefined;
        const x = Number.parseInt(v);
        return Number.isNaN(x) ? undefined : x;
    }

    const options: Partial<{
        limit: number,
        offset: number,
        author_id: number,
    }> | ErrorWithCode = match({
        limit: parseIntParam(urlSearchParams.get("limit")),
        offset: parseIntParam(urlSearchParams.get("offset")),
        author_id: parseIntParam(urlSearchParams.get("author_id")),
    })
        .with({
            limit: P.union(P.number, null),
            offset: P.union(P.number, null),
            author_id: P.union(P.number, null),
        }, (it) => Object.fromEntries(
            Object.entries(it).filter(([_, v]) => v !== null)
        ))
        .otherwise(() => new ErrorWithCode("Bad request. Query parameters schema does not match.", 400));

    if (options instanceof ErrorWithCode) {
        return options;
    }

    const res = await sql(`SELECT id FROM css 
        ${options.author_id === undefined ? '' : 'WHERE author_id = $1'} 
        ${options.limit === undefined ? '' : `LIMIT ${options.limit}`} 
        ${options.offset === undefined ? '' : `OFFSET ${options.offset}`}`, [...(options.author_id === undefined ? [] : [options.author_id])]);

    return match(res)
        .with(P.array({id: P.number}), (it) => it.map(e => e.id))
        .otherwise(createUnexpectedServerResponseErrorWithCode);
});