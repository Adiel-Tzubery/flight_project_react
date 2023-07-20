// if access token exists, user logged in and return the access token, otherwise return null
export const isLoggedIn = () => localStorage.getItem('access_token') || null
