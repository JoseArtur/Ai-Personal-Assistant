import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Container,
    VStack,
    Text,
    Heading,
    Flex,
    Spacer,
    Icon,
    IconButton,
    Input,
    Select,
    FormControl,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Button,
    Checkbox,
    StackDivider,
} from '@chakra-ui/react'
import {
    MdKeyboardBackspace,
    MdOutlineAddAlert,
    MdOutlineCalendarMonth,
    MdAccessTime,
    MdReplay,
    MdCheckCircle,
    MdModeEditOutline,
} from 'react-icons/md'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { useCreateMutation } from '../api/tasks'

const colorDefault = '#4be681'

const EditTask = () => {
    const [create, { isLoading, isSuccess }] = useCreateMutation()
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState('')
    const [reminder, setReminder] = useState('')
    const [days, setDays] = useState<string[]>([])
    const [taskName, setTaskName] = useState('Task Name')

    useEffect(() => {
        if (isSuccess) navigate(-1)
    }, [isSuccess])

    const handleDateChange = (newDate: Date) => {
        setDate(newDate)
    }
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value)
    }
    const handleReminderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReminder(e.target.value)
    }
    const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDay = e.target.value
        if (days.includes(selectedDay)) {
            setDays(days.filter((day) => day !== selectedDay))
        } else {
            setDays([...days, selectedDay])
        }
    }

    const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value)
    }

    const navigate = useNavigate()

    const handleCreate = () => {
        create({
            title: taskName,
            // TODO: Implement this field
            description: 'Yet to be implemented',
            due_date: date,
            // TODO: Include time and frequency
        })
        if (isSuccess) {
            navigate(-1)
        }
    }
    return (
        <Box>
            <Container centerContent h="calc(100vh)" padding="0">
                <Container w="calc(100%)" h="calc(30vh)" padding="0">
                    <Box display="flex" justifyContent="flex-start">
                        <IconButton
                            aria-label="Confirm edition"
                            size="lg"
                            variant="flushed"
                            marginRight="auto"
                            flex="0 1 auto"
                            icon={
                                <MdKeyboardBackspace
                                    size={40}
                                    color={colorDefault}
                                />
                            }
                            onClick={() => navigate(-1)}
                        />
                        <Box
                            flex="0 1 auto"
                            position="absolute"
                            left="50%"
                            transform="translateX(-50%)"
                        >
                            <Text fontSize="2xl" fontWeight="bold">
                                Edit
                            </Text>
                        </Box>
                    </Box>
                    <Flex mt={4}>
                        <Heading color={colorDefault}>
                            <Input
                                size="lg"
                                fontSize="4xl"
                                border="transparent"
                                value={taskName}
                                onChange={handleTaskNameChange}
                            />
                        </Heading>
                        <Spacer />
                        <Icon as={MdModeEditOutline} boxSize={35} mt={2} />
                    </Flex>
                </Container>
                <Flex
                    h="calc(100vh)"
                    w="calc(100%)"
                    bg={colorDefault}
                    borderTopRadius="5%"
                    padding="0"
                >
                    <VStack
                        align="start"
                        h="calc(100%)"
                        w="calc(100%)"
                        color="black"
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing={4}
                    >
                        <Box ml={3} mt={4}>
                            <Flex
                                display="flex"
                                alignItems="center"
                                color="black"
                                border="transparent"
                            >
                                <Icon as={MdOutlineCalendarMonth} boxSize={5} />
                                <SingleDatepicker
                                    name="date-input"
                                    date={date}
                                    onDateChange={handleDateChange}
                                    configs={{ dateFormat: 'dd-MM-yyyy' }}
                                />
                            </Flex>
                        </Box>
                        <Box ml={3}>
                            <Flex display="flex" alignItems="center">
                                <Icon as={MdAccessTime} boxSize={5} />
                                <Input
                                    border="transparent"
                                    size="md"
                                    type="time"
                                    color="black"
                                    value={time}
                                    onChange={handleTimeChange}
                                />
                            </Flex>
                        </Box>
                        <Box ml={3}>
                            <Flex display="flex" alignItems="center">
                                <Icon as={MdOutlineAddAlert} boxSize={5} />
                                <FormControl color="black" bg="transparent">
                                    <Select
                                        placeholder="Select a reminder"
                                        value={reminder}
                                        onChange={handleReminderChange}
                                        border="transparent"
                                    >
                                        <option>5 minutes</option>
                                        <option>10 minutes</option>
                                        <option>30 minutes</option>
                                        <option>1 hour</option>
                                    </Select>
                                </FormControl>
                            </Flex>
                        </Box>
                        <Box ml={3}>
                            <Flex display="flex" alignItems="center">
                                <Icon as={MdReplay} boxSize={5} />
                                <Popover>
                                    <PopoverTrigger>
                                        <Button bg="transparent">
                                            Select Days
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                            <Checkbox
                                                colorScheme="red"
                                                value="Monday"
                                                onChange={handleDaysChange}
                                            >
                                                Monday
                                            </Checkbox>
                                            <Checkbox
                                                colorScheme="red"
                                                value="Tuesday"
                                                onChange={handleDaysChange}
                                            >
                                                Tuesday
                                            </Checkbox>
                                            <Checkbox
                                                colorScheme="red"
                                                value="Wednesday"
                                                onChange={handleDaysChange}
                                            >
                                                Wednesday
                                            </Checkbox>
                                            <Checkbox
                                                colorScheme="red"
                                                value="Thursday"
                                                onChange={handleDaysChange}
                                            >
                                                Thursday
                                            </Checkbox>
                                            <Checkbox
                                                colorScheme="red"
                                                value="Friday"
                                                onChange={handleDaysChange}
                                            >
                                                Friday
                                            </Checkbox>
                                            <Checkbox
                                                colorScheme="red"
                                                value="Saturday"
                                                onChange={handleDaysChange}
                                            >
                                                Saturday
                                            </Checkbox>
                                            <Checkbox
                                                colorScheme="red"
                                                value="Sunday"
                                                onChange={handleDaysChange}
                                            >
                                                Sunday
                                            </Checkbox>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                        </Box>
                        <Box ml="auto" marginTop="auto">
                            <IconButton
                                isLoading={isLoading}
                                aria-label="Confirm edition"
                                size="lg"
                                variant="flushed"
                                icon={
                                    <Icon
                                        as={MdCheckCircle}
                                        boxSize={20}
                                        mb={10}
                                    />
                                }
                                onClick={handleCreate}
                            />
                        </Box>
                    </VStack>
                </Flex>
            </Container>
        </Box>
    )
}

export default EditTask
