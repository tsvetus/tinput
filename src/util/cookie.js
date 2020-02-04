export function setCookie(name, value, expires) {
    let val = value;
    if (typeof value === 'object') {
        val = JSON.stringify(value);
    }
    if (expires) {
        let d = new Date();
        d.setTime(d.getTime() + (expires*24*60*60*1000));
        let exp = "expires="+ d.toUTCString();
        document.cookie = name + "=" + val + ";" + exp + ";path=/";
    } else {
        document.cookie = name + "=" + val + ";path=/";
    }
}

export function getCookie(name, defaultValue) {
    let n = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(n) == 0) {
            let res = c.substring(n.length, c.length);
            if (typeof defaultValue === 'number') {
                return Number(res);
            } else if (typeof defaultValue === 'object') {
                let r = null;
                try {
                    r = JSON.parse(res);
                } catch (err) {
                    r = defaultValue;
                }
                return r;
            } else {
                return res;
            }
        }
    }
    if (defaultValue === undefined) {
        return "";
    } else {
        return defaultValue;
    }
}

export function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}
