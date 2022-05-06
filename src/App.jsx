import 'tailwindcss/tailwind.css';
import Community from './pages/Community';

// 임시
import AddCommunity from './pages/AddCommunity';

function App() {
  return (
    <div
      style={{
        width: '320px',
        height: '568px',
        overflowY: 'auto',
        margin: 'auto',
      }}
    >
      <Community />
      appw
      <AddCommunity />
    </div>
  );
}

export default App;
