import Image from "next/image";

const UserProductDetail = async ({ params }: { params: { id: string } }) => {
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
        <div className='container'>
            <p>Product Name: {product.name}</p>
            <Image
                src={product.image}
                alt="product image"
                width={300}
                height={300}
              />
            <p>Product Price: {product.price}</p>
        </div>
        
    )
};

export default UserProductDetail;