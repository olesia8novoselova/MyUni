"use client";
import { useRouter } from 'next/navigation';
import ButtonLogin from '@/components/Buttons/ButtonLogin/ButtonLogin';
import styles from '@/app/Login/page.module.css';

export default function LoginPage() {


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ButtonLogin />
      </div>
    </div>
  );
}
