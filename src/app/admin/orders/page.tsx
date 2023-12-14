import OrdersTable from '../../components/admin/orders/orders.table';

const OrdersPage = async () => {
    const res = await fetch(`${process.env.BE_URL}/orders`,
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
