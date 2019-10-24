import { createStore } from 'redux';
import Reducer from './reducers/reducer';

const Store = createStore(Reducer);
export default Store;
