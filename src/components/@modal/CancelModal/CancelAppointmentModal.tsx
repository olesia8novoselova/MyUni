"use client";
import { useDispatch } from "react-redux";
import { removeAppointment } from "@/store/slices/appointmentSlice";
import Modal from "react-modal";
import styles from "./CancelAppointmentModal.module.css";
import Image from "next/image";

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

  const handleCancel = () => {
    dispatch(removeAppointment(appointmentId));
    closeModal();
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
