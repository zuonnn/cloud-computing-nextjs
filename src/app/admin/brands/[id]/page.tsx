import styles from "../../../components/admin/brands/brands.module.css"

const DetailBrandPage = async ({ params }: { params: { id: string } }) => {
    const res = await fetch(`${process.env.BE_URL}/brands/${params.id}`,
        {
            method: "GET",
            next: { tags: ["brand-detail"] }
        })

    if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        const brand = await res.json();

    return (
        <div className={styles.container}>
            <p>Brand Name: {brand.name}</p>
            <p>Brand Country: {brand.country}</p>
            <p>Brand Description: {brand.description}</p>
        </div>
    )
};

export default DetailBrandPage;