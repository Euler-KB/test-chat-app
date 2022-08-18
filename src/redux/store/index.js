import { createStore } from 'redux';
import combinedState from "../reducers";
export default createStore(combinedState);