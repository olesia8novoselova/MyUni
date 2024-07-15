"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAdminId } from '@/app/admin/store/slices/adminSlice';
import styles from './EmailLogin.module.css';
import axiosInstance from '../../../../api/posts';

const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const dispatch = useDispatch();


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError(null);
    setSuccess(null);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setError(null);
    setSuccess(null);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(null);
    setSuccess(null);
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/register/admin', { "admin_email": email, "admin_name": name, "password": password });
      if (response.status === 200) {
        setSuccess('Email successfully submitted');
        dispatch(setAdminId(response.data.adminId));
        setEmail('');
        setName('');
        setPassword('');
      }
    } catch (error) {
      setError('Failed to submit email');
    }
    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Password:', password);
  };

  return (
    <div className={styles.emailLoginContainer}>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={handleEmailChange} 
        className={styles.emailInput}
      />
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className={styles.nameInput}
      />
      <input 
        type="password" 
        placeholder="Enter your password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className={styles.passwordInput}
      />
      <button onClick={handleLogin} className={styles.loginButton}>Log in</button>
      {success && <p className={styles.successMessage}>{success}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default EmailLogin;
