import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ListOfAllLaunches = ({ allLaunches }) => {
	const [open, setOpen] = React.useState(false);

	return (
		<TableContainer component={Paper} sx={{ maxHeight: 495 }}>
			<Table sx={{ minWidth: 650, minHeight: 20 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Flight Number</TableCell>
						<TableCell>Mission Name</TableCell>
						<TableCell>Rocket Name</TableCell>
						<TableCell>Rocket Type</TableCell>
						<TableCell>Launch Year</TableCell>
					</TableRow>
				</TableHead>
				{!allLaunches.isLoad && allLaunches.error === null ? (
					<Flight allLaunches={allLaunches} opens={{ open, setOpen }} />
				) : (
					<Box sx={{ position: 'absolute', left: '50%' }}>
						<CircularProgress />
					</Box>
				)}
			</Table>
		</TableContainer>
	);
};

const Flight = ({ allLaunches, opens }) => {
	const { open, setOpen } = opens;
	const [flightId, setFlightId] = React.useState(0);

	return (
		<>
			<TableBody>
				{allLaunches.data.map((launches, index) => (
					<TableRow
						key={launches.mission_name}
						onClick={() => {
							setFlightId(index);
							setOpen(true);
						}}>
						<TableCell>{launches.flight_number}</TableCell>
						<TableCell>{launches.mission_name}</TableCell>
						<TableCell>{launches.rocket.rocket_name}</TableCell>
						<TableCell>{launches.rocket.rocket_type}</TableCell>
						<TableCell>{launches.launch_year}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<BasicModal
				opens={{ open, setOpen }}
				launches={allLaunches.data[flightId]}
			/>
		</>
	);
};
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const BasicModal = ({ opens, launches }) => {
	const { open, setOpen } = opens;
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						<center>
							<img
								src={launches.links.mission_patch}
								style={{
									width: '10rem',
									height: '10rem',
									padding: '5px',
								}}
								alt='...'
							/>
						</center>
						<div>Rocket Name:{launches.rocket.rocket_name}</div>
						<div>Mission Name:{launches.mission_name}</div>
						<div>Year: {launches.launch_year}</div>
						<p>{launches.details}</p>
						<a
							href={launches.links.wikipedia}
							target={'_blank'}
							style={{ textDecoration: 'none' }}>
							More...
						</a>
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}></Typography>
				</Box>
			</Modal>
		</div>
	);
};
export default ListOfAllLaunches;
