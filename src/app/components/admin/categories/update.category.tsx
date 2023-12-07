'use client'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ICategory } from '../../types/category';
import { handleUpdateCategoryAction } from './categories.actions';

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    categoryUpdate: ICategory | null;
    setCategory: (value: ICategory | null) => void;
}

function UpdateCategoryModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, categoryUpdate, setCategory } = props;

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async () => {
        if (!name) {
            toast.error("Category name cannot be empty!")
            return;
        }

        if (!description) {
            toast.error("Category description cannot be empty!")
            return;
        }
        const updatedCategory: ICategory = { ...categoryUpdate!, name, description };
        const res = await handleUpdateCategoryAction(updatedCategory);

        if (res) {
            toast.success("Category successfully updated!");
            handleCloseModal();
        } else {
            toast.error("Category update failed!");
        }
    }

    const handleCloseModal = () => {
        setName("");
        setDescription("");
        setCategory(null);
        setShowModalUpdate(false)
    }

    useEffect(() => {
        if (categoryUpdate) {
          setName(categoryUpdate.name || '');
          setDescription(categoryUpdate.description || '');
        }
      }, [categoryUpdate]);

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
                    <Modal.Title className="text-black">Update A Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label className="text-black">Name</Form.Label>
                            <Form.Control type="text" placeholder={categoryUpdate?.name}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-black">Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                placeholder={categoryUpdate?.description}
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

export default UpdateCategoryModal;