import React from "react";

export interface IScheduleView {
    schedule: IWorkingDay[],
    setSchedule: React.Dispatch<React.SetStateAction<IWorkingDay[]>>,
    employees?: IEmployee[]
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
    id: number,
    name: string
}

export interface IWeekDay {
    key: string,
    name: string
}