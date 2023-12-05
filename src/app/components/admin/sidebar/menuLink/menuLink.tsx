'use client'
import Link from 'next/link';
import styles from './menuLink.module.css';
import { usePathname } from 'next/navigation';

interface MenuItem {
  path: string;
  icon: JSX.Element;
  title: string;
}

const MenuLink: React.FC<{ item: MenuItem }> = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;