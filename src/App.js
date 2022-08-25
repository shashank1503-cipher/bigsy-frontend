import Search from "./components/Search";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImportSql from "./components/ImportSql";
import Admin from "./components/Admin";
import AddDataToDB from "./components/AddDataToDB";
import Upload from "./components/Upload";
import Indexes from "./components/Indexes";
import Index from "./components/Index";
import Stats from "./components/Stats";
import ImportJSON from "./components/ImportJSON";
import ImportCsv from "./components/ImportCsv";
import Doc from "./components/Doc";
import "@fontsource/source-code-pro/700.css";
// import '@fontsource/roboto/400.css';
import "@fontsource/poppins/700.css";
import "@fontsource/ubuntu/400.css";
import Hero from "./components/Hero";
import UploadBulk from "./components/UploadBulk";

function App() {
  localStorage.setItem("chakra-ui-color-mode", "dark");

  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Hero />} exact />
          <Route path="/importsql" element={<ImportSql />} />
          <Route path="/importcsv" element={<ImportCsv />} />
          <Route path="/importjson" element={<ImportJSON />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add" element={<AddDataToDB />} />
          <Route path="/bulk" element={<UploadBulk />} />
          <Route path="/indices" element={<Indexes />} />
          <Route path="/index" element={<Index />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/search" element={<Search />} />

          <Route path="/doc/:index/:id" element={<Doc />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
