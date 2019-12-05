import axios from 'axios';
import store from '../store/store';
import apiConst from '../constants/apiConst';
import { setCurrentUserInfo } from '../actions/userInfoActions';

export function getUserInfoById(id) {
	debugger;
	return axios.get(`${apiConst.userInfoApi}/${id}`)
		.then(response => {
			debugger;
			//store.dispatch(setCurrentUserInfo(response.data));

			return response.data;
		});
}

export function getUserInfoByIdAndSetCurrentUserInfo(id) {
	debugger;
	return axios.get(`${apiConst.userInfoApi}/${id}`)
		.then(response => {
			debugger;
			store.dispatch(setCurrentUserInfo(response.data));

			return response.data;
		});
}


