import axios from 'axios';
import { local } from '../constants';

const signup = (data) => {
	return { type: 'SIGNUP', data };
};
const login = (data) => {
	return { type: 'LOGIN', data };
};
const logout = () => {
	return { type: 'LOGOUT' };
};

export const touches = {
	userSearch: (user, dispatch) => {
		console.log(user)
		axios
			.post(local.SPACEX_URL + '/auth/find_user', { email: user.email })
			.then((res) => {
				console.log(res.data)
				dispatch(login(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	},
	userSignup: (user, dispatch) => {
		axios
			.post(local.SPACEX_URL + '/auth/signup', user)
			.then((res) => {
				dispatch(signup(res.data));
			})
			.catch((err) => {
				console.log(err);
				alert(err.response.data.msg)
			});
	},
	userLogin: (user, dispatch) => {
		axios
			.post(local.SPACEX_URL + '/auth/signin', user)
			.then((res) => {
				dispatch(login(res.data));
			})
			.catch((err) => {
				console.log(err);
				alert(err.response.data.msg)
			});
	},
	userLogout: (dispatch) => {
		dispatch(logout());
	},
};
