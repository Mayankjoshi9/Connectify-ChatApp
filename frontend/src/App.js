
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"


function App() {
  return (
    <div className="w-screen h-screen min-h-screen flex justify-center items-center bg-white">
        <Routes>
           <Route path='/' element={<Home/>}/>

        </Routes>
    </div>
  );
}

export default App;
