import './App.css';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import UserRoutes from './Components/Dashboard/Routes'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route path="user_dashboard/*" element={<UserRoutes/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
