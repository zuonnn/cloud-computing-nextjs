import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdShoppingBag,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineDehaze,
  MdCategory,
  MdShoppingCart,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Products",
        path: "/admin/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Categories",
        path: "/admin/categories",
        icon: <MdCategory />,
      },
      {
        title: "Brands",
        path: "/admin/brands",
        icon: <MdOutlineDehaze />,
      },
      {
        title: "Orders",
        path: "/admin/orders",
        icon: <MdShoppingCart />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "#",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "#",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "#",
        icon: <MdPeople />,
      },
    ],
  },
];

const Sidebar = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image src="/logo.png" className={styles.userImage} alt="ATN-logo" width="50" height="50"/>
        <div className={styles.userDetail}>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
