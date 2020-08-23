import React, {MouseEvent} from 'react';
import styles from '../scale-selector/scale-selector.module.scss';

interface IScaleSelector {
    maximumRating:number,
    onRatingReceived:(rating:number) => void, 
    ratingLowText:string, 
    ratingHighText: string
    handleEvent:  (e: MouseEvent<HTMLInputElement>) => void
}

export const ScaleSelector:React.FC<IScaleSelector> = ({ maximumRating, onRatingReceived, ratingLowText, ratingHighText }) => {
  
  return <div className={styles.wrapper}>
    <ul className={styles.scaleSelector} data-testid="scale-selector-ul">
    {
      Array.from(Array(maximumRating), (v, k) => {
      const rating = k + 1;
      return <li key={rating} data-testid={`rating-li-elem-${rating}`}>
        <button data-testid={`rating-button-${rating}`} className={styles.buttonRating} onClick={(e)=>onRatingReceived(rating)}>
          { rating }
        </button>
      </li>
      })
    }
    </ul>
    <div className={styles.ratingText}>
      <small className={styles.text}>
        { ratingLowText }
      </small>
      <small className={styles.text}>
        { ratingHighText }
      </small>
    </div>
  </div>
}
