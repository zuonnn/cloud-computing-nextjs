'use client'

import { Button } from "react-bootstrap"
import Search from "../search/search"
import styles from "./products.module.css"
import { IProduct } from "../../types/product"
import { MdDelete, MdEdit } from "react-icons/md"
import CreateProduct from "./create.product"
import { useState } from "react"
import { toast } from 'react-toastify';
import { handleDeleteProductAction } from "./products.actions"
import Link from "next/link"
import UpdateProductModal from "./update.product"

interface IProps {
    products: IProduct[] | []
}

const ProductsTable = (props: IProps) => {

    const { products } = props;

    const [productUpdate, setProduct] = useState<IProduct | null>(null);
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

    const handleDeleteProduct = async (id: string) => {
        if (window.confirm(`Do you want to delete this product (id = ${id})`)) {
            const res = await handleDeleteProductAction(id);
            if (res) {
                toast.success("Delete product succeeded!");
            } else {
                toast.error("Delete product failed!");
            }
        }
    };



    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a product..." />
                <Button variant="secondary" onClick={() => setShowModalCreate(true)}>Add</Button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link
                                    href={`/admin/products/${product._id}`}>
                                    {product.name}
                                </Link>
                            </td>
                            <td>{product.type}</td>
                            <td>{product.price}</td>
                            <td>{product.category.name}</td>
                            <td>{product.brand.name}</td>
                            <td>
                                <Button variant="warning"
                                    onClick={() => {
                                        setProduct(product);
                                        setShowModalUpdate(true);
                                    }}>
                                    <MdEdit />
                                </Button>
                                <Button variant="danger" className="mx-3"
                                    onClick={() => { if (product._id) handleDeleteProduct(product._id) }}>
                                    <MdDelete />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CreateProduct
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <UpdateProductModal
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                productUpdate={productUpdate}
                setProduct={setProduct}
            />
        </div>
    )
}

export default ProductsTable;