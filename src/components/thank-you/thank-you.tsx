import React from 'react';
import styles from '../thank-you/thank-you-card.module.scss';

interface IThankyouCard{
    heading:string,
    subtitle:string
}

export const ThankyouCard:React.FC<IThankyouCard> = ({ heading, subtitle }) => {


  return <div className={styles.card}>
    <h4 data-testid="heading" className={styles.heading}>{heading}</h4>
    <p data-testid="subtitle">{subtitle}</p>
  </div>
}


