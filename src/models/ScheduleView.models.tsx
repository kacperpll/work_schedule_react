import React from "react";

export interface IScheduleView {
    schedule: IWorkingDay[],
    setSchedule: React.Dispatch<React.SetStateAction<IWorkingDay[]>>
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