import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "./CartSlice";

import "./CartItem.css";
import CheckoutForm from "./CheckoutForm";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckoutClick = () => {
    setShowCheckoutForm(true);
  };

  const handleCheckoutSuccess = () => {
    dispatch(clearCart());
    setShowCheckoutForm(false);
    setCheckoutSuccess(true);
    setTimeout(() => setCheckoutSuccess(false), 5000); // Hide success message after 5 seconds
  };

  const handleCancelCheckout = () => {
    setShowCheckoutForm(false);
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const cost = parseFloat(item.cost.replace("$", "")); // Convert cost to a number
        return total + cost * item.quantity;
      }, 0)
      .toFixed(2); // Round to 2 decimal places
  };

  // Calculate total quantity of items in the cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleContinueShopping = () => {
    console.log("Continue Shopping clicked"); // Debugging
    onContinueShopping();
  };

  // Checkout functionality (to be implemented later)
  const handleCheckoutShopping = () => {
    console.log("Continue Checkout clicked"); // Debugging
    handleCheckoutClick();
  };

  // Increment the quantity of an item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement the quantity of an item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 }),
      );
    } else {
      dispatch(removeItem(item.name)); // Remove the item if quantity is 1
    }
  };

  // Remove an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace("$", "")); // Convert cost to a number
    return (cost * item.quantity).toFixed(2); // Round to 2 decimal places
  };

  return (
    <div className="cart-container">
      {checkoutSuccess && (
        <div className="checkout-success">
          <h3>🎉 Order Placed Successfully!</h3>
          <p>
            Thank you for your purchase. A confirmation email has been sent.
          </p>
        </div>
      )}

      {showCheckoutForm ? (
        <CheckoutForm
          onCheckoutSuccess={handleCheckoutSuccess}
          onCancel={handleCancelCheckout}
        />
      ) : (
        <>
          <h2 style={{ color: "black" }}>
            Total Cart Amount: ${calculateTotalAmount()}
          </h2>
          <div>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div className="cart-item" key={item.name}>
                  <img
                    className="cart-item-image"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-cost">{item.cost}</div>
                    <div className="cart-item-quantity">
                      <button
                        className="cart-item-button cart-item-button-dec"
                        onClick={() => handleDecrement(item)}
                      >
                        -
                      </button>
                      <span className="cart-item-quantity-value">
                        {item.quantity}
                      </span>
                      <button
                        className="cart-item-button cart-item-button-inc"
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      Total: ${calculateTotalCost(item)}
                    </div>
                    <button
                      className="cart-item-delete"
                      onClick={() => handleRemove(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            style={{ marginTop: "20px", color: "black" }}
            className="total_cart_amount"
          ></div>
          <div className="continue_shopping_btn">
            <button
              className="get-started-button"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
            <br />
            <button
              className="get-started-button1"
              onClick={(e) => handleCheckoutShopping(e)}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
