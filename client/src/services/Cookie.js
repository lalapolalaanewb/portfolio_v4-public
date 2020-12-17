import Cookie from 'universal-cookie'

/** New Cookie const */
const cookie = new Cookie()

/** default cookie functions */
// Get Cookie
export const getCookie = (key) => cookie.get(key)

// Set Cookie
export const setCookie = (key, value, options) => cookie.set(key, value, options)

// Remove Cookie
export const removeCookie = (key, options) => cookie.remove(key, options)