import React, { useState } from 'react'
import { subDays, addDays, format } from 'date-fns'
import { CalendarPanel } from 'chakra-dayzed-datepicker'
import { Box } from '@chakra-ui/react'
import styled from 'styled-components'
import { DateObj } from 'dayzed'
import { MONTH_NAMES_SHORT, WEEKDAY_NAMES_SHORT } from '../utils/calendarUtils'

interface Props {
    selectedDate: Date | Date[] | undefined
    isOpen: boolean
    handleClose: (event: DateObj) => void
}

const SingleCalendar = ({ selectedDate, isOpen, handleClose }: Props) => {
    const handleOnDateSelected = (event: DateObj) => {
        handleClose(event)
    }

    return (
        <StyledBox marginBottom={4} className={isOpen ? 'isOpen' : ''}>
            <div className="wrapper">
                <CalendarPanel
                    dayzedHookProps={{
                        showOutsideDays: true,
                        onDateSelected: handleOnDateSelected,
                        selected: selectedDate,
                    }}
                    configs={{
                        dateFormat: 'yyyy-MM-dd',
                        monthNames: MONTH_NAMES_SHORT,
                        dayNames: WEEKDAY_NAMES_SHORT,
                        firstDayOfWeek: 0,
                    }}
                />
            </div>
        </StyledBox>
    )
}

export default SingleCalendar

const StyledBox = styled(Box)`
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 500ms;

    .wrapper {
        overflow: hidden;
    }
    &.isOpen {
        grid-template-rows: 1fr;
    }
`
