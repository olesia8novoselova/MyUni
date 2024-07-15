"use client";
import { useEffect } from "react";
import AppointmentList from "../components/MeetingsList/AppointmentList";
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
     if (isAdmin==="true") {
      router.push('/admin');
    }
  }, [router]); // Ensure only reruns when router changes
  return (
    <div>
      <AppointmentList />
    </div>
  );
};

export default Home;
