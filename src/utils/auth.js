import isEmpty from 'lodash-es/isEmpty'
import queryString from 'querystring'

export function setLogin(authResult) {
  localStorage.setItem('token', authResult.access_token)
  localStorage.setItem('tokenExpiry', Date.now() + (authResult.expires_in * 1000))
}

export function handleAuthentication() {
  const hashParsed = queryString.parse(location.hash.substr(1)) // remove #
  if (!isEmpty(hashParsed) && hashParsed.state === process.env.VUE_APP_REDDIT_STATE) {
    setLogin(hashParsed)
    return true
  }

  return false
}

export function isAuthenticated() {
  return (Date.now() < localStorage.getItem('tokenExpiry'));
}

export function getAuthorizationHeaders() {
  return `Bearer ${localStorage.getItem('token')}`
}
