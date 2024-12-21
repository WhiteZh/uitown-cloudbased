import {match, P} from "ts-pattern";
import sql from "@/lib/sql";
import {crudWrapper, ErrorWithCode} from "@/lib/utils";

export const GET = crudWrapper<{
    id: number,
    name: string,
    aboutme: string,
    icon: string | null,
}>(async (request) => {

    const urlSearchParams = new URLSearchParams(new URL(request.url).search);

    const params = match({
        email: urlSearchParams.get('email')?.trim().toLowerCase(),
        password_hashed: urlSearchParams.get('password_hashed'),
    })
        .with(P.select({
            email: P.string,
            password_hashed: P.string,
        }), params => params)
        .otherwise(() => new ErrorWithCode("Bad or incomplete request", 400));

    if (params instanceof ErrorWithCode) {
        return params;
    }

    const sqlRes = await sql`select id, name, password_hashed, aboutme, icon, icon_type from users where email = ${params.email}`;

    type UserInfoType = {
        id: number,
        name: string,
        aboutme: string,
        icon: Buffer | null,
        icon_type: string | null,
    }

    const userInfo: ErrorWithCode | UserInfoType = match(sqlRes)
        .with([], () => new ErrorWithCode("User does not exist", 401))
        .with([{
            id: P.select('id', P.number),
            name: P.select('name', P.string),
            password_hashed: P.select('ph', P.string),
            aboutme: P.select('aboutme', P.string),
            icon: P.select('icon', P.union(null, P.instanceOf(Buffer))),
            icon_type: P.select('icon_type', P.union(null, P.string)),
        }], ({id, name, ph, aboutme, icon, icon_type}) => ph === params.password_hashed ? {
            id, name, aboutme, icon, icon_type
        } : new ErrorWithCode("Email or password incorrect", 401))
        .otherwise(() => new ErrorWithCode("Unexpected DB response", 500));

    if (userInfo instanceof ErrorWithCode) {
        return userInfo;
    }

    const icon: string | null | ErrorWithCode = match({icon: userInfo.icon, icon_type: userInfo.icon_type})
        .with({icon: null, icon_type: null}, () => null)
        .with({icon: P.select('icon', P.instanceOf(Buffer)), icon_type: P.select('icon_type', P.string)},
            ({icon, icon_type}) => `data:image/${icon_type};base64,${icon.toString('base64')}`)
        .otherwise(() => new ErrorWithCode("Unexpected DB response", 500));

    if (icon instanceof ErrorWithCode) {
        return icon;
    }

    return {
        id: userInfo.id,
        name: userInfo.name,
        aboutme: userInfo.aboutme,
        icon: icon,
    };
});