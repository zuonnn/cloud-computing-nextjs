import BrandsTable from '../../components/admin/brands/brands.table';


const BrandsPage = async () => {
    const res = await fetch("http://localhost:4000/brands",
        {
            method: "GET",
            next: { tags: ["list-brands"] }
        })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data = await res.json();

    return (
        <div>
            <BrandsTable
                brands={data ? data : []}
            />
        </div>
    );
}

export default BrandsPage;