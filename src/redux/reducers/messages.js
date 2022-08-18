import { FETCH_MORE_MESSAGES, SEND_MESSAGE, UPDATE_MESSAGE} from "../actionTypes";
import {getItem, hasItem} from "../../repository";
import _ from "lodash";

const PAGE_SIZE = 25;

function paginateMessages(messages, offset) {
    return messages.slice(offset,offset + PAGE_SIZE);
}

function getInitialState(){
    const messages = hasItem("messages") ? getItem("messages") : [];
    return {
        data: sortMessagesByDate(messages),
        pagination: {
            offset: 0,
            canLoadMore: messages.length > 0,
            data: []
        }
    };
}

function messagesReducer(state = getInitialState(), action){
    switch (action.type){
        case FETCH_MORE_MESSAGES:
            const pagedData = paginateMessages(state.data,state.pagination.offset);
            return  {
                ...state,
                pagination: {
                    offset: state.pagination.offset + pagedData.length,
                    data: [...state.pagination.data , ...pagedData]
                }
            };
        case UPDATE_MESSAGE:
            const sortedMessages = sortMessagesByDate(action.payload.messages);
            return {
                data: sortedMessages,
                pagination: {
                    ...state.pagination,
                    data: sortedMessages.slice(0, state.pagination.offset + PAGE_SIZE)
                }
            };
        case SEND_MESSAGE:
            return {
                data: [ ...state.data, action.payload.message],
                pagination: {
                    ...state.pagination,
                    offset: state.pagination.offset + 1,
                    data: [ action.payload.message , ...state.pagination.data ]
                }
            }
        default:
            return state;
    }
}

function sortMessagesByDate(messages){
    return _.orderBy(messages,[x => new Date(x.sentAt)], ["desc"]);
}

function rootReducer(state,action){
    const intermediateState = messagesReducer(state,action);
    return {
        ...intermediateState,
        pagination: {
            ...intermediateState.pagination,
            data: sortMessagesByDate(intermediateState.pagination.data),
            canLoadMore: intermediateState.pagination.data.length <  intermediateState.data.length
        }
    }
}

export default rootReducer;