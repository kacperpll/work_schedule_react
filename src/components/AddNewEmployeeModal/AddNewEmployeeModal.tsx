import React from 'react'
import styles from './AddNewEmployeeModal.module.scss'
import { IModal } from '../../models/Modal.models'

const AddNewEmployeeModal:  React.FC<IModal> = ({
    setModalVisibility,
    employees,
    setEmployees
}) => {

    const ID = () => ('_' + Math.random().toString(36).substr(2, 9))
    const closeModal = () => setModalVisibility(false)
    const onSubmit = (event: any) => {
        event.preventDefault(event);
        const newId = ID()
        const newName = `${event.target.name.value} ${event.target.surname.value}`

        const newEmployee = {
            id: newId,
            name: newName
        }

        setEmployees([...employees, newEmployee])
        closeModal()
    }

    return (
        <div className={styles.appCover}>
            <div className={styles.modalBody}>
                <div className={styles.top}>
                    <button
                        className={styles.modalClose}
                        onClick={closeModal}>
                        <svg className={styles.modalCloseIcon} viewBox="0 0 40 40">
                            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="name">Imię</label>
                        <input
                            className={styles.formControl}
                            id="name"
                            placeholder="Kacper"
                            required />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="surname">Nazwisko</label>
                        <input
                            className={styles.formControl}
                            id="surname"
                            placeholder="Duniewicz"
                            required />
                    </div>
                    <div className={styles.formGroup}>
                        <button className={`${styles.formControl} ${styles.button}`} type="submit">
                            Dodaj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewEmployeeModal