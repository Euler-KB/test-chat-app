import {ADD_USER, LOGOUT} from "../actionTypes";

function userReducer(state = null, action){
    switch (action.type){
        case ADD_USER:
            return action.payload.user;
        case LOGOUT:
            return null;
        default:
            return state;
    }
}

export default userReducer;