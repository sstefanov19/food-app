import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  const handlers = {
    ADD_ITEM: () => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const updatedItems = [...state.items];

      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return { ...state, items: updatedItems };
    },

    REMOVE_ITEM: () => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      if (itemIndex === -1) return state;

      const currentItem = state.items[itemIndex];
      const newItems = [...state.items];

      if (currentItem.quantity === 1) {
        newItems.splice(itemIndex, 1);
      } else {
        newItems[itemIndex] = {
          ...currentItem,
          quantity: currentItem.quantity - 1,
        };
      }

      return { ...state, items: newItems };
    },

    CLEAR_CART: () => {
      return { ...state, items: [] };
    }
  };

  const handler = handlers[action.type];
  return handler ? handler() : state;
}


export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
