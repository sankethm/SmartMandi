import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './FarmerDashboard.module.css';
import { getProducts, getFarmerOrders } from '../../api/mockApi';

const FarmerDashboard = () => {
    const { userInfo, logout } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({ activeListings: 0, pendingOrders: 0, processingValue: 0.00, deliveredValue: 0.00 });
    const [listings, setListings] = useState([]);
    const [recentBuyers, setRecentBuyers] = useState([]);

    useEffect(() => {
        async function load() {
            const prods = await getProducts();
            setListings(prods.slice(0,6));
            const orders = await getFarmerOrders();
            setStats({ activeListings: prods.length, pendingOrders: orders.filter(o=>o.status !== 'Delivered').length, processingValue: 750.00, deliveredValue: 1800.00 });
            setRecentBuyers(orders.slice(0,3).map(o=>({ name: o.vendor, time: 'a few hours ago' })));
        }
        load();
    }, []);

    const handleAddProduct = () => navigate('/farmer/add-product');
    const handleEditProduct = (productId) => navigate(`/farmer/products/edit/${productId}`);

    return (
        <div className={styles.container}>
            <h1 className={styles.logo}>SmartMandi</h1>

            <div className={styles.headerInfo}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search products" />
                </div>
                <div className={styles.userInfo}>
                    <span>{userInfo?.name || 'Sanket Hiremath'}</span>
                    <button className={styles.logoutButton} onClick={logout}>Logout</button>
                </div>
            </div>

            <div className={styles.statsCards}>
                <div className={styles.card}>Active Listings: {stats.activeListings}</div>
                <div className={styles.card}>Pending Orders: {stats.pendingOrders}</div>
                <div className={styles.card}>₹{stats.processingValue.toFixed(2)} Processing</div>
                <div className={styles.card}>₹{stats.deliveredValue.toFixed(2)} Delivered</div>
            </div>

            <div className={styles.contentGrid}>
                <div className={styles.listingsSection}>
                    <h2 className={styles.sectionHeader}>My Product Listings</h2>
                    <button className={styles.addProductBtn} onClick={handleAddProduct}>+Add New Product</button>

                    {listings.map((item) => (
                        <div key={item.id} className={styles.productCard} onClick={() => handleEditProduct(item.id)}>
                            <div className={`${styles.statusTag} ${styles.available}`}>Available</div>
                            <h4>{item.name}</h4>
                            <p className={styles.details}>{item.description}</p>
                            <p className={styles.stockInfo}>₹{item.price}/{item.unit} | Stock: {item.stock}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.sidebar}>
                    <h2 className={styles.sectionHeader}>Categories</h2>
                    <ul className={styles.categoryList}>
                        <li>Vegetables (12)</li>
                        <li>Fruits (8)</li>
                        <li>Grains (4)</li>
                    </ul>

                    <h2 className={styles.sectionHeader}>Recent Buyers</h2>
                    <ul className={styles.buyerList}>
                        {recentBuyers.map((buyer, index) => (
                            <li key={index} className={styles.buyerItem}>
                                <span>{buyer.name}</span>
                                <span className={styles.time}>{buyer.time}</span>
                            </li>
                        ))}
                    </ul>

                    <h2 className={styles.sectionHeader}>Recent Orders</h2>
                    <p className={styles.recentOrder}>Dharwad Grocery Store: Ordered 50kg Organic Tomatoes</p>
                    <p className={styles.recentOrder}>Fresh Market: Ordered 30kg Carrots</p>
                </div>
            </div>
        </div>
    );
};

export default FarmerDashboard;
