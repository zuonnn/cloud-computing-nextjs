'use client'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IProduct } from '../../types/product';
import { handleUpdateProductAction } from './products.actions';

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    productUpdate: IProduct | null;
    setProduct: (value: IProduct | null) => void;
}

function UpdateProductModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, productUpdate, setProduct } = props;

    const [name, setName] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async () => {
        if (!name) {
            toast.error("Product name cannot be empty!")
            return;
        }
        if (!country) {
            toast.error("Product country cannot be empty!")
            return;
        }

        if (!description) {
            toast.error("Product description cannot be empty!")
            return;
        }
        const updatedProduct: IProduct = { ...productUpdate!, name, country, description };
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
        setCountry("");
        setDescription("");
        setProduct(null);
        setShowModalUpdate(false)
    }

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
                            <Form.Control type="text" placeholder={productUpdate?.name}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Country</Form.Label>
                            <Form.Control type="text" placeholder={productUpdate?.country}
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-black">Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                placeholder={productUpdate?.description}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
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