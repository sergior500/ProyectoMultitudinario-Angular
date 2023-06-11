// To parse this data:
//
//   import { Convert } from "./file";
//
//   const servicePurchased = Convert.toServicePurchased(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ServicePurchased {
    service:    Service;
    username:   User;
    end_date:   number[];
    start_date: number[];
    active:     boolean;
    user:       User;
}

export interface Service {
    id:               number;
    days_duration:    number;
    name:             string;
    category_service: string;
    description:      string;
    price:            number;
}

export interface User {
    username:              string;
    password:              string;
    first_name:            string;
    role:                  string;
    email:                 string;
    verificationCode:      string;
    enabled:               boolean;
    altura:                number;
    peso:                  number;
    imc:                   number;
    authorities:           Authority[];
    accountNonExpired:     boolean;
    credentialsNonExpired: boolean;
    accountNonLocked:      boolean;
}

export interface Authority {
    authority: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toServicePurchased(json: string): ServicePurchased[] {
        return cast(JSON.parse(json), a(r("ServicePurchased")));
    }

    public static servicePurchasedToJson(value: ServicePurchased[]): string {
        return JSON.stringify(uncast(value, a(r("ServicePurchased"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "ServicePurchased": o([
        { json: "service", js: "service", typ: r("Service") },
        { json: "username", js: "username", typ: r("User") },
        { json: "end_date", js: "end_date", typ: a(0) },
        { json: "start_date", js: "start_date", typ: a(0) },
        { json: "active", js: "active", typ: true },
        { json: "user", js: "user", typ: r("User") },
    ], false),
    "Service": o([
        { json: "id", js: "id", typ: 0 },
        { json: "days_duration", js: "days_duration", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "category_service", js: "category_service", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "price", js: "price", typ: 3.14 },
    ], false),
    "User": o([
        { json: "username", js: "username", typ: "" },
        { json: "password", js: "password", typ: "" },
        { json: "first_name", js: "first_name", typ: "" },
        { json: "role", js: "role", typ: "" },
        { json: "email", js: "email", typ: "" },
        { json: "verificationCode", js: "verificationCode", typ: "" },
        { json: "enabled", js: "enabled", typ: true },
        { json: "altura", js: "altura", typ: 3.14 },
        { json: "peso", js: "peso", typ: 0 },
        { json: "imc", js: "imc", typ: 3.14 },
        { json: "authorities", js: "authorities", typ: a(r("Authority")) },
        { json: "accountNonExpired", js: "accountNonExpired", typ: true },
        { json: "credentialsNonExpired", js: "credentialsNonExpired", typ: true },
        { json: "accountNonLocked", js: "accountNonLocked", typ: true },
    ], false),
    "Authority": o([
        { json: "authority", js: "authority", typ: "" },
    ], false),
};
