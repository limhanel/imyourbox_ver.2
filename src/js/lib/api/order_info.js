import client from './client';

export async function orderInfo(orderData) {
    try {
        console.log(orderData);
        const response = await client.post('/order/order_info',orderData);
        return response;
    } catch (error) {
        console.log(error);
    }
}

