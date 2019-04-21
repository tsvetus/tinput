export function merge(...sources) {
    let res = {}
    for (const source of sources) {
        if (source instanceof Array) {
            if (!(res instanceof Array)) {
                res = []
            }
            res = [...res, ...source]
        } else if (source instanceof Object) {
            for (let [key, value] of Object.entries(source)) {
                if (value instanceof Object && key in res) {
                    value = merge(res[key], value)
                }
                res = { ...res, [key]: value }
            }
        }
    }
    return res;
}

export function mergeStyles(...sources) {
    let res = merge(...sources);
    for (let [k, v] of Object.entries(res)) {
        if (!(v instanceof Object) && !(v instanceof Array)) {
            res.container = {
                ...res.container,
                [k]: v
            }
        }
    }
    return res;
}

export function checkEmail(source) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(source).toLowerCase());
}
