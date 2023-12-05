import React from "react";
import styles from '../components/user/user.module.css'
import Header from '../components/user/header/header';
import Footer from '../components/user/footer/footer';

const UserLayout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.content}>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default UserLayout;

