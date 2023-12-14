import CategoriesTable from '../../components/admin/categories/categories.table';


const CategoriesPage = async() => {
    const res = await fetch(`${process.env.BE_URL}/categories`, 
    {
        method: "GET",
        next: {tags: ["list-categories"]}
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

    const data = await res.json();

    return (
        <div>
            <CategoriesTable
                categories = {data ? data : []}
            />
        </div>
    );
}

export default CategoriesPage;
