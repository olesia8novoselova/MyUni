"use client";

import Image from "next/image";
import styles from "./Card.module.css";

interface AppointmentCardProps {
  id: string;
  appointment_date: string;
  end_time: string;
  start_time: string;
  appointmentType: string;
  openCancelModal: (id: string) => void;
  formatDate: (dateString: string) => string;
}

const AppointmentCard = ({
  id,
  appointment_date,
  end_time,
  start_time,
  appointmentType,
  openCancelModal,
  formatDate,
}: AppointmentCardProps) => {
  return (
    <div className={styles.appointment}>
      <div className={styles.info}>
        <div>
          <h3>{formatDate(appointment_date)}</h3>
          <p>{start_time} - {end_time}</p>
        </div>
        <div>
          {/* <span>Specialist</span> */}
          {/* <p>{specialist}</p> */}
        </div>
        <div>
          <span>Category</span>
          <p>{appointmentType}</p>
        </div>
        {/* <div className={styles.description}>{description}</div> */}
      </div>
      <div className={styles.actions}>
        <div className={styles.buttons}>
          <Image src="/cross.svg" alt="Cancel" width={18} height={18} />
          <button onClick={() => openCancelModal(id)}>
            Cancel the meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
