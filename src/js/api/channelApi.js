import axios from 'axios';
import store from '../store/store';
import * as actions from '../actions/actions';
import apiConst from '../constants/apiConst';
import testData from '../../../test/storeData';


export function getChannelById(id) {
	// return axios.get(`${apiConst.channelApi/id}`)
	// 	.then(response => {
	// 	store.dispatch(actions.setCurrentChannel(response.data));
	// 	return response;
	// 	});

	debugger;
	store.dispatch(actions.setCurrentChannel(testData.currentChannel));
}
