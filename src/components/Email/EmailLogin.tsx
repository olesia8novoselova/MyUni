"use client";
import React, { useState } from 'react';
import styles from './EmailLogin.module.css';
import axios from 'axios';



const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError(null);
    setSuccess(null);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/user/register', { email:email,name:email,password:"" });
      if (response.status === 201) {
        setSuccess('Email successfully submitted');
        setUserId(response.data.id);
        setEmail('');
      }
    } catch (error) {
      setError('Failed to submit email');
    }
    console.log('Email:', email);
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
      <button onClick={handleLogin} className={styles.loginButton}>Log in</button>
      {success && <p className={styles.successMessage}>{success}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {/* {userId && <p className={styles.userIdMessage}>Your ID: {userId}</p>} */}
    </div>
  );
};

export default EmailLogin;
