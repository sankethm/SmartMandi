import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: 'Fresh Organic Roma Tomatoes', 
    category: 'Vegetables', 
    description: 'Premium quality, vine-ripened Roma tomatoes, perfect for sauces and salads. Grown organically on our farm.',
    quantity: '500', 
    unitType: 'Kilograms (kg)', 
    price: '35.50', 
    minOrderQty: '10',
  });

  // Simulate fetching product data to pre-populate form
  useEffect(() => {
    console.log(`Fetching details for product ID: ${productId}`);
    // In a real app: fetchProductDetails(productId).then(data => setFormData(data));
  }, [productId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Simulate API call to update product
    console.log(`Updating product ${productId}:`, formData);
    alert(`Product ${formData.productName} updated successfully!`);
    navigate('/farmer/dashboard');
  };

  const handleCancel = () => {
    navigate('/farmer/dashboard');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>SmartMandi</h1>
      <h2 className={styles.title}>Edit Product</h2>
      <p className={styles.subtitle}>Update the details for your existing product on SmartMandi.</p>

      <form className={styles.form} onSubmit={handleUpdate}>
        <h3 className={styles.sectionTitle}>Basic Product Information</h3>
        <label className={styles.label}>Product Name *</label>
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />

        <label className={styles.label}>Category</label>
        <input type="text" value={formData.category} readOnly />

        <label className={styles.label}>Product Description</label>
        <textarea rows="3" name="description" value={formData.description} onChange={handleChange} required></textarea>

        <h3 className={styles.sectionTitle}>Pricing and Inventory</h3>
        <div className={styles.row}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Quantity Available</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Unit Type</label>
                <input type="text" value={formData.unitType} readOnly />
            </div>
        </div>

        <label className={styles.label}>Price per Unit (INR)</label>
        <input type="text" name="price" value={formData.price} onChange={handleChange} required />
        
        <label className={styles.label}>Minimum Order Quantity</label>
        <input type="number" name="minOrderQty" value={formData.minOrderQty} onChange={handleChange} required />

        <h3 className={styles.sectionTitle}>Product Images *</h3>
        <p className={styles.imageTip}>Upload at least one high-quality image of your product. (Max 4 Images).</p>
        
        <div className={styles.imageUploadArea}>
            <button type="button" className={styles.uploadButton}>Upload Photos</button>
            <div className={styles.imagePreviews}>
                <div className={styles.imageBox}>Image 1 (Current)</div>
                <div className={styles.imageBox}>Image 2 (Current)</div>
                <div className={styles.imageBox}>Image 3</div>
                <div className={styles.imageBox}>Image 4</div>
            </div>
        </div>

        <div className={styles.buttonActions}>
            <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel / Discard Changes</button>
            <button type="submit" className={styles.listButton}>Update Product on SmartMandi</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
