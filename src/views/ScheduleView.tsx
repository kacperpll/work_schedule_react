import React from 'react'
import ScheduleTable from './components/ScheduleTable/ScheduleTable'
import { IScheduleView } from '../models/ScheduleView.models'
import styles from './ScheduleView.module.scss'

const ScheduleView: React.FC<IScheduleView> = ({
    schedule
}) => {

    console.log("schedule", schedule)

    return (
        <div className={styles.schedule}>
            <div className={styles.top}>
                Jakis button
            </div>
            <div className={styles.bottom}>
                <div className={styles.employeeList}>
                    Lista pracownikow
                </div>
                <ScheduleTable
                    schedule={schedule} />
            </div>
        </div>
    )
}

export default ScheduleView