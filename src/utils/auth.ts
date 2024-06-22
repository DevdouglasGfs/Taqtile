export const checkLoginStatus = () => {
    return localStorage.getItem('access-token')
}

export const storeLoginToken = (token: string) => {
    localStorage.setItem('access-token', token)
}

export const logout = () => {
    localStorage.removeItem('access-token')
}
