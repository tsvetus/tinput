import { clone } from './misc.js'

let initial_state = window && window.INITIAL_STATE ? window.INITIAL_STATE : {}

export const INITIAL_STATE = {
  wait: false,
  user: null,
  error: null,
  message: null,
  division: null,
  endpoint: '',
  language: 'en',
  dictionary: {},
  ...initial_state
}

let STORE = null

const WAIT_ACTION = 'WAIT_ACTION'
function waitAction(wait) {
  return {
    type: WAIT_ACTION,
    wait: wait
  }
}

const USER_ACTION = 'USER_ACTION'
function userAction(data) {
  return {
    type: USER_ACTION,
    data: data
  }
}

const ERROR_ACTION = 'ERROR_ACTION'
function errorAction(data) {
  return {
    type: ERROR_ACTION,
    data: data
  }
}

const MESSAGE_ACTION = 'MESSAGE_ACTION'
function messageAction(data) {
  return {
    type: MESSAGE_ACTION,
    data: data
  }
}

const LANGUAGE_ACTION = 'LANGUAGE_ACTION'
function languageAction(wait) {
  return {
    type: LANGUAGE_ACTION,
    wait: wait
  }
}

const DICTIONARY_ACTION = 'DICTIONARY_ACTION'
function dictionaryAction(data) {
  return {
    type: DICTIONARY_ACTION,
    data: data
  }
}

export function clearError() {
  return errorAction(null)
}

export function clearMessage() {
  return messageAction(null)
}
export function clear() {
  return dispatch => {
    dispatch(clearError())
    dispatch(clearMessage())
  }
}

export function check(store) {
  if (store) {
    STORE = store
  }
  return request({
    url: '/api/login/check',
    data: {},
    success: (dispatch, data) => {
      dispatch(userAction(data))
    }
  })
}

export function login(username, password) {
  return request({
    url:
      '/api/login' +
      '?username=' +
      encodeURIComponent(username) +
      '&password=' +
      encodeURIComponent(password),
    data: {},
    success: (dispatch, data) => {
      dispatch(userAction(data))
    }
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    data: {},
    success: (dispatch, data) => {
      dispatch(userAction(data))
    }
  })
}

export function translate(language) {
  return request({
    url: '/api/message/dictionary',
    data: { language: language },
    success: (dispatch, data) => {
      dispatch(languageAction(language))
      dispatch(dictionaryAction(data))
    }
  })
}

export function waitReducer(state = false, action = null) {
  if (action === null) {
    return state
  } else if (action.type === WAIT_ACTION) {
    return action.wait
  } else {
    return state
  }
}

export function userReducer(state = null, action = null) {
  if (action === null) {
    return state
  } else if (action.type === USER_ACTION) {
    return action.data
  } else {
    return state
  }
}

export function errorReducer(state = null, action = null) {
  if (action === null) {
    return state
  } else if (action.type === ERROR_ACTION) {
    return action.data
  } else {
    return state
  }
}

export function messageReducer(state = null, action = null) {
  if (action === null) {
    return state
  } else if (action.type === MESSAGE_ACTION) {
    return action.data
  } else {
    return state
  }
}

export function dictionaryReducer(state = null, action = null) {
  if (action === null) {
    return state
  } else if (action.type === DICTIONARY_ACTION) {
    return action.data
  } else {
    return state
  }
}

function setState(params, state) {
  if (
    params.sender &&
    params.sender.state &&
    (params.sender.mounted || params.sender.mounted === undefined)
  ) {
    params.sender.setState(state)
  }
}

