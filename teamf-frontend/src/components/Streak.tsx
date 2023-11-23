import { Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { BsFire } from 'react-icons/bs'

const Streak = () => {
    const streak = 10

    return (
        <Flex alignItems="center">
            <Icon as={BsFire} boxSize={8} color="orange.300" />
            <Text
                position="relative"
                top="0.5"
                fontSize="1.5rem"
                fontWeight="bold"
                color="green.600"
            >
                {streak}
            </Text>
        </Flex>
    )
}

export default Streak
