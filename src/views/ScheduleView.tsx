import React, { useState } from 'react'
import styles from './ScheduleView.module.scss'
import { IScheduleView, IEmployee } from '../models/ScheduleView.models'
import ScheduleTable from './components/ScheduleTable/ScheduleTable'
import EmployeeList from './components/EmployeeList/EmployeeList'

const ScheduleView: React.FC<IScheduleView> = ({
    schedule,
    setSchedule,
    employees,
    isModalVisible,
    setModalVisibility
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null)

    return (
        <div className={styles.schedule}>
            <div className={styles.top}>
                <button className={styles.addButton} onClick={() => (setModalVisibility(!isModalVisible))}>Dodaj pracownika</button>
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