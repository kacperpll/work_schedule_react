import React, { useState, useEffect } from 'react'
import { IWorkingHour, IScheduleView, IEmployee, IWorkingDay } from '../../../models/ScheduleView.models'
import styles from './ScheduleTable.module.scss'

const ScheduleTable: React.FC<IScheduleView> = ({
    schedule,
    setSchedule
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
            checkEmployeeWorkStatus(dayNumber, index, employeeId)
                ? styles.selected
                : styles.full
        )
    }

    const checkEmployeeWorkStatus = (dayNumber: number, index: number, employeeId: number) => {
        return (
            schedule[dayNumber].hours[index].employees.map((employee: IEmployee) => employee.id).includes(employeeId)
        )
    }

    const getCellValue = (dayNumber: number, index: number) => (
        `${amountOfEmployees(dayNumber, index)} / ${requireEmployees(dayNumber, index)}`
    )

    const setCellColor = (dayNumber: number, index: number) => (
        amountOfEmployees(dayNumber, index) === requireEmployees(dayNumber, index) && amountOfEmployees(dayNumber, index) !== 0
            ? styles.full
            : amountOfEmployees(dayNumber, index) === 0 || amountOfEmployees(dayNumber, index) > requireEmployees(dayNumber, index)
                ? styles.badAmount
                : styles.notFull
    )

    const toggleHour = (dayNumber: number, index: number) => {
        if (selectedEmployee) {
            let newEmployees: IEmployee[]
            if(schedule[dayNumber].hours[index].employees.map(employee => employee.id).includes(selectedEmployee.id)) {
                newEmployees = schedule[dayNumber].hours[index].employees.filter(employee => employee.id !== selectedEmployee.id)
            } else {
                newEmployees = [...schedule[dayNumber].hours[index].employees]
                newEmployees.push(selectedEmployee)
            }
            const newSchedule: IWorkingDay[] = [
                ...schedule.map((day, dayIndex) => (
                    dayIndex === dayNumber
                        ? {
                            ...day,
                            hours: [...day.hours.map((hour, hourIndex) => (
                                hourIndex === index
                                    ? {
                                        ...hour,
                                        employees: newEmployees}
                                    : hour
                            ))]
                        }
                        : day
                    )
                ),
            ]

            setSchedule(newSchedule)
        }
    }

    const amountOfEmployees = (dayNumber: number, index: number) => schedule[dayNumber].hours[index].employees.length
    const requireEmployees = (dayNumber: number, index: number) => schedule[dayNumber].hours[index].require

    useEffect(() => {

    }, [schedule])

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
                            <div className={styles.tr}>
                                <div className={styles.th}>{`${element.hour}`}</div>
                                <div
                                    className={`${getEmployeeClassName(0, index, selectedEmployee.id)} ${styles.td}`}
                                    onClick={() => toggleHour(0, index)}></div>
                                <div
                                    className={`${getEmployeeClassName(1, index, selectedEmployee.id)} ${styles.td}`}
                                    onClick={() => toggleHour(1, index)}></div>
                                <div
                                    className={`${getEmployeeClassName(2, index, selectedEmployee.id)} ${styles.td}`}
                                    onClick={() => toggleHour(2, index)}></div>
                                <div
                                    className={`${getEmployeeClassName(3, index, selectedEmployee.id)} ${styles.td}`}
                                    onClick={() => toggleHour(3, index)}></div>
                                <div
                                    className={`${getEmployeeClassName(4, index, selectedEmployee.id)} ${styles.td}`}
                                    onClick={() => toggleHour(4, index)}></div>
                                <div
                                    className={`${getEmployeeClassName(5, index, selectedEmployee.id)} ${styles.td}`}
                                    onClick={() => toggleHour(5, index)}></div>
                                <div
                                    className={`${getEmployeeClassName(6, index, selectedEmployee.id)} ${styles.td}`}
                                    onClick={() => toggleHour(6, index)}></div>
                            </div>
                          ))
                        : schedule[0].hours.map((element: IWorkingHour, index) => (
                            <div className={styles.tr}>
                                <div className={styles.th}>
                                    {`${element.hour < 10 ? "0" : ""}${element.hour}:00 - ${element.hour < 9 ? "0" : ""}${element.hour + 1}:00`}
                                </div>
                                <div className={`${getScheduleClassName("PN")} ${styles.td} ${setCellColor(0, index)}`}>{getCellValue(0, index)}</div>
                                <div className={`${getScheduleClassName("WT")} ${styles.td} ${setCellColor(1, index)}`}>{getCellValue(1, index)}</div>
                                <div className={`${getScheduleClassName("SR")} ${styles.td} ${setCellColor(2, index)}`}>{getCellValue(2, index)}</div>
                                <div className={`${getScheduleClassName("CZ")} ${styles.td} ${setCellColor(3, index)}`}>{getCellValue(3, index)}</div>
                                <div className={`${getScheduleClassName("PT")} ${styles.td} ${setCellColor(4, index)}`}>{getCellValue(4, index)}</div>
                                <div className={`${getScheduleClassName("SO")} ${styles.td} ${setCellColor(5, index)}`}>{getCellValue(5, index)}</div>
                                <div className={`${getScheduleClassName("ND")} ${styles.td} ${setCellColor(6, index)}`}>{getCellValue(6, index)}</div>
                            </div>
                          ))
                }
            </div>
        </div>
    )
}

export default ScheduleTable