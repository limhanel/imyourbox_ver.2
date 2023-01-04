import client from './client';

export async function detailOrderInfo(detailOrderInfoData) {
    try {
        console.log(detailOrderInfoData);
        const response = await client.post('/order/detail_order_info',detailOrderInfoData);
        return response;
    } catch (error) {
        console.log(error);
    }
}
