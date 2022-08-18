import './App.css';
import "react-chat-elements/dist/main.css";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "./redux/selectors";
import ChatScreen from "./Pages/ChatScreen";
import LoginPage from "./Pages/LoginPage";

function App() {
  const user = useSelector(selectCurrentUser);
  return <>
    {user ? <ChatScreen/> : <LoginPage/>}
    </>;
}

export default App;
