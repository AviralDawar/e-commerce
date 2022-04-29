import axios from "axios"

async function handleSignup({email, password}){
        
    await axios.post('/api/users/signup',{
        email,
        password
    })
}

export default handleSignup