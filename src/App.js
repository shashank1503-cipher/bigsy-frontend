import Search from './components/Search';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImportSql from './components/ImportSql';
import Admin from './components/Admin';
import AddDataToDB from './components/AddDataToDB';
import Upload from './components/Upload';
import Indexes from './components/Indexes';
import Index from './components/Index';
import ImportCsv from './components/ImportCsv';

function App() {
  return (
    
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/importsql' element={<ImportSql/>}/>
          <Route path='/importcsv' element={<ImportCsv/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path="/add" element={<AddDataToDB/>}/>
          <Route path='/indices' element={<Indexes/>}/>
          <Route path='/index' element={<Index/>}/>
          <Route path="/upload" element={<Upload/>}/>
          <Route path='/' element={<Search/>}/>
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
