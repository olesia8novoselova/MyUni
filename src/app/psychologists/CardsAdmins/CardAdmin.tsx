"use client";
import styles from "./CardAdmin.module.css";

interface CardAdminProps {
    name: string;
    tg: string;
    image: string;
    language: string;
    description: string;
    onClick: () => void;
}

const CardAdmin = ({ name, tg, image, language, description, onClick }: CardAdminProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img
                    src={image}
                    alt="Psychologist"
                    className={styles.image}
                />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.name}>{name}</div>
                <div className={styles.tg}>{tg}</div>
                <div className={styles.language}>{language}</div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={onClick}>
                    Make an appointment
                </button>
            </div>
        </div>
    );
}

export default CardAdmin;