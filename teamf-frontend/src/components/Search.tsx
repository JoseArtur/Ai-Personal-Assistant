import {
    Box,
    Button,
    CloseButton,
    Icon,
    Input,
    useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'

const Search = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [searchInput, setSearchInput] = useState('')

    return (
        <Box position="relative">
            <Button variant="ghost" padding={0} margin={0} onClick={onOpen}>
                <Icon as={FaSearch} boxSize="7" color="green.500" />
            </Button>

            <StyledDiv
                visibility={isOpen ? 'visible' : 'hidden'}
                maxWidth={isOpen ? '65vw' : '60px'}
                zIndex={2}
            >
                <Input
                    variant="outline"
                    placeholder="Searching task"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <CloseButton
                    position="absolute"
                    right={0}
                    top="50%"
                    zIndex={1}
                    transform="translateY(-50%)"
                    onClick={() => {
                        setSearchInput('')
                        onClose()
                    }}
                />
            </StyledDiv>
        </Box>
    )
}

export default Search

const StyledDiv = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: white;
    width: 65vw;
    transition: max-width 0.5s ease-in-out;
`
