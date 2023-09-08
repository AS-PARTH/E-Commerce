import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import "./Cart.scss";
import { useContext } from "react";
import { Context } from "../../utils/context";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = ({ setShowCart }) => {
  const { cartItem, CartSubTotal } = useContext(Context);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

  const handlePayment = async () => {
    try {
      if (isAuthenticated) {
        const stripe = await stripePromise;
        const res = await makePaymentRequest.post("/api/orders", {
          products: cartItem,
        });
        await stripe.redirectToCheckout({
          sessionId: res.data.stripeSession.id,
        });
      } else {
        // User is not authenticated, display a message and prompt them to log in.
        alert("Please log in to proceed with the checkout.");
        loginWithRedirect();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="header">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>
        {!cartItem?.length && (
          <div className="empty-cart">
            <BsCartX />
            <span> No Products in the cart.</span>
            <button className="return-cta">RETURN TO THE SHOP</button>
          </div>
        )}

        {!!cartItem?.length && (
          <>
            <CartItem />

            <div className="cart-footer">
              <div className="sub-total">
                <span className="text">Subtotal</span>
                <span className="text total"> &#x20b9; {CartSubTotal}</span>
              </div>
              <div className="button">
                <button className="checkout-cta" onClick={handlePayment}>
                  {isAuthenticated ? "Checkout" : "Log in to Checkout"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
