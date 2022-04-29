import React, {useEffect} from 'react';
import { useState } from 'react';

import axios from 'axios';

import '../stylesheets/Product.css'
import cart from '../util/cartData';

export default ({ key, id, productName, productPrice, productSeller, productImage, setContextValue }) => {
	
	const [ buttonAction, setButtonAction] = useState("/graphics/add-button.svg")
	const productData = {
		productName: productName,
		productPrice: productPrice,
		productImage: productImage,
		productSeller: productSeller,
		active: true
	}

	useEffect( () => {
			(cart.includes(id)) ? setButtonAction("/graphics/minus-sign.svg") : setButtonAction("/graphics/add-button.svg")
			console.log(buttonAction)
		}, []
	)
	
	const buttonHandler = async (e) => {
		if (buttonAction === "/graphics/add-button.svg") {
			setButtonAction("/graphics/minus-sign.svg")
			await axios.post(`/api/cart/`, {
				product_id: id
			} , {
				headers:{
					authorization: sessionStorage.getItem('user-token')
				} 
			})
			cart.push(id)
			console.log(cart)
		}
		else {
			await axios.delete(`/api/cart/${id}`, {
				headers:{
					authorization: sessionStorage.getItem('user-token')
				} 
			})
			const index = cart.indexOf(id);
			if (index > -1) {
				cart.splice(index, 1); // 2nd parameter means remove one item only
			}
			setButtonAction(  "/graphics/add-button.svg")
			console.log(cart)
		}
	}

	return(
		<div className="product-card" >
			<img className="product-action-button" onClick={ e => { buttonHandler() } }src={ buttonAction }/>
			<img className="product-image" src={productImage} onClick={ e => setContextValue(productData) } />
			<div className="product-details" onClick={ e => setContextValue(productData) }>
				<span className="product-name">{ productName }</span>
				<span className="product-price">{ productPrice }</span>
			</div>
		</div>
	);
}