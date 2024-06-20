import { server } from "../stores";
import axios from 'axios'

export const updateprofile = (name,email)=> async (dispatch) => {
    
    console.log(name,email)
    try{
        dispatch({type: "updateProfileRequest"});

        const {data} = await axios.put(`${server}/updateProfile`,{name,email},{
            headers:{
                'Content-type' : 'application/json',
            },
            withCredentials: true,

        })
        dispatch({type: "updateProfileSuccess", payload: data.message});
    } catch(error) {
        dispatch({type: "updateProfileFail",payload: error.response.data.message});
    }
}

export const changepassword = (oldPassword,newPassword)=> async (dispatch) => {
    
    try{
        dispatch({type: "changePasswordRequest"});
        const {data} = await axios.put(`${server}/changepassword`,{oldPassword,newPassword},{
            headers:{
                'Content-type' : 'application/json',
            },
            withCredentials: true,

        })
        dispatch({type: "changePasswordSuccess", payload: data.message});
    } catch(error) {
        dispatch({type: "changePasswordFail",payload: error.response.data.mesage});
    }
}

export const updateprofilepicture = (formadata)=> async (dispatch) => {
    try{
        dispatch({type: "updateProfilePictureRequest"});

        const {data} = await axios.put(`${server}/updateProfilePicture`,formadata,{
            headers:{
                'Content-type' : 'multipart/form-data',
            },
            withCredentials: true,

        })
        dispatch({type: "updateProfilePictureSuccess", payload: data.message});
    } catch(error) {
        dispatch({type: "updateProfilePictureFail",payload: error.response.data.message});
    }
}

export const forgetpassword = (email)=> async (dispatch) => {
    
    try{
        dispatch({type: "forgetPasswordRequest"});
        const config = {
            headers:{
                'Content-type' : 'application/json',
            },
            withCredentials: true,

        }
        const {data} = await axios.post(`${server}/forgetpassword`,{email},
        config)
        dispatch({type: "forgetPasswordSuccess", payload: data.message});
    } catch(error) {
        dispatch({type: "forgetPasswordFail",payload: error.response.data.mesage});
    }
}

export const resetpassword = (token, password)=> async (dispatch) => {
    
    try{
        dispatch({type: "resetPasswordRequest"});
        const {data} = await axios.put(`${server}/resetpassword/${token}`,{token, password},{
            headers:{
                'Content-type' : 'application/json',
            },
            withCredentials: true,

        })
        dispatch({type: "resetPasswordSuccess", payload: data.message});
    } catch(error) {
        dispatch({type: "resetPasswordFail",payload: error.response.data.mesage});
    }
}