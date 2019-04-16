import Math from 'math';
import {saveAs} from 'file-saver';

class Util {}

Util.diffDays = (date1, date2) => {
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

Util.toDate = (source) => {
    return new Date(source);
}

Util.dateString = (source) => {
    return (new Date(source)).toLocaleDateString();
}

Util.dayMonthString = (source) => {
    let date = (new Date(source)).toLocaleDateString();
    return date.substring(0, 5);
}

Util.toLocal = (source) => {

    let date = null;

    if (source instanceof Date) {
        date = source.toISOString().slice(0, 10);
    } else {
        date = source ? source : '';
    }

    if (date.length == 10) {
        let arr = date.split('-');
        if (arr.length == 3) {
            return arr[2] + '.' + arr[1] + '.' + arr[0];
        }
    }

    return '';

}

Util.toCommon = (source) => {

    let date = null;

    if (source instanceof Date) {
        date = source.toLocaleDateString();
    } else {
        date = source ? source : '';
    }

    if (date.length == 10) {
        let arr = date.split('.');
        if (arr.length == 3) {
            return arr[2] + '-' + arr[1] + '-' + arr[0];
        }
    }

    return '';

}

Util.saveBase64 = (params, base64) => {
    var binary = atob(base64.replace(/\s/g, ''));
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }
    var blob = new Blob([view], {type: params.contentType});
    var file = new File([blob], params.fileName, {type: params.contentType});
    saveAs(file);
}

Util.merge = (...sources) => {
    let acc = {}
    for (const source of sources) {
        if (source instanceof Array) {
            if (!(acc instanceof Array)) {
                acc = []
            }
            acc = [...acc, ...source]
        } else if (source instanceof Object) {
            for (let [key, value] of Object.entries(source)) {
                if (value instanceof Object && key in acc) {
                    value = Util.merge(acc[key], value)
                }
                acc = { ...acc, [key]: value }
            }
        }
    }
    return acc
}

Util.style = (...sources) => {
    let st = Util.merge(...sources);
    for (let [k, v] of Object.entries(st)) {
        if (!(v instanceof Object) && !(v instanceof Array)) {
            st.container = {
                ...st.container,
                [k]: v
            }
        }
    }
    return st;
}

export default Util;
