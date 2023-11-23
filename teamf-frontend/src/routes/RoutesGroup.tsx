import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Login from '../views/Login'
import Register from '../views/Register'
import PrivateRoute from './PrivateRoute'
import Home from '../views/Home'

const RoutesGroup = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/app" element={<PrivateRoute />}>
                    <Route path="/app" element={<Home />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default RoutesGroup
