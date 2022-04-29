import axios from "axios"

async function handleLogin({ email, password }){
    
    const response = await axios.post(`/api/users/login`, {
        email,
        password
    });

    (response.data.token) ? sessionStorage.setItem('user-token', response.data.token) : console.error("token doesnt exist")
    console.log("handle login");
}

export default handleLogin