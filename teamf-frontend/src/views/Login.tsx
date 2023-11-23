import { ChangeEvent, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Box,
    SimpleGrid,
    Center,
    Button,
    Container,
    Image,
    Input,
    Alert,
    AlertIcon,
    AlertTitle,
    Link as StyledLink,
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react'

import logo from '../assets/images/logo.png'
import { useLoginMutation } from '../api/user'
import { isJWTValid } from '../utils/isJWTValid'

const Login = () => {
    const navigate = useNavigate()

    const [
        login,
        { isLoading, reset, error, isUninitialized, isSuccess, data },
    ] = useLoginMutation()

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })
    const [inputError, setInputError] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        if (isJWTValid(localStorage.getItem('authToken'))) {
            navigate('/app')
        }
        if (isSuccess && 'token' in data) {
            localStorage.setItem('authToken', data.token)
            navigate('/app')
        }
    }, [isSuccess])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isUninitialized) {
            reset()
        }

        setCredentials((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
        setInputError({
            username: '',
            password: '',
        })
    }

    const handleSubmit = () => {
        const newErrors = validateInfo()
        if (Object.values(newErrors).every((errorCase) => errorCase === ''))
            login(credentials)
    }

    const validateInfo = () => {
        const newErrors = {
            username: '',
            password: '',
        }
        if (!credentials.username) {
            newErrors.username = 'Username is required'
        }
        if (!credentials.password) {
            newErrors.password = 'Password is required'
        }

        setInputError((state) => ({ ...state, ...newErrors }))
        return newErrors
    }
    return (
        <Box bg="lightgreen">
            <Container centerContent h="calc(100vh)">
                <Image src={logo} alt="AI avatar" maxWidth="80%" />
                <Container maxW="lg" h="calc(100%)" centerContent>
                    <Center h="80%">
                        <SimpleGrid columns={1} spacing={10}>
                            <FormControl
                                isInvalid={inputError.username !== ''}
                                height="50px"
                            >
                                <Input
                                    name="username"
                                    value={credentials.username}
                                    placeholder="Username"
                                    size="lg"
                                    backgroundColor="white"
                                    onChange={handleChange}
                                    isInvalid={inputError.username !== ''}
                                />
                                <FormErrorMessage>
                                    {inputError.username}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={inputError.password !== ''}
                                height="50px"
                            >
                                <Input
                                    name="password"
                                    value={credentials.password}
                                    placeholder="Password"
                                    size="lg"
                                    backgroundColor="white"
                                    type="password"
                                    onChange={handleChange}
                                    isInvalid={inputError.password !== ''}
                                />
                                <FormErrorMessage>
                                    {inputError.password}
                                </FormErrorMessage>
                            </FormControl>
                            <Button
                                colorScheme="teal"
                                size="lg"
                                onClick={handleSubmit}
                                isLoading={isLoading}
                                isDisabled={
                                    !Object.values(inputError).every(
                                        (errorCase) => errorCase === ''
                                    )
                                }
                            >
                                Log In
                            </Button>
                            <Center>
                                <StyledLink
                                    as={Link}
                                    to="/register"
                                    color="teal.500"
                                >
                                    Create a new account instead
                                </StyledLink>
                            </Center>
                        </SimpleGrid>
                    </Center>
                    {error && 'status' in error && error.status === 401 && (
                        <Alert status="warning">
                            <AlertIcon />
                            <AlertTitle>Invalid credentials</AlertTitle>
                        </Alert>
                    )}
                </Container>
            </Container>
        </Box>
    )
}

export default Login
