import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import {
  BrowserRouter,
  Route,
  Routes,

} from "react-router-dom";
import NotePage from './pages/NotePage';



function App() {
  return (
  <BrowserRouter>
  <div className="container dark">
    <div className="app">
  <Header />

    <Routes>
      <Route exact path="/" element={<NotesListPage />}/>

      <Route exact path="/note/:id" element={<NotePage />} />
    </Routes>
    </div>
    </div>
  </BrowserRouter>
  );
}

export default App;
