import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// --- THIRD-PARTY RATING LIBRARY ---
import ReactStars from 'react-rating-stars-component';
// --- FONT AWESOME IMPORTS (Used for navigation/metrics icons) ---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faExclamationTriangle, faTruck, faCheckCircle, faShoppingBasket, faTachometerAlt, faLeaf, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "./VendorOrders.css"
// --- MOCK DATA ---
const mockOrders = [
    { id: '#1237', date: 'Oct 21, 2025', total: 88000, supplier: 'Sannet', status: 'Accepted by Farmer', payment: 'Payment Required', rating: 0 },
    { id: '#1236', date: 'Oct 18, 2025', total: 43200, supplier: 'Vishav', status: 'In Transit', payment: 'Paid', rating: 0 },
    { id: '#1235', date: 'Oct 15, 2025', total: 28900, supplier: 'Shreedatta', status: 'Delivered', payment: 'Paid', rating: 4 },
    { id: '#1238', date: 'Oct 21, 2025', total: 150000, supplier: 'Xyz', status: 'Awaiting Acceptance', payment: 'Pending', rating: 0 },
    { id: '#1239', date: 'Oct 20, 2025', total: 9000, supplier: 'Test', status: 'Rejected by Farmer', payment: 'Cancelled', rating: 0 },
];

const mockMetrics = {
    paymentsDue: 2,
    ordersInTransit: 4,
    totalDelivered: 18,
};

// --- Sub-Component: Status/Payment Badges ---
const StatusBadge = ({ text }) => {
    const statusToClass = (t) => {
        t = t.toLowerCase().replace(/ /g, '-');
        if (t.includes('required')) return 'status-payment-due';
        if (t.includes('accepted')) return 'status-accepted';
        if (t.includes('delivered')) return 'status-delivered';
        if (t.includes('rejected')) return 'status-rejected';
        if (t.includes('in-transit')) return 'status-intransit';
        if (t.includes('pending')) return 'status-pending';
        if (t.includes('paid')) return 'status-paid';
        return 'status-default';
    };
    return <span className={`status-badge-table ${statusToClass(text)}`}>{text}</span>;
};

// --- Sub-Component: Star Rating (Using ReactStars) ---
const StarRating = ({ rating, orderId, onRate }) => {
    const isRated = rating > 0;

    const ratingChanged = (newRating) => {
        // Only allow rating if it hasn't been rated yet (rating === 0)
        if (!isRated) {
            onRate(orderId, newRating);
        }
    };

    return (
        <div className="star-rating-wrapper">
            <ReactStars
                count={5}
                size={20}
                value={rating} // Displays the current rating
                edit={!isRated} // Critical: Disable editing if already rated
                isHalf={false} 
                activeColor="#FFC107" 
                color="#ccc" 
                onChange={ratingChanged}
            />
        </div>
    );
};

// --- Sub-Component: Filter Modal ---
const FilterByDateModal = ({ isOpen, onClose, onApply }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const handleApply = () => {
        onApply(startDate, endDate);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="filter-modal-backdrop" onClick={onClose}>
            <div className="filter-modal-content" onClick={e => e.stopPropagation()}>
                <h3>Filter Orders by Date</h3>
                <div className="filter-date-group">
                    <label>Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="filter-date-group">
                    <label>End Date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <button onClick={handleApply} className="modal-apply-button">Apply Filter</button>
                <button onClick={onClose} className="modal-close-button">Close</button>
            </div>
        </div>
    );
};

