import {configureStore} from "@reduxjs/toolkit"
import { profileReducer, userReducer } from "./reducers/userReducer"
import {courseReducer} from "./reducers/courseReducer"

const store = configureStore({
    reducer:{
        user: userReducer,
        profile: profileReducer,
        courses: courseReducer
    }
})

export default store

export const server = "http://localhost:4000/api/v1"
