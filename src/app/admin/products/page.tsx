import ProductsTable from '../../components/admin/products/products.table';

const ProductsPage = async () => {
    const res = await fetch(`https://duong211404.onrender.com/products`,
        {
            method: "GET",
            next: { tags: ["list-products"] }
        })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const products = await res.json();
    return (
        <div>
            <ProductsTable
                products={products ? products : []}
            />
        </div>
    );
}

export default ProductsPage;
