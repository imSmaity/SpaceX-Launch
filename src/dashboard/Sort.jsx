import * as React from 'react';

const Sort = ({ launches }) => {
	const { launchesTime, setLaunchesTime, filteringDate, setFilteringDate } =
		launches;
	const handleDateChange = (e) => {
		setFilteringDate({ ...filteringDate, [e.target.name]: e.target.value });
	};

	const handleChange = (e) => {
		if (e.target.value) setLaunchesTime(e.target.value);
	};

	return (
		<div>
			<select
				onChange={handleChange}
				value={launchesTime}
				style={{ padding: '5px', margin: '2px' }}>
				<option value=''>Select</option>
				<option value='https://api.spacexdata.com/v3/launches'>
					All Launches
				</option>
				<option value='https://api.spacexdata.com/v3/launches/past'>
					Past Launches
				</option>
				<option value='https://api.spacexdata.com/v3/launches/upcoming'>
					Upcoming Launches
				</option>
			</select>
			<span style={{ marginLeft: '15px' }}>Start Date:</span>
			<input
				type={'date'}
				style={{ padding: '5px', margin: '2px' }}
				name='start'
				value={filteringDate.start}
				onChange={handleDateChange}
			/>
			<span style={{ marginLeft: '15px' }}>End Date:</span>
			<input
				type={'date'}
				style={{ padding: '5px', margin: '2px' }}
				value={filteringDate.end}
				name='end'
				onChange={handleDateChange}
			/>
		</div>
	);
};

export default Sort;
