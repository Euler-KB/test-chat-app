import { Box , Button , TextField  } from "@mui/material";
import { useState } from "react";

const ChatInput = ({ onSend , inputProps , clearOnSend = true }) => {

    const [message,setMessage] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSend(message);
        if(clearOnSend)
            setMessage("");
    }

    return <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" , flexDirection: "row" }}>
        <TextField
            type="text"
            variant="standard"
            value={message}
            fullWidth
            style={{ marginLeft: 5, marginRight: 5 }}
            onChange={evt => setMessage(evt.target.value)}
            {...inputProps}
        />
        <Button variant="contained" type="submit">Send</Button>
    </Box>
};

export default ChatInput;