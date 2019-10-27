import axios from 'axios';
import store from '../store/store';
import * as actions from '../actions/userChannelActions';
import apiConst from '../constants/apiConst';
import testData from '../../../test/storeData';


export function getUserChannelById(id) {
	// return axios.get(`${apiConst.userChannelApi/id}`)
	// 	.then(response => {
	// 	store.dispatch(actions.setCurrentUserChannel(response.data));
	// 	return response;
	// 	});

	debugger;
	store.dispatch(actions.setCurrentUserChannel(testData.currentUserChannel));
}
