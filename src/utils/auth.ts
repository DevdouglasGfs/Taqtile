export const getLoginToken = () => {
    return localStorage.getItem('access-token') ? true : false
}

export const storeLoginToken = (token: string) => {
    localStorage.setItem('access-token', token)
}
