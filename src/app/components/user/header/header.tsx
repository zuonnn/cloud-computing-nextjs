'use client'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { handleGetCategories } from '../../admin/categories/categories.actions';
import { handleGetBrands } from '../../admin/brands/brands.actions';
import { ICategory } from '../../types/category';
import { IBrand } from '../../types/brand';
import { MdLogout } from 'react-icons/md';
import {useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories: ICategory[] = await handleGetCategories();
        const fetchedBrands: IBrand[] = await handleGetBrands();
        setCategories(fetchedCategories);
        setBrands(fetchedBrands);
      } catch (error) {
        console.error('Error fetching categories and brands:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Xóa token từ localStorage
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <Image src="/logo.png" alt="ATN-logo" width="50" height="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Categories" id="categories-dropdown">
              {categories.map((category) => (
                <NavDropdown.Item key={category._id} href={`#${category._id}`}>
                  {category.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Brands" id="brands-dropdown">
              {brands.map((brand) => (
                <NavDropdown.Item key={brand._id} href={`#${brand._id}`}>
                  {brand.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>
              <MdLogout /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