// --- MAIN MY ORDERS COMPONENT ---
function VendorOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState(mockOrders);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [totalOrders] = useState(24);

    // --- Handlers ---
    const handleRateOrder = (orderId, rating) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, rating: rating } : order
        ));
        console.log(`Order ${orderId} rated ${rating} stars!`);
        alert(`Order ${orderId} rated ${rating} stars!`);
    };

    const handleFilterApply = (startDate, endDate) => {
        console.log(`Filtering orders from ${startDate} to ${endDate}. (API call needed here)`);
        alert(`Filters Applied! Showing orders placed between ${startDate} and ${endDate}.`);
    };
    
    const handlePayNow = (orderId) => {
        console.log(`Initiating payment for order ${orderId}`);
        alert(`Redirecting to payment gateway for Order ${orderId}...`);
    };
    
    const handleLogout = () => {
        navigate('/login');
    };
    

    // --- Render ---
    return (
        <div className="my-orders-container">
            {/* --- SIDEBAR --- */}
            <aside className="sidebar-nav">
                <h1 className="sidebar-logo">SmartMandi</h1>
                <p className="vendor-portal-text">Vendor Portal</p>
                <nav className="nav-menu">
                    <a href="/vendor/dashboard" className="nav-item">
                        <FontAwesomeIcon icon={faTachometerAlt} style={{marginRight: '10px'}} /> Dashboard
                    </a>
                    <a href="/vendor/browseProducts" className="nav-item">
                        <FontAwesomeIcon icon={faLeaf} style={{marginRight: '10px'}} /> Browse Products
                    </a>
                    <a href="/vendor/orders" className="nav-item active">
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
            <main className="orders-main-content">
                <header className="orders-header">
                    <h2>My Purchase Orders</h2>
                    <p className="orders-subtitle">
                        Track the status, payment, and delivery of all orders placed with SmartMandi farmers.
                    </p>
                    <button onClick={() => setIsFilterModalOpen(true)} className="filter-button">
                        <FontAwesomeIcon icon={faFilter} style={{marginRight: '5px'}} /> Filter by Date
                    </button>
                </header>

                {/* --- METRICS ROW --- */}
                <section className="metrics-row-orders">
                    <div className="metric-card-order due">
                        <span className="metric-value">{mockMetrics.paymentsDue}</span>
                        <p className="metric-label">**Payments Due** (Immediate Action)</p>
                        <FontAwesomeIcon icon={faExclamationTriangle} className="metric-icon-small" />
                    </div>
                    <div className="metric-card-order transit">
                        <span className="metric-value">{mockMetrics.ordersInTransit}</span>
                        <p className="metric-label">Orders in Transit</p>
                        <FontAwesomeIcon icon={faTruck} className="metric-icon-small" />
                    </div>
                    <div className="metric-card-order delivered">
                        <span className="metric-value">{mockMetrics.totalDelivered}</span>
                        <p className="metric-label">Total Delivered Orders</p>
                        <FontAwesomeIcon icon={faCheckCircle} className="metric-icon-small" />
                    </div>
                </section>

                {/* --- ORDERS TABLE --- */}
                <section className="orders-table-section">
                    <h3>All Purchase Orders ({totalOrders} Total)</h3>
                    
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date Placed</th>
                                    <th>Total Amount</th>
                                    <th>Supplier</th>
                                    <th>Order Status</th>
                                    <th>Payment Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.date}</td>
                                        <td>₹ {order.total.toLocaleString('en-IN')}</td>
                                        <td>{order.supplier}</td>
                                        <td><StatusBadge text={order.status} /></td>
                                        <td><StatusBadge text={order.payment} /></td>
                                        <td>
                                            {/* --- CONDITIONAL ACTION LOGIC --- */}
                                            
                                            {/* 1. If payment is due, show Pay Now button. */}
                                            {order.payment === 'Payment Required' && (
                                                <button onClick={() => handlePayNow(order.id)} className="action-pay-button">Pay Now</button>
                                            )}
                                            
                                            {/* 2. If delivered, show the Star Rating component. */}
                                            {order.status === 'Delivered' && (
                                                <StarRating rating={order.rating} orderId={order.id} onRate={handleRateOrder} />
                                            )}
                                            
                                            {/* 3. Otherwise, the cell remains intentionally empty. */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="table-footer">
                        Showing 1 to {orders.length} of {totalOrders} Purchase Orders.
                    </p>
                </section>
            </main>
            
            {/* Filter Modal */}
            <FilterByDateModal 
                isOpen={isFilterModalOpen} 
                onClose={() => setIsFilterModalOpen(false)} 
                onApply={handleFilterApply}
            />
        </div>
    );
}

export default VendorOrders;