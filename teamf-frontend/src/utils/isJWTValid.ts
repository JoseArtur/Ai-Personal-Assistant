import jwtDecode, { JwtPayload } from 'jwt-decode'

export const isJWTValid = (token: string | null) => {
    if (!token) return false
    const decodedToken: JwtPayload = jwtDecode(token)

    const currentTimestamp = Date.now() / 1000
    const isValid = decodedToken.exp && decodedToken.exp > currentTimestamp
    if (!isValid) {
        localStorage.removeItem('authToken')
    }
    return isValid
}
