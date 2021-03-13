import { useState } from 'react'
import './App.scss'
import * as data from './mockdata/data.json'
import * as userData from './mockdata/user.json'
import ScheduleView from './views/ScheduleView'
import Header from './components/Header'
import { IUser } from './models/user.models'
import { IWorkingDay } from './models/ScheduleView.models'

function App() {

    const [schedule, setSchedule] = useState<IWorkingDay[]>(data.schedule)
    const [user, setUser] = useState<IUser>(userData.user)

    return (
        <div className="root">
            <Header user={user}/>
            <ScheduleView
                schedule={schedule} />
        </div>
    )
}

export default App
