import Layout from '@/components/layout';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]) 
    useEffect(()=> {
        axios.get('/api/orders').then(res => {
            setOrders(res.data); 
        })
    }, [])
    return (
        <Layout>
            <h1>Orders</h1>
            <table className='basic'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Paid</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr> 
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => {
                        console.log('order', order);
                        return (
                            <tr>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                <td className={order.paid ? 'text-green-600' : 'text-red-600'}>{order.paid ? 'Yes' : 'No'}</td>
                                <td>
                                {order.name} {order.email} <br/>
                                {order.city} {order.postalCode} <br/>
                                {order.country} <br/>
                                {order.streeAddress} 
                                </td>
                                {order.line_items.map(item => (
                                    <td>{item.price_data?.product_data?.name} * {item.quantity}</td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Layout>
    )
}