import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Login from '../dashboard/Login';
import SignUp from '../dashboard/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { touches } from '../redux/action';

export default function Navbar() {
	const [loginOpen, setLoginOpen] = React.useState(false);
	const [signupOpen, setSignupOpen] = React.useState(false);
	const handleOpen = () => setLoginOpen(true);
	const handleClose = () => setLoginOpen(false);
	const handleSignupClose = () => setSignupOpen(false);
	const dispatch = useDispatch();
	const data = useSelector((state) => state.userReducer);

	return (
		<AppBar
			position='fixed'
			sx={{ boxShadow: 2, backgroundColor: 'lightsteelblue' }}>
			<Container maxWidth='xl'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						SpaceX
					</Typography>
					{data.isLogin ? (
						<>
							<Typography component='div'>{data.user.name}</Typography>
							<Button
								color='inherit'
								onClick={() => {
									touches.userLogout(dispatch);
								}}>
								Logout
							</Button>
						</>
					) : (
						<Button color='inherit' onClick={handleOpen}>
							Login
						</Button>
					)}
				</Toolbar>
			</Container>
			<Login props={{ loginOpen, handleClose, setLoginOpen, setSignupOpen }} />
			<SignUp
				props={{ signupOpen, setSignupOpen, handleSignupClose, handleOpen }}
			/>
		</AppBar>
	);
}
