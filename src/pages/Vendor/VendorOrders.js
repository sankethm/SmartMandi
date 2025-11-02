import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VendorOrders.module.css';
import { getVendorOrders } from '../../api/mockApi';

const VendorOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function load() {
      const o = await getVendorOrders();
      setOrders(o);
    }
    load();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Orders</h1>
      <div className={styles.table}>
        <div className={styles.rowHeader}><div>Order ID</div><div>Product</div><div>Qty</div><div>Total</div><div>Status</div><div>Action</div></div>
        {orders.map(o => (
          <div key={o.id} className={styles.row} onClick={() => navigate(`/vendor/product/${o.id}`)}>
            <div>#{o.id}</div><div>{o.product}</div><div>{o.qty}</div><div>{o.total}</div><div className={styles.status}>{o.status}</div>
            <div><button className={styles.view} onClick={(e)=>{e.stopPropagation(); alert('Viewing order '+o.id)}}>View</button></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorOrders;
