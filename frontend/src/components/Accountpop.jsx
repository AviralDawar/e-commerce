import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useState} from "react";
import axios from 'axios';

import '../stylesheets/Auth.css'

export default ({ title, buttonName, redirectPage, redirectText, handleSubmit }) => {
    const [firstName, setFirstName] = useState()
		const [lastName, setLastName] = useState()
		const [age, setAge] = useState()
		const [phoneNumber, setPhoneNumber] = useState()
		const [houseNumber, setHouseNumber] = useState()
		const [street, setStreet] = useState()
		const [city, setCity] = useState()
		const [state, setState] = useState()
    const [country, setCountry] = useState()

    const navigate = useNavigate()
    const location = useLocation()

    const submitHandler= async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/users/signup/pop', {
							email: sessionStorage.getItem('temp-signup'),
							firstName,
							lastName,
							age,
							phoneNumber,
							houseNumber,
							street,
							city,
							state,
							country
						})
						sessionStorage.removeItem('temp-signup')
						navigate('/login')
        }
        catch (err) {
            console.log(err)
        }
    }

	return (
    <form id="container-box" onSubmit={submitHandler}>
      <span id="auth-title">{ title }</span>
      <input placeholder="First Name" onChange={ e => setFirstName(e.target.value) }/>
			<input placeholder="Last Name" onChange={ e => setLastName(e.target.value) }/>
			<input placeholder="Age" onChange={ e => setAge(e.target.value) }/>
			<input placeholder="Phone Number" onChange={ e => setPhoneNumber(e.target.value) }/>
			<input placeholder="House Number" onChange={ e => setHouseNumber(e.target.value) }/>
			<input placeholder="Street" onChange={ e => setStreet(e.target.value) }/>
			<input placeholder="City" onChange={ e => setCity(e.target.value) }/>
			<input placeholder="State" onChange={ e => setState(e.target.value) }/>
			<input placeholder="Country" onChange={ e => setCountry(e.target.value) }/>
      <button id="auth-submission" type="submit">Register</button>
    </form>
  );
}