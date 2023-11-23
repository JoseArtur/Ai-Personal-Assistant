import { Box, Button, Icon, useDisclosure } from '@chakra-ui/react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import styled from 'styled-components'
import TaskList from '../components/TaskList'

import NavMenu from '../components/NavMenu'
import AddTask from '../components/AddTask'
import UpdatingSpinner from '../components/UpdatingSpinner'

const Home = () => {
    const { isOpen, onClose, onToggle } = useDisclosure()

    return (
        <Box className="App" border="1px solid" height="full">
            <NavMenu />
            <div id="calendar-portal" />
            <TaskList />
            <AddTask childrenClose={onClose}>
                <AddTaskButtonWrapper
                    transition="bottom 0.5s ease"
                    position="absolute"
                    right={5}
                    bottom={!isOpen ? 5 : '180px'}
                >
                    <Button onClick={onToggle}>
                        <Icon
                            as={!isOpen ? AiFillPlusCircle : AiFillMinusCircle}
                            boxSize={14}
                            fill="green.500"
                        />
                    </Button>
                </AddTaskButtonWrapper>
            </AddTask>
            <UpdatingSpinner />
        </Box>
    )
}

export default Home

const AddTaskButtonWrapper = styled(Box)`
    position: absolute;
    bottom: 200px;

    > button {
        padding: 0;
        background: none;

        &:hover {
            background: none;
        }
    }
`
