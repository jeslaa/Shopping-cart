// import { useState } from "react"
import useCart from "../hooks/useCart"
import '../styles/navbar.scss'
import { useNavigate } from "react-router-dom"

const Header = ()  => {
    const navigate = useNavigate();

    //Getting cart data
    const { allItems, totalPrice } = useCart()

    const handleToggleCart = () =>{
        navigate('/cart')
    }
    
    const handleToggleBack = () =>{
        navigate('/')
    }

    const content = (
        <header className="header">
            <h1 className="title">Shop</h1>
            <div className="header-title">
                <div className="header-price">
                    <p className="total-items">Total Items: {allItems} </p>
                    <p className="total-price">Total Price: {totalPrice} </p>
                </div>
                <button className="" onClick={handleToggleCart}>To cart</button>
                <br /> <br />
                <button className="" onClick={handleToggleBack}>Go back</button>
            </div>
        </header>
    )
  return content //Returning content for header
}

export default Header