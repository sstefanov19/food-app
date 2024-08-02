import Cart from "./components/Cart";
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
        </UserProgressContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
