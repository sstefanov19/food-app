import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./Modal";
import { formatedPrice } from "../format";
import Button from "./Button";
import Error from "./Error";
import Input from "./Input";
import userProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  const userCtx = useContext(userProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  function handleClose() {
    userCtx.hideCheckout();
  }

  function handleFinish() {
    userCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const orderData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: orderData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        Cancel
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span className="center">Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={userCtx.progress === "checkout"} onClose={handleClose}>
        <h2>Sucess!</h2>
        <p>Your order was submitted succesfully</p>
        <p>We will send you an email in minites</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
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
        {error && <Error title="Failed to send order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
