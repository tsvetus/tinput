/**
 * Converts TDate or masked string to ISO date
 * @param source - source TDate or masked string date
 * @param mask - date mask for string date
 * @returns {string|null} - ISO date
 */
export function isoDate(source, mask) {
    if (source instanceof Date) {
        return source.toISOString().substr(0, 10);
    } else if (mask) {
        let d = source.substr(mask.indexOf('DD'), 2);
        let m = source.substr(mask.indexOf('MM'), 2);
        let y = source.substr(mask.indexOf('YYYY'), 4);
        return y + '-' + m + '-' + d;
    }
    return null;
}

/**
 * Converts TDate or ISO date to masked string date
 * @param source - TDate or ISO string date
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

export function dateMask(format) {
     return {
         mask: format.mask
             .replace(/D/g, 'N')
             .replace(/M/g, 'N')
             .replace(/Y/g, 'N'),
         empty: format.empty
     };
}
