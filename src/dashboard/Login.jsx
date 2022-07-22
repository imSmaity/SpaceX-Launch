import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Container, FormGroup, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { touches } from '../redux/action';

const style = {
	position: 'absolute',
	top: '45%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid gray',
	borderRadius: 3,
	boxShadow: 24,
	p: 4,
};

const Login = ({ props }) => {
	const [loginData, setLoginData] = React.useState({
		email: 'sumanmaity305@gmail.com',
		password: '123',
	});
	const { loginOpen, setLoginOpen, handleClose, setSignupOpen } = props;
	const dispatch = useDispatch();
	const handleChange = (e) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};
	const login = () => {
		touches.userLogin(loginData, dispatch);
		setLoginOpen(false);
	};
	const createAccount = () => {
		setLoginOpen(false);
		setSignupOpen(true);
	};
	return (
		<div>
			<Modal
				open={loginOpen}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Container maxWidth='lg' sx={{ boxShadow: 1, p: 3, borderRadius: 2 }}>
						<FormGroup>
							<TextField
								type='email'
								sx={{ m: 2 }}
								name='email'
								value={loginData.email}
								onChange={handleChange}
								label='E-mail'
								fullWidth
							/>
							<TextField
								type='password'
								sx={{ m: 2 }}
								name='password'
								value={loginData.password}
								onChange={handleChange}
								label='Password'
								fullWidth
							/>
							<Button
								variant='contained'
								sx={{ m: 2 }}
								fullWidth
								onClick={login}>
								Login
							</Button>
							<Button sx={{ m: 2 }} fullWidth onClick={createAccount}>
								Create a New Account
							</Button>
						</FormGroup>
					</Container>
				</Box>
			</Modal>
		</div>
	);
};

export default Login;
