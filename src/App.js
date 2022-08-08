import Search from './components/Search';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddData from './components/AddData';

function App() {
  return (
    
    <BrowserRouter>
      <Header>
        <Routes>

          <Route path="/" element={<Search/>}/>
          <Route path='/add' element={<AddData/>}/>
        </Routes>

      </Header>
    </BrowserRouter>
  );
}

export default App;
