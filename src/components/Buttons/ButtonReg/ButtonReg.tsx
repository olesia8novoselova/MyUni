"use client"

import React, { useState } from 'react';
import styles from './ButtonReg.module.css';
import axios from 'axios';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

const ButtonReg: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    // Add your registration logic here
    if (name&&password&&email) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/user/register', {
          name,
          email,
          password,
        });
  
        if (response.status === 200 ||response.status === 201) {
          router.push(`/Login?email=${email}`);
          message.success(response.data.success)
        }else{ 
          message.error(response.data.error)
        }
      } catch (error) {
        message.error(error.response.data.error)
  
      }
    }
  };

  return (
    <div className={styles.regContainer}>
      <h2>Register</h2>
      <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onError={(error)=>console.log(error)}
            min={3}
            max={20}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.registerButton} onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
};

export default ButtonReg;
