import React from 'react'
import ScheduleTable from './components/ScheduleTable/ScheduleTable'
import { IScheduleView } from '../models/ScheduleView.models'
import EmployeeList from './components/EmployeeList/EmployeeList'
import styles from './ScheduleView.module.scss'

const ScheduleView: React.FC<IScheduleView> = ({
    schedule,
    setSchedule,
    employees
}) => {

    console.log("schedule", schedule)

    return (
        <div className={styles.schedule}>
            <div className={styles.top}>
                Jakis button
            </div>
            <div className={styles.bottom}>
                <EmployeeList
                    employees={employees}/>
                <ScheduleTable
                    schedule={schedule}
                    setSchedule={setSchedule} />
            </div>
        </div>
    )
}

export default ScheduleView