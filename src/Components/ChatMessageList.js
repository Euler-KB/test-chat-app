import { MessageList } from "react-chat-elements";
import {useSelector} from "react-redux";
import {selectCurrentUser, selectMessages} from "../redux/selectors";
import {Paper} from "@mui/material";
import { forwardRef } from "react";

const ChatMessageList = forwardRef((props,ref) => {

    const messages = useSelector(selectMessages);
    const user = useSelector(selectCurrentUser);

    return <Paper sx={{ height: 380 , mb: 2 , overflow: "auto" , display: "flex" , flexDirection: "column-reverse" }} ref={ref}>
        <MessageList
            lockable={true}
            dataSource={messages.map(message => ({
                position: user.id === message.sender.id ? "right" : "left" ,
                type: "text",
                title: message.sender.name,
                avatar: `https://i.pravatar.cc/150?u=${message.sender.name}`,
                text: message.content,
                date: message.sentAt
            }))}
        />
    </Paper>
});

export default ChatMessageList;