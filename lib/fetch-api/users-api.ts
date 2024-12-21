import {match, P} from "ts-pattern";

const wrapBadResponse = (resBody: any): Error => match(resBody)
    .with({
        error: P.select(P.string)
    }, err => Error(err))
    .otherwise(() => Error("Bad request"));

const createUnexpectedServerResponseError = () => Error("Unexpected response from server");

export async function fetchUserId(email: string, password_hashed: string): Promise<number | Error> {
    const res = await fetch(`/api/users/login?email=${email}&password_hashed=${password_hashed}`, {
        method: "GET"
    });

    if (!res.ok)
        return wrapBadResponse(await res.json());

    return match(await res.json())
        .with(-1, () => Error("Email or password incorrect"))
        .with(P.select('id', P.number), ({id}) => id)
        .otherwise(createUnexpectedServerResponseError);
}

type User = {
    id: number,
    name: string,
    email: string,
    password_hashed: string,
    description: string,
    icon: string | null,
}

export async function fetchUserInfo(id: number, password_hashed: string): Promise<User | Error> {
    const res = await fetch(`/api/users?id=${id}&password_hashed=${password_hashed}`, {
        method: "GET"
    });

    if (!res.ok)
        return wrapBadResponse(await res.json());

    return match(await res.json())
        .with(P.select({
            id: P.number,
            name: P.string,
            email: P.string,
            password_hashed: P.string,
            description: P.string,
            icon: P.union(P.string, null),
        }), user => user)
        .otherwise(createUnexpectedServerResponseError);
}