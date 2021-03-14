import { useState } from 'react'
import './App.scss'
import * as scheduleData from './mockdata/data.json'
import * as userData from './mockdata/user.json'
import * as employeesData from './mockdata/employees.json'
import ScheduleView from './views/ScheduleView'
import Header from './components/Header/Header'
import { IUser } from './models/user.models'
import { IWorkingDay, IEmployee } from './models/ScheduleView.models'
import AddNewEmployeeModal from './components/AddNewEmployeeModal/AddNewEmployeeModal'

function App() {

    const [schedule, setSchedule] = useState<IWorkingDay[]>(scheduleData.schedule)
    const [user, setUser] = useState<IUser>(userData.user)
    const [employees, setEmployees] = useState<IEmployee[]>(employeesData.employees)
    const [isModalVisible, setModalVisibility] = useState<boolean>(false)

    return (
        <div className="root">
            {isModalVisible && <AddNewEmployeeModal
                setModalVisibility={setModalVisibility}
                employees={employees}
                setEmployees={setEmployees} />}
            <Header user={user}/>
            <ScheduleView
                schedule={schedule}
                setSchedule={setSchedule}
                employees={employees}
                isModalVisible={isModalVisible}
                setModalVisibility={setModalVisibility} />
        </div>
    )
}

export default App
