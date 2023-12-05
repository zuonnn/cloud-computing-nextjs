import Navbar from "../components/admin/navbar/navbar";
import Sidebar from "../components/admin/sidebar/sidebar";
import  "../components/admin/admin.css";
import styles from "../components/admin/admin.module.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = ({children,}: {children: React.ReactNode}) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar/>
            </div>
            <div className={styles.content}>
                <Navbar/>
                {children}
                <ToastContainer/>
            </div>
        </div>
    )
}

export default AdminLayout; 