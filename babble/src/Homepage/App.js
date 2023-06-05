import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import LoginPage from "../Registration/LoginPage/LoginPage";
import RegisterPage from "../Registration/RegisterPage/RegisterPage";
import Babble from "./Babble";
import Homepage from "./Homepage";

const socket = io.connect("localhost:5001")
// const sendMessage = () => {
//     socket.emit("send_message");
// };

function App() {
    
    const sendMessage = () => {
        socket.emit("send_message");
    };


    useEffect(() => {
        socket.on("receive_message", () => {
            console.log("recieved message")
        });
    }, [socket]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Homepage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/babble" element={<Babble />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
