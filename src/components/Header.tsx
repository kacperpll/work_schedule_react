import React from 'react'
import styles from './Header.module.scss'
import { IHeader } from '../models/Header.models'

const Header: React.FC<IHeader> = ({
    user
}) => {
    return (
        <div className={styles.header}>
            <div className={styles.header_left}>
                <div className={styles.headerLogo_container}>
                    <span className={styles.headerLogo_word}>Vava</span>
                    <span className={styles.headerLogo_letter}>V</span>
                </div>
                <div className={styles.headerUser}>
                   {`${user.name} ${user.surname} | #${user.id} ${user.role}`}
                </div>
            </div>
            <div>
                12:45 - 06.04.2021
            </div>
        </div>
    )
}

export default Header