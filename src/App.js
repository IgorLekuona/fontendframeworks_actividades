import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main } from './pages/Main';
import { Login } from './components/Login';
import { Profile } from "./components/Profile";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
