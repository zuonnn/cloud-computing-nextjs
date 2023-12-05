'use server'
import { revalidateTag } from 'next/cache'
import { ICategory } from '../../types/category'

export const handleGetCategories = async (): Promise<ICategory[]> => {
    try {
      const res = await fetch('http://localhost:4000/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You might need additional headers like Authorization
        },
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
  
      const data = await res.json();
      return data as ICategory[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

export const handleCreateCategoryAction = async (data: ICategory) => {
    const res = await fetch(`http://localhost:4000/categories`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    revalidateTag("list-categories")
    return await res.json()
}

export const handleUpdateCategoryAction = async (data: ICategory) => {
    const res = await fetch(`http://localhost:4000/categories/${data._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    revalidateTag("list-categories")
    return await res.json()
}

export const handleDeleteCategoryAction = async (id: string) => {
    const res = await fetch(`http://localhost:4000/categories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    revalidateTag("list-categories")
    return await res.json()
}
