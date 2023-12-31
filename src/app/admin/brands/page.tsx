import { Metadata } from 'next';
import BrandsTable from '../../components/admin/brands/brands.table';

export const metadata: Metadata = {
    title: "Brand Page"
}

const BrandsPage = async () => {
    const res = await fetch(`https://duong211404.onrender.com/brands`,
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
