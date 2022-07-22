import { Box, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ListOfAllLaunches from './ListOfAllLaunches';
import Sort from './Sort';

const Dashboard = () => {
	const [allLaunches, setAllLaunches] = useState({
		isLoad: true,
		data: null,
		error: null,
	});
	const [launchesTime, setLaunchesTime] = useState(
		'https://api.spacexdata.com/v3/launches'
	);
	const [mainData, setMainData] = useState([]);
	const [filteringDate, setFilteringDate] = useState({
		start: '2006-03-24',
		end: '2019-10-01',
	});

	useEffect(() => {
		setAllLaunches({
			isLoad: true,
			data: null,
			error: null,
		});
		axios
			.get(launchesTime)
			.then((res) => {
				setAllLaunches({
					isLoad: false,
					data: res.data,
					error: null,
				});
				setMainData(res.data);
			})
			.catch(() => {
				setAllLaunches({
					isLoad: false,
					data: null,
					error: 'Network error!',
				});
			});
	}, [launchesTime]);

	useEffect(() => {
		if (!allLaunches.isLoad && allLaunches.error === null) {
			const filteredData = mainData.filter((d) => {
				const launchDate = new Date(d.launch_date_utc).getTime();
				const start = new Date(filteringDate.start).getTime();
				const end = new Date(filteringDate.end).getTime();
				return launchDate >= start && launchDate <= end;
			});

			setAllLaunches({ ...allLaunches, data: filteredData });
		}
	}, [filteringDate]);

	return (
		<Box>
			<Navbar />
			<Container
				maxWidth='xl'
				sx={{
					boxShadow: 3,
					mt: 10,
					p: 2,
					backgroundColor: 'lightgray',
					minHeight: 570,
				}}>
				<Box>
					<Sort
						launches={{
							launchesTime,
							setLaunchesTime,
							filteringDate,
							setFilteringDate,
						}}
					/>
					<ListOfAllLaunches allLaunches={allLaunches} />
				</Box>
			</Container>
		</Box>
	);
};

export default Dashboard;
