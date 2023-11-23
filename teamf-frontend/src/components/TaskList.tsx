import { Box, Checkbox, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useGetQuery, useCompleteMutation } from '../api/tasks'

export interface Task {
    id: number | string
    title: string
    description: string
    user_id: number
    due_date: string
    completed_at: string
    created_at: string
    updated_at: string
}

interface Props {
    // eslint-disable-next-line react/require-default-props
    tasks?: Task[] | []
}

const TaskList = ({ tasks = [] }: Props) => {
    const [taskList, setTaskList] = useState<Task[]>(tasks || [])

    const { data, isLoading, refetch } = useGetQuery({})
    const [complete] = useCompleteMutation({})

    useEffect(() => {
        if (data && data.length > 0 && tasks.length === 0) setTaskList(data)
    }, [data])

    const finishTask = async (task: Task) => {
        await complete(task)
        refetch()

        if (tasks.length > 0) {
            const updatedTaskList = taskList.map((taskI: Task) => {
                if (task.id === taskI.id) {
                    return {
                        ...task,
                        completed_at: taskI.completed_at ? '' : `${new Date()}`,
                    }
                }
                return task
            }) as Task[]
            setTaskList(updatedTaskList)
        }
    }

    if (isLoading) return <Box paddingX={4}>Loading...</Box>

    return (
        <Flex
            paddingX={4}
            flexDirection="column"
            alignItems="flex-start"
            gap={2}
        >
            {tasks.length === 0 && (
                <Text marginBottom={4} fontWeight="500" fontSize="x-large">
                    Your tasks
                </Text>
            )}
            {taskList.length === 0 && <Box>No tasks found.</Box>}
            {taskList.length > 0 &&
                taskList.map((task: Task) => (
                    <button
                        key={task.id}
                        onClick={() => {
                            finishTask(task)
                        }}
                    >
                        <Checkbox
                            size="lg"
                            colorScheme={task.completed_at ? 'green' : ''}
                            textDecoration={
                                task.completed_at ? 'line-through' : ''
                            }
                            isChecked={!!task.completed_at}
                        >
                            {task.title}
                        </Checkbox>
                    </button>
                ))}
        </Flex>
    )
}

export default TaskList
