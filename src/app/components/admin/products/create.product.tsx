'use client'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { handleCreateProductAction } from './products.actions';
import { IProduct } from '../../types/product';
import { ICategory } from '../../types/category';
import { IBrand } from '../../types/brand';
import { handleGetCategories } from '../categories/categories.actions';
import { handleGetBrands } from '../brands/brands.actions';

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}

function CreateProductModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [brand, setBrand] = useState<IBrand | null>(null);

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
  }, []);

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!name || !type || !price || !category || !brand) {
      toast.error("All fields are required!");
      return;
    }

    const newProduct: IProduct = {
      name,
      type,
      price,
      category: category || null, 
      brand: brand || null, 
    };

    const res = await handleCreateProductAction(newProduct);
    if (res) {
      toast.success("Product successfully created!");
      handleCloseModal();
      return;
    }
    else {
      toast.error("Product successfully created!");
      handleCloseModal();
      return;
    }
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setName("");
    setType("");
    setPrice(0);
    setCategory(null);
    setBrand(null);
    setShowModalCreate(false);
  };


  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Add a new Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-black">Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-black">Type</Form.Label>
              <Form.Control type="text" placeholder="Enter product Type" value={type} onChange={(e) => setType(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-black">Price</Form.Label>
              <Form.Control type="number" placeholder="Enter product price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </Form.Group>
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
              <Form.Label className="text-black">Brand</Form.Label>
              <Form.Select
                value={brand?._id || ''}
                onChange={(e) => {
                  const selectedBrand = brands.find((b) => b._id === e.target.value);
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
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateProductModal;