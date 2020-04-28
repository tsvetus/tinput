import React from 'react';

export function merge(...sources) {
    let res = {};
    for (const source of sources) {
        if (source instanceof Array) {
            if (!(res instanceof Array)) {
                res = []
            }
            source.forEach((v, i) => {res[i] = v});
        } else if (source instanceof Object) {
            for (let [key, value] of Object.entries(source)) {
                let r = null;
                if (value instanceof Object && key in res) {
                    r = {[key]: merge(res[key], value)}
                } else {
                    r = {[key]: value};
                }
                res = {
                    ...res,
                    ...r
                }
            }
        }
    }
    return res;
}

export function apply(from, to, style) {

    if (!from || !to || !style) {
        return;
    }

    let f = Object.keys(from);
    let t = Object.keys(to);

    for (let i=0; i<t.length; i++) {
        if (to[t[i]] === undefined) {
            style[t[i]] = null;
        } else {
            style[t[i]] = to[t[i]];
        }
    }

    if (from) {
        for (let i=0; i<f.length; i++) {
            if (t.indexOf(f[i]) < 0) {
                style[f[i]] = null;
            }
        }
    }

}

export function nvl(source, def) {
    if (source === null || source === undefined) {
        return def;
    } else {
        return source;
    }
}

export function clone(source) {
    let dest = null;
    if (typeof source === 'function') {
        dest = source;
    } else if (source instanceof Array) {
        dest = source.slice();
        for (let i=0; i<dest.length; i++) {
            dest[i] = clone(dest[i]);
        }
    } else if (React.isValidElement(source)) {
        dest = source;
    } else if (source instanceof Date) {
        dest = new Date(source.getTime());
    } else if (source instanceof Object) {
        dest = Object.assign({}, source);
        let keys = Object.keys(dest);
        for (let i=0; i<keys.length; i++) {
            dest[keys[i]] = clone(dest[keys[i]]);
        }
    } else {
        dest = source;
    }
    return dest;
}

export function download(url, filename) {
    let link = document.createElement("a");
    if (filename) {
        link.download = filename;
    }
    link.target = "_blank";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function seconds(source) {
    return Date.parse('1970 ' + source + ' GMT')/1000;
}

export function find(node, parent) {
    if (!node) {
        return null;
    }
    if (node === parent) {
        return parent;
    }
    if (parent && parent.children) {
        for (let i=0; i<parent.children.length; i++) {
            let child = parent.children[i];
            if (node === child) {
                return child
            }
            let found = find(node, child);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

export function strip(source) {
    if (source && typeof source === 'string') {
        return source
            .replace(/<br>/gm, '\r')
            .replace(/<[^>]*>?/gm, '')
            .replace(/&(.*?);+/gm, ' ');
    } else {
        return source;
    }
}

export function params(source) {
    let res = {};
    let path = source ? source : window.location.pathname;
    if (path) {
        let arr = path.split('?');
        if (arr.length > 1) {
            let query = arr[1];
            if (query) {
                let q = query.split('&');
                q.forEach(param => {
                    if (param) {
                        let p = param.split('=');
                        res[p[0]] = p[1];
                    }
                });
            }
        }
    }
    return res;
}

export function contain(source) {
    if (source) {
        let res = clone(source);
        if (!res.container) {
            res.container = {};
        }
        for (let key in source) {
            if (!(source[key] instanceof Object)) {
                res.container[key] = source[key];
                delete res[key];
            }
        }
        return res;
    } else {
        return source;
    }
}

export function getFile(url, callback){
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            callback(request.responseText);
        }
    }
}

export function compare(foo, bar) {
    if (foo instanceof Array && bar instanceof Array) {
        let m = foo.length > bar.length ? foo.length : bar.length;
        for (let i=0; i<m; i++) {
            if (!compare(foo[i], bar[i])) {
                return false;
            }
        }
    } else if (foo instanceof Object && bar instanceof Object) {
        for (let key in foo) {
            if (!compare(foo[key], bar[key])) {
                return false;
            }
        }
        for (let key in bar) {
            if (!compare(bar[key], foo[key])) {
                return false;
            }
        }
    } else {
        if (foo !== bar) {
            return false;
        }
    }
    return true;
}

export function replace(source, name, value) {
    if ((typeof source) === 'string') {
        let r = new RegExp('\\$\\{' + name + '\\}','gm');
        return source.replace(r, value);
    } else if ((typeof source) === 'object') {
        for (let key in source) {
            source[key] = replace(source[key], name, value);
        }
        return source;
    } else {
        return source;
    }
}

export function isMS() {
    let ua = window.navigator.userAgent;
    return /MSIE|Trident|Edge/.test(ua);
}

export function parseField(item, field, def) {
    if (field) {
        if (field instanceof Array) {
            for (let i=0; i<field.length; i++) {
                if (item.hasOwnProperty(field[i])) {
                    return field[i];
                }
            }
        } else if (typeof field === 'string') {
            if (item.hasOwnProperty(field)) {
                return field;
            }
        }
    }
    return def;
}

export function parseItem(item, field, def) {
    let key = parseField(item, field);
    if (key) {
        return item[key];
    } else {
        return def;
    }
}

