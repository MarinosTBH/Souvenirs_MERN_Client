import { FETCH_ALL, CREATE, UPDATE, LIKE, DELETE } from "../constants/actionTypes"
import * as api from '../api'; // import everything from actions as api

//FETCH_ALL
export const getPosts = () => async (dispatch) => {        //Redux Thunk is a function inside a function :: alows us to specify an additional func
    
    try {
        const { data } = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload: data});

    } catch (error) {
        console.log(error)
    }
}

//CREATE
export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

//UPDATE
export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

//UPDATE Like
export const likePost = (id) => async (dispatch ) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likePost(id, user?.token);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

//DELETE
export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error)
    }
}



// Action creators are functions that return an action

