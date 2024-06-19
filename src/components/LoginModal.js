import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDeviceToken } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('email');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailValidation = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    axios.post('https://testmobileapp.optigoapps.com/optigomec.aspx', {
      mode: 'VALDNEMAIL',
      userid: email,
    })
    .then(response => {
      if (response.data && response.data.data && response.data.data[0]) {
        dispatch(setDeviceToken(response.data.data[0].device_token));
        setStep('password');
      } else {
        setError('Invalid email or no data received');
      }
    })
    .catch(error => {
      console.error('Error validating email:', error);
      setError('Error validating email');
    });
  };

  const handlePasswordValidation = () => {
    if (password === '') {
      setError('Password cannot be empty.');
      return;
    }

    axios.post('https://testmobileapp.optigoapps.com/optigomec.aspx', {
      mode: 'EPLOGIN',
      userid: email,
      pass: password,
      onesignal_uid: 'samar_onesignal_uid',
      deviceid: 'samar_deviceid',
    })
    .then(response => {
      if (response.data && response.data.stat_msg) {
        navigate('/');
        onClose();
      } else {
        setError('Invalid password');
      }
    })
    .catch(error => {
      console.error('Error validating password:', error);
      setError('Error validating password');
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        {step === 'email' ? (
          <div>
            <h2 className="text-lg font-bold mb-4">Email Validation</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded mb-4 text-gray-800 bg-gray-100"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleEmailValidation}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Validate Email
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold mb-4">Password Validation</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border rounded mb-4 text-gray-800 bg-gray-100"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handlePasswordValidation}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Validate Password
            </button>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
