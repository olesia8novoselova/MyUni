"use client";
import ButtonReg from '@/components/Buttons/ButtonReg/ButtonReg';
import styles from '@/app/Registration/page.module.css';

export default function RegistrationPage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ButtonReg />
      </div>
    </div>
  );
}
