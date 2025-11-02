import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard.js'; 
import "./FarmerDashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// NOTE: Make sure ProductCard.js is in the same directory, or adjust the path.

// --- DUMMY DATA ---
const initialProducts = [
  { id: 1, name: 'Organic Tomatoes', description: 'Fresh vine-ripened tomatoes', price: 15, stock: 190, unit: 'Kg', status: 'Available', imageUrl: 'tomato.png' },
  { id: 2, name: 'Fresh Onions', description: 'Crisp iceberg lettuce heads', price: 60, stock: 8, unit: 'Kg', status: 'Low Stock', imageUrl: 'onion.png' },
  { id: 3, name: 'Carrots', description: 'Sweet baby carrots with tops', price: 60, stock: 80, unit: 'Kg', status: 'Available', imageUrl: 'carrot.png' },
  { id: 4, name: 'Potatoes', description: 'Fresh corn on the cob', price: 50, stock: 200, unit: 'Kg', status: 'Available', imageUrl: 'potato.png' },
];

const categories = [
  { name: 'Vegetables', count: 12 },
  { name: 'Fruits', count: 36 },
  { name: 'Grains', count: 48 },
];

const recentBuyers = [
  { name: 'Shreedatta Market', time: '2 mins ago' },
  { name: 'Vishnu Grocery', time: '5 hours ago' },
];

const recentOrders = [
  { store: 'Dharwad Grocery Store', details: 'Ordered 50Kg Organic Tomatoes', amount: '750.00', status: 'Processing' },
  { store: 'Fresh Market', details: 'Ordered 30Kg Carrots', amount: '1800.00', status: 'Delivered' },
];

// --- Search Modal Component (Placeholder for Popup) ---
const SearchModal = ({ isOpen, onClose, query }) => {
  if (!isOpen) return null;

  // Placeholder logic for search results
  const filteredResults = initialProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-content" onClick={e => e.stopPropagation()}>
        <h4>Search Results for "{query}"</h4>
        {query.length < 2 ? (
            <p className="no-results">Type at least 2 characters to search.</p>
        ) : filteredResults.length > 0 ? (
          <ul>
            {filteredResults.map(p => (
              <li key={p.id} className="search-result-item">
                {p.name} - ₹{p.price}/{p.unit}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">No products found matching your query.</p>
        )}
      </div>
    </div>
  );
};


// --- MAIN DASHBOARD COMPONENT ---
function FarmerDashboard() {
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState('My Product Listings');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const navigate = useNavigate();

  // --- Handlers and Navigation ---
  const handleLogout = () => {
    // Perform cleanup, clear tokens, etc.
    console.log('User logged out.');
    navigate('/login');
  };

  const handleAddProduct = () => {
    navigate('/farmer/add-product'); // Navigate to a product creation page
  };
  
  // Validation/Control for Search Popup
  useEffect(() => {
    // Open modal if query is present and long enough
    if (searchQuery.length > 1) {
      setIsSearchModalOpen(true);
    } else {
      setIsSearchModalOpen(false);
    }
  }, [searchQuery]);

  return (
    <div className="dashboard-container">
      {/* --- HEADER --- */}
      <header className="dashboard-header">
        <h1 className="header-logo">SmartMandi</h1>
        <nav className="header-nav">
          <a href="#" className="nav-link">Marketplace</a>
          <a href="#" className="nav-link">Orders</a>
          <a href="#" className="nav-link">Analytics</a>
          <a href="#" className="nav-link">Support</a>
        </nav>
        
        <div className="header-actions">
          {/* Search Box */}
          <div className="search-box-container">
            <FontAwesomeIcon icon={faSearch}/>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          
          {/* User Avatar */}
          <div className="user-profile">
            <span className="user-initials">SN</span>
            <span className="user-name">Sanket Hiremath</span>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="dashboard-main">
        
        {/* --- LEFT SIDEBAR --- */}
        <aside className="dashboard-sidebar">
          
          {/* Active Listings / Pending Orders */}
          <div className="metric-cards">
            <div className="metric-card active">
              <span className="metric-label">Active Listings</span>
              <span className="metric-value">24</span>
            </div>
            <div className="metric-card pending">
              <span className="metric-label">Pending Orders</span>
              <span className="metric-value">8</span>
            </div>
          </div>

          {/* Categories */}
          <div className="sidebar-section categories-section">
            <h4>Categories</h4>
            {categories.map((cat, index) => (
              <div key={index} className="category-item">
                <p>{cat.name} ({cat.count})</p>
              </div>
            ))}
          </div>

          {/* Recent Buyers */}
          <div className="sidebar-section recent-buyers-section">
            <h4>Recent Buyers</h4>
            {recentBuyers.map((buyer, index) => (
              <div key={index} className="buyer-item">
                <p className="buyer-name">{buyer.name}</p>
                <span className="buyer-time">{buyer.time}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* --- PRODUCT & ORDER AREA --- */}
        <section className="dashboard-content">
          
          {/* My Product Listings Header */}
          <div className="content-header">
            <h2>{activeTab}</h2>
            <button onClick={handleAddProduct} className="add-product-button">
              + Add New Product
            </button>
          </div>

          {/* Product Listing Grid */}
          <div className="product-listings-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Recent Orders Section */}
          <h2 className="orders-header">Recent Orders</h2>
          <div className="recent-orders-list">
            {recentOrders.map((order, index) => (
              <div key={index} className="order-item">
                <div className="order-details">
                  <p className="order-store">{order.store}</p>
                  <p className="order-description">{order.details}</p>
                </div>
                <div className="order-status-group">
                  <span className="order-amount">₹{order.amount}</span>
                  <span className={`order-status status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      {/* Search Popup Window (Modal) */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
        query={searchQuery} 
      />
    </div>
  );
}

export default FarmerDashboard;