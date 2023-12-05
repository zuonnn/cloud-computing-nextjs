'use client'

import { Button } from "react-bootstrap"
import Search from "../search/search"
import styles from "./categories.module.css"
import { ICategory } from "../../types/category"
import { MdDelete, MdEdit } from "react-icons/md"
import CreateCategory from "./create.category"
import { useState } from "react"
import { toast } from 'react-toastify';
import { handleDeleteCategoryAction } from "./categories.actions"
import Link from "next/link"
import UpdateCategoryModal from "./update.category"

interface IProps {
    categories: ICategory[] | []
}

const CategoriesTable = (props: IProps) => {

    const { categories } = props;

    const [categoryUpdate, setCategory] = useState<ICategory | null>(null);
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

    const handleDeleteCategory = async (id: string) => {
        if (window.confirm(`Do you want to delete this category (id = ${id})`)) {
            const res = await handleDeleteCategoryAction(id);
            if (res) {
                toast.success("Delete category succeeded!");
            } else {
                toast.error("Delete category failed!");
            }
        }
    };



    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a category..." />
                <Button variant="secondary" onClick={() => setShowModalCreate(true)}>Add</Button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category._id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link
                                    href={`/admin/categories/${category._id}`}>
                                    {category.name}
                                </Link>
                            </td>
                            <td>{category.description}</td>
                            <td>
                                <Button variant="warning"
                                    onClick={() => {
                                        setCategory(category);
                                        setShowModalUpdate(true);
                                    }}>
                                    <MdEdit />
                                </Button>
                                <Button variant="danger" className="mx-3"
                                    onClick={() => { if (category._id) handleDeleteCategory(category._id) }}>
                                    <MdDelete />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CreateCategory
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <UpdateCategoryModal
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                categoryUpdate={categoryUpdate}
                setCategory={setCategory}
            />
        </div>
    )
}

export default CategoriesTable;