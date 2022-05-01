import {useEffect, useState} from "react";

import axios from 'axios'
import Product from '../../components/Product';
import DialogContext from '../../util/contextsStore'
import ProductDialog from "../../components/ProductDialog";

import './ProductList.css'

export default () => {

	const [ productArray, setProductArray] = useState([])
	const [contextValue, setContextValue] = useState({
		productName: "",
		productPrice: "",
		productDescription: "",
		location: "",
		active: false
	});

	useEffect( () => {
		 (async () => {
				try {
					const allProducts = await axios.get(`api/products`, {
						headers: {
							authorization: sessionStorage.getItem('user-token')
						}
					})

					let tempProduct = []
					for (let i = 0; i < allProducts.data.products.length; i++){
						tempProduct.push(<Product key={allProducts.data.products[i].product_id} id={allProducts.data.products[i].product_id} productName={allProducts.data.products[i].name} productPrice={allProducts.data.products[i].price} setContextValue={setContextValue} productRating={allProducts.data.products[i].rating}/>)
					}
					setProductArray(tempProduct)
				}
				catch (err){
					if (err) console.error(err)
				}
			}
		)()
		console.log("product list")
	},[])

	console.log("ProductList render");
	return (
		<div id="product-list">
			{ productArray }
			<DialogContext.Provider value={ contextValue }>
				<ProductDialog  setContextValue={ setContextValue }/>
			</DialogContext.Provider>
		</div>
	);
}