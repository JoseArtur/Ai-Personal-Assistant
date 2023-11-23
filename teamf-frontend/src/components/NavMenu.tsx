import React from 'react'
import { Flex } from '@chakra-ui/react'
import HamburguerMenu from './HamburguerMenu'
import Search from './Search'
import Streak from './Streak'
import FilterCalendar from './FilterCalendar'

function NavMenu() {
    return (
        <Flex
            as="nav"
            justifyContent="space-between"
            paddingX={4}
            paddingY={2}
            borderBottom="1px solid"
            borderColor="green.200"
        >
            <Flex alignItems="center" gap="4">
                <HamburguerMenu />
                <Search />
            </Flex>

            <Streak />

            <FilterCalendar />
        </Flex>
    )
}

export default NavMenu
