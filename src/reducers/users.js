import { FETCH_U_ALL, DELETE_USER, BLOCK_USER } from '../constants/actionTypes';

export default (users = [], action) => {
    switch (action.type){

        case FETCH_U_ALL:  
            return action.payload;

        case DELETE_USER : 
            return users.filter((user)=> user._id !== action.payload)

        case BLOCK_USER: 
            return users.map((user)=> user._id === action.payload.id ? action.payload : user)
        // case BLOCK :
        
        default :
            return users
    }
}