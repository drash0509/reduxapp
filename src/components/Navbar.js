import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
      <div className="text-lg font-bold">My App</div>
      <button
        className="px-4 py-2 bg-blue-800 rounded hover:bg-blue-700"
        onClick={() => isAuthenticated ? handleLogout() : setShowModal(true)}
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </nav>
  );
};

export default Navbar;
