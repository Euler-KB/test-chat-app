import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {ADD_USER} from "../redux/actionTypes";
import { v4 as uuidv4 } from "uuid";

const LoginPage = () => {

    const [name,setName] = useState("");
    const dispatch = useDispatch();
    const handleEnterChatRoom = useCallback(() => {

        const sessionInfo = {
            id: uuidv4(),
            name,
            createdAt: new Date()
        };

        dispatch({ type: ADD_USER , payload: { user: sessionInfo }});

    },[dispatch, name]);

    return  <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'rgba(22,130,213,0.82)' }}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h4">
                Welcome to Chat App
            </Typography>

            <Box component="form" onSubmit={handleEnterChatRoom} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={evt => setName(evt.target.value)}
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Join Chat
                </Button>
            </Box>
        </Box>
    </Container>
};

export default LoginPage;