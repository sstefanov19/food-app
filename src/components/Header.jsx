import { useContext } from 'react'
import logo from '../assets/logo.jpg'
import Button from './Button'
import CartContext from '../store/CartContext'
export default function Header() {

    const cartCtx = useContext(CartContext)

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems , item) => { 
        return totalNumberOfItems + item.quantity
    } , 0);

    return (
        <header id="main-header">
            <div id='title'>
                <img  src={logo} />
                <h1>React food</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}