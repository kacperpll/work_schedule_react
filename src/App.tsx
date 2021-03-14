import { useState } from 'react'
import './App.scss'
import * as scheduleData from './mockdata/data.json'
import * as userData from './mockdata/user.json'
import * as employeesData from './mockdata/employees.json'
import ScheduleView from './views/ScheduleView'
import Header from './components/Header'
import { IUser } from './models/user.models'
import { IWorkingDay, IEmployee } from './models/ScheduleView.models'

function App() {

    const [schedule, setSchedule] = useState<IWorkingDay[]>(scheduleData.schedule)
    const [user, setUser] = useState<IUser>(userData.user)
    const [employees, setEmployees] = useState<IEmployee[]>(employeesData.employees)

    return (
        <div className="root">
            <Header user={user}/>
            <ScheduleView
                schedule={schedule}
                setSchedule={setSchedule}
                employees={employees} />
        </div>
    )
}

export default App
