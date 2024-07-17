"use client";

import React, { useState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import styles from './ButtonLogin.module.css';
import { useSearchParams } from 'next/navigation';
import { message } from 'antd';
import Cookies from 'js-cookie';

import axiosInstance from '@/api/posts';
const ButtonLogin: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const searchParams = useSearchParams();
  const val = searchParams.get('email');

  useEffect(() => {
    if (val) {
      setEmail(val);
    }
  }, [val]);

  const handleSubmit = async () => {
    if (password && email) {
      try {
        const response = await axiosInstance.post('user/login', {
          email,
          password,
        });

        if (response.status === 200 || response.status === 201) {
          Cookies.set("token", response.data.token);
          Cookies.set("isAdmin", response.data.admin);
          Cookies.set("email", email);
          if (response.data.admin) {
            router.push(`/admin`);
          } else {
            router.push(`/`);
          }
          message.success(response.data.success);
        } else {
          message.error(response.data.error);
        }
      } catch (error ) {
        const err = error as { response: { data: { message: string }; status: number } };
        message.error(err.response?.data?.message)
        if(err?.response?.status===401) {
         Cookies.remove("isAdmin")
         Cookies.remove("token")
         Cookies.remove("email")
         redirect('/Login')
       }
      }
    }
  };

  const handleRegister = () => {
    router.push('/Registration');
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <div className={styles.inputContainer}>
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
        <button className={styles.loginButton} onClick={handleSubmit}>Login</button>
        <button className={styles.registerButton} onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default ButtonLogin;
