import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './dashboard/Dashboard';
import { touches } from './redux/action';

const Start = () => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.userReducer);
console.log(data)
	useEffect(() => {
		if (data.isLogin,data.payload) {
			touches.userSearch(data.user, dispatch);
		}
	}, []);
	return (
		<>
			<Dashboard />
		</>
	);
};

export default Start;
