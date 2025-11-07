import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import "./BrowseProducts.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faExclamationTriangle, faTruck, faCheckCircle, faShoppingBasket, faTachometerAlt, faLeaf, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import tomato from "../../assets/tomato.jpg"
// --- DUMMY DATA ---
const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'grains', label: 'Grains' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
];

const mockProducts = [
    { id: 1, name: 'Premium Wheat', description: 'High-protein milling wheat, Grade A.', price: 2200, unit: 'Quintal', status: 'Available', stock: 50, farmerId: 'F**401', listedDays: 3, category: 'grains', imageUrl: 'wheat.png' },
    { id: 2, name: 'Organic Tomatoes', description: 'Naturally ripened, ideal for sauces and processing.', price: 35, unit: 'Kg', status: 'Limited Stock', stock: 10, farmerId: 'F**169', listedDays: 1, category: 'vegetables', imageUrl: 'tomato.png' },
    { id: 3, name: 'Apples', description: 'Crisp texture, sweet flavor, stored in cold storage.', price: 120, unit: 'Dozen', status: 'Available', stock: 150, farmerId: 'F**199', listedDays: 4 * 7, category: 'fruits', imageUrl: 'apples.png' },
    { id: 4, name: 'Organic Potatoes', description: 'High-quality, size Grade AA.', price: 50, unit: 'Kg', status: 'Available', stock: 250, farmerId: 'F**777', listedDays: 4, category: 'vegetables', imageUrl: 'potato.png' },
    { id: 5, name: 'Red Chillies', description: 'Sun-dried and potent.', price: 80, unit: 'Kg', status: 'Available', stock: 50, farmerId: 'F**808', listedDays: 2, category: 'vegetables', imageUrl: 'chilli.png' },
];

// --- Sub-Component: Product Listing Card ---
const ProductListingCard = ({ product }) => {
    const navigate = useNavigate();
    const { 
        id, name, description, price, unit, status, farmerId, listedDays, imageUrl 
    } = product;

    const getStatusClass = (status) => {
        if (status === 'Limited Stock') return 'status-limited';
        return 'status-available';
    };

    const handleAddToOrder = () => {
        console.log(`Adding ${name} (ID: ${id}) to order.`);
        alert(`Added ${name} to your order list!`);
        navigate("/vendor/orders");
    };
    return (
        <div className="product-listing-card">
            <img src={tomato} alt={name} className="listing-image" />
            
            <span className={`status-tag ${getStatusClass(status)}`}>
                {status}
            </span>

            <div className="listing-details">
                <h4 className="listing-name">{name}</h4>
                <p className="listing-description">{description}</p>
                
                <div className="listing-info-row">
                    <p>
                        <i className="fas fa-user-circle"></i> Farmer ID: {farmerId}
                    </p>
                    <p>
                        <i className="fas fa-box-open"></i> Listed {listedDays} days ago
                    </p>
                </div>
                
                <div className="listing-price-row">
                    <span className="listing-price">
                        ₹ {price} / {unit}
                    </span>
                    <button onClick={handleAddToOrder} className="add-to-order-button">
                        <i className="fas fa-cart-plus"></i> Add to Order
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- MAIN BROWSE PRODUCTS COMPONENT ---
function BrowseProducts() {
    const navigate = useNavigate();
    
    // --- State for Filters ---
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceSort, setPriceSort] = useState('low-to-high');
    const [displayProducts, setDisplayProducts] = useState(mockProducts);

    // --- Filter Application Logic ---
    const applyFilters = () => {
        let filtered = mockProducts;

        // 1. Filter by Search Term (Name or Farmer ID)
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(lowerCaseSearch) ||
                p.farmerId.toLowerCase().includes(lowerCaseSearch)
            );
        }

        // 2. Filter by Category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // 3. Sort by Price
        filtered.sort((a, b) => {
            if (priceSort === 'low-to-high') {
                return a.price - b.price;
            } else if (priceSort === 'high-to-low') {
                return b.price - a.price;
            }
            return 0;
        });

        setDisplayProducts(filtered);
    };
    
    // Reset filters and display all products
    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setPriceSort('low-to-high');
        setDisplayProducts(mockProducts);
    }
    
    const handleLogout = () => {
        navigate('/login');
    };

    const viewProductDetails = (productId) => {
        console.log("product clicked")
      navigate(`/vendor/productDetails/${productId}`)
    }
    return (
        <div className="browse-products-container">
            {/* --- SIDEBAR --- */}
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
            <main className="browse-main-content">
                <div className="form-header">
                    <h2>Browse Available Produce</h2>
                    <p className="form-subtitle">
                        Search and filter high-quality produce listed by our verified farmers.
                    </p>
                </div>

                {/* --- FILTER BAR --- */}
                <section className="filter-bar">
                    <div className="search-input-group">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            placeholder="Search products by name or farmer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>

                    <select 
                        value={priceSort}
                        onChange={(e) => setPriceSort(e.target.value)}
                    >
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>

                    <button onClick={applyFilters} className="apply-filters-button">
                        Apply Filters
                    </button>
                    
                    <button onClick={resetFilters} className="reset-filters-button" title="Reset Filters">
                        <i className="fas fa-undo"></i>
                    </button>
                </section>

                {/* --- PRODUCT LISTINGS --- */}
                <section className="product-listings-grid">
                    {displayProducts.length > 0 ? (
                        displayProducts.map(product => (
                            <ProductListingCard key={product.id} product={product} onClick={viewProductDetails(product.id)}/>
                        ))
                    ) : (
                        <div className="no-results-message">
                            <i className="fas fa-box-open"></i>
                            <p>No products match your current filters. Try broadening your search!</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default BrowseProducts;