'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { IProduct } from "../components/types/product";

const UserPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          router.push('/');
          return;
        }

        const decodedToken = jwt.decode(token) as { role: string } | null;
        if (decodedToken && decodedToken.role === 'User') {
          // Nếu role là 'User', tiếp tục lấy dữ liệu
          const res = await fetch(`https://duong211404.onrender.com/products`, {
            method: 'GET',
            next: { tags: ['list-products'] }
          });

          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }

          const fetchedProducts: IProduct[] = await res.json();
          setProducts(fetchedProducts);

        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error:', error);
        router.push('/');
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className="container">
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div>
              <h3>{product.name}</h3>
              <img
                src={product.image}
                alt="product image"
                style={{ width: '200px', height: '200px' }}
              />
              <p>Price: {product.price} VND</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;