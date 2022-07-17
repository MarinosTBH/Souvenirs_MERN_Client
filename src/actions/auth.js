import { AUTH, FETCH_ALL } from "../constants/actionTypes"
import * as api from '../api/'; // import everything from actions as api

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data }) ;

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}
export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data }) ;

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const googlesignin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.googleSignIn(formData);

        dispatch({ type: AUTH, data }) ;

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}


//redux workflow :
    //first we get the actual form which is a component in the auth
    //we dispatch an action which is called singIn : we give form data and navigate
    //the action makes call to api at { data }