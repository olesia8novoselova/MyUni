// src/app/admin/stats/stats.tsx
"use client";
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './stats.module.css';

interface Data {
  totalSessions: number;
  individualSessions: number;
  groupSessions: number;
  ageDistribution: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  genderDistribution: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
  loyalClients: number;
  avgTherapyDuration: number;
  reviewsCount: number;
  avgReviewRating: number;
}

const data: Data = {
  totalSessions: 120,
  individualSessions: 80,
  groupSessions: 40,
  ageDistribution: {
    labels: ['<18', '18-25', '26-35', '36-45', '46-60', '60+'],
    datasets: [
      {
        label: 'Возраст',
        data: [5, 20, 30, 25, 20, 10],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  },
  genderDistribution: {
    labels: ['Мужчины', 'Женщины', 'Другие'],
    datasets: [
      {
        label: 'Пол',
        data: [50, 60, 10],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  },
  loyalClients: 40,
  avgTherapyDuration: 8,
  reviewsCount: 30,
  avgReviewRating: 4.5,
};

const Stats: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Статистика для Психолога</h1>
      <div>
        <h2>Общее количество сессий: {data.totalSessions}</h2>
        <h3>Индивидуальные сессии: {data.individualSessions}</h3>
        <h3>Групповые сессии: {data.groupSessions}</h3>
      </div>

      <div>
        <h2>Распределение клиентов по возрасту</h2>
        <Bar data={data.ageDistribution} />
      </div>

      <div>
        <h2>Распределение клиентов по полу</h2>
        <Pie data={data.genderDistribution} />
      </div>

      <div>
        <h2>Количество постоянных клиентов: {data.loyalClients}</h2>
        <h2>Средняя продолжительность терапии: {data.avgTherapyDuration} недель</h2>
      </div>

      <div>
        <h2>Количество полученных отзывов: {data.reviewsCount}</h2>
        <h2>Средняя оценка качества сессий: {data.avgReviewRating}</h2>
      </div>
    </div>
  );
};

export default Stats;
