"use client";
import { useDispatch } from "react-redux";
import { removeAppointment } from "@/app/admin/store/slices/appointmentSlice";
import Modal from "react-modal";
import styles from "./CancelAppointmentModal.module.css";
import Image from "next/image";
import { message } from "antd";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import axiosInstance from "@/api/posts";
interface CancelAppointmentModalProps {
  appointmentId: string;
  closeModal: () => void;
  isOpen: boolean;
}

const CancelAppointmentModal = ({
  appointmentId,
  closeModal,
  isOpen,
}: CancelAppointmentModalProps) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token")
  const handleCancel = async () => {
    try {
      const response = await axiosInstance.post('admin/delete_appointment', {
        appointment_id: appointmentId,
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        dispatch(removeAppointment(appointmentId));
        closeModal();
        message.success(response.data.message)
      }else{ 
        message.error(response.data.error)
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
          <button  onClick={closeModal}>
            Close
          </button>
        </div>
        <div className={styles.cancelButton}>
          <Image src="/check.svg" alt="Cancel" width={18} height={18} />
          <button  onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelAppointmentModal;
