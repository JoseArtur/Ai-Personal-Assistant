import { Navigate, Outlet } from 'react-router-dom'
import { isJWTValid } from '../utils/isJWTValid'

const PrivateRoute = () => {
    const authToken = localStorage.getItem('authToken')

    return isJWTValid(authToken) ? <Outlet /> : <Navigate to="/" />
}
export default PrivateRoute
