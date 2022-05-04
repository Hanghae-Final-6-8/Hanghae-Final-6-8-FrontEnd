import 'tailwindcss/tailwind.css';

function App() {
	const onClickHandler = () => {
		window.alert('test');
	};
	return (
		<div className='text-xl'>
			app
			<button className='bg-sky-500' onClick={onClickHandler}>
				배포test
			</button>
		</div>
	);
}

export default App;
