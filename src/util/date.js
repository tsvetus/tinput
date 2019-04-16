export function sqlDate(source) {

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

export function strDate(source) {

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
