import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './OrderDetails.module.css';
import { getFarmerOrderById } from '../../api/mockApi';

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        async function load() {
            const o = await getFarmerOrderById(orderId);
            if (o) setOrder(o);
        }
        load();
    }, [orderId]);

    const handleAction = (action) => {
        console.log(`Order ${orderId}: ${action} attempted.`);
        alert(`Order ${orderId} has been ${action.toLowerCase()}!`);
        navigate('/farmer/orders');
    };

    if (!order) return <div className={styles.loading}>Loading order details...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.logo}>SmartMandi</h1>
            <h2 className={styles.title}>Sales Order: #{order.id}</h2>
            <p className={styles.actionNeeded}>Action needed: Confirm acceptance and prepare for shipment.</p>

            <div className={styles.statusBox}>
                {order.status}
                <span className={styles.placedDate}>Placed by {order.vendor}</span>
            </div>

            <div className={styles.contentGrid}>
                <div className={styles.productsSold}>
                    <h3 className={styles.sectionTitle}>Products Sold (1 Item)</h3>
                    <table className={styles.productsTable}>
                        <thead>
                            <tr><th>Product/ID</th><th>Quantity</th><th>Unit Price</th><th>Subtotal</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>{order.product}</td><td>{order.qty}</td><td>-</td><td>{order.total}</td></tr>
                        </tbody>
                    </table>

                    <h3 className={styles.sectionTitle}>Buyer Notes</h3>
                    <p className={styles.notes}>"Please pack carefully."</p>

                    <h3 className={styles.sectionTitle}>Farmer Actions</h3>
                    <div className={styles.actionButtons}>
                        <button className={styles.confirmButton} onClick={() => handleAction('Accepted')}>Confirm Acceptance</button>
                        <button className={styles.rejectButton} onClick={() => handleAction('Rejected')}>Reject Order</button>
                    </div>
                    <p className={styles.actionTip}>You have 24 hours to confirm acceptance of this order.</p>

                </div>

                <div className={styles.sidebar}>
                    <h3 className={styles.sectionTitle}>Buyer & Delivery Information</h3>
                    <p><strong>Buyer Details:</strong> {order.vendor}</p>
                    <p>Contact Person: +91 1234567890</p>
                    <p><strong>Shipping Address:</strong> Sample Address</p>

                    <h3 className={styles.sectionTitle}>Financial Overview</h3>
                    <div className={styles.financials}>
                        <p><span>Gross Sale Value:</span><span>{order.total}</span></p>
                        <p><span>SmartMandi Commission:</span><span>₹2,200</span></p>
                        <p className={styles.netPayable}><span>Net Payable to Farmer:</span><span>₹{Number(order.total.replace(/[^0-9]/g,'')) - 2200}</span></p>
                    </div>

                    <h3 className={styles.sectionTitle}>Status & Logistics</h3>
                    <p><strong>Payment Status:</strong> {order.payment}</p>
                    <button className={styles.readyButton} onClick={() => alert('Marked order ready for pickup.')}>Mark Ready for Pickup</button>
                </div>
            </div>

            <button className={styles.backButton} onClick={() => navigate('/farmer/orders')}>← Back to Sales</button>
        </div>
    );
};

export default OrderDetails;
