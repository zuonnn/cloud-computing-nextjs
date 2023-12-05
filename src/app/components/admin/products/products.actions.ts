'use server'
import { revalidateTag } from 'next/cache'
import { IProduct } from '../../types/product'

export async function handleCreateProductAction(productData: IProduct): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:3001/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (response.ok) {
        revalidateTag("list-products");
        return true;
      } else {
        // Product creation failed
        const errorData = await response.json();
        console.error('Failed to create product:', errorData);
        return false;
      }
    } catch (error) {
      console.error('Error creating product:', error);
      return false;
    }
  }
  

export const handleUpdateProductAction = async (data: IProduct) => {
    const res = await fetch(`http://localhost:3001/products/${data._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    revalidateTag("list-products");
    return await res.json();
}

export const handleDeleteProductAction = async (id: string) => {
    const res = await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    revalidateTag("list-products");
    return await res.json();
}