export function post(params) {
  if (!params || !params.url) {
    return
  }

  let wait = params.wait === true || params.wait === undefined
  if (params.force) {
    wait = false
  }

  if (params.sender && params.sender.state) {
    if (wait && params.sender.state.wait) {
      return
    } else {
      setState(params, { wait: true })
    }
  }

  let contentType = params.contentType
    ? params.contentType
    : 'application/json; charset=UTF-8'

  let xhr = new XMLHttpRequest()

  xhr.withCredentials = true

  xhr.open(
    params.method ? params.method : 'POST',
    INITIAL_STATE.endpoint + params.url
  )

  xhr.onreadystatechange = function () {
    let state = { wait: false }

    if (params.sender && params.sender.mounted === false) {
      return
    } else if (xhr.readyState !== 4) {
      state.failed = true
      setState(params, state)
      return
    }

    if (xhr.status !== 200) {
      state.error = xhr.statusText
      state.failed = true

      setState(params, state)

      if (params.fail) {
        params.fail(xhr.status, { message: xhr.statusText })
      }

      if (STORE && (xhr.status === 504 || xhr.status === 403)) {
        STORE.dispatch(userAction(null))
      }
    } else {
      state.failed = false

      let response = JSON.parse(xhr.responseText)

      if (response.error) {
        state.error = response.error.message

        setState(params, state)

        if (params.fail) {
          params.fail(xhr.status, response.error)
        }
      } else {
        if (params.target) {
          state[params.target] = response.data
        }

        if (response.message) {
          state.message = response.message
        }

        setState(params, state)

        if (params.success) {
          params.success(response.data, response.message)
        }
      }
    }

    if (params.default) {
      params.default()
    }
  }

  if (contentType.indexOf('application/json') >= 0) {
    xhr.setRequestHeader('Content-Type', contentType)
    xhr.send(JSON.stringify(params.data))
  } else {
    xhr.send(params.data)
  }
}

export function request(params) {
  return dispatch => {
    dispatch(errorAction(null))
    dispatch(messageAction(null))
    dispatch(waitAction(true))
    post({
      url: params.url,
      data: params.data,
      fail: (status, error) => {
        dispatch(errorAction(error.message))
        if (params.fail) {
          params.fail(dispatch, status, error)
        }
      },
      success: (data, message) => {
        dispatch(messageAction(message))
        if (params.success) {
          params.success(dispatch, data)
        }
      },
      default: () => {
        dispatch(waitAction(false))
        if (params.default) {
          params.default()
        }
      }
    })
  }
}

export function get(params) {
  if (!params || !params.url) {
    return
  }

  let wait = params.wait === true || params.wait === undefined
  if (params.force) {
    wait = false
  }

  if (params.sender && params.sender.state) {
    if (wait && params.sender.state.wait) {
      return
    } else {
      setState(params, { wait: true })
    }
  }

  let xhr = new XMLHttpRequest()

  xhr.open('GET', INITIAL_STATE.endpoint + params.url)

  xhr.withCredentials = true

  xhr.setRequestHeader('Content-Type', 'text/html; charset=UTF-8')

  xhr.onreadystatechange = function () {
    let state = { wait: false }

    if (params.sender && params.sender.mounted === false) {
      return
    } else if (xhr.readyState !== 4) {
      state.failed = true
      setState(params, state)
      return
    }

    if (xhr.status !== 200) {
      state.error = xhr.statusText
      state.failed = true

      setState(params, state)

      if (params.fail) {
        params.fail(xhr.status, { message: xhr.statusText })
      }
    } else {
      state.failed = false

      let response = xhr.responseText

      if (params.target) {
        state[params.target] = response
      }

      setState(params, state)

      if (params.success) {
        params.success(response)
      }
    }

    if (params.default) {
      params.default()
    }
  }

  xhr.send(params.data)
}

export function reducer(state = null, action = null) {
  if (action === null) {
    return state
  }
  if (state === null) {
    return state
  }
  let newState = clone(state)
  newState.wait = waitReducer(state.wait, action)
  newState.user = userReducer(state.user, action)
  newState.error = errorReducer(state.error, action)
  newState.message = messageReducer(state.message, action)
  newState.dictionary = dictionaryReducer(state.dictionary, action)
  return newState
}

export function hasAuth(auth, user) {
  if (user && user.authorities) {
    if (auth instanceof Array) {
      for (let i = 0; i < auth.length; i++) {
        let found = hasAuth(auth[i], user)
        if (found) {
          return true
        }
      }
    } else {
      let found = user.authorities.find(v => {
        return v.name === auth
      })
      if (found) {
        return true
      }
    }
  }
  return false
}
