import { useContext } from "react";
import {login, register} from '../service/auth.api'
import { AuthContext } from "../context/AuthContext";
export const useAuth = () =>{

    const context = useContext(AuthContext)

    const {user, setUser, loading, setLoading} = context()


    const handleLogin = async (username, password) =>{
        setLoading(true)
        
        const response = await login(username, password)

        setUser(response.user)
        setLoading(false)
    }

    const handleRegister = async (username, email, password) =>{
        setLoading(true)
        const response = await register(username, email,password)

        setUser(response.user)
        setLoading(false)
    }

    return{
        user, loading, handleLogin, handleRegister
        }
    

}