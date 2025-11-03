import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VendorDashboard.module.css';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const mockStats = { activeOrders: 12, savedProducts: 34, pendingPayments: 3, monthlySpend: 45200 };
  const recentOrders = [
    { id: 2001, product: 'Organic Tomatoes', qty: '100 kg', farmer: 'Sanket Farms', status: 'Delivered' },
    { id: 2002, product: 'Fresh Onions', qty: '50 kg', farmer: 'Green Valley', status: 'In Transit' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>SmartMandi - Vendor</h1>
      <div className={styles.header}>
        <div className={styles.welcome}>Welcome, Vendor</div>
        <div className={styles.actions}>
          <button onClick={() => navigate('/vendor/browse')} className={styles.primary}>Browse Products</button>
          <button onClick={() => navigate('/vendor/orders')} className={styles.secondary}>My Orders</button>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.card}>Active Orders<br/><strong>{mockStats.activeOrders}</strong></div>
        <div className={styles.card}>Saved Products<br/><strong>{mockStats.savedProducts}</strong></div>
        <div className={styles.card}>Pending Payments<br/><strong>{mockStats.pendingPayments}</strong></div>
        <div className={styles.card}>Monthly Spend<br/><strong>₹{mockStats.monthlySpend}</strong></div>
      </div>

      <h2 className={styles.section}>Recent Purchases</h2>
      <div className={styles.list}>
        {recentOrders.map(o => (
          <div key={o.id} className={styles.orderCard} onClick={() => navigate(`/vendor/product/${o.id}`)}>
            <div className={styles.orderHeader}><strong>#{o.id}</strong> — {o.product}</div>
            <div className={styles.orderMeta}>{o.qty} • From: {o.farmer}</div>
            <div className={styles.orderStatus}>{o.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDashboard;