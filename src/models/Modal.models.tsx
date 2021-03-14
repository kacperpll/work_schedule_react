import { IEmployee } from './ScheduleView.models'

export interface IModal {
    setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    employees: IEmployee[],
    setEmployees: React.Dispatch<React.SetStateAction<IEmployee[]>>
}