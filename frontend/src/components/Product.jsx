import React, {useEffect} from 'react';
import { useState } from 'react';

import axios from 'axios';

import '../stylesheets/Product.css'
import cart from '../util/cartData';

export default ({ key, id, productName, productPrice, productSeller, productImage, setContextValue, productRating }) => {
	
	const [ buttonAction, setButtonAction] = useState("/graphics/add-button.svg")
	const [ rating, setRating ]  = useState({ value: productRating, initial: true});
	const productData = {
		productName: productName,
		productPrice: productPrice,
		productImage: productImage,
		productSeller: productSeller,
		active: true
	}

	useEffect( () => {
		(async () => {
			if (!rating.initial){
				if (rating.value)
					await axios.patch(`/api/rate`, {
							rating: rating.value,
							product_id: id
						}, 
						{
							headers:{
								authorization: sessionStorage.getItem('user-token')
							}
						}
					)
				else
					await axios.delete(`/api/rate`, {
							product_id: id
						}, 
						{
							headers:{
								authorization: sessionStorage.getItem('user-token')
							}
						}
					)
			}

		})()
	}, [rating])

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
			<select name="Rating" className="rating-dropdown" value={productRating} onChange={e => setRating({value: e.target.value, initial: false})}>
					<option value="null"></option>
					<option value="5">5</option>
					<option value="4">4</option>
					<option value="3">3</option>
					<option value="2">2</option>
					<option value="1">1</option>
				</select>
		</div>
	);
}