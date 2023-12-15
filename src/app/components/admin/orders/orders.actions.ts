'use server'
import { revalidateTag } from 'next/cache'
import { IOrder } from '../../types/order'

export const handleGetOrders = async () => {
    const res = await fetch(`https://duong211404.onrender.com/orders`,
        {
            method: "GET",
            next: { tags: ["list-orders"] }
        });
    const data = await res.json();
    return Response.json({data});   
}

export async function handleCreateOrderAction(orderData: IOrder): Promise<boolean> {
    try {
      const response = await fetch(`https://duong211404.onrender.com/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        // Order created successfully
        return true;
      } else {
        // Order creation failed
        const errorData = await response.json();
        console.error('Failed to create order:', errorData);
        return false;
      }
    } catch (error) {
      console.error('Error creating order:', error);
      return false;
    }
  }
  

export const handleUpdateOrderAction = async (data: IOrder) => {
    const res = await fetch(`https://duong211404.onrender.com/orders/${data._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    revalidateTag("list-orders");
    return await res.json();
}

export const handleDeleteOrderAction = async (id: string) => {
    const res = await fetch(`https://duong211404.onrender.com/orders/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    revalidateTag("list-orders");
    return await res.json();
}
