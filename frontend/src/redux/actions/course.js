import { server } from "../stores";
import axios from 'axios'


export const getAllCourses = (category="",keyword="")=> async (dispatch) => {
    
    console.log("Get all courses")
    try{
        dispatch({type: "allCourseRequest"});

        const {data} = await axios.get(`${server}/courses?keyword=${keyword}&category=${category}`
           )
        dispatch({type: "allCourseSuccess", payload: data.courses});
    } catch(error) {
        dispatch({type: "allCourseFail",payload: error.response.data.message});
    }
}
