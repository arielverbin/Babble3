import './App.css';
import LoginPage from '../Registration/LoginPage/LoginPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from '../Registration/RegisterPage/RegisterPage';
import Babble from './Babble';
import Homepage from "./Homepage";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Homepage/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/babble" element={<Babble/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
