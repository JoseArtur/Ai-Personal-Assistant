import React from 'react'
import styled from 'styled-components'
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    useDisclosure,
    Icon,
    Divider,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { BiTask, BiSolidUser } from 'react-icons/bi'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { BsJournalPlus } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const HamburguerMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const menuList = [
        {
            label: 'My tasks',
            path: '/tasks',
            icon: BiTask,
        },
        {
            label: 'Create task',
            path: '/create-task',
            icon: BsJournalPlus,
        },
        {
            label: 'Profile',
            path: '/profile',
            icon: BiSolidUser,
        },
    ]

    const goToUrl = (path: string) => {
        onClose()
        navigate(`/app${path}`)
    }

    return (
        <>
            <Button
                onClick={onOpen}
                m={4}
                variant="ghost"
                padding={0}
                margin={0}
            >
                <Icon as={FiMenu} boxSize={10} color="green.500" />
            </Button>

            <Drawer
                placement="left"
                size="full"
                isOpen={isOpen}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton
                        size="lg"
                        as={FaLongArrowAltLeft}
                        fill="green.500"
                    />
                    <DrawerBody
                        padding={0}
                        marginTop="4rem"
                        display="flex"
                        flexDir="column"
                        gap={4}
                    >
                        {menuList.map((item) => (
                            <React.Fragment key={item.label}>
                                <Button
                                    onClick={() => goToUrl(item.path)}
                                    variant="ghost"
                                    textAlign="left"
                                    justifyContent="flex-start"
                                    fontSize={18}
                                >
                                    <Icon
                                        as={item.icon}
                                        boxSize="9"
                                        marginRight={4}
                                    />
                                    {item.label}
                                </Button>
                                <Divider />
                            </React.Fragment>
                        ))}

                        <Button
                            position="absolute"
                            bottom={0}
                            width="full"
                            padding={8}
                            onClick={() => {
                                localStorage.removeItem('authToken')
                                window.location.reload()
                            }}
                        >
                            Logout
                        </Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default HamburguerMenu
