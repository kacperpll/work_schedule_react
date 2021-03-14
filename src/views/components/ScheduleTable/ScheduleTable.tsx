import React, { useState } from 'react'
import {
    IWorkingHour,
    IEmployee,
    IWorkingDay,
    IWeekDay,
    IScheduleTable
} from '../../../models/ScheduleView.models'
import styles from './ScheduleTable.module.scss'

const ScheduleTable: React.FC<IScheduleTable> = ({
    schedule,
    setSchedule,
    selectedEmployee
}) => {
    const [expandedDay, setExpandedDay] = useState<string>("")

    const allWeekDays: IWeekDay[] = [
        {
            key: "PN",
            name: "Poniedzialek"
        },
        {
            key: "WT",
            name: "Wtorek"
        },
        {
            key: "SR",
            name: "Środa"
        },
        {
            key: "CZ",
            name: "Czwartek"
        },
        {
            key: "PT",
            name: "Piątek"
        },
        {
            key: "SO",
            name: "Sobota"
        },
        {
            key: "ND",
            name: "Niedziela"
        }
    ]

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
                ? styles.full
                : styles.notIncluded
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

    const getEmployeeInHour = (dayNumber: number, index: number) => (
        `${schedule[dayNumber].hours[index].employees.map((employee: IEmployee) => (
            ` ${employee.name}`
        ))}`
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
            if (schedule[dayNumber].hours[index].employees.map(employee => employee.id).includes(selectedEmployee.id)) {
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

    return (
        <div className={styles.table}>
            <div className={styles.thead}>
                <div className={styles.tr}>
                    <div className={styles.th}></div>
                    {allWeekDays.map((weekDay: IWeekDay) => (
                        <div className={`${styles.td} ${styles.th}`} onClick={() => toggleDay(weekDay.key)}>{`${weekDay.name}`}</div>
                    )) as React.HTMLAttributes<HTMLDivElement>}
                </div>
            </div>
            <div className={styles.tbody}>
                {
                    selectedEmployee
                        ? schedule[0].hours.map((element: IWorkingHour, index) => (
                            <div className={styles.tr}>
                                <div className={styles.th}>
                                    {`${element.hour < 10 ? "0" : ""}${element.hour}:00 - ${element.hour < 9 ? "0" : ""}${element.hour + 1}:00`}
                                </div>
                                {allWeekDays.map((weekDay: IWeekDay, weekDayIndex: number) => (
                                    <div
                                        className={`${getEmployeeClassName(weekDayIndex, index, selectedEmployee.id)} ${styles.td}`}
                                        onClick={() => toggleHour(weekDayIndex, index)}>
                                            {getCellValue(weekDayIndex, index)}
                                    </div>
                                )) as React.HTMLAttributes<HTMLDivElement>}
                            </div>
                          ))
                        : schedule[0].hours.map((element: IWorkingHour, index) => (
                            <div className={styles.tr}>
                                <div className={styles.th}>
                                    {`${element.hour < 10 ? "0" : ""}${element.hour}:00 - ${element.hour < 9 ? "0" : ""}${element.hour + 1}:00`}
                                </div>
                                {allWeekDays.map((weekDay: IWeekDay, weekDayIndex: number) => (
                                    <div
                                        key={weekDayIndex}
                                        className={`${getScheduleClassName(weekDay.key)} ${styles.td} ${setCellColor(weekDayIndex, index)}`}>
                                            {expandedDay
                                                ? expandedDay === weekDay.key
                                                    ? getEmployeeInHour(weekDayIndex, index)
                                                    : ""
                                                : getCellValue(weekDayIndex, index)
                                            }
                                    </div>
                                )) as React.HTMLAttributes<HTMLDivElement>}
                            </div>
                          ))
                }
            </div>
        </div>
    )
}

export default ScheduleTable