import Search from './components/Search';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddData from './components/AddData';
import Indexes from './components/Indexes';
import Index from './components/Index';

function App() {
  return (
    
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Search/>}/>
          <Route path='/add' element={<AddData/>}/>
          <Route path='/indices' element={<Indexes/>}/>
          <Route path='/index' element={<Index/>}/>
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
