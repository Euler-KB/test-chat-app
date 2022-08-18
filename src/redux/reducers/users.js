import {ADD_USER, LOGOUT, UPDATE_USERS} from "../actionTypes";
import {getItem, hasItem} from "../../repository";

const getInitialState = () => hasItem("users") ? getItem("users") : [];

function usersReducer(state = getInitialState(),action){
    switch (action.type){
        case UPDATE_USERS:
            return action.payload.users;
        case ADD_USER:
            return [
                ...state,
                action.payload.user
            ];
        case LOGOUT:
            return state.filter(user => action.payload.id !== user.id);
        default:
            return state;
    }
}

export default usersReducer;