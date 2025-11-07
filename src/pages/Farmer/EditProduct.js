import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios'; // You will need this for fetching and updating data
import "./EditProduct.css"
// --- DUMMY DATA (for Select dropdowns) ---
const categories = [
  { value: '', label: 'Select a primary category' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'grains', label: 'Grains' },
  { value: 'dairy', label: 'Dairy' },
];
const unitTypes = ['Kilograms (Kg)', 'Units', 'Litres (L)', 'Dozens'];

// --- DUMMY INITIAL PRODUCT DATA (Simulated API Fetch) ---
const mockProductData = {
    id: 'prod123',
    productName: 'Fresh Organic Roma Tomatoes',
    category: 'vegetables',
    description: 'Premium quality, vine-ripened Roma tomatoes, perfect for sauces and salads. Grown organically on our farm.',
    quantityAvailable: 500,
    unitType: 'Kilograms (Kg)',
    pricePerUnit: 35.50,
    minOrderQuantity: 10,
    // Existing URLs from Cloudinary/Mongo
    imageUrls: [
        'https://cloudinary-cdn.com/product/1715494000_tomato_a.jpg',
        'https://cloudinary-cdn.com/product/1715494001_tomato_b.jpg',
    ],
};


function EditProduct() {
  const navigate = useNavigate();
  // const { productId } = useParams(); // Use this to get the ID from the URL (e.g., /edit/prod123)

  // --- FORM STATE HOOKS ---
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [quantityAvailable, setQuantityAvailable] = useState('');
  const [unitType, setUnitType] = useState(unitTypes[0]);
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [minOrderQuantity, setMinOrderQuantity] = useState('');
  const [imageUrls, setImageUrls] = useState([]); 
  const [isUploading, setIsUploading] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); // New state for loading existing data
  
  // --- ERROR STATE HOOKS ---
  const [errors, setErrors] = useState({});

  // --- 1. DATA FETCHING (Simulated) ---
  useEffect(() => {
    // In a real app: axios.get(`/api/products/${productId}`).then(response => setInitialData(response.data));
    
    // Simulate API fetch delay
    setTimeout(() => {
        setProductName(mockProductData.productName);
        setCategory(mockProductData.category);
        setDescription(mockProductData.description);
        setQuantityAvailable(mockProductData.quantityAvailable);
        setUnitType(mockProductData.unitType);
        setPricePerUnit(mockProductData.pricePerUnit);
        setMinOrderQuantity(mockProductData.minOrderQuantity);
        setImageUrls(mockProductData.imageUrls);
        setIsLoading(false);
    }, 500);
  }, []); // Depend on productId if using useParams

  // --- 2. CLOUDINARY UPLOAD HANDLER (SIMULATED) ---
  const uploadToCloudinary = async (file) => {
    // This function remains the same as in AddNewProduct.js
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (file.size > 5 * 1024 * 1024) { 
              reject(new Error(`File ${file.name} is too large (max 5MB).`));
          }
          console.log(`Simulating upload for: ${file.name}`);
          resolve(`https://cloudinary-cdn.com/product/${Date.now()}_${file.name.replace(/\s/g, '_')}`);
      }, 1000); 
    });
  };

  // --- 3. IMAGE UPLOAD CHANGE HANDLER (Same as before) ---
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const totalFiles = imageUrls.length + files.length;

    if (totalFiles > 4) {
      alert(`You can only upload a maximum of 4 images. You selected ${files.length} but already have ${imageUrls.length}.`);
      e.target.value = null; 
      return;
    }

    if (files.length === 0) return;

    setIsUploading(true);
    setErrors(prev => ({ ...prev, imageUrls: '' }));

    try {
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const newUrls = await Promise.all(uploadPromises);
      setImageUrls(prevUrls => [...prevUrls, ...newUrls]);

    } catch (error) {
        alert(`Error uploading file: ${error.message}`);
        setErrors(prev => ({ ...prev, imageUrls: error.message }));
    } finally {
      setIsUploading(false);
      e.target.value = null; 
    }
  };

  // --- 4. Image Removal (Same as before) ---
  const removeImage = (indexToRemove) => {
    setImageUrls(prevUrls => 
      prevUrls.filter((_, index) => index !== indexToRemove)
    );
  };
  
  // --- 5. VALIDATION LOGIC (Same as before) ---
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!productName.trim()) { newErrors.productName = 'Product name is required.'; isValid = false; }
    if (!category) { newErrors.category = 'Please select a primary category.'; isValid = false; }
    if (!description.trim() || description.trim().length < 20) { newErrors.description = 'Description must be at least 20 characters.'; isValid = false; }

    const qa = parseFloat(quantityAvailable);
    const ppu = parseFloat(pricePerUnit);
    const moq = parseInt(minOrderQuantity);

    if (isNaN(qa) || qa <= 0) { newErrors.quantityAvailable = 'Must be a positive number.'; isValid = false; }
    if (isNaN(ppu) || ppu <= 0) { newErrors.pricePerUnit = 'Price must be greater than zero.'; isValid = false; }
    if (isNaN(moq) || moq < 1) { newErrors.minOrderQuantity = 'Minimum order must be at least 1 unit.'; isValid = false; }

    if (imageUrls.length < 1) { newErrors.imageUrls = 'Please upload at least one image.'; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  // --- 6. SUBMISSION HANDLER (Updated for PUT/PATCH) ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedProductData = {
        // id: mockProductData.id, // Include product ID for API
        productName, category, description,
        quantityAvailable: parseFloat(quantityAvailable), unitType,
        pricePerUnit: parseFloat(pricePerUnit), minOrderQuantity: parseInt(minOrderQuantity),
        imageUrls, // The final list of old and new URLs
      };

      console.log('Product Data Ready for UPDATE API:', updatedProductData);
      
      // *** Placeholder for actual API call (e.g., axios.put(`/api/products/${mockProductData.id}`, updatedProductData)) ***
      
      alert('Product updated successfully! (Simulated)');
      navigate('/farmer/dashboard'); 
    } else {
      console.log('Validation failed. Update prevented.');
    }
  };

  // --- 7. CANCEL / DISCARD HANDLER ---
  const handleCancel = () => {
    const confirmDiscard = window.confirm('Are you sure you want to discard all changes?');
    if (confirmDiscard) {
      navigate('/farmer/dashboard'); // Go back without saving
    }
  };

  if (isLoading) {
    return (
        <div className="edit-product-page loading-state">
            <h1 className="sidebar-logo">SmartMandi</h1>
            <p className="loading-text">Loading product data...</p>
        </div>
    );
  }

  return (
    <div className="edit-product-page">
      {/* Sidebar - Replicate the look from the Dashboard */}
      <aside className="sidebar-nav">
        <h1 className="sidebar-logo">SmartMandi</h1>
        <nav className="nav-menu">
            <a href="/farmer/dashboard" className="nav-item">
                <i className="fas fa-chart-line"></i> Dashboard
            </a>
            <a href="/analytics" className="nav-item">
                <i className="fas fa-chart-pie"></i> Analytics
            </a>
            <a href="/orders" className="nav-item">
                <i className="fas fa-shopping-basket"></i> Sales Orders
            </a>
            <a href="/farmer/edit-profile" className="nav-item">
                <i className="fas fa-cog"></i> Settings
            </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="product-form-main">
        <div className="form-header">
            <h2>Edit Product</h2>
            <p className="form-subtitle">
                Update the details for your existing product on SmartMandi.
            </p>
        </div>
        
        <form onSubmit={handleSubmit} className="product-form">
          
          {/* --- 1. Basic Product Information --- */}
          <div className="form-section">
            <h3 className="section-title">Basic Product Information</h3>
            
            <div className="input-group full-width">
              <label htmlFor="productName">Product Name *</label>
              <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className={errors.productName ? 'input-error' : ''} />
              {errors.productName && <p className="error-message">{errors.productName}</p>}
            </div>

            <div className="input-row">
                <div className="input-group half-width">
                    <label htmlFor="category">Category *</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={errors.category ? 'input-error' : ''}>
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value} disabled={cat.value === ''}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="error-message">{errors.category}</p>}
                </div>
            </div>

            <div className="input-group full-width">
              <label htmlFor="description">Product Description</label>
              <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className={errors.description ? 'input-error' : ''} ></textarea>
              {errors.description && <p className="error-message">{errors.description}</p>}
            </div>
          </div>
          
          {/* --- 2. Pricing and Inventory --- */}
          <div className="form-section">
            <h3 className="section-title">Pricing and Inventory</h3>

            <div className="input-row">
              <div className="input-group half-width">
                <label htmlFor="quantityAvailable">Quantity Available *</label>
                <input type="number" id="quantityAvailable" value={quantityAvailable} onChange={(e) => setQuantityAvailable(e.target.value)} className={errors.quantityAvailable ? 'input-error' : ''} />
                {errors.quantityAvailable && <p className="error-message">{errors.quantityAvailable}</p>}
              </div>

              <div className="input-group half-width">
                <label htmlFor="unitType">Unit Type *</label>
                <select id="unitType" value={unitType} onChange={(e) => setUnitType(e.target.value)}>
                  {unitTypes.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-row">
                <div className="input-group half-width">
                    <label htmlFor="pricePerUnit">Price per Unit (INR) *</label>
                    <input type="number" id="pricePerUnit" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} className={errors.pricePerUnit ? 'input-error' : ''} />
                    {errors.pricePerUnit && <p className="error-message">{errors.pricePerUnit}</p>}
                </div>
                <div className="input-group half-width">
                    <label htmlFor="minOrderQuantity">Minimum Order Quantity</label>
                    <input type="number" id="minOrderQuantity" value={minOrderQuantity} onChange={(e) => setMinOrderQuantity(e.target.value)} className={errors.minOrderQuantity ? 'input-error' : ''} />
                    {errors.minOrderQuantity && <p className="error-message">{errors.minOrderQuantity}</p>}
                </div>
            </div>
          </div>
          
          {/* --- 3. Product Images --- */}
          <div className="form-section">
            <h3 className="section-title">Product Images *</h3>
            <p className="image-help-text">
                Upload at least one high-quality image of your product. (Max 4 images)
            </p>
            
            <label htmlFor="image-upload" className={`upload-button-label ${isUploading || imageUrls.length >= 4 ? 'disabled-upload' : ''}`} style={{ pointerEvents: (isUploading || imageUrls.length >= 4) ? 'none' : 'auto' }}>
                {isUploading ? 'Uploading...' : 'Upload Photos'}
                <i className="fas fa-cloud-upload-alt" style={{ marginLeft: '8px' }}></i>
            </label>
            <input type="file" id="image-upload" multiple accept="image/*" onChange={handleImageUpload} disabled={isUploading || imageUrls.length >= 4} style={{ display: 'none' }} />

            <div className="image-preview-container">
              {[...Array(4)].map((_, index) => (
                <div key={index} className={`image-placeholder ${errors.imageUrls && index === 0 ? 'image-error-border' : ''}`}>
                  {imageUrls[index] ? (
                    <div className="uploaded-image-simulated loaded-image">
                      {/* Using the URL for the preview */}
                      <img src={imageUrls[index]} alt={`Product Image ${index + 1}`} className="preview-image-actual" /> 
                      <p className="image-text-overlay">Image {index + 1} Loaded</p>
                      <button type="button" className="remove-image-button" onClick={() => removeImage(index)} title="Remove Image">
                         &times;
                      </button>
                    </div>
                  ) : (
                    <p>Image {index + 1}</p>
                  )}
                </div>
              ))}
            </div>
            {errors.imageUrls && <p className="error-message">{errors.imageUrls}</p>}
          </div>

          {/* --- SUBMISSION ACTIONS --- */}
          <div className="form-actions">
            <button type="submit" className="submit-button update-button">
              Update Product on SmartMandi
            </button>
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel / Discard Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditProduct;