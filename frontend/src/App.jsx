import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewPlayer from './pages/NewPlayer';
import DeletePlayer from './pages/DeletePlayer';
import EditPlayer from './pages/EditPlayer';
import ShowPlayer from './pages/ShowPlayer';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <AuthProvider>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route element={<ProtectedRoute/>}>
          <Route path='/players/new' element={<NewPlayer />} />
          <Route path='/players/details/:id' element={<ShowPlayer />} />
          <Route path='/players/edit/:id' element={<EditPlayer />} />
          <Route path='/players/delete/:id' element={<DeletePlayer />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;