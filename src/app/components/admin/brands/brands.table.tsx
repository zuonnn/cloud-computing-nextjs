'use client'

import { Button } from "react-bootstrap"
import Search from "../search/search"
import styles from "./brands.module.css"
import { IBrand } from "../../types/brand"
import { MdDelete, MdEdit } from "react-icons/md"
import CreateBrand from "./create.brand"
import { useState } from "react"
import { toast } from 'react-toastify';
import { handleDeleteBrandAction } from "./brands.actions"
import Link from "next/link"
import UpdateBrandModal from "./update.brand"

interface IProps {
    brands: IBrand[] | []
}

const BrandsTable = (props: IProps) => {

    const { brands } = props;

    const [brandUpdate, setBrand] = useState<IBrand | null>(null);
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

    const handleDeleteBrand = async (id: string) => {
        if (window.confirm(`Do you want to delete this brand (id = ${id})`)) {
            const res = await handleDeleteBrandAction(id);
            if (res) {
                toast.success("Delete brand succeeded!");
            } else {
                toast.error("Delete brand failed!");
            }
        }
    };



    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a brand..." />
                <Button variant="secondary" onClick={() => setShowModalCreate(true)}>Add</Button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Brand</th>
                        <th>Country</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand, index) => (
                        <tr key={brand._id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link
                                    href={`/admin/brands/${brand._id}`}>
                                    {brand.name}
                                </Link>
                            </td>
                            <td>{brand.country}</td>

                            <td>{brand.description}</td>
                            <td>
                                <Button variant="warning"
                                    onClick={() => {
                                        setBrand(brand);
                                        setShowModalUpdate(true);
                                    }}>
                                    <MdEdit />
                                </Button>
                                <Button variant="danger" className="mx-3"
                                    onClick={() => { if (brand._id) handleDeleteBrand(brand._id) }}>
                                    <MdDelete />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CreateBrand
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <UpdateBrandModal
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                brandUpdate={brandUpdate}
                setBrand={setBrand}
            />
        </div>
    )
}

export default BrandsTable;