import {clone, merge, parseField} from '../../util';

class Helper {

    constructor () {
        this.original = [];
        this.items = [];
        this.struct = null;
        this.count = 0;
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
    }

    getStruct(items, empty, keyField, valueField) {

        if (items === undefined && empty === undefined) {
            return this.struct;
        }

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

        this.original = clone(items);
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
                    this.items.push({
                        index: i,
                        key: v[this.struct.key],
                        listValue: this.getValue(v, this.listMode),
                        showValue: this.getValue(v, this.showMode)
                    });
                });
            }

        }

    }

    hasItems() {
        return this.count > 0;
    }

    getLength() {
        return this.items ? this.items.length : 0;
    }

    getListItems() {
        return this.items.map(v => {
            return {
                index: v.index,
                key: v.key,
                value: v.listValue
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

    getShowItem(value) {
        return this.getShowItems().find( v =>{
            return v.key == value;
        });
    }

    getListItem(value) {
        return this.getListItems().find( v =>{
            return v.key == value;
        });
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
        let index = this.getListItems().findIndex( v => {
            return v.key == value;
        });
        return this.getOriginal(index);
    }

    getQuery(query, key, value) {
        if (this.struct) {
            let result = merge(query, {
                [this.struct.key]: key,
                [this.struct.value]: value
            });
            return result;
        } else {
            return query;
        }
    }

}

export default Helper;
