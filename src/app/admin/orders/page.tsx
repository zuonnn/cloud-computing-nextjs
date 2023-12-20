import { Metadata } from 'next';
import OrdersTable from '../../components/admin/orders/orders.table';

export const metadata: Metadata = {
    title: "Order Page"
}

const OrdersPage = async () => {
    const res = await fetch(`https://duong211404.onrender.com/orders`,
        {
            method: "GET",
            next: { tags: ["list-orders"] }
        })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const orders = await res.json();
    return (
        <div>
            <OrdersTable
                orders={orders ? orders : []}
            />
        </div>
    );
}

export default OrdersPage;
