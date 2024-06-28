"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAppointment } from "@/store/slices/appointmentSlice";
import { nanoid } from "nanoid";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import styles from "./NewAppointmentModal.module.css";
import "react-datepicker/dist/react-datepicker.css";

interface NewAppointmentModalProps {
  closeModal: () => void;
  isOpen: boolean;
}

const NewAppointmentModal = ({
  closeModal,
  isOpen,
}: NewAppointmentModalProps) => {
  const dispatch = useDispatch();
  const [specialist, setSpecialist] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [description, setDescription] = useState("");

  const specialists = ["Specialist 1", "Specialist 2", "Specialist 3"];
  const categories = ["Individual", "Group"];
  const times = ["10:00 - 11:30", "12:00 - 13:30", "14:00 - 15:30"];

  const handleSubmit = () => {
    if (date) {
      dispatch(
        addAppointment({
          id: nanoid(),
          date: date.toISOString().split("T")[0],
          time,
          specialist,
          category,
          description,
        })
      );
      closeModal();
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
        <h2 className={styles.modalTitle}>New Appointment</h2>
        <button onClick={closeModal} className={styles.modalClose}>
          &times;
        </button>
      </div>
      <div className={styles.modalBody}>
        <label>Specialist</label>
        <select
          className={styles.input}
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        >
          <option value="">Select specialist</option>
          {specialists.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        <label>Category</label>
        <select
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <label>Time</label>
        <select
          className={styles.input}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">Select time</option>
          {times.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <label>Date</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="yyyy-MM-dd"
          className={styles.datePicker}
          inline
        />
        <label>Description</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.modalFooter}>
        <button className={styles.button} onClick={handleSubmit}>
          Create Appointment
        </button>
      </div>
    </Modal>
  );
};
export default NewAppointmentModal;
