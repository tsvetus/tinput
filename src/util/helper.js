import {clone, merge} from './misc.js';

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

export class Helper {

    constructor (params) {
        this.original = [];
        this.items = [];
        this.struct = null;
        this.count = 0;
        this.tree = params ? params.tree : false;
        this.getStruct = this.getStruct.bind(this);
        this.getValue = this.getValue.bind(this);
        this.getKey = this.getKey.bind(this);
        this.getMode = this.getMode.bind(this);
        this.getListItems = this.getListItems.bind(this);
        this.getShowItems = this.getShowItems.bind(this);
        this.getOriginalItems = this.getOriginalItems.bind(this);
        this.getListItem = this.getListItem.bind(this);
        this.getShowItem = this.getShowItem.bind(this);
        this.getOriginalItem = this.getOriginalItem.bind(this);
        this.hasItems = this.hasItems.bind(this);
        this.load = this.load.bind(this);
        this.getOriginal = this.getOriginal.bind(this);
        this.getQuery = this.getQuery.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.getItem = this.getItem.bind(this);
        this.getCount = this.getCount.bind(this);
    }

    getStruct(items, empty, keyField, valueField) {

        let item = null;

        if (items && items.length > 0) {
            item = items[0];
        } else if (empty) {
            item = empty;
        }

        if (item) {

            if (item instanceof Object) {

                let key = null;
                let value = null;

                let i = 0;
                for (let field in item) {
                    if (i === 0) {
                        key = field;
                    } else if (i === 1) {
                        value = field;
                    } else {
                        break;
                    }
                    i++;
                }

                key = parseField(item, keyField, key);
                value = parseField(item, valueField, value);

                if (key !== null && value !== null) {
                    return {key: key, value: value}
                }

            }

        } else {

            if ((typeof keyField === 'string') && (typeof valueField === 'string')) {
                return {key: keyField, value: valueField}
            }

        }

        return null;

    }

    getMode(mode) {
        if (mode && (mode.indexOf('key') >= 0 || mode.indexOf('val') >= 0)) {
            return mode;
        } else {
            return 'val';
        }
    }

    getValue(item, mode) {
        let value = '';
        let m = this.getMode(mode);
        if (m.indexOf('key') >= 0) {
            value += item[this.struct.key];
        }
        if (m.indexOf('val') >= 0) {
            if (value === '') {
                value += item[this.struct.value];
            } else {
                value += ' ' + item[this.struct.value];
            }
        }
        return value;
    }

    getKey(item) {
        return item[this.struct.key];
    }

    load(items, empty, listMode, showMode, keyField, valueField) {

        if (this.tree) {
            this.original = clone(items, 'items');
        } else {
            this.original = clone(items);
        }

        this.items = [];
        this.listMode = this.getMode(listMode);
        this.showMode = this.getMode(showMode);
        this.struct = this.getStruct(items, empty, keyField, valueField);
        this.count = items ? items.length : 0;

        if (this.struct) {

            if (empty) {
                this.items.push({
                    index: -1,
                    key: empty[this.struct.key],
                    listValue: empty[this.struct.value],
                    showValue: empty[this.struct.value]
                });
            }

            if (items) {
                items.forEach((v, i) => {
                    let helper = undefined;
                    if (v.items && this.tree) {
                        helper = new Helper({tree: this.tree});
                        helper.load(v.items, null, this.listMode, this.showMode, keyField, valueField);
                    }
                    this.items.push({
                        index: i,
                        key: v[this.struct.key],
                        listValue: this.getValue(v, this.listMode),
                        showValue: this.getValue(v, this.showMode),
                        helper: helper
                    });
                });
            }

        }

    }

    hasItems() {
        return this.count > 0;
    }

    getCount() {
        return this.count;
    }

    getLength() {
        return this.items ? this.items.length : 0;
    }

    getListItems() {
        return this.items.map(v => {
            return {
                index: v.index,
                key: v.key,
                value: v.listValue,
                helper: v.helper
            }
        });
    }

    getShowItems() {
        return this.items.map(v => {
            return {
                index: v.index,
                key: v.key,
                value: v.showValue
            }
        });
    }

    getIndex(value) {
        if (this.items) {
            return this.items.findIndex(v => {return v.key === value});
        } else {
            return -1;
        }
    }

    getItem(value) {
        for (let i=0; i<this.items.length; i++) {
            if (this.items[i].key === value) {
                return this.items[i];
            } else if (this.items[i].helper) {
                let item = this.items[i].helper.getItem(value);
                if (item) {
                    return item;
                }
            }
        }
        return null;
    }

    getShowItem(value) {
        let item = this.getItem(value);
        if (item) {
            return {
                index: item.index,
                key: item.key,
                value: item.showValue
            }
        } else {
            return null;
        }
    }

    getListItem(value) {
        let item = this.getItem(value);
        if (item) {
            return {
                index: item.index,
                key: item.key,
                value: item.showValue
            }
        } else {
            return null;
        }
    }

    getOriginal(index) {
        if (this.original) {
            return this.original[index];
        } else {
            return null;
        }
    }

    getOriginalItems() {
        return this.original;
    }

    getOriginalItem(value) {
        for (let i=0; i<this.items.length; i++) {
            if (this.items[i].key === value) {
                return this.original[i];
            } else if (this.items[i].helper) {
                let item = this.items[i].helper.getOriginalItem(value);
                if (item) {
                    return item;
                }
            }
        }
        return null;
    }

    getQuery(query, key, value) {
        let result = query;
        if (this.struct) {
            result = merge(query, {
                [this.struct.key]: key,
                [this.struct.value]: value
            });
        }
        return result;
    }

}
