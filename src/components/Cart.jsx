import { useContext } from "react"
import Modal from "./Modal"
import CartContext from "../store/CartContext"
import { formatedPrice } from "../format";
import Button from "./Button";
import userProgressContext from "../store/UserProgressContext";
export default function Cart() {
    
   const cartCtx = useContext(CartContext);

   const userProgressCtx = useContext(userProgressContext);

   const cartTotal = cartCtx.items.reduce((totalPrice , item) => {
        return totalPrice + item.price * item.quantity;
   }, 0)

   function handleCloseCart() {
       userProgressCtx.hideCart();
   }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}> 
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.quantity}</p>
                    </li>
                ))}
            </ul>
            <p className="cart-total">{formatedPrice.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button>Order</Button>
            </p>
        </Modal>
    )
}