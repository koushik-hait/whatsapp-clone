import React from "react";
import { Route, Routes } from 'react-router-dom';
// import Main from './ui/layout/Main';
import Home from './pages/Home';
import Chat from './pages/Chat'
import Error from './components/ui/Error';
import Call from "./pages/Call";
import { ContextProvider } from "./context/SocketContext";

const CRoutes = () => {
    return (
        <Routes>
          <Route index element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/call" element={<Call />} />
          <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default CRoutes;