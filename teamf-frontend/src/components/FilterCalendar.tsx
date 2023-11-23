import { useEffect, useState } from 'react'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import {
    Box,
    Button,
    Checkbox,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    Icon,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import { createPortal } from 'react-dom'
import { DateObj } from 'dayzed'
import { format } from 'date-fns'
import { FaLongArrowAltLeft, FaTimes } from 'react-icons/fa'
import SingleCalendar from './SingleCalendar'
import { useFilterByDateMutation, useGetQuery } from '../api/tasks'
import TaskList, { Task } from './TaskList'

const FilterCalendar = () => {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const [isDomReady, setIsDomReady] = useState(false)
    const { data: taskList } = useGetQuery({})
    const [filterByDate] = useFilterByDateMutation({})
    const demoDate = new Date()
    const [date, setDate] = useState<Date | undefined>(demoDate)
    const [filteredData, setFilteredData] = useState([])
    const toast = useToast()

    useEffect(() => {
        setIsDomReady(true)
    }, [])

    const handleClose = (event: DateObj) => {
        const selectedCalendarDate = event.date
        setDate(selectedCalendarDate)
        filterTaskByDate(selectedCalendarDate)
    }

    const filterTaskByDate = async (selected: Date) => {
        const formattedDate = format(selected, 'yyyy-MM-dd')
        const updatedData = await filterByDate({
            formattedDate,
            taskList,
        }).unwrap()

        if (updatedData.length === 0) {
            toast({
                description: 'There are no task in the selected date.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            })
            onClose()
            return
        }
        setFilteredData(updatedData)

        // This hide the layout shift when the drawer is open
        new Promise((resolve) => {
            setTimeout(resolve, 500)
        }).then(() => {
            onClose()
        })
    }

    return (
        <>
            <Button variant="ghost" padding={0} margin={0} onClick={onToggle}>
                <Icon
                    as={MdOutlineCalendarMonth}
                    boxSize={10}
                    color="green.500"
                />
            </Button>

            {isDomReady &&
                createPortal(
                    <SingleCalendar
                        selectedDate={date}
                        isOpen={isOpen}
                        handleClose={handleClose}
                    />,
                    document.getElementById('calendar-portal') as HTMLElement
                )}

            {filteredData.length > 0 && (
                <Drawer
                    isOpen={filteredData.length > 0}
                    onClose={() => {
                        setFilteredData([])
                    }}
                    placement="left"
                    size="full"
                >
                    <DrawerBody>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerCloseButton
                                    size="sm"
                                    as={FaTimes}
                                    fill="green.500"
                                />
                            </DrawerHeader>
                            <DrawerBody paddingX={4}>
                                <Text
                                    fontWeight="500"
                                    fontSize="larger"
                                    marginBottom={6}
                                >
                                    Showing tasks for{' '}
                                    {date && format(date, 'yyyy-MM-dd')}
                                </Text>
                                <Box marginX={-4}>
                                    <TaskList tasks={filteredData} />
                                </Box>
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerBody>
                </Drawer>
            )}
        </>
    )
}

export default FilterCalendar
