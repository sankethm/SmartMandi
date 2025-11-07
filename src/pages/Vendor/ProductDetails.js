import React, { useState, useEffect,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProductDetails.css"
import tomato from "../../assets/tomato.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faExclamationTriangle, faTruck, faCheckCircle, faShoppingBasket, faTachometerAlt, faLeaf, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// --- MOCK PRODUCT DATA (Simulated Fetch) ---
const mockProduct = {
    id: 'prod_wheat_456',
    name: 'Premium Wheat',
    reviews: 120,
    rating: 4.8,
    basePrice: 2200, // Price per Quintal
    unit: 'Quintal (100 kg)',
    inventory: 500,
    minOrderQuantity: 10,
    description: "High-protein milling wheat, Grade A, sourced from the fertile lands of Rajasthan. Our Durum wheat is machine-cleaned, triple-filtered, and moisture-tested to ensure suitability for large-scale flour production. Guaranteed minimum protein content of **13.5%**.",
    
    // Supplier Info
    supplier: {
        id: 'FMB101',
        name: 'Vishesh Farms (FMB101)',
        location: 'Ahmedabad, Gujarat',
        productsListed: 15,
    },
    
    // Image Gallery
    images: [
        { id: 1, url: 'wheat_main.png' },
        { id: 2, url: 'wheat_thumb_a.png' },
        { id: 3, url: 'wheat_thumb_b.png' },
    ],
};

function ProductDetails() {
    const navigate = useNavigate();
    
    // --- State Hooks ---
    const [product, setProduct] = useState(null);
    const [orderQuantity, setOrderQuantity] = useState(''); // Quantity in Quintals
    const [quantityError, setQuantityError] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // --- Data Fetching (Simulation) ---
    useEffect(() => {
        // Simulate fetching product details using the ID from the URL/state
        setTimeout(() => {
            setProduct(mockProduct);
            setOrderQuantity(mockProduct.minOrderQuantity.toString());
            setMainImage(mockProduct.images[0].url);
            setIsLoading(false);
        }, 500);
    }, []);

    // --- Dynamic Calculations ---
    const estimatedCost = useMemo(() => {
        const qty = parseFloat(orderQuantity);
        if (qty && qty > 0 && product) {
            return qty * product.basePrice;
        }
        return 0;
    }, [orderQuantity, product]);

    // --- Input Validation & Handling ---
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        setOrderQuantity(value);
        
        const qty = parseFloat(value);
        setQuantityError('');

        if (qty < product.minOrderQuantity) {
            setQuantityError(`Minimum Order Quantity (MOQ) is ${product.minOrderQuantity} Quintals.`);
        } else if (qty > product.inventory) {
            setQuantityError(`Only ${product.inventory} Quintals available for dispatch.`);
        } else if (isNaN(qty) || qty <= 0) {
             setQuantityError(`Please enter a valid quantity.`);
        }
    };
    
    // --- Action Handlers ---
    const handleAddToOrder = () => {
        if (quantityError || !orderQuantity || parseFloat(orderQuantity) < product.minOrderQuantity) {
            alert('Please fix quantity errors before adding to order.');
            return;
        }
        
        console.log(`Adding ${orderQuantity} ${product.unit} of ${product.name} to basket.`);
        alert(`Successfully added ${orderQuantity} ${product.unit} to your order basket!`);
        // navigate('/my-orders'); // or some cart view
    };
    
    const handleContactSupplier = () => {
        alert(`Initiating contact with ${product.supplier.name}.`);
        // navigate('/messages/FMB101'); // In a real app, opens a chat modal/page
    };
    
    const handleBackToBrowsing = () => {
        navigate('/vendor/browseProducts');
    };
    const handleLogout = () => {
        navigate('/login');
    };
    
    if (isLoading || !product) {
        return (
            <div className="product-details-page loading-state">
                <h1 className="sidebar-logo">SmartMandi</h1>
                <p className="loading-text">Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="product-details-page">
            {/* --- SIDEBAR --- (Reused) */}
            <aside className="sidebar-nav">
                <h1 className="sidebar-logo">SmartMandi</h1>
                <p className="vendor-portal-text">Vendor Portal</p>
                <nav className="nav-menu">
                  <a href="/vendor/dashboard" className="nav-item">
                    <FontAwesomeIcon icon={faTachometerAlt} style={{marginRight: '10px'}} /> Dashboard
                    </a>
                    <a href="/vendor/browseProducts" className="nav-item active">
                        <FontAwesomeIcon icon={faLeaf} style={{marginRight: '10px'}} /> Browse Products
                    </a>
                    <a href="/vendor/orders" className="nav-item">
                        <FontAwesomeIcon icon={faShoppingBasket} style={{marginRight: '10px'}} /> My Orders
                    </a>
                    <a href="/vendor/editProfile" className="nav-item">
                        <FontAwesomeIcon icon={faCog} style={{marginRight: '10px'}} /> Settings
                    </a>
                    <a href="#" onClick={handleLogout} className="nav-item logout-link">
                        <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: '10px'}} /> Logout
                    </a>
                </nav>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="product-main-content">
                <header className="product-header">
                    <h2>Product Details</h2>
                    <p className="product-subtitle">
                        Review quality, inventory, and pricing before placing an order.
                    </p>
                    <button onClick={handleBackToBrowsing} className="back-button">
                         &larr; Back to Browsing
                    </button>
                </header>

                {/* --- PRODUCT LAYOUT (Image + Info) --- */}
                <section className="product-layout">
                    
                    {/* LEFT COLUMN: Images & Description */}
                    <div className="product-visuals-col">
                        <div className="main-image-container">
                             {/*  */}
                            <img src={tomato} alt={product.name} className="main-image" />
                        </div>
                        <div className="thumbnail-gallery">
                            {product.images.map(img => (
                                <img 
                                    key={img.id}
                                    src={tomato}
                                    alt={`Thumbnail ${img.id}`}
                                    className={`thumbnail ${img.url === mainImage ? 'active' : ''}`}
                                    onClick={() => setMainImage(img.url)}
                                />
                            ))}
                            <div className="thumbnail placeholder-thumb">
                                <i className="fas fa-plus"></i>
                            </div>
                        </div>
                        
                        {/* Product Description */}
                        <div className="product-description-box">
                            <h3 className="section-title">Product Description</h3>
                            <p dangerouslySetInnerHTML={{ __html: product.description.replace(/\*\*/g, '<strong>') }}></p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Info & Actions */}
                    <div className="product-info-col">
                        
                        {/* Title & Pricing */}
                        <div className="info-section">
                            <h1 className="product-name-title">{product.name}</h1>
                            <p className="reviews-text">
                                <i className="fas fa-star rating-star"></i> {product.rating} ({product.reviews} reviews)
                            </p>
                            <span className="product-price-display">
                                ₹ {product.basePrice.toLocaleString('en-IN')} / {product.unit}
                            </span>
                        </div>
                        
                        {/* Inventory Section */}
                        <div className="info-section inventory-section">
                            <h3 className="section-title"><i className="fas fa-warehouse"></i> Inventory</h3>
                            <p className="inventory-text">
                                **{product.inventory} Quintals** available for immediate dispatch.
                            </p>
                            <p className="moq-text">
                                Minimum Order Quantity (MOQ): **{product.minOrderQuantity} Quintals**
                            </p>
                        </div>

                        {/* Order Placement Section */}
                        <div className="info-section order-section">
                            <h3 className="section-title">Place Your Order</h3>
                            <div className="order-input-row">
                                <div className="order-quantity-group">
                                    <label htmlFor="orderQuantity">Quantity (in Quintals)</label>
                                    <input
                                        type="number"
                                        id="orderQuantity"
                                        value={orderQuantity}
                                        onChange={handleQuantityChange}
                                        className={quantityError ? 'input-error' : ''}
                                        min={product.minOrderQuantity}
                                    />
                                    {quantityError && <p className="error-message">{quantityError}</p>}
                                </div>
                                <div className="estimated-cost-group">
                                    <p className="estimated-cost-label">Estimated Cost:</p>
                                    <p className="estimated-cost-value">
                                        ₹ {estimatedCost.toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="order-actions">
                                <button onClick={handleAddToOrder} className={`action-button add-to-basket ${quantityError ? 'disabled-button' : ''}`} disabled={!!quantityError}>
                                    <i className="fas fa-shopping-basket"></i> Add to Order Basket
                                </button>
                                <button onClick={handleContactSupplier} className="action-button contact-supplier">
                                    <i className="fas fa-phone-alt"></i> Contact Supplier
                                </button>
                            </div>
                        </div>

                        {/* Supplier Information Section */}
                        <div className="info-section supplier-section">
                            <h3 className="section-title"><i className="fas fa-handshake"></i> Supplied By</h3>
                            <p className="supplier-name">{product.supplier.name}</p>
                            <p className="supplier-location">Location: {product.supplier.location}</p>
                            <p className="supplier-stats">Products Listed: {product.supplier.productsListed}</p>
                            <button onClick={() => alert('Viewing profile...')} className="view-profile-link">
                                View Supplier Profile
                            </button>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}

export default ProductDetails;