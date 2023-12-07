'use client'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IBrand } from '../../types/brand';
import { handleUpdateBrandAction } from './brands.actions';

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    brandUpdate: IBrand | null;
    setBrand: (value: IBrand | null) => void;
}

function UpdateBrandModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, brandUpdate, setBrand } = props;

    const [name, setName] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async () => {
        if (!name) {
            toast.error("Brand name cannot be empty!")
            return;
        }
        if (!country) {
            toast.error("Brand country cannot be empty!")
            return;
        }

        if (!description) {
            toast.error("Brand description cannot be empty!")
            return;
        }
        const updatedBrand: IBrand = { ...brandUpdate!, name, country, description };
        const res = await handleUpdateBrandAction(updatedBrand);

        if (res) {
            toast.success("Brand successfully updated!");
            handleCloseModal();
        } else {
            toast.error("Brand update failed!");
        }
    }

    const handleCloseModal = () => {
        setName("");
        setCountry("");
        setDescription("");
        setBrand(null);
        setShowModalUpdate(false)
    }

    useEffect(() => {
        if (brandUpdate) {
          setName(brandUpdate.name || '');
          setCountry(brandUpdate.country || '');
          setDescription(brandUpdate.description || '');
        }
      }, [brandUpdate]);

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
                    <Modal.Title className="text-black">Update A Brand</Modal.Title>
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
                            <Form.Label className="text-black">Country</Form.Label>
                            <Form.Control type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-black">Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
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

export default UpdateBrandModal;