"use client";
import { useDispatch } from "react-redux";
import { removeAppointment } from "@/store/slices/appointmentSlice";
import Modal from "react-modal";
import axios from "axios";
import styles from "./CancelAppointmentModal.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import { message } from "antd";
import { redirect } from "next/navigation";
interface CancelAppointmentModalProps {
  appointmentId: string;
  appointment: {
    id: Number;
    name: string;
    email: string;
    appointmentType: string;
    appointment_date: string;
    end_time: string;
    start_time: string;
    user_id: null;
  };
  closeModal: () => void;
  isOpen: boolean;
}

const CancelAppointmentModal = ({
  appointmentId,
  appointment,
  closeModal,
  isOpen,
}: CancelAppointmentModalProps) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token")
  const handleCancel = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/appointment/cancel_appointment', {
        appointment_id: appointmentId,
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200 ||response.status === 201) {
        console.log(response.data)
        dispatch(removeAppointment(appointmentId));
        closeModal();
        message.success(response.data.success)

      }else if(response.status===401) {
        message.error(response.data.message)
        Cookies.remove("isAdmin")
        Cookies.remove("token")
        Cookies.remove("email")

        redirect('/login')
      
      }
      
      else{
        message.error(response.data.error)

      } 
    } catch (error) {
      message.error(error.data.error)

    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={styles.modalContent}
      overlayClassName="overlay"
    >
      <div className={styles.modalHeader}>
        Are you sure you want to cancel the meeting?
      </div>
      <div className={styles.modalFooter}>
        <div className={styles.closeButton}>
          <Image src="/close.svg" alt="Close" width={18} height={18} />
          <button onClick={closeModal}>Close</button>
        </div>
        <div className={styles.cancelButton}>
          <Image src="/check.svg" alt="Cancel" width={18} height={18} />
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelAppointmentModal;
