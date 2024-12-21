import {neon} from "@neondatabase/serverless";

const DB_LINK = process.env["DB_LINK"];

if (DB_LINK === undefined) {
    throw Error("Missing environmental variable DB_LINK");
}

export default neon(DB_LINK);