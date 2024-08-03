import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./Modal";
import { formatedPrice } from "../format";
import Button from "./Button";
import Input from "./Input";
import userProgressContext from "../store/UserProgressContext";

export default function Checkout() {
  const cartCtx = useContext(CartContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  const userCtx = useContext(userProgressContext);

  function handleClose() {
    userCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const orderData = Object.fromEntries(fd.entries());

    fetch("http://localhost:3000/orders" , {
      method:"POST",
      headers: {
        'Content-Type' : 'application/json'

      },
      body: JSON.stringify({
        order :{
          items : cartCtx.items,
          customer : orderData
        }
      })
    });  
  }

  return (
    <Modal open={userCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Ammount : {formatedPrice.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
