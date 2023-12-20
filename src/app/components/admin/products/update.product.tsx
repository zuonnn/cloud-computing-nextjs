'use client'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IProduct } from '../../types/product';
import { handleUpdateProductAction } from './products.actions';
import { ICategory } from '../../types/category';
import { IBrand } from '../../types/brand';
import { handleGetCategories } from '../categories/categories.actions';
import { handleGetBrands } from '../brands/brands.actions';

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    productUpdate: IProduct | null;
    setProduct: (value: IProduct | null) => void;
}

function UpdateProductModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, productUpdate, setProduct } = props;

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [category, setCategory] = useState<ICategory | null>(null);
    const [brand, setBrand] = useState<IBrand | null>(null);

    const handleSubmit = async () => {
        if (!name || !type || !price || !image || !category || !brand) {
            toast.error("All fields are required!");
            return;
        }

        const updatedProduct: IProduct = {
            ...productUpdate!,
            name,
            type,
            price,
            image,
            category: category || null,
            brand: brand || null,
        };
        const res = await handleUpdateProductAction(updatedProduct);

        if (res) {
            toast.success("Product successfully updated!");
            handleCloseModal();
        } else {
            toast.error("Product update failed!");
        }
    }

    const handleCloseModal = () => {
        setName("");
        setType("");
        setPrice(0);
        setImage("");
        setCategory(null);
        setBrand(null);
        setProduct(null);
        setShowModalUpdate(false);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await handleGetCategories();
            setCategories(fetchedCategories);
        };

        const fetchBrands = async () => {
            const fetchedBrands = await handleGetBrands();
            setBrands(fetchedBrands);
        };

        fetchCategories();
        fetchBrands();
        if (productUpdate) {
            setName(productUpdate.name || '');
            setType(productUpdate.type || '');
            setPrice(productUpdate.price || 0);
            setImage(productUpdate.image || '');
            setCategory(productUpdate.category || null);
            setBrand(productUpdate.brand || null);
        }
    }, [productUpdate]);

    return (
        <>
            <Modal
                show={showModalUpdate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-black">Update A Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Name</Form.Label>
                            <Form.Control type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Price</Form.Label>
                            <Form.Control
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Type</Form.Label>
                            <Form.Control
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Image</Form.Label>
                            <Form.Control
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Category</Form.Label>
                            <Form.Select
                                value={category?._id || ''}
                                onChange={(e) => {
                                    const selectedCategory = categories.find((c) => c._id === e.target.value);
                                    setCategory(selectedCategory || null);
                                }}
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Brand</Form.Label>
                            <Form.Select
                                value={brand?._id || ''}
                                onChange={(e) => {
                                    const selectedBrand = brands.find((c) => c._id === e.target.value);
                                    setBrand(selectedBrand || null);
                                }}
                            >
                                <option value="">Select brand</option>
                                {brands.map((br) => (
                                    <option key={br._id} value={br._id}>
                                        {br.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>Close</Button>
                    <Button variant="primary" onClick={() => handleSubmit()} >Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateProductModal;