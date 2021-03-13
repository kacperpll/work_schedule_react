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
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th onClick={() => toggleDay("PN")}>Poniedziałek</th>
                    <th onClick={() => toggleDay("WT")}>Wtorek</th>
                    <th onClick={() => toggleDay("SR")}>Środa</th>
                    <th onClick={() => toggleDay("CZ")}>Czwartek</th>
                    <th onClick={() => toggleDay("PT")}>Piątek</th>
                    <th onClick={() => toggleDay("SO")}>Sobota</th>
                    <th onClick={() => toggleDay("ND")}>Niedziela</th>
                </tr>
            </thead>
            <tbody>
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
                            <tr>
                                <th>{`${element.hour}`}</th>
                                <td className={getScheduleClassName("PN")}>{getCellValue(0, index)}</td>
                                <td className={getScheduleClassName("WT")}>{getCellValue(1, index)}</td>
                                <td className={getScheduleClassName("SR")}>{getCellValue(2, index)}</td>
                                <td className={getScheduleClassName("CZ")}>{getCellValue(3, index)}</td>
                                <td className={getScheduleClassName("PT")}>{getCellValue(4, index)}</td>
                                <td className={getScheduleClassName("SO")}>{getCellValue(5, index)}</td>
                                <td className={getScheduleClassName("ND")}>{getCellValue(6, index)}</td>
                            </tr>
                          ))
                }
            </tbody>
        </table>
    )
}

export default ScheduleTable