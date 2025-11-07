import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTachometerAlt, faChartLine, faShoppingBasket, faCog, faSignOutAlt,
    faUser, faMapMarkerAlt, faShippingFast, faCheckCircle, faTimesCircle,
    faExclamationTriangle, faMoneyBillWave, faTruck
} from '@fortawesome/free-solid-svg-icons';
import "./OrderDetails.css"
// --- MOCK DATA ---
const mockOrderDetails = {
    id: '#9013',
    status: 'Awaiting Acceptance',
    product: 'Premium Durum Wheat (FM401)',
    quantity: 50,
    unit: 'Quintals',
    unitPrice: 2200,
    totalAmount: 110000,
    placedDate: 'Oct 25, 2025',
    vendor: 'Wholesale Bakers Ltd (VEN555)',
    vendorContact: 'Vishav Vara | +91 1234567890',
    buyerNotes: 'Required delivery within 7 days. Please contact our logistics manager 24 hours prior to dispatch.',
    shippingAddress: 'IT Dharwad, Karnataka',
    requiredDeliveryDate: 'Oct 27, 2025',
    
    // Financials
    grossSaleValue: 110000,
    smartMandiCommissionRate: 0.02, // 2%
    logisticsFee: 0,
};

function OrderDetails() {
    const navigate = useNavigate();
    // In a real app, you would use useParams to get the ID from the URL:
    // const { orderId } = useParams(); 
    console.log("hi")
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [orderStatus, setOrderStatus] = useState(''); // To track acceptance status

    // --- Financial Calculations ---
    const commissionAmount = order ? order.grossSaleValue * order.smartMandiCommissionRate : 0;
    const netPayable = order ? order.grossSaleValue - commissionAmount - order.logisticsFee : 0;

    // --- Data Fetching (Simulation) ---
    useEffect(() => {
        // Simulate fetching details based on orderId (mockOrderDetails is used here)
        setTimeout(() => {
            setOrder(mockOrderDetails);
            setOrderStatus(mockOrderDetails.status);
            setIsLoading(false);
        }, 500);
    }, []);

    // --- Action Handlers ---
    const handleConfirmAcceptance = () => {
        if (window.confirm(`Confirm acceptance of Order ${order.id}? This action will move the order to Processing.`)) {
            // Placeholder for API Call: PUT /api/orders/9013/accept
            console.log(`Order ${order.id} accepted. Status updated.`);
            setOrderStatus('Accepted');
            alert('Order Accepted! Please prepare for shipment.');
        }
    };

    const handleRejectOrder = () => {
        const reason = prompt(`Enter reason for rejecting Order ${order.id}:`);
        if (reason) {
            // Placeholder for API Call: PUT /api/orders/9013/reject
            console.log(`Order ${order.id} rejected. Reason: ${reason}`);
            setOrderStatus('Rejected');
            alert(`Order Rejected. Vendor notified with reason: ${reason}`);
        }
    };
    
    const handleBack = () => {
        navigate('/farmer/orders'); 
    };

    if (isLoading || !order) {
        return <div className="detail-page-loading">Loading Order Details...</div>;
    }

    // --- Status Bar and Action Rendering ---
    const isAwaitingAcceptance = orderStatus === 'Awaiting Acceptance';
    const isAccepted = orderStatus === 'Accepted';
    const isRejected = orderStatus === 'Rejected';
    
    let statusBannerClass = '';
    let statusBannerMessage = '';

    if (isAwaitingAcceptance) {
        statusBannerClass = 'status-awaiting';
        statusBannerMessage = `Action needed: Confirm acceptance and prepare for shipment.`;
    } else if (isAccepted) {
        statusBannerClass = 'status-accepted';
        statusBannerMessage = `Order Confirmed: Accepted on ${new Date().toLocaleDateString()}. Prepare shipment for pickup.`;
    } else if (isRejected) {
        statusBannerClass = 'status-rejected';
        statusBannerMessage = `Order Rejected.`;
    }

    return (
        <div className="order-detail-page">
            {/* --- SIDEBAR --- */}
            <aside className="sidebar-nav">
                <h1 className="sidebar-logo">SmartMandi</h1>
                <p className="portal-text">Farmer Portal</p>
                <nav className="nav-menu">
                    <a href="/farmer/dashboard" className="nav-item"><FontAwesomeIcon icon={faTachometerAlt} style={{marginRight: '10px'}} /> Dashboard</a>
                    <a href="/farmer/analytics" className="nav-item"><FontAwesomeIcon icon={faChartLine} style={{marginRight: '10px'}} /> Analytics</a>
                    <a href="/farmer/sales-orders" className="nav-item active"><FontAwesomeIcon icon={faShoppingBasket} style={{marginRight: '10px'}} /> Sales Orders</a>
                    <a href="/farmer/settings" className="nav-item"><FontAwesomeIcon icon={faCog} style={{marginRight: '10px'}} /> Settings</a>
                    <a href="#" onClick={() => navigate('/login')} className="nav-item logout-link"><FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: '10px'}} /> Logout</a>
                </nav>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="order-detail-main">
                <header className="detail-header">
                    <h2>Sales Order: {order.id}</h2>
                    <p className="detail-subtitle">{statusBannerMessage}</p>
                    <button onClick={handleBack} className="back-button">
                        &larr; Back to Sales
                    </button>
                </header>
                
                {/* --- ORDER STATUS BANNER --- */}
                <div className={`status-banner ${statusBannerClass}`}>
                    <p className="banner-text">
                        <FontAwesomeIcon icon={faExclamationTriangle} /> 
                        &nbsp; New Order - {isAwaitingAcceptance ? 'Awaiting Acceptance' : orderStatus}
                    </p>
                    <p className="banner-subtext">
                        Placed on {order.placedDate} by {order.vendor}.
                        {isAwaitingAcceptance && (
                            <span className="timer-text"> You have 24 hours to confirm acceptance of this order.</span>
                        )}
                    </p>
                </div>

                {/* --- TWO-COLUMN LAYOUT --- */}
                <section className="order-content-layout">
                    
                    {/* --- LEFT COLUMN: PRODUCTS & DETAILS --- */}
                    <div className="order-info-column">
                        <div className="card-product-list">
                            <h3>Products Sold (1 item)</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product / ID</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{order.product}</td>
                                        <td>{order.quantity} {order.unit}</td>
                                        <td>₹ {order.unitPrice.toLocaleString('en-IN')}</td>
                                        <td>₹ {order.totalAmount.toLocaleString('en-IN')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Buyer Notes */}
                        <div className="card-section">
                            <h3>Buyer Notes</h3>
                            <div className="note-box">{order.buyerNotes}</div>
                        </div>

                        {/* Buyer & Delivery Information */}
                        <div className="card-section buyer-info-section">
                            <h3>Buyer & Delivery Information</h3>
                            
                            {/* Buyer Details */}
                            <div className="info-group">
                                <h4 className="info-title"><FontAwesomeIcon icon={faUser} /> Buyer Details</h4>
                                <p>{order.vendor}</p>
                                <p>Contact Person: {order.vendorContact}</p>
                            </div>

                            {/* Shipping Address */}
                            <div className="info-group">
                                <h4 className="info-title"><FontAwesomeIcon icon={faMapMarkerAlt} /> Shipping Address</h4>
                                <p>{order.shippingAddress}</p>
                                <p className="delivery-date-text">Required Delivery Date: **{order.requiredDeliveryDate}**</p>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: ACTIONS & FINANCIALS --- */}
                    <div className="action-financial-column">
                        
                        {/* Farmer Actions */}
                        <div className="card-action-box">
                            <h3>Farmer Actions</h3>
                            {isAwaitingAcceptance ? (
                                <>
                                    <button onClick={handleConfirmAcceptance} className="action-button confirm">
                                        <FontAwesomeIcon icon={faCheckCircle} /> Confirm Acceptance
                                    </button>
                                    <button onClick={handleRejectOrder} className="action-button reject">
                                        <FontAwesomeIcon icon={faTimesCircle} /> Reject Order
                                    </button>
                                </>
                            ) : (
                                <p className={`action-status-message ${isAccepted ? 'accepted' : 'rejected'}`}>
                                    Order has been **{orderStatus}**.
                                </p>
                            )}
                        </div>

                        {/* Financial Overview */}
                        <div className="card-financial-box">
                            <h3>Financial Overview</h3>
                            <div className="financial-summary">
                                <p>Gross Sale Value:</p>
                                <p>₹ {order.grossSaleValue.toLocaleString('en-IN')}</p>
                                <p>SmartMandi Commission ({order.smartMandiCommissionRate * 100}%):</p>
                                <p className="commission-amount">- ₹ {commissionAmount.toLocaleString('en-IN')}</p>
                                <p>Est. Logistics Fee (Covered by Buyer):</p>
                                <p>₹ {order.logisticsFee.toLocaleString('en-IN')}</p>
                                
                                <div className="net-payable">
                                    <p>Net Payable to Farmer:</p>
                                    <p className="net-amount">₹ {netPayable.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Status & Logistics */}
                        <div className="card-logistics-box">
                            <h3>Status & Logistics</h3>
                            <div className="logistics-group">
                                <h4 className="info-title"><FontAwesomeIcon icon={faMoneyBillWave} /> Payment Status</h4>
                                <span className="payment-status-badge">Awaiting Payment Confirmation</span>
                                <p className="payment-note">Funds secured by SmartMandi Escrow. Payment released upon delivery confirmation.</p>
                            </div>
                            
                            <div className="logistics-group">
                                <h4 className="info-title"><FontAwesomeIcon icon={faTruck} /> Fulfillment Type</h4>
                                <p>SmartMandi Logistics Partner (Partner Delivery)</p>
                                <button className="ready-for-pickup-button">Mark Ready for Pickup</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default OrderDetails;
