import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SalesOrders.module.css';
import { getFarmerOrders } from '../../api/mockApi';

const SalesOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await getFarmerOrders();
            setOrders(data);
        }
        load();
    }, []);

    const handleViewDetails = (orderId) => {
        navigate(`/farmer/orders/${orderId}`); // Navigate to order details page
    };

    const getStatusClass = (status) => {
        const statusMap = {
            'New Order': 'new',
            'Delivered': 'delivered',
            'In Transit': 'transit',
            'Processing': 'processing',
        };
        return styles[statusMap[status] || 'default'];
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.logo}>SmartMandi</h1>
            <h2 className={styles.title}>Sales Orders</h2>
            <p className={styles.subtitle}>Track all incoming and completed purchase orders from vendors.</p>

            <div className={styles.statsBar}>
                <div className={styles.statBox}>
                    <div className={styles.statValue}>5</div>
                    <div className={styles.statLabel}>New Orders (Action Needed)</div>
                </div>
                <div className={styles.statBox}>
                    <div className={styles.statValue}>12</div>
                    <div className={styles.statLabel}>Pending Delivery</div>
                </div>
                <div className={styles.statBox}>
                    <div className={styles.statValue}>₹78,500</div>
                    <div className={styles.statLabel}>Payments Due</div>
                </div>
            </div>

            <h3 className={styles.listHeader}>All Sales ({orders.length} Total)</h3>

            <div className={styles.filterBar}>
                <button className={styles.filterButton}>Filter Orders</button>
                <span className={styles.showingText}>Showing 1 to {orders.length} of {orders.length} Sales Orders.</span>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.ordersTable}>
                    <thead>
                        <tr>
                            <th>Order ID</th><th>Product Sold</th><th>Quantity</th><th>Vendor (Buyer)</th>
                            <th>Total Amount</th><th>Order Status</th><th>Payment Status</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td><td>{order.product}</td><td>{order.qty}</td>
                                <td>{order.vendor}</td><td>{order.total}</td>
                                <td><span className={getStatusClass(order.status)}>{order.status}</span></td>
                                <td>{order.payment}</td>
                                <td><button className={styles.viewButton} onClick={() => handleViewDetails(order.id)}>View Details</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesOrders;
