import styles from "../../../components/admin/products/products.module.css"

const DetailProductPage = async ({ params }: { params: { id: string } }) => {
    const res = await fetch(`https://duong211404.onrender.com/products/${params.id}`,
        {
            method: "GET",
            next: { tags: ["product-detail"] }
        })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const product = await res.json();

    return (
        <div className={styles.container}>
            <p>Product Name: {product.name}</p>
            <p>Product Type: {product.type}</p>
            <p>Product Price: {product.price}</p>
            <p>Product Brand: {product.brand.name}</p>
            <p>Product Category: {product.category.name}</p>
        </div>
    )
};

export default DetailProductPage;