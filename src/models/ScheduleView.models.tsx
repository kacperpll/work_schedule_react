import React from "react";

export interface IScheduleView {
    schedule: IWorkingDay[],
    setSchedule: React.Dispatch<React.SetStateAction<IWorkingDay[]>>,
    employees: IEmployee[],
    isModalVisible: boolean,
    setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IScheduleTable {
    schedule: IWorkingDay[],
    setSchedule: React.Dispatch<React.SetStateAction<IWorkingDay[]>>,
    selectedEmployee: IEmployee | null
}

export interface IWorkingDay {
    day: string,
    hours: IWorkingHour[]
}

export interface IWorkingHour {
    hour: number,
    require: number,
    employees: IEmployee[]
}

export interface IEmployee {
    id: string,
    name: string
}

export interface IEmployeeList {
    employees: IEmployee[],
    selectedEmployee: IEmployee | null,
    setSelectedEmployee: React.Dispatch<React.SetStateAction<IEmployee | null>>,
}