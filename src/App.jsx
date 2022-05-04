import 'tailwindcss/tailwind.css';
import Community from './pages/Community';

function App() {
	const onClickHandler = () => {
		window.alert('test');
	};
	return (
		<div>
			<Community />
			app
			<br />
			<button onClick={onClickHandler}>testBtn</button>
		</div>
	);
}

export default App;
