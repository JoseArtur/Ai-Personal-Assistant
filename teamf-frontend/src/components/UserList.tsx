import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUsers, selectUser } from '../stores/user/userActions'
import { AppDispatch, RootState } from '../plugins/stores'
import { User } from '../stores/user/userReducer'

const UserList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector((state: RootState) => state.user)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const handleDeleteUser = async (userId: string | number): Promise<void> => {
        try {
            await dispatch(deleteUser(userId))
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    if (userState.status === 'loading') return <div>Loading...</div>

    return (
        <>
            <h3>User List</h3>

            {userState.users.length === 0 && <div>No users to show.</div>}

            {userState.status === 'deleting' ? (
                <div>Deleting...</div>
            ) : (
                <ul style={{ padding: '0' }}>
                    {userState.users.length > 0 &&
                        userState.users.map((user: User) => (
                            <li
                                style={{
                                    listStyle: 'none',
                                    display: 'flex',
                                    gap: '20px',
                                }}
                                key={user.id}
                            >
                                <div style={{ width: '200px' }}>
                                    {user.name} {user.surname}
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            dispatch(selectUser(user.id))
                                        }
                                        style={{ marginLeft: '30px' }}
                                    >
                                        Select
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteUser(user.id)
                                        }
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                </ul>
            )}
        </>
    )
}

export default UserList
