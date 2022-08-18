import store from '../redux/store';
import {UPDATE_MESSAGE, UPDATE_USERS} from "../redux/actionTypes";
import {useEffect} from "react";

export function getItem(key){
    return JSON.parse( window.localStorage.getItem(key) );
}

export function setItem(key,value){
    window.localStorage.setItem(key,JSON.stringify(value));
}

export function hasItem(key){
    return !!window.localStorage.getItem(key);
}

export function useRepository(){

    useEffect(() => {

        console.log("Subscribing");
        const unlisten = store.subscribe(() => {
            const { messages , users } = store.getState();
            setItem("messages",messages);
            setItem("users",users);
        });

        function handleStorageChanged(evt){
            console.log("Changed: ",evt);
            switch (evt.key){
                case "messages":
                    store.dispatch({ type: UPDATE_MESSAGE , payload: { messages: getItem("messages") } });
                    break;
                case "users":
                    store.dispatch({ type: UPDATE_USERS , payload: { users: getItem("users") } })
                    break;
            }
        }

        window.addEventListener("storage",handleStorageChanged,false);

        return () => {
            console.log("Unsubscribing (:");
            window.removeEventListener("storage",handleStorageChanged);
            unlisten();
        };
    },[]);
}