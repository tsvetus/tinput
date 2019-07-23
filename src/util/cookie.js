export function setCookie(cname, cvalue, exdays) {
    if (exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    } else {
        document.cookie = cname + "=" + cvalue + ";path=/";
    }
}

export function getCookie(cname, def) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            let res = c.substring(name.length, c.length);
            if (isNaN(def)) {
                return res;
            } else {
                return Number(res);
            }
        }
    }
    if (def === undefined) {
        return "";
    } else {
        return def;
    }
}

const LIST_COUNT = 3;

export function getCookieList(prefix) {
    let list = [];
    for (let i = 0; i < LIST_COUNT; i++) {
        if (getCookie(prefix + i) != ""){
            list[i] = {
                id: i,
                name: getCookie(prefix + i)
            }
        }
    }
    return list;
}

export function setCookieList(prefix, value) {
    let found = false;
    for (let i = 0; i < LIST_COUNT; i++) {
        if (value == getCookie(prefix + i)) {
            found = true;
            break;
        }
    }
    if (!found) {
        for (let i = 1; i < LIST_COUNT; i++) {
            setCookie(prefix + i, getCookie(prefix + (i - 1)));
        }
        setCookie(prefix + 0, value);
    }
}

export function deleteCookie(cname) {
    setCookie(cname, "", {
        expires: -1
    })
}
