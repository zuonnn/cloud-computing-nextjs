'use server'
import { revalidateTag } from 'next/cache'
import { IBrand } from '../../types/brand'

export const handleGetBrands = async (): Promise<IBrand[]> => {
    try {
      const res = await fetch('http://localhost:3001/brands', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You might need additional headers like Authorization
        },
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch brands');
      }
  
      const data = await res.json();
      return data as IBrand[];
    } catch (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
  };

export const handleCreateBrandAction = async (data: IBrand) => {
    const res = await fetch(`http://localhost:3001/brands`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    revalidateTag("list-brands")
    return await res.json()
}

export const handleUpdateBrandAction = async (data: IBrand) => {
    const res = await fetch(`http://localhost:3001/brands/${data._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    revalidateTag("list-brands")
    return await res.json()
}

export const handleDeleteBrandAction = async (id: string) => {
    const res = await fetch(`http://localhost:3001/brands/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    revalidateTag("list-brands")
    return await res.json()
}
