import messagesReducer from "./messages";
import {SEND_MESSAGE, UPDATE_MESSAGE} from "../actionTypes";

jest.mock("../../repository",function (){
    return {
        hasItem: jest.fn(),
        getItem: jest.fn(),
        setItem: jest.fn()
    }
});

describe("Messages Reducer", function (){

    let initialState;
    beforeEach(() => {
        initialState = {
            data: [],
            pagination: {
                canLoadMore: false,
                data: [],
                offset: 0
            }
        }
    });

    it("returns initial state", () => {
        expect(messagesReducer(undefined,{ }) ).toEqual(initialState);
    });

    it("should update all messages", () => {

        const messages = [
            {
                id: "messageId1",
                content: "Hello",
            },
            {
                id: "messageId2",
                content: "testing",
            }
        ];

        expect(messagesReducer(initialState,{ type: UPDATE_MESSAGE , payload: { messages } }) ).toEqual({
            data: messages,
            pagination: {
                canLoadMore: false,
                offset: 0,
                data: messages
            }
        });
    });


    it("should handle send message", () => {

        const message = {
            id: "test-id",
            content: "Message",
        };

        expect(messagesReducer(initialState,{ type: SEND_MESSAGE , payload: { message } }) ).toEqual({
            data: [message],
            pagination: {
                canLoadMore: false,
                offset: 1,
                data: [message]
            }
        });

    });


});