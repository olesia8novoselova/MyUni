"use client";

import Image from "next/image";
import styles from "./Card.module.css";

interface AppointmentCardProps {
  id: string;
  date: string;
  time: string;
  specialist: string;
  category: string;
  description: string;
  openCancelModal: (id: string) => void;
  formatDate: (dateString: string) => string;
}

const AppointmentCard = ({
  id,
  date,
  time,
  specialist,
  category,
  description,
  openCancelModal,
  formatDate,
}: AppointmentCardProps) => {
  return (
    <div className={styles.appointment}>
      <div className={styles.info}>
        <div>
          <h3>{formatDate(date)}</h3>
          <p>{time}</p>
        </div>
        <div>
          <span>Specialist</span>
          <p>{specialist}</p>
        </div>
        <div>
          <span>Category</span>
          <p>{category}</p>
        </div>
        <div className={styles.description}>{description}</div>
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
