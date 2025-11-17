"use client";
import { useCart } from "@/app/component/CartContext";
import CartItem from "@/app/component/CartItem";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";

const Cart = () => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const cartData = cart.map(item => ({ _id: item.id, quantity: item.quantity }));

      const res = await fetch("/api/user/stripe/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cartData }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong!");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 py-5">
      <div className="container">
        <h1 className="text-center mb-5 display-5">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center fs-4">No items in your cart 😢</p>
        ) : (
          <>
            <div className="table-responsive mb-4">
              <table className="table table-dark table-hover align-middle">
                <thead className="table-secondary text-dark">
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 rounded total-section">
                <div className="total-price d-flex justify-content-center">
                <span><h4>Total: </h4></span>
                <span className="text-warning"><h4><b>৳</b> {totalPrice.toFixed(2)}</h4></span>
              </div>

              <div className="d-flex gap-3 ">
                <button
                  className="btn btn-outline-danger px-3 py-2"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="btn btn-success px-4 py-2"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? "Redirecting..." : "Checkout"}
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



// "use client";
// import { useCart } from "@/app/component/CartContext";
// import CartItem from "@/app/component/CartItem";
// import Link from "next/link";
// import "./Cart.css";

// const Cart = () => {
//   const { cart, clearCart } = useCart();

//   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="cart-container">
//       <br />
//       <br />
//       <br />
//       <h1 className="cart-title">Your Shopping Items</h1>
//       {cart.length === 0 ? (
//         <p className="empty-cart">No Shopping Item Found 😢</p>
//       ) : (
//         <>
//           <div className="cart-table-wrapper">
//             <table className="cart-table">
//               <thead>
//                 <tr>
//                   <th>Image</th>
//                   <th>Product Name</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Subtotal</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cart.map((item) => (
//                   <CartItem key={item.id} item={item} />
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="cart-footer">
//             <div className="total-section">
//               <h2>Total:</h2>
//               <span><b>৳ </b>{totalPrice.toFixed(2)}</span>
//             </div>
//             <div className="cart-buttons">
//               <button className="btn-clear" onClick={clearCart}>Clear Your Cart Item</button>
//               <Link href="/checkout">
//                 <button className="btn-checkout"> Go To Checkout Page</button>
//               </Link>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;
