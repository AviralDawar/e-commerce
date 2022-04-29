import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import CartProducts from './CartProducts'
import NavBar from '../../components/NavBar'

import './Cart.css'

export default () => {
	const navigate =useNavigate()
	useEffect(() => {
		if (!sessionStorage.getItem('user-token'))
			navigate('Login')
	})
	return (
		<>
		<NavBar />
			<div id="cart">
				<span id="cart-title">My Cart</span>
				<CartProducts />
			</div>
		</>)
}