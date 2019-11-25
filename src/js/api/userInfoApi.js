import axios from 'axios';
// import store from '../store/store';
// import * as actions from '../actions/userInfoActions';
import apiConst from '../constants/apiConst';


export function getUserInfoById(id) {
	return axios.get(`${apiConst.userInfoApi}/${id}`)
		.then(response => {
			debugger;
			//store.dispatch(actions.setCurrentUserInfo(response.data));
			return response.data;
		});
}


