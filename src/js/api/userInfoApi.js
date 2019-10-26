import axios from 'axios';
import store from '../store/store';
import * as actions from '../actions/actions';
import apiConst from '../constants/apiConst';
import testData from '../../../test/storeData';


export function getUserInfoById(id) {
	// return axios.get(`${apiConst.userInfoApi/id}`)
	// 	.then(response => {
	// 	store.dispatch(actions.setUserInfo(response.data));
	// 	return response;
	// 	});

	debugger;
	store.dispatch(actions.setUserInfo(testData.userInfo));
}
