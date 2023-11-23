import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Login from '../views/Login'
import Register from '../views/Register'
import EditTask from '../views/EditTask'
import Menu from '../components/Menu'
import UserList from '../components/UserList'
import PrivateRoute from './PrivateRoute'

const Home = () => (
    <div className="App">
        <Menu />
        <UserList />
    </div>
)

const RoutesGroup = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />
                </Route>
                <Route path="/edittask" element={<EditTask />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default RoutesGroup
