'use client'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IOrder } from '../../types/order';
import { handleUpdateOrderAction } from './orders.actions';

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    orderUpdate: IOrder | null;
    setOrder: (value: IOrder | null) => void;
}

function UpdateOrderModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, orderUpdate, setOrder } = props;

    const [name, setName] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async () => {
        if (!name) {
            toast.error("Order name cannot be empty!")
            return;
        }
        if (!country) {
            toast.error("Order country cannot be empty!")
            return;
        }

        if (!description) {
            toast.error("Order description cannot be empty!")
            return;
        }
        const updatedOrder: IOrder = { ...orderUpdate!, name, country, description };
        const res = await handleUpdateOrderAction(updatedOrder);

        if (res) {
            toast.success("Order successfully updated!");
            handleCloseModal();
        } else {
            toast.error("Order update failed!");
        }
    }

    const handleCloseModal = () => {
        setName("");
        setCountry("");
        setDescription("");
        setOrder(null);
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
                    <Modal.Title className="text-black">Update A Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Name</Form.Label>
                            <Form.Control type="text" placeholder={orderUpdate?.name}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Country</Form.Label>
                            <Form.Control type="text" placeholder={orderUpdate?.country}
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-black">Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                placeholder={orderUpdate?.description}
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

export default UpdateOrderModal;