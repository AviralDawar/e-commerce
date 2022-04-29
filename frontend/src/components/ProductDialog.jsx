import { useContext, useEffect, useRef } from "react"

import DialogContext from "../util/contextsStore"
import '../stylesheets/ProductDialog.css'

export default ( { setContextValue } ) => {
	
	const { productName, productPrice, productImage, productSeller, active } = useContext( DialogContext )
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

	console.log(dialogRef.current);

	return (
		<dialog ref={dialogRef}>
			<div className='product-dialog'>
			<img className="product-dialog-button"/>

			<img className="close-dialog-button" src="/graphics/cross-icon.png" onClick={ e => setContextValue({
				productName: "",
				productPrice: "",
				productImage: "",
				productSeller: "",
				active: false
			}) }/>

			<img className="product-dialog-image" src={productImage}/>
			<div className="product-dialog-details" ref={dialogRef}>
				<span className="product-dialog-name">{ productName }</span>
				<span className="product-dialog-price">{ productPrice }</span>
			</div>
			<p className='product-dialog-seller'>
				{productSeller && 	"Sold by: "+productSeller}
			</p>
		</div>
		</dialog>
	)
}