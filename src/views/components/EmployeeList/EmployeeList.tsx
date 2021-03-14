import React from 'react'
import styles from './EmployeeList.module.scss'
import { IEmployeeList, IEmployee } from '../../../models/ScheduleView.models'

const EmployeeList: React.FC<IEmployeeList> = ({
    employees,
    selectedEmployee,
    setSelectedEmployee
}) => {

    const toggleEmployee = (employee: IEmployee) => {
        const newEmployee: IEmployee | null = selectedEmployee?.id === employee.id
            ? null
            : employee

        setSelectedEmployee(newEmployee)
    }

    return (
        <div className={styles.employeeListWrapper}>
            <p>Lista pracowników</p>
            <div className={styles.employeeList}>
                <ul className={styles.list}>
                    {
                        employees.map((employee: IEmployee) => (
                            <li
                                key={employee.id}
                                className={`${styles.listItem} ${selectedEmployee?.id === employee.id ? styles.selectedListItem : ""}`}
                                onClick={() => (toggleEmployee(employee))}>
                                {`${employee.name}`}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default EmployeeList