import { Box, Icon, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useGetQuery } from '../api/tasks'

const UpdatingSpinner = () => {
    const { isLoading, isFetching } = useGetQuery({})

    if (!isLoading && !isFetching) return null
    return (
        <Box position="fixed" bottom={1} right={1.5}>
            <Icon as={Spinner} />
        </Box>
    )
}

export default UpdatingSpinner
