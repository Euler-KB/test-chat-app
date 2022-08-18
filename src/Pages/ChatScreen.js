import AppBar from '@mui/material/AppBar';
import AppIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useRepository} from "../repository";
import ChatMessageList from "../Components/ChatMessageList";
import ChatInput from "../Components/ChatInput";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../redux/selectors";
import { v4 as uuidv4 } from "uuid";
import {LOGOUT, SEND_MESSAGE} from "../redux/actionTypes";
import {Button} from "@mui/material";
import {useEffect, useRef} from "react";

const ChatScreen = () => {

    useRepository();
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const chatContainer = useRef();

    function scrollToBottom(){
        if(chatContainer.current){
            chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
        }
    }

    const handleSendMessage = (text) => {

        const message = {
            id: uuidv4(),
            content: text,
            sender: {
                id: user.id,
                name: user.name
            },
            sentAt: new Date(),
        };

        dispatch({ type: SEND_MESSAGE , payload: { message } });
        scrollToBottom();
    };

    const handleLogout = () => {
        dispatch({ type: LOGOUT , payload: {  user }})
    };

    useEffect(() => {
        scrollToBottom();
    },[]);

    return <>
        <AppBar position="relative">
            <Toolbar>
                <AppIcon sx={{mr: 2}}/>
                <Typography sx={{ flexGrow: 1 }} variant="h6" color="inherit" noWrap>
                    Chat App
                </Typography>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
        <main>
            <Box sx={{ bgcolor: 'background.paper', pt: 2, pb: 6 }}>
                <Container maxWidth="sm">
                    <Box sx={{ display: "flex" , flexDirection: "row-reverse" }}>
                        <Typography variant="subtitle1" component="span" color="#747474">Username: <Typography color="#000" component="span" fontWeight="bold">{user.name}</Typography> </Typography>
                    </Box>
                    <ChatMessageList ref={chatContainer}/>
                    <ChatInput inputProps={{ placeholder: "Enter message to send" }}
                               clearOnSend
                               onSend={handleSendMessage}/>
                </Container>
            </Box>
        </main>
    </>
}

export default ChatScreen;