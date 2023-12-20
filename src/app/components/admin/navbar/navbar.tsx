"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdLogout
} from "react-icons/md";
import {useRouter } from 'next/navigation';
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {
    // Xóa token từ localStorage
    localStorage.removeItem('token');
    router.push('/');
    router.refresh();
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.icons} onClick={handleLogout}>
          <Link onClick={handleLogout} href={""}><MdLogout size={20} /> Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
