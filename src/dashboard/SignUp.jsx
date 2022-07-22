import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Container, FormGroup, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { touches } from '../redux/action';

const style = {
	position: 'absolute',
	top: '52%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid gray',
	borderRadius: 3,
	boxShadow: 24,
	p: 4,
};

const SignUp = ({ props }) => {
	const [signupData, setSignupData] = React.useState({
		name: '',
		email: '',
		password: '',
		repassword: '',
	});
	const { signupOpen, setSignupOpen, handleSignupClose, handleOpen } = props;
	const dispatch = useDispatch();
	const handleChange = (e) => {
		setSignupData({ ...signupData, [e.target.name]: e.target.value });
	};
	const signup = () => {
		if (signupData.password === signupData.repassword) {
			touches.userSignup(
				{
					name: signupData.name,
					email: signupData.email,
					password: signupData.password,
				},
				dispatch
			);
			setSignupOpen(false);
		} else {
			alert('Re-entered password not matching!');
		}
	};
	const alreadyHaveAccount = () => {
		setSignupOpen(false);
		handleOpen(true);
	};
	return (
		<div>
			<Modal
				open={signupOpen}
				onClose={handleSignupClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Container maxWidth='lg' sx={{ boxShadow: 1, p: 3, borderRadius: 2 }}>
						<FormGroup>
							<TextField
								type='email'
								sx={{ m: 1 }}
								name='name'
								onChange={handleChange}
								label='Enter Name'
								fullWidth
							/>
							<TextField
								type='email'
								sx={{ m: 1 }}
								name='email'
								onChange={handleChange}
								label='Enter E-mail'
								fullWidth
							/>
							<TextField
								type='password'
								sx={{ m: 1 }}
								name='password'
								onChange={handleChange}
								label='Enter Password'
								fullWidth
							/>
							<TextField
								type='password'
								sx={{ m: 1 }}
								name='repassword'
								onChange={handleChange}
								label='Re-enter Password'
								fullWidth
							/>
							<Button
								variant='contained'
								sx={{ m: 1, mt: 2 }}
								fullWidth
								onClick={signup}>
								Signup
							</Button>
							<Button
								sx={{ m: 1, mt: 2 }}
								fullWidth
								onClick={alreadyHaveAccount}>
								Already Have an Account
							</Button>
						</FormGroup>
					</Container>
				</Box>
			</Modal>
		</div>
	);
};
export default SignUp;
