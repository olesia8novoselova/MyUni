"use client";

import Image from "next/image";
import styles from "./Card.module.css";

interface AppointmentCardProps {
  id: string;
  appointment_date: string;
  //time: string;
  //specialist: string;
  // category: string;
  //description: string;
  openCancelModal: (id: string) => void;
  formatDate: (dateString: string) => string;
  start_time: string;
  end_time: string;
}

const AppointmentCard = ({
  id,
  appointment_date,
  //time,
  //specialist,
  // category,
  //description,
  openCancelModal,
  formatDate,
  start_time,
  end_time,
}: AppointmentCardProps) => {
  console.log(id)
  return (
    <div className={styles.appointment}>
      <div className={styles.info}>
        <div>
          <h3>{formatDate(appointment_date)}</h3>
          {/* <p>{date}</p> */}
        </div>
        {/* <div>
          <span>Specialist</span>
          <p>{specialist}</p>
        </div> */}
        {/* <div>
          <span>Category</span>
          <p>{category}</p>
        </div> */}
        <div>
          <span>Time</span>
          <p>{start_time} - {end_time}</p>
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
