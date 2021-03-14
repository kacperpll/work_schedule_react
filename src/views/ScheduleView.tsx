import React, { useState } from 'react'
import ScheduleTable from './components/ScheduleTable/ScheduleTable'
import { IScheduleView, IEmployee } from '../models/ScheduleView.models'
import EmployeeList from './components/EmployeeList/EmployeeList'
import styles from './ScheduleView.module.scss'

const ScheduleView: React.FC<IScheduleView> = ({
    schedule,
    setSchedule,
    employees
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null)

    return (
        <div className={styles.schedule}>
            <div className={styles.top}>
                Jakis button
            </div>
            <div className={styles.bottom}>
                <EmployeeList
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee} />
                <ScheduleTable
                    schedule={schedule}
                    setSchedule={setSchedule}
                    selectedEmployee={selectedEmployee} />
            </div>
        </div>
    )
}

export default ScheduleView