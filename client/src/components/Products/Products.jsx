import Product from './Product/Product'
import "./Products.scss";

const Products = ({ products,innerPage,headingText}) => {
// Check if the 'categories' prop or its 'data' property is not available
   if(!products || !products.data)    {
   // If not available, return 'null' to render nothing or handle loading/error
    return null;
   }
 // If 'categories' and 'categories.data' are available, proceed to rendering
 return (
    <div className="products-container">
        {!innerPage && <div className="sec-heading">{headingText}</div>}
        <div className={`products ${innerPage ? "innerPage" : ""}`}>
            {products?.data?.map((item) => (
                <Product
                    key={item.id}
                    id={item.id}
                    data={item.attributes}
                />
            ))}
        </div>
    </div>
);
};

export default Products;
