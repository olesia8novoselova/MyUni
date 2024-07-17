"use client";

import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import CancelAppointmentModal from "../@modal/CancelModal/CancelAppointmentModal";
import NewAppointmentModal from "../@modal/NewModal/NewAppointmentModal";
import { setAppointments } from "@/store/slices/appointmentSlice";
import AppointmentCard from "../Card/Card";
import NewAppointmentButton from "../NewButton/NewAppointmentButton";
import EmailLogin from "../Email/EmailLogin";
import styles from "./AppointmentList.module.css";
import { message } from "antd";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import axiosInstance from "@/api/posts";
const AppointmentList = () => {
  const appointments = useSelector(
    (state: RootState) => state.appointments.appointments
  );
  const token = Cookies.get("token")
  const isAdmin = Cookies.get("isAdmin")
  const dispatch = useDispatch();

  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [isNewAppointmentModalOpen, setNewAppointmentModalOpen] =
    useState(false);

  const openCancelModal = (appointmentId: string) => {
    console.log(appointmentId)
    setSelectedAppointmentId(appointmentId);
    setCancelModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };


  useEffect(() => {
    const fetchAppointments = async () => {
      if (token && appointments.length === 0&& isAdmin==="false") {
        try {
          const response = await axiosInstance.get('user/my_appointments', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            console.log(response)
            dispatch(setAppointments(response.data));
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

    fetchAppointments();
  }, [token, appointments.length, dispatch,isAdmin]);

  return (
    <div>
      <div className={styles.container}>
        <h2>Your Appointments with Psychologist</h2>
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
                end_time={app.end_time}
                start_time={app.start_time}
                // category={app.category}
                appointmentType={app.appointmentType}
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
