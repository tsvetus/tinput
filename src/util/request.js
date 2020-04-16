import {clone} from './misc.js';

export const INITIAL_STATE = {
    wait: false,
    user: null,
    error: null,
    message: null
};

let ENDPOINT = '';

let STORE = null;

const WAIT_ACTION = 'WAIT_ACTION';
function waitAction(wait) {
    return {
        type: WAIT_ACTION,
        wait: wait
    };
}

const USER_ACTION = 'USER_ACTION';
function userAction(data) {
    return {
        type: USER_ACTION,
        data: data
    };
}

const ERROR_ACTION = 'ERROR_ACTION';
function errorAction(data) {
    return {
        type: ERROR_ACTION,
        data: data
    };
}

const MESSAGE_ACTION = 'MESSAGE_ACTION';
function messageAction(data) {
    return {
        type: MESSAGE_ACTION,
        data: data
    };
}

export function clearError() {
    return errorAction(null);
}

export function clearMessage() {
    return messageAction(null);
}
export function clear() {
    return (dispatch) => {
        dispatch(clearError());
        dispatch(clearMessage());
    }
}

export function check(store) {
    if (store) {
        STORE = store;
    }
    return request ({
        url: '/api/login/check',
        data: {},
        success: (dispatch, data) => {
            dispatch(userAction(data));
        }
    });
}

export function login(username, password) {
    return request ({
        url: '/api/login?username=' + encodeURIComponent(username) +
            '&password=' + encodeURIComponent(password),
        data: {},
        success: (dispatch, data) => {
            dispatch(userAction(data));
        }
    });
}

export function logout() {
    return request ({
        url: '/api/logout',
        data: {},
        success: (dispatch, data) => {
            dispatch(userAction(data));
        }
    });
}

export function waitReducer(state = false, action = null) {
	if (action === null) {
		return state;
	} else if (action.type === WAIT_ACTION) {
        return action.wait;
    } else {
        return state;
    }
}

export function userReducer(state = null, action = null) {
    if (action === null) {
        return state;
    } else if (action.type === USER_ACTION) {
        return action.data;
    } else {
        return state;
    }
}

export function errorReducer(state = null, action = null) {
    if (action === null) {
        return state;
    } else if (action.type === ERROR_ACTION) {
        return action.data;
    } else {
        return state;
    }
}

export function messageReducer(state = null, action = null) {
    if (action === null) {
        return state;
    } else if (action.type === MESSAGE_ACTION) {
        return action.data;
    } else {
        return state;
    }
}

function setState(params, state) {
    if (params.sender && params.sender.state &&
        (params.sender.mounted || params.sender.mounted === undefined)) {
        params.sender.setState(state);
    }
}

export function post(params) {

    if (params.endpoint) {
        ENDPOINT = params.endpoint;
    }

    if (!params.url) {
        return;
    }

    let wait = params.wait === true || params.wait === undefined;
    if (params.force) {
        wait = false;
    }

    if (params.trace) {
        console.log('Data: ' + JSON.stringify(params.data));
    }

    let xhr = new XMLHttpRequest();

    xhr.open(
        params.method ? params.method : 'POST',
        ENDPOINT + params.url,
        params.async !== undefined ? params.async : true
    );

    xhr.setRequestHeader(
        'Content-Type',
        (params.contentType ? params.contentType : 'application/json') + '; charset=UTF-8'
    );

    xhr.withCredentials = true;

    if (params.sender && params.sender.state) {
        if (wait && params.sender.state.wait) {
            return;
        } else {
            setState(params, {wait: true});
        }
    }

    xhr.send(JSON.stringify(params.data));

    xhr.onreadystatechange = function() {

        let state = {wait: false};

        if (params.sender && params.sender.mounted === false) {
            return;
        } else if (xhr.readyState !== 4) {
            state.failed = true;
            setState(params, state);
            return;
        }

        if (xhr.status !== 200) {

            state.error = xhr.statusText;
            state.failed = true;

            setState(params, state);

            if (params.fail) {
                params.fail(xhr.status, {message: xhr.statusText});
            }

            if (STORE && (xhr.status === 504 || xhr.status === 403)) {
                STORE.dispatch(userAction(null));
            }

        } else {

            state.failed = false;

            let response = JSON.parse(xhr.responseText);

            if (response.error) {

                state.error = response.error.message;

                setState(params, state);

                if (params.fail) {
                    params.fail(xhr.status, response.error);
                }

            } else {

                if (params.target) {
                    state[params.target] = response.data;
                }

                if (response.message) {
                    state.message = response.message;
                }

                setState(params, state);

                if (params.success) {
                    params.success(response.data, response.message);
                }

            }

        }

        if (params.default) {
            params.default();
        }

    }

}

export function request(params) {
    return (dispatch) => {
        dispatch(errorAction(null));
        dispatch(messageAction(null));
      	dispatch(waitAction(true));
        post({
            url: params.url,
            data: params.data,
            fail: (status, error) => {
                dispatch(errorAction(error.message));
                if (params.fail) {
                    params.fail(dispatch, status, error);
                }
            },
            success: (data, message) => {
                dispatch(messageAction(message));
                if (params.success) {
                    params.success(dispatch, data);
                }
            },
            default: () => {
                dispatch(waitAction(false));
                if (params.default) {
                    params.default();
                }
            }
        });
    };
}

export function reducer(state = null, action = null) {
    if (action === null) {
        return state;
    }
    if (state === null) {
        return state;
    }
    let newState = clone(state);
    newState.wait = waitReducer(state.wait, action);
    newState.user = userReducer(state.user, action);
    newState.error = errorReducer(state.error, action);
    newState.message = messageReducer(state.message, action);
    return newState;
}

export function  hasAuth(auth, user) {
    if (user && user.authorities) {
        if (auth instanceof Array) {
            for (let i=0; i<auth.length; i++) {
                let found = hasAuth(auth[i], user);
                if (found) {
                    return true;
                }
            }
        } else {
            let found = user.authorities.find(v => {return v.name === auth});
            if (found) {
                return true;
            }
        }
    }
    return false;
}
