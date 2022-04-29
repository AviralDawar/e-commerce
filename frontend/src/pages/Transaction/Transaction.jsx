import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import cart from "../../util/cartData";

import NavBar from '../../components/NavBar'
import PayPal from "../../components/PayPal";

import './Transaction.css'

export default () => {
    const navigate = useNavigate()
    const [total, setTotal] = useState()

    useEffect( () => {
        (async () =>{

            let tempTotal = 0

            let productArray = (await axios.get(`/api/cart/`, {
                headers: {
                    authorization: sessionStorage.getItem('user-token')
                }
            })).data.cart
            cart.length = 0
            console.log(productArray)
            
            for (let i = 0; i < productArray.length; i++) {
                console.log("total",total)
                tempTotal += Number(productArray[i].price)
            }

            setTotal(tempTotal)
        })()
        console.log("transaction")
        if (!sessionStorage.getItem('user-token'))
            navigate('/login')
        }
    )
    console.log("Transaction", total);
    return (
        <>
            <NavBar />
            <div id="transaction">
                <div id="fb-root"></div>
                <span className="cart-total">{"Price : $"+total}</span>
                <PayPal total={total}/>
                <div className="fb-share-button" data-href="https://www.mocacleveland.org/exhibitions/lee-mingwei-you-are-not-stranger" data-layout="button" data-size="large"><a
                    target="_blank"
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.mocacleveland.org%2Fexhibitions%2Flee-mingwei-you-are-not-stranger&amp;src=sdkpreparse"
                    className="fb-xfbml-parse-ignore">
                    <svg id="facebook-icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#5D7DAE" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/><path fill="#FFFFFF" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"/></svg>
                         Share</a></div>
            </div>
            </>
    )
}