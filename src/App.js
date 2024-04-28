// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
     <div><Header /></div>
     <div><Form /></div>
     <Table />
    </div>
  );
}

export default App;