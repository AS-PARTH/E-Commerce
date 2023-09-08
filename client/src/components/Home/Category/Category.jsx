import React from "react";
import "./Category.scss";
import { useNavigate } from "react-router-dom";

const Category = ({ categories }) => {

    const navigate = useNavigate();
    // Check if the 'categories' prop or its 'data' property is not available
    if (!categories || !categories.data) {
        // If not available, return 'null' to render nothing or handle loading/error
        return null; // or loading indicator or error message
    }

    // If 'categories' and 'categories.data' are available, proceed to rendering
    return (
        <div className="shop-by-category">
            <div className="categories">
                {/* Loop through each category and display its image */}
                {categories?.data?.map((item) => (
                    // '?' optional chaining 
                     <div key={item.id}
                     className="category"
                     onClick={() => navigate(`/category/${item.id}`)}>
                        <img
                         src={process.env.REACT_APP_DEV_URL + item.attributes.img.data.attributes.url}
                          alt="/" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
