import styles from "../../../components/admin/orders/orders.module.css"

const DetailBrandPage = async ({ params }: { params: { id: string } }) => {
    const res = await fetch(`http://localhost:4000/orders/${params.id}`,
        {
            method: "GET",
            next: { tags: ["order-detail"] }
        })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const order = await res.json();
    const Time = new Date(order.createdAt)
    return (
        <>
            <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.orderDetails.map((orderDetail: any, index: number) => (
                        <tr key={orderDetail._id}>
                            <td>{index + 1}</td>
                            <td>{orderDetail.product.name}</td>
                            <td>{orderDetail.quantity}</td>
                            <td>{orderDetail.product.price}</td>
                            <td>{orderDetail.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="card-text">Order Price: {order.orderTotalPrice}</p>
            <p className="card-text">Day buy: {Time.toLocaleDateString()}</p>
            <p className="card-text">Time buy: {Time.toLocaleTimeString()}</p>
        </div>
        </>
    )
};

export default DetailBrandPage;