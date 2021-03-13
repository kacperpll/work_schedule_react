import React, { useState } from 'react'
import { IWorkingHour, IScheduleView, IEmployee } from '../../../models/ScheduleView.models'
import styles from './ScheduleTable.module.scss'

const ScheduleTable: React.FC<IScheduleView> = ({
    schedule
}) => {
    const [expandedDay, setExpandedDay] = useState<string>("")
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null)

    const toggleDay = (day: string) => {
        if (expandedDay === day) {
            setExpandedDay("")
        } else {
            setExpandedDay(day)
        }
    }

    const getScheduleClassName = (day: string) => expandedDay === day ? styles.expanded : expandedDay && styles.hidden

    const getEmployeeClassName = (dayNumber: number, index: number, employeeId: number) => {
        return (
            checkEmployeeWorkStatus(dayNumber, index, employeeId) && styles.selected
        )
    }

    const checkEmployeeWorkStatus = (dayNumber: number, index: number, employeeId: number) => {
        return (
            schedule[dayNumber].hours[index].employees.map((employee: IEmployee) => employee.id).includes(employeeId)
        )
    }

    const getCellValue = (dayNumber: number, index: number) => (
        `${schedule[dayNumber].hours[index].employees.length} / ${schedule[dayNumber].hours[index].require}`
    )

    return (
        <div className={styles.table}>
            <div className={styles.thead}>
                <div className={styles.tr}>
                    <div className={styles.th}></div>
                    <div className={`${styles.td} ${styles.th}`} onClick={() => toggleDay("PN")}>Poniedziałek</div>
                    <div className={`${styles.td} ${styles.th}`} onClick={() => toggleDay("WT")}>Wtorek</div>
                    <div className={`${styles.td} ${styles.th}`} onClick={() => toggleDay("SR")}>Środa</div>
                    <div className={`${styles.td} ${styles.th}`} onClick={() => toggleDay("CZ")}>Czwartek</div>
                    <div className={`${styles.td} ${styles.th}`} onClick={() => toggleDay("PT")}>Piątek</div>
                    <div className={`${styles.td} ${styles.th}`} onClick={() => toggleDay("SO")}>Sobota</div>
                    <div className={`${styles.td} ${styles.th}`} onClick={() => toggleDay("ND")}>Niedziela</div>
                </div>
            </div>
            <div className={styles.tbody}>
                {
                    selectedEmployee
                        ? schedule[0].hours.map((element: IWorkingHour, index) => (
                            <tr>
                                <th>{`${element.hour}`}</th>
                                {/* <td className={getEmployeeClassName("PN")}>
                                </td>
                                <td className={getEmployeeClassName("WT")}>
                                </td>
                                <td className={getEmployeeClassName("SR")}>
                                </td>
                                <td className={getEmployeeClassName("CZ")}>
                                </td>
                                <td className={getEmployeeClassName("PT")}>
                                </td>
                                <td className={getEmployeeClassName("SO")}>
                                </td>
                                <td className={getEmployeeClassName("ND")}>
                                </td> */}
                            </tr>
                          ))
                        : schedule[0].hours.map((element: IWorkingHour, index) => (
                            <div className={styles.tr}>
                                <div className={styles.th}>
                                    {`${element.hour < 10 ? "0" : ""}${element.hour}:00 - ${element.hour < 9 ? "0" : ""}${element.hour + 1}:00`}
                                </div>
                                <div className={`${getScheduleClassName("PN")} ${styles.td}`}>{getCellValue(0, index)}</div>
                                <div className={`${getScheduleClassName("WT")} ${styles.td}`}>{getCellValue(1, index)}</div>
                                <div className={`${getScheduleClassName("SR")} ${styles.td}`}>{getCellValue(2, index)}</div>
                                <div className={`${getScheduleClassName("CZ")} ${styles.td}`}>{getCellValue(3, index)}</div>
                                <div className={`${getScheduleClassName("PT")} ${styles.td}`}>{getCellValue(4, index)}</div>
                                <div className={`${getScheduleClassName("SO")} ${styles.td}`}>{getCellValue(5, index)}</div>
                                <div className={`${getScheduleClassName("ND")} ${styles.td}`}>{getCellValue(6, index)}</div>
                            </div>
                          ))
                }
            </div>
        </div>
    )
}

export default ScheduleTable