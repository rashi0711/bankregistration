
import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Services  from "./components/Services";
import Dashboard from "./components/Dashboard";
// import { Main } from "./components/Main";
import Registration from './components/Registration';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Services />} path="/services" />
          <Route element={<Registration />} path="/registration" />
          {/* <PrivateRoute element={<Dashboard />} path="/dashboard" /> */}
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
            path="/dashboard"
          />

          {/* <Route path="/dashboard" element={localStorage.getItem('token') ? <Dashboard /> : <Navigate to="/services" />} />  */}

          {/* <Route exact component={Main} path="/" /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
