'use server'

export const handleGetOrders = async () => {
    const res = await fetch(`https://duong211404.onrender.com/orders`,
        {
            method: "GET",
            next: { tags: ["list-orders"] }
        });
    const data = await res.json();
    return Response.json({data});   
}
