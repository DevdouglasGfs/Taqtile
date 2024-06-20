export const checkLoginStatus = () => {
    return localStorage.getItem('access-token') ? true : false
}

export const storeLoginToken = (token: string) => {
    localStorage.setItem('access-token', token)
}

export default {checkLoginStatus, storeLoginToken};