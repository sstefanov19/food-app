import { useContext } from 'react'
import logo from '../assets/logo.jpg'
import Button from './Button'
import CartContext from '../store/CartContext'
import userProgressContext from '../store/UserProgressContext'
export default function Header() {

    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(userProgressContext)

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems , item) => { 
        return totalNumberOfItems + item.quantity
    } , 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id='title'>
                <img  src={logo} />
                <h1>React food</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}