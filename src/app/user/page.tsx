'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProduct } from "../components/types/product";
import Image from 'next/image';
import Link from 'next/link';

const UserPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`https://duong211404.onrender.com/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const fetchedProducts: IProduct[] = await res.json();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div>
              <h3>
                <Link href={`/user/${product._id}`}>
                  {product.name}
                </Link>
              </h3>
              <Image
                src={product.image}
                alt="product image"
                width={200}
                height={200}
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
