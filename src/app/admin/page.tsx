"use client";
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/app/admin/store/store';
import AppointmentList from "@/app/admin/components/MeetingsList/AppointmentList";
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const isAdmin = Cookies.get('isAdmin');

    if (!token) {
      router.push('/Login');
    } 
     if (isAdmin==="false") {
      router.push('/');
    }
  }, [router]); // Ensure only reruns when router changes
  return (
    <Provider store={store}>
    <div>
      <AppointmentList />
    </div>
    </Provider>
  );
};

export default Home;
