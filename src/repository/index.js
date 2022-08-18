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

        let isUpdating = false;
        const unlisten = store.subscribe(() => {
            if(!isUpdating){
                const { messages , users } = store.getState();
                setItem("messages",messages.data);
                setItem("users",users);
            }

        });

        function handleStorageChanged(evt){
            isUpdating = true;
            switch (evt.key){
                case "messages":
                    store.dispatch({ type: UPDATE_MESSAGE , payload: { messages: getItem("messages") } });
                    break;
                case "users":
                    store.dispatch({ type: UPDATE_USERS , payload: { users: getItem("users") } })
                    break;
            }
            isUpdating = false;
        }

        window.addEventListener("storage",handleStorageChanged,false);

        return () => {
            window.removeEventListener("storage",handleStorageChanged);
            unlisten();
        };
    },[]);
}