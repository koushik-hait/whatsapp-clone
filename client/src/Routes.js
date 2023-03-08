import React, { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';
// import Main from './ui/layout/Main';
// import Home from './pages/Home';
// import Chat from './pages/Chat'
import Error from './components/ui/Error';
import Call from "./pages/Call";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import SetAvatar from "./pages/SetAvtar";
const Chat = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const SetAvatar = lazy(() => import("./pages/SetAvtar"));

const CRoutes = () => {
    return (
      <Suspense fallback={<></>}>
        <Routes>
          <Route index element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/call" element={<Call />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
        
    )
}

export default CRoutes;