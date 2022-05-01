import { useContext, useEffect, useRef } from "react"

import DialogContext from "../util/contextsStore"
import '../stylesheets/ProductDialog.css'
import { useState } from "react"
import axios from "axios"

export default ( { setContextValue } ) => {
	
	const { productId, productName, productPrice, productStock, productRating, active } = useContext( DialogContext )
	const [ rating, setRating ]  = useState({ value: productRating, initial: true});
	const dialogRef = useRef()

	useEffect( () => {
		console.log("INside effect", active)
			if (active === true)
				dialogRef.current.showModal()
			else 
				dialogRef.current.close()
		}
		, [ active ]
	)

	
	useEffect( () => {
		(async () => {
			if (!rating.initial){
				if (rating.value)
					await axios.patch(`/api/rate`, {
							rating: rating.value,
							product_id: productId
						}, 
						{
							headers:{
								authorization: sessionStorage.getItem('user-token')
							}
						}
					)
				else
					await axios.delete(`/api/rate`, {
							product_id: productId
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

	console.log(dialogRef.current);

	return (
		<dialog ref={dialogRef}>
			<div className='product-dialog'>

			<img className="close-dialog-button" src="/graphics/cross-icon.svg" onClick={ e => setContextValue({
				productName: "",
				productPrice: "",
				productImage: "",
				productSeller: "",
				active: false
			}) }/>
			<div className="product-dialog-details" ref={dialogRef}>
				<span className="product-dialog-name">{ "Name : "+productName }</span>
				<span className="product-dialog-price">{ "Rs."+productPrice }</span>
				<span className="product-stock">{ "Stock : "+productStock }</span>
				<select name="Rating" className="rating-dropdown" value={productRating} onChange={e => setRating({value: e.target.value, initial: false})}>
					<option value="null"></option>
					<option value="5">5</option>
					<option value="4">4</option>
					<option value="3">3</option>
					<option value="2">2</option>
					<option value="1">1</option>
				</select>
			</div>
		</div>
		</dialog>
	)
}