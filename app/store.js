import configureStore from './configureStore';
import history from './history';

const initialState = {};
const store = configureStore(initialState, history);
const dispatch = store.dispatch;
export { dispatch };
export default store;
