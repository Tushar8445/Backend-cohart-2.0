import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})

export const login = async (username, password) =>{
    try{
        const response = await api.post('/login',{username, password})
        console.log(response) 
    }catch(err){
        console.log(err.response.data.message)
    }
}

export const register = async (username, email, password) => {
    try{
        const response = await api.post('/register',{username, email, password})
        return response.data
    }catch(err){
        return err.response.data
    }
}