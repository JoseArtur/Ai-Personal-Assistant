import {
    Box,
    Icon,
    Input,
    Select,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Button,
    Checkbox,
    InputGroup,
    InputLeftElement,
    Divider,
    Spinner,
} from '@chakra-ui/react'
import {
    MdOutlineAddAlert,
    MdAccessTime,
    MdReplay,
    MdCheckCircle,
} from 'react-icons/md'
import { useState, useEffect } from 'react'
import { BiCalendar } from 'react-icons/bi'
import styled from 'styled-components'
import { useGetQuery, useCreateMutation } from '../api/tasks'

interface Props {
    task: string
    onSave: () => void
}

const TaskBody = (props: Props) => {
    const [create, { isLoading, isSuccess }] = useCreateMutation()
    const { refetch } = useGetQuery({})
    const { onSave } = props
    const [task, setTask] = useState(props?.task || '')
    const [date, setDate] = useState(() => {
        const now = new Date()
        const day = now.getDate()
        const month = now.getMonth() + 1
        const year = now.getFullYear()
        return `${year}-${month}-${day}`
    })
    const [time, setTime] = useState(() => {
        const now = new Date()
        const hour = now.getHours()
        const minute = now.getMinutes()

        return `${hour < 10 ? `0${hour}` : hour}:${
            minute < 10 ? `0${minute}` : minute
        }`
    })
    const [reminder, setReminder] = useState('')
    const [days, setDays] = useState<string[]>([])

    useEffect(() => {
        if (!isLoading && isSuccess) {
            resetAllStates()
            onSave()
        }
    }, [isLoading, isSuccess])

    const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDay = e.target.value
        if (days.includes(selectedDay)) {
            setDays(days.filter((day) => day !== selectedDay))
        } else {
            setDays([...days, selectedDay])
        }
    }

    const resetAllStates = () => {
        setTask('')
        setDate('')
        setTime('')
        setReminder('')
        setDays([])
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const parts = date.split('-')
        create({
            title: task,
            // TODO: Implement this field
            description: 'Yet to be implemented',
            due_date: new Date(`${parts[0]}-${parts[2]}-${parts[1]}`),
            // TODO: Include time and frequency
        })
        refetch()
    }

    return (
        <Box height="full" as="form" onSubmit={handleSubmit}>
            <Input
                size="lg"
                fontSize="4xl"
                border="none"
                borderBottom="2px"
                rounded={0}
                value={task}
                paddingBottom={1}
                onChange={(e) => setTask(e.target.value)}
            />

            <Box
                position="fixed"
                width="full"
                height="70vh"
                bg="green.500"
                bottom="0"
                roundedTop="32px"
                px={4}
                py={8}
            >
                <InputGroup marginBottom={4}>
                    <InputLeftElement pointerEvents="none">
                        <Icon as={BiCalendar} boxSize="7" fill="white" />
                    </InputLeftElement>
                    <CustomInputDate
                        value={`${date}`}
                        onChange={(e) => {
                            setDate(e.target.value)
                        }}
                        type="date"
                        border="none"
                        color="white"
                    />
                </InputGroup>

                <Divider />

                <InputGroup marginY={4}>
                    <InputLeftElement pointerEvents="none">
                        <Icon as={MdAccessTime} boxSize="7" fill="white" />
                    </InputLeftElement>
                    <CustomInputDate
                        type="time"
                        border="none"
                        color="white"
                        value={time}
                        onChange={(e) => {
                            setTime(e.target.value)
                        }}
                    />
                </InputGroup>

                <Divider />

                <InputGroup marginY={4}>
                    <CustomInputLeftEl pointerEvents="none">
                        <Icon as={MdOutlineAddAlert} boxSize="7" fill="white" />
                    </CustomInputLeftEl>
                    <CustomSelect
                        paddingLeft="calc(var(--input-height) - var(--input-padding))"
                        value={reminder}
                        onChange={(e) => {
                            setReminder(e.target.value)
                        }}
                        border="transparent"
                        color="white"
                    >
                        {reminder === '' && (
                            <CustomOption value="">
                                Select a reminder
                            </CustomOption>
                        )}
                        <CustomOption>5 minutes</CustomOption>
                        <CustomOption>10 minutes</CustomOption>
                        <CustomOption>30 minutes</CustomOption>
                        <CustomOption>1 hour</CustomOption>
                    </CustomSelect>
                </InputGroup>

                <Divider />

                <InputGroup marginY={4} width="full">
                    <CustomInputLeftEl pointerEvents="none">
                        <Icon as={MdReplay} boxSize="7" fill="white" />
                    </CustomInputLeftEl>
                    <CustomPopoverBox
                        id="popover"
                        paddingLeft="var(--input-height)"
                    >
                        <Popover>
                            <PopoverTrigger>
                                <Button bg="transparent">Select Days</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
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
                    </CustomPopoverBox>
                </InputGroup>
            </Box>

            <SubmitButtonWrapper>
                <Button type="submit">
                    <Icon
                        as={isLoading ? Spinner : MdCheckCircle}
                        boxSize="14"
                        fill="white"
                        color="white"
                    />
                </Button>
            </SubmitButtonWrapper>
        </Box>
    )
}

export default TaskBody

const CustomInputDate = styled(Input)`
    position: relative;
    &::-webkit-calendar-picker-indicator {
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
    }
`

const CustomInputLeftEl = styled(InputLeftElement)`
    position: absolute;
`
const CustomSelect = styled(Select)``

const CustomOption = styled.option`
    color: black;
`

const CustomPopoverBox = styled(Box)`
    width: 100%;
    > button {
        width: 100%;
        padding: 0;
        color: white;
        font-weight: normal;
        justify-content: flex-start;
        &:hover {
            background: none;
        }
    }

    .chakra-popover__arrow-positioner {
        position: relative !important;
        transform: none !important;
    }

    .chakra-popover__arrow {
        left: calc((var(--input-height)) * 1) !important;
    }

    .chakra-popover__popper {
        padding-left: 0;
        transform: translate3d(10px, 48px, 0px) !important;
    }

    .chakra-popover__body {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 4px;
    }
`

const SubmitButtonWrapper = styled(Box)`
    position: absolute;
    bottom: var(--chakra-space-4);
    right: 0;
    fill: white;
    padding: var(--chakra-space-4);
    > button {
        background: none;
        padding: 0;

        &:hover {
            background: none;
        }
    }
`
