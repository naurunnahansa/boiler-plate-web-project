import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <div className="App">
      <AuthProvider>
              <Navbar/>
              <Routes>
                  <Route element={<PrivateRoutes/>}>
                    <Route element={<Home/>} path='/protectedExample' exact/>
                  </Route>
                  <Route element={<Home/>} path='/' exact/>
                  <Route element={<Login/>} path='/login' exact/>
                  <Route element={<Register/>} path='/register' exact/>
              </Routes>
      </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
