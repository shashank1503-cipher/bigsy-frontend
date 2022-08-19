import Search from './components/Search';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImportSql from './components/ImportSql';
import Admin from './components/Admin';
import AddDataToDB from './components/AddDataToDB';

function App() {
  return (
    
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Search/>}/>
          <Route path='/importsql' element={<ImportSql/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path="/add" element={<AddDataToDB/>}/>
        </Routes>

      </Header>
    </BrowserRouter>
  );
}

export default App;
