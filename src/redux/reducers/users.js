const getInitialstate = () => {
	const isLogin = JSON.parse(localStorage.getItem('spacex_2022'));

	if (isLogin) return { payload: true, isLogin: true, user: {email:isLogin}  };
	return { payload: false, isLogin: false, user: {} };
};
const setLocalStorage = (data) => {
	localStorage.setItem('spacex_2022', JSON.stringify(data));
};
const logout = () => {
	localStorage.removeItem('spacex_2022');
};
const userReducer = (state = getInitialstate(), action) => {
	if (action.type === 'SIGNUP') {
		setLocalStorage(action.data.email);
		return { payload: false, isLogin: true, user: action.data };
	} else if (action.type === 'LOGIN') {
		setLocalStorage(action.data.email);
		return { payload: false, isLogin: true, user: action.data };
	} else if (action.type === 'LOGOUT') {
		logout();
		return { payload: false, user: {}, isLogin: false };
	}

	return state;
};

export default userReducer;
