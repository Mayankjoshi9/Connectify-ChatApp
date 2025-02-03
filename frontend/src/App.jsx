
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import ResetPassword from "./pages/ResetPassword"
import OpenRoute from './components/auth/OpenRoute';
import PrivateRoute from './components/auth/PrivateRoute';


function App() {
  return (
    <div className="w-screen h-screen min-h-screen overflow-hidden">
      <Routes>

        <Route path='/'

          element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }
        />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login></Login>
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup></Signup>
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail></VerifyEmail>
            </OpenRoute>
          }
        />
        <Route
          path="resetpassword"
          element={
            <OpenRoute>
              <ResetPassword></ResetPassword>
            </OpenRoute>
          }
        />
        
        <Route
          path='update-password/:id'
          element={
            <OpenRoute>
              <UpdatePassword></UpdatePassword>
            </OpenRoute>
          }
        />

        

      </Routes>


    </div>
  );
}

export default App;
