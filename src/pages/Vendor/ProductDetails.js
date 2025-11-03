import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import { getProductById } from '../../api/mockApi';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function load() {
      const p = await getProductById(productId);
      setProduct(p);
    }
    load();
  }, [productId]);

  if (!product) return <div style={{padding:20}}>Product not found.</div>;

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Back</button>
      <h1 className={styles.title}>{product.name}</h1>
      <p className={styles.farmer}>Seller: {product.farmer}</p>
      <div className={styles.row}>
        <div className={styles.info}>
          <p className={styles.price}>₹{product.price} / {product.unit}</p>
          <p className={styles.desc}>{product.description}</p>
          <div className={styles.actions}>
            <button onClick={() => alert('Added to cart (mock)')} className={styles.add}>Add to Cart</button>
            <button onClick={() => alert('Contact seller (mock)')} className={styles.contact}>Contact Seller</button>
          </div>
        </div>
        <div className={styles.side}>
          <div className={styles.metaBox}><strong>Minimum Order:</strong> 10 {product.unit}</div>
          <div className={styles.metaBox}><strong>Available:</strong> {product.stock} {product.unit}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
