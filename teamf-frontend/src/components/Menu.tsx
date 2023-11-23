import { useSelector } from 'react-redux'

import styled from 'styled-components'
import { Tooltip } from '@chakra-ui/react'
import { RootState } from '../plugins/stores'

const AnotherComponetThatRenderUser = () => {
    const userState = useSelector((state: RootState) => state.user)

    return (
        <StyledHeader>
            <span style={{ letterSpacing: '1px' }}>LOGO</span>

            {userState.selectedUser && (
                <Tooltip
                    label={`${userState.selectedUser.name} ${userState.selectedUser.surname}`}
                >
                    <span>Welcome, {userState.selectedUser.name}!</span>
                </Tooltip>
            )}
        </StyledHeader>
    )
}

export default AnotherComponetThatRenderUser

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ccc;
    color: #333;
`
