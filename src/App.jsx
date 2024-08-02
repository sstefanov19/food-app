import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider} from "./store/UserProgressContext";
function App() {
  return (
    <>
      <CartContextProvider>
        <UserProgressContextProvider>
        <Header />
        <Menu />
        <Cart />
        <Checkout />
        </UserProgressContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
