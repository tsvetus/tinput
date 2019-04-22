/**
 * Converts Date or masked string to ISO date
 * @param source - source Date or masked string date
 * @param mask - date mask for string date
 * @returns {string|null} - ISO date
 */
export function isoDate(source, mask) {
    if (source instanceof Date) {
        return source.toISOString().substr(0, 10);
    } else if (source && mask) {
        let d = mask.indexOf('DD') >= 0 ? source.substr(mask.indexOf('DD'), 2) : '01';
        let m = mask.indexOf('MM') >= 0 ? source.substr(mask.indexOf('MM'), 2) : '01';
        let y = mask.indexOf('YYYY') >= 0 ? source.substr(mask.indexOf('YYYY'), 4) : '1970';
        return y + '-' + m + '-' + d;
    }
    return null;
}

/**
 * Converts Date or ISO date to masked string date
 * @param source - Date or ISO string date
 * @param mask - Mask for conversion
 * @returns {string|null} - Masked string date
 */
export function strDate(source, mask) {

    let str = null;
    if (source instanceof Date) {
        str = source.toISOString().substr(0, 10);
    } else if (source) {
        str = source;
    } else {
        return null;
    }

    let d = str.substr(8, 2);
    let m = str.substr(5, 2);
    let y = str.substr(0, 4);

    return mask.replace('DD', d).replace('MM', m).replace('YYYY', y);

}

/**
 * Returns date mask based on date format
 * @param format
 * @returns {{mask: string, empty: *}}
 */
export function dateMask(format) {
     return {
         mask: format.mask
             .replace(/D/g, 'N')
             .replace(/M/g, 'N')
             .replace(/Y/g, 'N'),
         empty: format.empty
     };
}

/**
 * Converts Date or masked string to ISO time
 * @param source - source Date or masked string time
 * @param mask - time mask for string time
 * @returns {string|null} - ISO time
 */
export function isoTime(source, mask) {
    if (source instanceof Date) {
        return source.toISOString().substr(11, 8);
    } else if (source && mask) {
        let h = mask.indexOf('hh') >= 0 ? source.substr(mask.indexOf('hh'), 2) : '00';
        let m = mask.indexOf('mm') >= 0 ? source.substr(mask.indexOf('mm'), 2) : '00';
        let s = mask.indexOf('ss') >= 0 ? source.substr(mask.indexOf('ss'), 2) : '00';
        return h + ':' + m + ':' + s;
    }
    return null;
}

/**
 * Converts Date or ISO time to masked string time
 * @param source - Date or ISO string time
 * @param mask - Mask for conversion
 * @returns {string|null} - Masked string time
 */
export function strTime(source, mask) {

    let str = null;
    if (source instanceof Date) {
        str = source.toISOString().substr(11, 8);
    } else if (source) {
        str = source;
    } else {
        return null;
    }

    let h = str.substr(0, 2);
    let m = str.substr(3, 2);
    let s = str.substr(6, 2);

    return mask.replace('hh', h).replace('mm', m).replace('ss', s);

}

/**
 * Returns time mask based on time format
 * @param format
 * @returns {{mask: string, empty: *}}
 */
export function timeMask(format) {
    return {
        mask: format.mask
            .replace(/h/g, 'N')
            .replace(/m/g, 'N')
            .replace(/s/g, 'N'),
        empty: format.empty
    };
}

export function seconds(source) {
    return Date.parse('1970 ' + source + ' GMT')/1000;
}
