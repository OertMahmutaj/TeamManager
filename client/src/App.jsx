import PlayerForm from './components/PlayerForm';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PlayerList from './components/PlayerList';
import Status from './components/Status';
import Main from './components/Main';
import Game2 from './components/Game2'
import Game3 from './components/Game3';
import './styles/app.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <h1 className="header">Manage Players</h1>
      <ToastContainer />
      <BrowserRouter>
        <nav className="nav">

          <Link to="/player" className="nav-link">Manage Players</Link>

          <Link to="/player/game1" className="nav-link">Manage Player Status</Link>

        </nav>
        <Routes>
          <Route element={<PlayerForm />} path="/player/new" />
          <Route element={<PlayerList />} path="/player" />
          <Route element={<Status />} path="/player/game1/" />
          <Route element={<Main />} path="/" />
          <Route element={<Game2 />} path='/player/game2/' />
          <Route element={<Game3 />} path='/player/game3/' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
