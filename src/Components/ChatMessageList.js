import {MessageBox} from "react-chat-elements";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser, selectMessages} from "../redux/selectors";
import {Paper} from "@mui/material";
import {forwardRef} from "react";
import {Waypoint} from "react-waypoint";
import "./ChatMessageList.css";
import { FETCH_MORE_MESSAGES} from "../redux/actionTypes";

const ChatMessageList = forwardRef((props, ref) => {

    const dispatch = useDispatch();
    const { pagination: { canLoadMore, data: messages } } = useSelector(selectMessages);
    const user = useSelector(selectCurrentUser);

    function onEnter() {
        if (canLoadMore) {
           dispatch({ type: FETCH_MORE_MESSAGES });
        }
    }

    return <Paper sx={{height: 380, mb: 2, overflow: "auto", display: "flex", flexDirection: "column-reverse"}}
                  ref={ref}>
        {messages.map((message, key) => (<MessageBox
            key={key}
            position={user.id === message.sender.id ? "right" : "left"}
            type="text"
            title={message.sender.name}
            avatar={`https://i.pravatar.cc/150?u=${message.sender.name}`}
            text={message.content}
            date={message.sentAt}
            className={"message-box"}
        />))}
        <Waypoint onEnter={onEnter} topOffset="-20%"/>
    </Paper>
});

export default ChatMessageList;