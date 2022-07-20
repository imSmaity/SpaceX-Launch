import { Provider } from 'react-redux';
import './App.css';
import store from './redux/store';
import Start from './Start';

function App() {
	return (
		<Provider store={store}>
			<Start />
		</Provider>
	);
}

export default App;
