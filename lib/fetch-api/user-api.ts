import {match, P} from "ts-pattern";
import {createUnexpectedServerResponseError, wrapBadResponse} from "@/lib/utils";

type User = {
    id: number,
    name: string,
    email: string,
    password_hashed: string,
    aboutme: string,
    icon: string | null,
}

export async function fetchUserInfo(email: string, password_hashed: string): Promise<User | Error> {
    const res = await fetch(`/api/user?email=${email}&password_hashed=${password_hashed}`, {
        method: "GET"
    });

    let content: unknown = undefined;

    try {
        content = await res.json();
    } catch (e) {
        return Error("Response is not JSON");
    }

    if (!res.ok)
        return wrapBadResponse(content);

    return match(content)
        .with({
            id: P.number,
            name: P.string,
            aboutme: P.string,
            icon: P.union(P.string, null),
        }, it => ({...it, email, password_hashed}))
        .otherwise(createUnexpectedServerResponseError);
}