/**
 * Contains available masks
 * @type {{numbers: {value: string, mask: string}}}
 */
const masks = {
    numbers: {
        mask: 'N',
        value: '1234567890'
    }
}

export function maskedValue(value, mask, empty) {
    let v = '';
    for (let i=0; i<mask.length; i++) {
        if (value) {
            if (value[i]) {
                if (mask[i] == 'N') {
                    v += value[i];
                } else {
                    v += mask[i];
                }
            } else {
                if (mask[i] == 'N') {
                    v += empty;
                } else {
                    v += mask[i];
                }
            }
        } else {
            if (mask[i] == 'N') {
                v += empty;
            } else {
                v += mask[i];
            }
        }
    }
    return v;
}

/**
 * Determines type of character at <caret> position
 * @param {number} caret - Caret position
 * @param {string} mask - Mask
 * @returns {string|*} Returns position type
 */
function positionType(caret, mask) {
    let k = mask[caret];
    if (k === undefined) {
        return 'undefined';
    }
    for (let [key, val] of Object.entries(masks)) {
        if (val instanceof Object) {
            if (val.mask.indexOf(k) >= 0) {
                return key;
            }
        }
    }
    return 'none';
}

/**
 * Performs check if <key> valid for insertion in result string
 * @param  {string} key   Char to check
 * @param  {number} caret Caret position
 * @param  {string} mask  Mask string
 * @return {bool}       Returns check result
 */
function checkKey(key, caret, mask) {

    if (caret < 0 || caret >= mask.lengh) {
        return false;
    }

    let m = mask[caret];
    if (m && masks.numbers.mask.indexOf(m) >= 0) {
        return masks.numbers.value.indexOf(key) >= 0;
    }

    return false;

}

/**
 * Replaces char in a <source> string at <index> position
 * @param  {string} source - Source string
 * @param  {string} char   - Char for replacement
 * @param  {number} index  - Char index for replacement
 * @return {string}         - Result string
 */
function replace(source, char, index) {
    return source.substr(0, index) + char + source.substr(index + 1);
}

/**
 * Generates masked string
 */
class Mask {

    /**
     * Sets initial parameters for Mask object
     * @param {object} params - Input parameters
     * @param {object} params.mask - Input mask
     * @param {object} params.empty - Empty sympol
     * @param {object} params.value - Initial value
     */
    constructor(params) {
        if (params) {
            this.value = params.value ? params.value : '';
            this.mask = params.mask;
            this.empty = params.empty;
        } else {
            this.value = '';
            this.mask = '';
            this.empty = '';
        }
    }

    /**
     * Sets initial parameters for Mask object
     * @param {object} params - Input parameters
     * @param {object} params.mask - Input mask
     * @param {object} params.empty - Empty sympol
     * @param {object} params.value - Initial value
     */
    set(params) {

        this.mask = params.mask ? params.mask : this.mask;
        this.empty = params.empty ? params.empty : this.empty;

        if (params.value) {
            let v = params.value;
            for (let i=0; i<this.mask.length; i++) {
                if (positionType(i, this.mask) == 'none') {
                    let m = this.mask[i];
                    this.value = replace(this.value, m, i);
                } else {
                    let k = v[i];
                    if (checkKey(k, i, this.mask)) {
                        this.value = replace(this.value, k, i);
                    } else {
                        this.value = replace(this.value, this.empty, i);
                    }
                }
            }
            this.caret = 0;
        }

    }

    /**
     * Perses input parameters and returns masked value and caret position
     * @param  {object} event - Input parameters
     * @param  {object} event.value - Inpet value
     * @param  {object} event.key - Last pressed key
     * @param  {object} event.caret  - last caret position
     * @return {object} - {value: <masked value>, caret: <new caret position>}
     */
    parse(event) {

        if (!event) {
            return '';
        }

        if (event.caret) {
            this.caret = event.caret;
        } else {
            this.caret = 0;
        }

        this.set(event);

        if (event.key && event.key.length == 1) {
            if (checkKey(event.key, event.caret, this.mask)) {
                if (positionType(this.caret, this.mask) !== 'none') {
                    this.value = replace(this.value, event.key, event.caret);
                    this.caret = event.caret + 1;
                }
                while (positionType(this.caret, this.mask) === 'none') {
                    this.caret += 1;
                }
            }
        } else if (event.key === 'Backspace') {
            if (this.caret > 0) {
                if (positionType(this.caret - 1, this.mask) !== 'none') {
                    this.value = replace(this.value, this.empty, event.caret - 1);
                }
                this.caret = event.caret - 1;
            }
        } else if (event.key === 'Delete') {
            if (this.caret < this.mask.length) {
                if (positionType(this.caret, this.mask) !== 'none') {
                    this.value = replace(this.value, this.empty, event.caret);
                }
                this.caret = event.caret + 1;
            }
        }

        return {
            value: this.value,
            caret: this.caret ? this.caret : 0
        }

    }

    /**
     * Checks if value contains no <empty> symbols
     * @returns {boolean}
     */
    checkComplete() {
        return this.value.indexOf(this.empty) < 0;
    }

}

export default Mask;
