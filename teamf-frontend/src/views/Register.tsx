import { ChangeEvent, useState } from 'react'
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
import { useRegisterMutation } from '../api/user'

type RegisterErrorType = {
    status: number
    data: {
        message: string
    }
}

const Register = () => {
    const navigate = useNavigate()
    const [register, { isLoading, reset, error, isUninitialized, isSuccess }] =
        useRegisterMutation()
    const [inputError, setInputError] = useState({
        username: '',
        email: '',
        password: '',
    })
    const registerError = error as RegisterErrorType
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
    })

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
            email: '',
            password: '',
        })
    }

    const validateInfo = () => {
        const newErrors = {
            username: '',
            email: '',
            password: '',
        }
        if (!credentials.username) {
            newErrors.username = 'Username is required'
        }
        if (!credentials.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            newErrors.email = 'Email is invalid'
        }
        if (!credentials.password) {
            newErrors.password = 'Password is required'
        } else if (credentials.password.length < 6) {
            newErrors.password = 'Password length is less than 6 characters'
        }
        setInputError((state) => ({ ...state, ...newErrors }))
        return newErrors
    }
    const handleSubmit = () => {
        const newErrors = validateInfo()
        if (Object.values(newErrors).every((errorCase) => errorCase === ''))
            register(credentials)
    }

    const handleRedirect = () => {
        navigate('/')
    }

    return (
        <Box bg="lightgreen">
            <Container
                centerContent
                backgroundColor="lightgreen"
                h="calc(100vh)"
            >
                <Image src={logo} alt="AI avatar" maxWidth="80%" />
                <Container maxW="lg" h="calc(100%)" centerContent>
                    <Center h="80%">
                        <SimpleGrid columns={1} spacing={10}>
                            {!isSuccess ? (
                                <>
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
                                            isInvalid={
                                                inputError.username !== ''
                                            }
                                        />
                                        <FormErrorMessage>
                                            {inputError.username}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={inputError.email !== ''}
                                        height="50px"
                                    >
                                        <Input
                                            name="email"
                                            value={credentials.email}
                                            placeholder="email"
                                            size="lg"
                                            backgroundColor="white"
                                            onChange={handleChange}
                                            isInvalid={inputError.email !== ''}
                                        />
                                        <FormErrorMessage>
                                            {inputError.email}
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
                                            isInvalid={
                                                inputError.password !== ''
                                            }
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
                                        Create account
                                    </Button>
                                    <Center>
                                        <StyledLink
                                            as={Link}
                                            to="/"
                                            color="teal.500"
                                        >
                                            Go back to log in
                                        </StyledLink>
                                    </Center>
                                </>
                            ) : (
                                <>
                                    <Alert status="success">
                                        <AlertIcon />
                                        <AlertTitle>
                                            Registration successful
                                        </AlertTitle>
                                    </Alert>
                                    <Button
                                        colorScheme="teal"
                                        size="lg"
                                        onClick={handleRedirect}
                                    >
                                        Go to log in
                                    </Button>
                                </>
                            )}
                        </SimpleGrid>
                    </Center>
                    {registerError?.status === 409 && (
                        <Alert status="warning">
                            <AlertIcon />
                            <AlertTitle>
                                {registerError.data.message}
                            </AlertTitle>
                        </Alert>
                    )}
                </Container>
            </Container>
        </Box>
    )
}

export default Register
