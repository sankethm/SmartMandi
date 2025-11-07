import React from 'react';
import "./ProductCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt,faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
// Destructuring props for a single product display
import tomato from "../assets/tomato.jpg"
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { 
    id, 
    name, 
    description, 
    price, 
    stock, 
    unit, 
    status, 
    imageUrl 
  } = product;

  // Function to determine stock status class
  const getStockClass = () => {
    if (stock <= 10) return 'stock-low';
    if (status === 'Available') return 'stock-available';
    return '';
  };
  
  // Function for edit/delete actions (placeholders)
  const handleEdit = () => {
    navigate(`/farmer/edit-product/${product.id}`);
  }
  const handleDelete = () => console.log(`Deleting product ${id}`);

  return (
    <div className="product-card">
      {/* Product Image */}
      <img src={tomato} alt={name} className="product-image" />
      
      {/* Stock Status Badge */}
      <span className={`status-badge ${getStockClass()}`}>
        {stock <= 10 ? 'Low Stock' : status}
      </span>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        
        <div className="product-details-row">
          {/* Price */}
          <span className="product-price">
            ₹ {price} /{unit}
          </span>
          {/* Stock */}
          <span className="product-stock">
            Stock: {stock} {unit}
          </span>
        </div>
        
        {/* Actions */}
        <div className="product-actions">
          <button onClick={handleEdit} className="action-button">
            <FontAwesomeIcon icon={faPencilAlt}/>
          </button>
          <button onClick={handleDelete} className="action-button">
            <FontAwesomeIcon icon={faTrashAlt}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
