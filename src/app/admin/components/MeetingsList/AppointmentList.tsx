"use client";

import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/admin/store/store";
import CancelAppointmentModal from "../@modal/CancelModal/CancelAppointmentModal";
import NewAppointmentModal from "../@modal/NewModal/NewAppointmentModal";
import AppointmentCard from "../Card/Card";
import NewAppointmentButton from "../NewButton/NewAppointmentButton";
import EmailLogin from "../Email/EmailLogin";
import styles from "./AppointmentList.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { setAppointments } from "@/app/admin/store/slices/appointmentSlice";
import { redirect } from "next/navigation";

const AppointmentList = () => {
  const dispatch = useDispatch();

  const appointments= useSelector(
    (state: RootState) => state.appointments.appointments
  )

  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [isNewAppointmentModalOpen, setNewAppointmentModalOpen] =
    useState(false);

  const openCancelModal = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setCancelModalOpen(true);
  };
  const token = Cookies.get("token")
  const isAdmin = Cookies.get("isAdmin")


  useEffect(() => {
    const fetchAppointments = async () => {
      if (token && appointments.length === 0&& isAdmin==="true") {
        try {
          const response = await axios.get('http://127.0.0.1:5000/admin/my_appointments', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            dispatch(setAppointments(response.data));
          }else if(response.status===401) {
            message.error(response.data.message)
            Cookies.remove("isAdmin")
            Cookies.remove("token")
            Cookies.remove("email")
    
            redirect('/login')
          
          }
        } catch (error) {
          message.error(error.response?.data.error);
        }
      }
    };

    fetchAppointments();
  }, [token, appointments.length, dispatch]);


  
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <div>
      <div className={styles.container}>
        <h2>Your Appointments with Students</h2>
        {appointments.length === 0 ? (
          <p className={styles.text}>
            For now you have none, but you can make one by clicking the button
            below
          </p>
        ) : (
          <div className={styles.appointmentList}>
            {appointments.map((app) => (
              
              <AppointmentCard
                key={app.id}
                id={app.id}
                appointment_date={app.appointment_date}
                // time={app.time}
                // specialist={app.specialist}
                // category={app.category}
                start_time={app.start_time}
                end_time={app.end_time}
                // description={app.description}
                openCancelModal={openCancelModal}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
        <NewAppointmentButton
          onClick={() => setNewAppointmentModalOpen(true)}
        />
        {isNewAppointmentModalOpen && (
          <NewAppointmentModal
            isOpen={isNewAppointmentModalOpen}
            closeModal={() => setNewAppointmentModalOpen(false)}
          />
        )}
      </div>
      {isCancelModalOpen && selectedAppointmentId && (
        <CancelAppointmentModal
          // appointment={appointments.filter((appointment)=> appointment.id === selectedAppointmentId)[0]}
          appointmentId={selectedAppointmentId}
          isOpen={isCancelModalOpen}
          closeModal={() => setCancelModalOpen(false)}
        />
      )}
      {/* <EmailLogin /> */}
    </div>
  );
};

export default AppointmentList;
