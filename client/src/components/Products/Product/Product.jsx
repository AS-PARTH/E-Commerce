import React from "react";
import "./Product.scss";
import {useNavigate} from "react-router-dom";

const Product = ({ id, data }) => {

    const navigate = useNavigate();
    // Check if 'data' is defined and has the expected structure
    if (!data ||                 // Check if 'data' is undefined or falsy
        !data.img ||              // Check if 'data.img' is undefined or falsy
        !data.img.data ||         // Check if 'data.img.data' is undefined or falsy
        !data.img.data[0] ||      // Check if 'data.img.data[0]' is undefined or falsy
        !data.img.data[0].attributes) {  // Check if 'data.img.data[0].attributes' is undefined or falsy
        // If any of the checks fail, return null to indicate incomplete data
        return null; // or loading indicator or error message
    }

    // If all checks pass, safely access the image URL
    const imageUrl = process.env.REACT_APP_DEV_URL + data.img.data[0].attributes.url;

    // Render the product card with the image, name, and price
    return (
        <div className="product-card" onClick={()=> navigate("/product/"+ id) }>
            <div className="thumbnail">
                <img src={imageUrl} alt="/" />
            </div>
            <div className="product-details">
                <span className="name">{data.title}</span>
                <span className="price">&#8377; {data.price}</span>
            </div>
        </div>
    );
};

export default Product;
