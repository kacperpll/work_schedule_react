import React from 'react'
import ScheduleTable from './components/ScheduleTable/ScheduleTable'
import { IScheduleView } from '../models/ScheduleView.models'

const ScheduleView: React.FC<IScheduleView> = ({
    schedule
}) => {

    console.log("schedule", schedule)

    return (
        <div>
            <div>
                Jakis button
            </div>
            <div>
                Lista pracownikow
            </div>
            <ScheduleTable />
        </div>
    )
}

export default ScheduleView