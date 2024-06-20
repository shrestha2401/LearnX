import { server } from "../stores";
import axios from 'axios'

export const login = (email,password) => async(dispatch)=>{
    
    
    try{

        dispatch({type: "loginRequest"});

        const {data} = await axios.post(`${server}/login`,{email, password},
        {
            headers:{
                'Content-type' : 'application/json',
            },
            withCredentials: true,

        })
        dispatch({type: 'loginSuccess', payload: data})
    }catch(error) {
        
        dispatch({ type: 'loginFail', payload: error.response.data.mesage})
    }
}

export const loadUser = () => async(dispatch)=>{
    
    
    try{

        dispatch({type: "loadUserRequest"});

        const {data} = await axios.get(`${server}/me`,
        {
            withCredentials: true,

        })
        dispatch({type: 'loadUserSuccess', payload: data.user})
    }catch(error) {
        console.log("error Encontered")
        console.log(error.response.data)
        dispatch({ type: 'loadUserFail', payload: error.response.data.mesage})
    }
}

export const logout = () => async(dispatch)=>{
    
    
    try{

        dispatch({type: "logoutRequest"});
        
        const {data} = await axios.get(`${server}/logout`,
        {
            withCredentials: true,

        })
        dispatch({type: 'logoutSuccess', payload: data.message})
    }catch(error) {
        dispatch({ type: 'logoutFail', payload: error.response.data.mesage})
    }
}

export const register = (formdata) => async(dispatch)=>{
    
    
    try{

        dispatch({type: "registerRequest"});

        const {data} = await axios.post(`${server}/register`,formdata,
        {
            headers:{
                'Content-type' : 'mulitpart/form-data',
            },
            withCredentials: true,

        })
        dispatch({type: 'registerSuccess', payload: data})
    }catch(error) {
        console.log("error Encontered")
        console.log(error.response.data)
        dispatch({ type: 'registerFail', payload: error.response.data.mesage})
    }
}