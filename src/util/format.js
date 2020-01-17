const NUMBERS = 'NYMDhms';
const CHARS = 'A';

function isMaskCore(char) {
    return char ? NUMBERS.indexOf(char) < 0 && CHARS.indexOf(char) < 0 : false;
}

function isMaskNumber(char) {
    return char ? NUMBERS.indexOf(char) >= 0 : false;
}

function isValueNumber(char) {
    return char ? '0123456789'.indexOf(char) >= 0 : false;
}

class Format {

    constructor(mask, empty, full, value) {
        this.correct = this.correct.bind(this);
        this.format = this.format.bind(this);
        this.parse = this.parse.bind(this);
        this.mask = mask ? mask : '';
        this.empty = empty && empty.length > 0 ? empty[0] : '-';
        this.value = value ? value : '';
        this.full = full;
        this.value = this.format(this.mask, this.empty, this.value);
        this.isFull = false;
        this.isEmpty = false;
    }

    correct(event) {

        let value = event.value ? event.value : '';
        let caret = event.caret ? event.caret : '';

        let diff = value.length - this.value.length;

        if (diff === 0) {

        } else if (diff === 1) {
            if (isMaskNumber(this.mask[caret - 1]) && !isValueNumber(value[caret - 1])) {
                value = this.value;
                caret --;
            } else if (caret < value.length) {
                value = value.substr(0, caret) + value.substr(caret + 1);
                while (isMaskCore(this.mask[caret])) {
                    caret ++;
                }
            } else {
                value = value.substr(0, caret -1);
                while (isMaskCore(this.mask[caret])) {
                    caret --;
                }
            }
        } else if (diff === -1) {
            value = value.substr(0, caret) + this.empty + value.substr(caret);
            // if (event.key === 46) {
            //     caret++;
            // }
        } else {
            value = this.value;
        }

        return {value: value, caret: caret};

    }

    format(mask, empty, value) {

        let maskStr = mask ? mask : '';
        let emptyStr = empty && empty.length > 0 ? empty[0] : '_';
        let valueStr = value ? value : '';

        let m = maskStr.length - 1;
        let v = valueStr.length - 1;

        let result = '';
        let count = 0;

        while (m >= 0) {
            let from = maskStr[m];
            let to = emptyStr;
            if (isMaskCore(from)) {
                to = from;
                if (v >= 0) {
                    if (valueStr[v] === to || valueStr[v] === emptyStr) {
                        v--;
                    }
                }
            } else {
                if (v >= 0) {
                    if (isMaskNumber(from)) {
                        if (isValueNumber(valueStr[v])) {
                            count++;
                            to = valueStr[v];
                            v--;
                        } else if (valueStr[v] === emptyStr) {
                            to = valueStr[v];
                            v--;
                        } else {
                            while (v >= 0 && !isValueNumber(valueStr[v])) {
                                v--;
                            }
                        }
                    } else {
                        count++;
                        to = valueStr[v];
                        v--;
                    }
                }
            }
            result = to + result;
            m--;
        }

        this.isEmpty = count === 0;
        this.isFull = result.indexOf(emptyStr) < 0;

        return result;

    }

    parse(event) {

        let result = this.correct(event);

        this.value = this.format(this.mask, this.empty, result.value);

        result = {
            value: this.value,
            caret: result.caret,
            full: this.isFull,
            empty: this.isEmpty
        };

        return result;

    }

}

export default Format;