"use client";

import Image from "next/image";
import styles from "./NewAppointmentButton.module.css";

interface NewAppointmentButtonProps {
  onClick: () => void;
}

const NewAppointmentButton = ({ onClick }: NewAppointmentButtonProps) => {
  return (
    <div className={styles.container}>
        <div className={styles.button}>
            <Image src="/plus.svg" alt="New Appointment" width={18} height={18} />
            <button onClick={onClick}>New Appointment</button>
        </div>
    </div>
    
  );
};

export default NewAppointmentButton;
