"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CancelAppointmentModal from "../@modal/CancelModal/CancelAppointmentModal";
import NewAppointmentModal from "../@modal/NewModal/NewAppointmentModal";
import AppointmentCard from "../Card/Card";
import NewAppointmentButton from "../NewButton/NewAppointmentButton";
import styles from "./AppointmentList.module.css";

const AppointmentList = () => {
  const appointments = useSelector(
    (state: RootState) => state.appointments.appointments
  );
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
                date={app.date}
                time={app.time}
                specialist={app.specialist}
                category={app.category}
                description={app.description}
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
    </div>
  );
};

export default AppointmentList;
