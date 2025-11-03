import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BrowseProducts.module.css';
import { getProducts, searchProducts } from '../../api/mockApi';

const BrowseProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function load(){ const p = await getProducts(); setProducts(p); }
    load();
  }, []);

  const filtered = query ? (async ()=> await searchProducts(query))() : products;

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>Browse Produce</h1>
      <div className={styles.searchRow}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search produce, farmer..." className={styles.search} />
      </div>

      <div className={styles.grid}>
        {(Array.isArray(filtered) ? filtered : products).map(p => (
          <div key={p.id} className={styles.card}>
            <h3>{p.name}</h3>
            <p className={styles.meta}>{p.farmer} • Stock: {p.stock} {p.unit}</p>
            <p className={styles.price}>₹{p.price}/{p.unit}</p>
            <div className={styles.actions}>
              <button onClick={() => navigate(`/vendor/product/${p.id}`)} className={styles.viewBtn}>View</button>
              <button onClick={() => alert('Added to cart (mock)')} className={styles.cartBtn}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseProducts;
