import {REGEXP} from './const.js';

export function isoDate(source, mask) {
    if (source instanceof Date) {
        let offset = source.getTimezoneOffset();
        let d = new Date(source.getTime() - offset*60*1000);
        return d.toISOString().substr(0, 10);
    } else if (source && mask) {
        let d = mask.indexOf('DD') >= 0 ? source.substr(mask.indexOf('DD'), 2) : '01';
        let m = mask.indexOf('MM') >= 0 ? source.substr(mask.indexOf('MM'), 2) : '01';
        let y = mask.indexOf('YYYY') >= 0 ? source.substr(mask.indexOf('YYYY'), 4) : '1970';
        return y + '-' + m + '-' + d;
    } else if (source) {
        if (testIsoDate(source)) {
            return source;
        }
    }
    return null;
}

export function strDate(source, mask, empty) {

    let str = null;
    if (source instanceof Date) {
        let offset = source.getTimezoneOffset();
        let d = new Date(source.getTime() - offset*60*1000);
        str = d.toISOString().substr(0, 10);
    } else if (REGEXP.isoDate.test(source)) {
        str = source.substr(0, 10);
    } else {
        return source;
    }

    if (!str) {
        str = '';
    }

    let d = str.substr(8, 2);
    let m = str.substr(5, 2);
    let y = str.substr(0, 4);

    if (mask) {
        return mask.replace('DD', d).replace('MM', m).replace('YYYY', y);
    } else {
        return 'DD.MM.YYYY'.replace('DD', d).replace('MM', m).replace('YYYY', y);
    }

}

function leapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

export function testIsoDate(source) {
    if (REGEXP.isoDate.test(source)) {
        let d = Number.parseInt(source.substr(8, 2));
        let m = Number.parseInt(source.substr(5, 2));
        let y = Number.parseInt(source.substr(0, 4));
        if ([1, 3, 5, 7, 8, 10, 12].indexOf(m) >= 0) {
            return d > 0 && d <= 31;
        } else if ([4, 6, 9, 11].indexOf(m) >= 0) {
            return d > 0 && d <= 30;
        } else if (m === 2) {
            if (leapYear(Number.parseInt(y))) {
                return d > 0 && d <= 29;
            } else {
                return d > 0 && d <= 28;
            }
        }
    } else {
        return false;
    }
}

export function cutDate(source) {
    if (!source) {
        return source;
    }
    let date = (new Date(source)).toISOString();
    let d = date.substr(8, 2);
    let m = date.substr(5, 2);
    return d + '.' + m;
}

export function isoTime(source, mask) {
    if (source instanceof Date) {
        let offset = source.getTimezoneOffset();
        let d = new Date(source.getTime() - offset*60*1000);
        return d.toISOString().substr(11, 8);
    } else if (source && mask) {
        let h = mask.indexOf('hh') >= 0 ? source.substr(mask.indexOf('hh'), 2) : '00';
        let m = mask.indexOf('mm') >= 0 ? source.substr(mask.indexOf('mm'), 2) : '00';
        let s = mask.indexOf('ss') >= 0 ? source.substr(mask.indexOf('ss'), 2) : '00';
        return h + ':' + m + ':' + s;
    } else if (source) {
        if (testIsoTime(source)) {
            return source;
        }
    }
    return null;
}

export function strTime(source, mask, empty) {

    let str = null;
    if (source instanceof Date) {
        let offset = source.getTimezoneOffset();
        let d = new Date(source.getTime() - offset * 60 * 1000);
        str = d.toISOString().substr(11, 8);
    } else if (typeof source === 'string' || source instanceof String) {
        if (REGEXP.isoDate.test(source)) {
            str = source.substr(11, 8);
        } else {
            str = source;
        }
    } else {
        str = source;
    }

    if (!str) {
        str = '';
    }

    let h = str.substr(0, 2);
    let m = str.substr(3, 2);
    let s = str.substr(6, 2);

    if (mask) {
        return mask.replace('hh', h).replace('mm', m).replace('ss', s);
    } else {
        return 'hh:mm:ss'.replace('hh', h).replace('mm', m).replace('ss', s);
    }

}

export function testIsoTime(source) {
    if (REGEXP.isoTime.test(source)) {
        let h = Number.parseInt(source.substr(0, 2));
        let m = Number.parseInt(source.substr(3, 2));
        let s = Number.parseInt(source.substr(6, 2));
        return (
            h >= 0 && h <= 59 &&
            m >= 0 && m <= 59 &&
            s >= 0 && s <= 59);
    } else {
        return false;
    }
}

export function cutTime(source) {
    if (!source) {
        return source;
    }
    return strTime(source, 'hh:mm');
}

export function firstDate(year, month) {
    return new Date(Date.UTC(year, month, 1));
}

export function lastDate(year, month) {
    if (month < 11) {
        return new Date(Date.UTC(year, month + 1, 0));
    } else {
        return new Date(Date.UTC(year + 1, 0, 0));
    }
}

export function clearDate(date) {
    let d = date instanceof Date ? date : new Date(date);
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}