import React from "react";

export interface IScheduleView {
    schedule: IWorkingDay[],
    setSchedule: React.Dispatch<React.SetStateAction<IWorkingDay[]>>,
    employees: IEmployee[]
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

export interface IWeekDay {
    key: string,
    name: string
}

export interface IEmployeeList {
    employees: IEmployee[],
    selectedEmployee: IEmployee | null,
    setSelectedEmployee: React.Dispatch<React.SetStateAction<IEmployee | null>>,
}