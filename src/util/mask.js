const DEFAULT_MASK = {mask: "NN.NN.NNN", empty: "-"};
const NUMBERS_MASK='NYMDhms';
const NUMBERS='1234567890';

function isDelimiter(char, mask) {
    if (char === null || char === undefined || char === '') {
        return false;
    }
    let i = mask.mask.indexOf(char);
    if (i < 0) {
        return false;
    } else {
        return NUMBERS_MASK.indexOf(i) < 0;
    }
}

export function parseMask(mask) {
    if (mask !== null && mask !== undefined) {
        return {
            mask: mask.mask ? mask.mask : DEFAULT_MASK.mask,
            empty: mask.empty ? mask.empty : DEFAULT_MASK.empty
        }
    } else {
        return DEFAULT_MASK;
    }
}

export function parseValue(value, mask) {
    let m = parseMask(mask);
    let v = (value === null || value === undefined) ? '' : value;
    let result = '';
    let k = 0;
    for (let i = 0; i < m.mask.length; i++) {
        let mc = m.mask.charAt(i);
        if (NUMBERS_MASK.indexOf(mc) < 0) {
            result += mc;
        } else {
            let vc = v.charAt(k++);
            while (isDelimiter(vc, mask)) {
                vc = v.charAt(k++);
            }
            if (vc === null || vc === undefined || vc === '') {
                result += m.empty;
            } else {
                result += vc;
            }
        }
    }
    return result;
}

export function correctValue(from, to, caret, mask) {

    if (from.length > to.length) {

        let mc = mask.mask.charAt(caret);

        if (NUMBERS_MASK.indexOf(mc) < 0) {
            return {
                value: from,
                caret: caret
            }
        } else {
            return {
                value: from.substr(0, caret) + mask.empty + from.substr(caret + 1),
                caret: caret
            }
        }

    } else if (from.length < to.length) {

        let mc = mask.mask.charAt(caret - 1);
        let vc = to.charAt(caret - 1);
        
        console.log(mc + '   ' + vc);

        if (NUMBERS_MASK.indexOf(mc) < 0) {
            if (NUMBERS.indexOf(vc) < 0) {
                return {
                    value: from,
                    caret: caret -1
                }
            } else {
                return {
                    value: from.substr(0, caret) + vc + from.substr(caret + 1),
                    caret: caret + 1
                }
            }
        } else if (caret <= from.length) {
            if (NUMBERS.indexOf(vc) < 0) {
                return {
                    value: from,
                    caret: caret -1
                }
            } else {
                return {
                    value: from.substr(0, caret - 1) + vc + from.substr(caret),
                    caret: caret
                }
            }
        }

    } else {

        let mc = mask.mask.charAt(caret - 1);
        let vc = to.charAt(caret - 1);

        if (NUMBERS_MASK.indexOf(mc) < 0) {
            return {
                value: from,
                caret: caret
            }
        } else {
            if (NUMBERS.indexOf(vc) < 0) {
                return {
                    value: from,
                    caret: caret
                }
            } else {
                return {
                    value: to,
                    caret: caret
                }
            }
        }

    }

}

export function completed(value, mask) {
    return value.length === mask.mask.length && value.indexOf(mask.empty) < 0;
}

export function empty(value, mask) {
    for (let i = 0; i < mask.mask.length; i++) {
        let mc = mask.mask.charAt(i);
        if (NUMBERS_MASK.indexOf(mc) >= 0) {
            if (value.charAt(i) !== mask.empty) {
                return false;
            }
        }
    }
    return true;
}