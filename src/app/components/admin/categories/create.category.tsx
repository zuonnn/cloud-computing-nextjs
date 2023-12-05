'use client'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { handleCreateCategoryAction } from './categories.actions';
import { ICategory } from '../../types/category';


interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}

function CreateCategoryModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;

  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async () => {
    const values: ICategory = { name, description };
    if (!name) {
      toast.error("Category name cannot be empty!")
      return;
    }

    if (!description) {
      toast.error("Category description cannot be empty!")
      return;
    }

    const res = await handleCreateCategoryAction(values);
    if (res) {
      toast.success("Category successfully created!");
      handleCloseModal(); 
      return;
    }
  }

  const handleCloseModal = () => {
    setName("");
    setCountry("");
    setDescription("");
    setShowModalCreate(false)
  }

  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Add a new Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-black">Name</Form.Label>
              <Form.Control type="text" placeholder="Enter category name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-black">Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter category description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>Cancel</Button>
          <Button variant="primary" onClick={() => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateCategoryModal;