"use client";
import { Suspense } from 'react';
import React from 'react';
import ButtonLogin from '@/components/Buttons/ButtonLogin/ButtonLogin';
import styles from '@/app/Login/page.module.css';

const Login = () => {
  return (
    <Suspense>

    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ButtonLogin />
      </div>
    </div>
    </Suspense>
  );
};

export default Login;
