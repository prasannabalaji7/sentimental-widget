import React, { useState, useEffect, MouseEvent } from 'react';
import { CSSTransition } from 'react-transition-group';
import  Emoji   from '../emoji/emoji';
import styles from '../rate-scale/rating-scale.module.scss';
import { ScaleSelector } from '../scale-selector/scale-selector';
import { CloseButton } from '../close-button/close-button';

export interface IRatingScale {
    maximumRating: number,
    messageTextAfterRating: string,
    showMessageAfterRating: boolean,
    heading: string,
    ratingLowText: string,
    ratingHighText: string,
    handleEvent:  (e: MouseEvent<HTMLInputElement>) => void
    childAction:(value:string)=>void
}

const initialState = {
  mounted: false, 
  rating: 0
};

export const RatingScale: React.FC<IRatingScale> = (props) => {
  const [state, setState] = useState(initialState);
  const { heading, showMessageAfterRating, messageTextAfterRating, childAction,...rest } = props;

  useEffect(() => {
    if (!state.mounted) {
      setState({...state, mounted: true });
    }
  }, [state]);

  const { mounted, rating } = state;
  const onRatingReceived = (ratedValue:number) => {
    setState({ ...state,rating: ratedValue });
  }

  if (showMessageAfterRating && rating !== 0 && typeof rating === 'number') {
    return <div className={styles.onRatingReceived}>
      <div className={styles.emojiWrapper}>
      <Emoji handleEvent={props.handleEvent}/>  
      </div>
      <h4 data-testid="message-text-after-rating" data-name="AFTERRATING" onClick={props.handleEvent}>{messageTextAfterRating}</h4>
    </div>
  }

  return <div>
      <CloseButton transitionTo="EMOJI" positionTop={0} positionRight={0} color={'#999'} handleEvent= {props.handleEvent} childAction={childAction}/>
      <CSSTransition in={mounted} classNames={{ appear: styles.heading_appear, enter: styles.heading_enter, enterDone: styles.heading_enter_done }} timeout={450} unmountOnExit>
        <h4 data-testid="heading" className={styles.headingText}>{heading}</h4>
      </CSSTransition>
      <CSSTransition in={mounted} classNames={{ appear: styles.selector_appear, enter: styles.selector_enter, enterDone: styles.selector_enter_done}} timeout={{ appear: 200, enter: 800 }} unmountOnExit>
        <ScaleSelector {...rest} 
        onRatingReceived={onRatingReceived} 
        />
      </CSSTransition>
    </div>
}

