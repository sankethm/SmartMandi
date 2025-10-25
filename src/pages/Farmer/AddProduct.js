import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddProduct.module.css';
import { addProduct } from '../../api/mockApi';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '', category: '', description: '',
    quantity: '', unitType: 'Kilograms (kg)', price: '', minOrderQty: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.productName,
      price: parseFloat(formData.price) || 0,
      unit: formData.unitType,
      stock: Number(formData.quantity) || 0,
      description: formData.description,
      farmer: 'You (mock)'
    };
    await addProduct(payload);
    alert(`Product ${formData.productName} listed successfully!`);
    navigate('/farmer/dashboard');
  };

  const handleReset = () => {
    setFormData({
        productName: '', category: '', description: '',
        quantity: '', unitType: 'Kilograms (kg)', price: '', minOrderQty: '',
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>SmartMandi</h1>
      <h2 className={styles.title}>Add New Produce</h2>
      <p className={styles.subtitle}>Enter the details for the product you wish to list on SmartMandi.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.sectionTitle}>Basic Product Information</h3>
        <label className={styles.label}>Product Name *</label>
        <input type="text" name="productName" placeholder="e.g., Fresh Organic Wheat, Roma Tomatoes" value={formData.productName} onChange={handleChange} required />

        <label className={styles.label}>Category *</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select a primary category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Grains">Grains</option>
        </select>

        <label className={styles.label}>Product Description</label>
        <textarea rows="3" name="description" placeholder="Briefly describe the quality, origin, and variety..." value={formData.description} onChange={handleChange} required></textarea>

        <h3 className={styles.sectionTitle}>Pricing and Inventory</h3>
        <div className={styles.row}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Quantity Available *</label>
                <input type="number" name="quantity" placeholder="e.g., 500" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Unit Type *</label>
                <input type="text" name="unitType" value={formData.unitType} readOnly />
            </div>
        </div>

        <label className={styles.label}>Price per Unit (INR) *</label>
        <input type="text" name="price" placeholder="e.g., 35.50" value={formData.price} onChange={handleChange} required />

        <label className={styles.label}>Minimum Order Quantity</label>
        <input type="number" name="minOrderQty" placeholder="e.g., 10 (units)" value={formData.minOrderQty} onChange={handleChange} required />

        <h3 className={styles.sectionTitle}>Product Images *</h3>
        <p className={styles.imageTip}>Upload at least one high-quality image of your produce. (Max 4 images)</p>

        <div className={styles.imageUploadArea}>
            <button type="button" className={styles.uploadButton}>Upload Photos</button>
            <div className={styles.imagePreviews}>
                <div className={styles.imageBox}>Image 1</div>
                <div className={styles.imageBox}>Image 2</div>
                <div className={styles.imageBox}>Image 3</div>
                <div className={styles.imageBox}>Image 4</div>
            </div>
        </div>

        <div className={styles.buttonActions}>
            <button type="button" className={styles.cancelButton} onClick={handleReset}>Cancel / Reset</button>
            <button type="submit" className={styles.listButton}>List Product on SmartMandi</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
