import styles from "../../../components/admin/categories/categories.module.css"

const DetailCategoryPage = async ({ params }: { params: { id: string } }) => {
    const res = await fetch(`http://localhost:3001/categories/${params.id}`,
        {
            method: "GET",
            next: { tags: ["category-detail"] }
        })

    if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        const category = await res.json();

    return (
        <div className={styles.container}>
            <p>Category Name: {category.name}</p>
            <p>Category Description: {category.description}</p>
        </div>
    )
};

export default DetailCategoryPage;