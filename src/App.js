import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import TaskTracker from './components/TaskTracker';
import Layout from './components/Layout';
import NoPage from './components/NoPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TaskTracker />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
