"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAppointment } from "@/store/slices/appointmentSlice";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import axios from "axios";
import styles from "./NewAppointmentModal.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { message } from "antd";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
interface Specialist {
  id: string;
  name: string;
  email: string;
}

interface AvailableTimeslot {
  id: Number;
  name: string;
  email: string;
  appointmentType: string;
  appointment_date: string;
  end_time: string;
  start_time: string;
  user_id: null;
}

interface NewAppointmentModalProps {
  closeModal: () => void;
  isOpen: boolean;
}

const NewAppointmentModal = ({ closeModal, isOpen }: NewAppointmentModalProps) => {
  const dispatch = useDispatch();
  const [specialist, setSpecialist] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [description, setDescription] = useState("");
  const [availableTimeslots, setAvailableTimeslots] = useState<AvailableTimeslot[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const email = Cookies.get("email")
  const token = Cookies.get("token")
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/user/get_admins', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setSpecialists(response.data);
        }else if(response.status===401) {
          message.error(response.data.message)
          Cookies.remove("isAdmin")
          Cookies.remove("token")
          Cookies.remove("email")
  
          redirect('/login')
        
        }
      } catch (error) {
        message.error(error.response.data.error)
      }
    };

    fetchSpecialists();
  }, []);

  useEffect(() => {
    console.log(time)
  }, [time])
  

  useEffect(() => {
    const fetchTimeslots = async () => {
      if (specialist && date) {
        try {
          const response = await axios.post('http://127.0.0.1:5000/appointment/get_appointments', {
              specialist_email: specialists.filter((spe)=> specialist==spe.id)[0].email,
              appointment_date: date.toISOString().split("T")[0],  
          },{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            console.log(response.data)
            setAvailableTimeslots(response.data);
          }else if(response.status===401) {
            message.error(response.data.message)
            Cookies.remove("isAdmin")
            Cookies.remove("token")
            Cookies.remove("email")
    
            redirect('/login')
          
          }
        } catch (error) {
        message.error(error.response.data.error)

        }
      } else {
        setAvailableTimeslots([]);
      }
    };

    fetchTimeslots();
  }, [specialist, date]);

  const handleSubmit = async () => {
    if (date && specialist && time) {
      const appointmentId = time;
      try {
        const response = await axios.post('http://127.0.0.1:5000/appointment/book', {
          appointment_id: appointmentId,
          comment:description,
        },{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 201) {
          dispatch(
            addAppointment({
              appointment_date: date,
              id:appointmentId,
              start_time:availableTimeslots.filter((av)=> `${av.id}`=== time)[0].start_time,
              end_time:availableTimeslots.filter((av)=> `${av.id}`=== time)[0].start_time,
              appointmentType: "individual",
            })
          );
            message.success(response.data.success)
          closeModal();
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
        message.error(error.response.data.error)
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
        <h2 className={styles.modalTitle}>New Appointment</h2>
        <button onClick={closeModal} className={styles.modalClose}>
          &times;
        </button>
      </div>
      <div className={styles.modalBody}>
        <div className={styles.leftColumn}>
          <label>Specialist</label>
          <select
            className={styles.input}
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          >
            <option value="">Select specialist</option>
            {specialists.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
          <label>Time</label>
          <select
            className={styles.input}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!specialist}
          >
            <option value="">Select time</option>
            {availableTimeslots?.map((t, index) => (
              <option key={t.id.toString()} value={t.id.toString()}>
                {t.start_time} - {t.end_time}
              </option>
            ))}
          </select>
          <label>Description</label>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.datePickerWrapper}>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="yyyy-MM-dd"
            className={styles.datePicker}
            inline
          />
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
