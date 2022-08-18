import {SEND_MESSAGE, UPDATE_MESSAGE} from "../actionTypes";
import {getItem, hasItem} from "../../repository";

const getInitialState = () => hasItem("messages") ? getItem("messages") : [];

function messagesReducer(state = getInitialState(), action){
    switch (action.type){
        case UPDATE_MESSAGE:
            return action.payload.messages;
        case SEND_MESSAGE:
            return  [
                ...state,
                action.payload.message
            ]
        default:
            return state;
    }
}

export default messagesReducer;