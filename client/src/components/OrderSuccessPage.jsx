
import {   Link} from 'react-router-dom';

import '../components/sucess.css';


const OrderSuccessPage = () => {

  return (
    <div className="order-success-container">
      <div className="order-success-content">
        <h1>Order Successful!</h1>
        
          <>
            <p>Thank you for your order. Your order has been successfully placed.</p>
            <p>Your order will be shipped to the provided address. </p>
           
            <Link to="/" className="continue-shopping-link">Continue Shopping</Link>
          </>
     
      </div>
    </div>
  );
};

export default OrderSuccessPage;
