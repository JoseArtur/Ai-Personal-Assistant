import {
    Box,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    Flex,
    FormControl,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Slide,
    Text,
    useDisclosure,
    useOutsideClick,
} from '@chakra-ui/react'
import { useState, useRef, type ReactNode, type FormEvent } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import TaskBody from './TaskBody'

type Props = {
    children: ReactNode
    childrenClose: () => void
}

const AddTask = ({ children, childrenClose }: Props) => {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const [task, setTask] = useState('')
    const firstStepRef = useRef<HTMLDivElement>(null)
    const secondStepRef = useRef() as any
    const checkIconRef = useRef() as any
    const [nextStep, setNextStep] = useState(false)

    useOutsideClick({
        ref: firstStepRef,
        handler: () => {
            if (nextStep) return
            onClose()
            childrenClose()
        },
    })

    useOutsideClick({
        ref: secondStepRef,
        handler: () => setNextStep(false),
    })

    const showNextStep = (e: FormEvent) => {
        e.preventDefault()
        if (task === '') {
            checkIconRef.current.children[0].style.fill =
                'var(--chakra-colors-red-500)'
            return
        }
        setNextStep(true)
        setTimeout(() => {
            onClose()
        }, 1000)
    }

    const onSave = () => {
        setNextStep(false)
        setTask('')
        childrenClose()
    }

    const cancelTaskCreation = () => {
        setTask('')
        setNextStep(false)
        onClose()
        childrenClose()
    }

    return (
        <>
            <Flex role="button" onClick={onToggle}>
                {children}
            </Flex>
            <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
                <Box
                    ref={firstStepRef}
                    px="8"
                    py="4"
                    color="white"
                    mt="4"
                    bg="green.500"
                    rounded="md"
                    shadow="md"
                    position="fixed"
                    width="full"
                    bottom={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    roundedTop="32px"
                >
                    <Text marginBottom={8}>Add a new task</Text>

                    <FormControl as="form" onSubmit={showNextStep}>
                        <InputGroup>
                            <Input
                                placeholder="Task title"
                                marginBottom={8}
                                rounded="full"
                                background="white"
                                color="black"
                                value={task}
                                onChange={(e) => {
                                    setTask(e.target.value)
                                    if (e.target.value === '') {
                                        checkIconRef.current.children[0].style.fill =
                                            'var(--chakra-colors-gray-500)'
                                        return
                                    }
                                    checkIconRef.current.children[0].style.fill =
                                        'var(--chakra-colors-green-500)'
                                }}
                            />

                            <InputRightElement
                                role="button"
                                as="button"
                                type="submit"
                                right={1}
                            >
                                <div ref={checkIconRef}>
                                    <Icon
                                        as={AiFillCheckCircle}
                                        boxSize="7"
                                        fill={task ? 'green.500' : 'gray.500'}
                                    />
                                </div>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </Box>
            </Slide>

            <Drawer
                placement="left"
                size="full"
                isOpen={nextStep}
                onClose={cancelTaskCreation}
            >
                <DrawerContent ref={secondStepRef}>
                    <DrawerHeader
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        position="relative"
                    >
                        <DrawerCloseButton
                            size="md"
                            as={BiArrowBack}
                            fill="green.500"
                            left={2}
                            top="52%"
                            transform="translateY(-50%)"
                        />
                        <Text color="green.500">Add a new task</Text>
                    </DrawerHeader>
                    <Divider background="gray.500" />
                    <DrawerBody
                        padding={0}
                        marginTop="1rem"
                        display="flex"
                        flexDir="column"
                        gap={4}
                    >
                        <TaskBody task={task} onSave={onSave} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AddTask
