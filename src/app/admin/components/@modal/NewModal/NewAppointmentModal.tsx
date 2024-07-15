"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAppointment } from "@/app/admin/store/slices/appointmentSlice";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import axiosInstance from "@/api/posts";
import styles from "./NewAppointmentModal.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { message } from "antd";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
interface NewAppointmentModalProps {
  closeModal: () => void;
  isOpen: boolean;
}

interface Specialist {
  id: string;
  name: string;
}

function formatDate(date:Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


function formatTime(time: string): string {
  const t = new Date(`1970-01-01T${time}Z`); 
  const hours = String(t.getUTCHours()).padStart(2, '0');
  const minutes = String(t.getUTCMinutes()).padStart(2, '0');
  const seconds = String(t.getUTCSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
const NewAppointmentModal = ({
  closeModal,
  isOpen,
}: NewAppointmentModalProps) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const email = Cookies.get("email")
  const token = Cookies.get("token")
  const handleSubmit = async () => {
    if (date && startTime && endTime &&email) {


      try {
        const response = await axiosInstance.post("http://127.0.0.1:5000/admin/add_appointment", {
          appointment_date: formatDate(date),
          start_time:formatTime(startTime),
          end_time:formatTime(endTime),
          appointmentType:"individual"
        },{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200 ||response.status === 201 ) {
          const appointment = {
            appointment_date: date,
            id:response.data.appointment_id,
            start_time:startTime,
            end_time:endTime,
            appointmentType: "individual",
          };
          dispatch(addAppointment(appointment));
          closeModal();
          message.success(response.data.success)
        }else if(response.status===401) {
          message.error(response.data.message)
          Cookies.remove("isAdmin")
          Cookies.remove("token")
          Cookies.remove("email")
  
          redirect('/login')
        
        } else {
          message.error(response.data.error)

        }
      } catch (error) {
        message.error(error.response.data.error)
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={styles.modalContent}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>New Appointment</h2>
        <button onClick={closeModal} className={styles.modalClose}>
          &times;
        </button>
      </div>
      <div className={styles.modalBody}>
        <div className={styles.formContainer}>
          <label>Start Time</label>
          <input
            type="time"
            className={styles.input}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <label>End Time</label>
          <input
            type="time"
            className={styles.input}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          {/* <label>Category</label>
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
          </select> */}
        </div>

        <div className={styles.calendarContainer}>
          <div className={styles.datePickerWrapper}>
            <DatePicker
              selected={date}
              onChange={(date) => {
                setDate(date)}}
              dateFormat="yyyy-MM-dd"
              className={styles.datePicker}
              inline
            />
          </div>
        </div>
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
