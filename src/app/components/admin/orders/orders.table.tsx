'use client'

import { Button } from "react-bootstrap"
import Search from "../search/search"
import styles from "./orders.module.css"
import { IOrder } from "../../types/order"
import Link from "next/link"

interface IProps {
    orders: IOrder[] | []
}

const OrdersTable = (props: IProps) => {

    const { orders } = props;

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a order..." />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order</th>
                        <th>Total Price</th>
                        <th>Created At</th>
                        <th>Update At</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order._id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link
                                    href={`/admin/orders/${order._id}`}>
                                    Order {index + 1}
                                </Link>
                            </td>
                            <td>{order.orderTotalPrice}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.updatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersTable;