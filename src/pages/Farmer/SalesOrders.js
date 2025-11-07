import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTachometerAlt, faChartLine, faShoppingBasket, faCog, faSignOutAlt,
    faBell, faTruck, faDollarSign, faFilter
} from '@fortawesome/free-solid-svg-icons';
import "./SalesOrders.css"

// --- MOCK DATA ---
const mockMetrics = {
    newOrders: 5,
    pendingDelivery: 12,
    paymentsDue: 78500,
};

const mockSalesOrders = [
    { id: '9012', product: 'Organic Tomatoes', quantity: '1,500 kg', vendor: 'Dharwad Market', total: 53500, status: 'Outbound', payment: 'Paid' },
    { id: '9013', product: 'Premium Wheat', quantity: '50 Quintals', vendor: 'Fresh Greens', total: 130000, status: 'New Order', payment: 'Awaiting Payment' },
    { id: '9014', product: 'Fresh Apples', quantity: '5 Tons', vendor: 'Vishesh Market', total: 600000, status: 'In Transit', payment: 'Paid' },
    { id: '9015', product: 'Brown Rice', quantity: '2500 kg', vendor: 'Agro Market', total: 47500, status: 'Processing', payment: 'Paid' },
    { id: '9016', product: 'Grapes', quantity: '100 Boxes', vendor: 'Local Grocer', total: 20000, status: 'Outbound', payment: 'Awaiting Payment' },
];

// --- Sub-Component: Status/Payment Badges ---
const StatusBadge = ({ text }) => {
    const statusToClass = (t) => {
        t = t.toLowerCase().replace(/ /g, '-');
        if (t.includes('new-order')) return 'status-new-action';
        if (t.includes('outbound')) return 'status-outbound';
        if (t.includes('in-transit')) return 'status-intransit';
        if (t.includes('processing')) return 'status-processing';
        if (t.includes('paid')) return 'status-paid';
        if (t.includes('awaiting-payment')) return 'status-payment-due';
        return 'status-default';
    };
    return <span className={`status-badge-table ${statusToClass(text)}`}>{text}</span>;
};

// --- MAIN SALES ORDERS COMPONENT ---
function SalesOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState(mockSalesOrders);
    const [totalSales] = useState(25);

    // --- Handlers ---

    // 🚨 Critical Navigation: Goes to the detail page for Accept/Reject
    const handleViewDetails = (orderId) => {
        // We navigate to a specific detail route, which will load the accept/reject component
        navigate(`/farmer/orders/${orderId}`); 
    };
    
    const handleFilterOrders = () => {
        alert('Opening Date/Status Filter Modal...');
        // Placeholder for a modal similar to the one in MyOrders.js
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="sales-orders-container">
            {/* --- SIDEBAR --- */}
            <aside className="sidebar-nav">
                <h1 className="sidebar-logo">SmartMandi</h1>
                <p className="farmer-portal-text">Farmer Portal</p>
                <nav className="nav-menu">
                    <a href="/farmer/dashboard" className="nav-item">
                        <FontAwesomeIcon icon={faTachometerAlt} style={{marginRight: '10px'}} /> Dashboard
                    </a>
                    <a href="/farmer/analytics" className="nav-item">
                        <FontAwesomeIcon icon={faChartLine} style={{marginRight: '10px'}} /> Analytics
                    </a>
                    <a href="/farmer/orders" className="nav-item active">
                        <FontAwesomeIcon icon={faShoppingBasket} style={{marginRight: '10px'}} /> Sales Orders
                    </a>
                    <a href="/farmer/edit-profile" className="nav-item">
                        <FontAwesomeIcon icon={faCog} style={{marginRight: '10px'}} /> Settings
                    </a>
                    <a href="#" onClick={handleLogout} className="nav-item logout-link">
                        <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: '10px'}} /> Logout
                    </a>
                </nav>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="sales-orders-main-content">
                <header className="orders-header">
                    <h2>Sales Orders</h2>
                    <p className="orders-subtitle">
                        Track all incoming and completed purchase orders from vendors.
                    </p>
                    <button onClick={handleFilterOrders} className="filter-button">
                        <FontAwesomeIcon icon={faFilter} style={{marginRight: '5px'}} /> Filter Orders
                    </button>
                </header>

                {/* --- METRICS ROW --- */}
                <section className="metrics-row-sales">
                    <div className="metric-card-sale action-needed">
                        <span className="metric-value">{mockMetrics.newOrders}</span>
                        <p className="metric-label">New Orders (Action Needed)</p>
                        <FontAwesomeIcon icon={faBell} className="metric-icon-sale" />
                    </div>
                    <div className="metric-card-sale pending-delivery">
                        <span className="metric-value">{mockMetrics.pendingDelivery}</span>
                        <p className="metric-label">Pending Delivery</p>
                        <FontAwesomeIcon icon={faTruck} className="metric-icon-sale" />
                    </div>
                    <div className="metric-card-sale payments-due">
                        <span className="metric-value">₹ {mockMetrics.paymentsDue.toLocaleString('en-IN')}</span>
                        <p className="metric-label">Payments Due</p>
                        <FontAwesomeIcon icon={faDollarSign} className="metric-icon-sale" />
                    </div>
                </section>

                {/* --- ORDERS TABLE --- */}
                <section className="orders-table-section">
                    <h3>All Sales ({totalSales} Total)</h3>
                    
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product Sold</th>
                                    <th>Quantity</th>
                                    <th>Vendor (Buyer)</th>
                                    <th>Total Amount</th>
                                    <th>Order Status</th>
                                    <th>Payment Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.product}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.vendor}</td>
                                        <td>₹ {order.total.toLocaleString('en-IN')}</td>
                                        <td><StatusBadge text={order.status} /></td>
                                        <td><StatusBadge text={order.payment} /></td>
                                        <td>
                                            <button 
                                                onClick={() => handleViewDetails(order.id)} 
                                                className="action-view-button"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="table-footer">
                        Showing 1 to {orders.length} of {totalSales} Sales Orders.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default SalesOrders;
