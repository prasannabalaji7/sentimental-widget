import './App.scss';
import styles from './assets/styles/animation-container.module.scss';
import React, { MouseEvent, useReducer } from 'react';
import { reducer, initialState } from './reducers/root-reducer';
import { ActionType } from './actions/root-action';
import Emoji from './components/emoji/emoji';
import { HelpUsImprove } from './components/help-us-improve/help-us-improve';
import { RatingScale } from './components/rate-scale/rate-scale';
import { FeedbackForm } from './components/feedback-form/feedback-form';
import { ThankyouCard } from './components/thank-you/thank-you';


function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentComponent, containerStyle } = state;
  let Component: any = "";
  function callDispatch (dispatch?:any,payload?:string){
    dispatch({ type: ActionType.UPDATE_COMPONENT, payload: payload})
  }

  const childAction = (value:string) => {
    callDispatch(dispatch,value);
  }

  const handleUserEvent = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    let name=e.currentTarget.getAttribute('data-name') || "";
    if (e.currentTarget.getAttribute('data-name') === "AFTERFEEDBACK") {
      callDispatch(dispatch,"RATESCALE");
    } else {
      callDispatch(dispatch,name);
    }
  };

  const handleLeave =(e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    let payload="";
    callDispatch(dispatch,payload);
  }
  

  if (currentComponent === "EMOJI") {
    Component = <Emoji handleEvent={handleUserEvent} />
  } else if (currentComponent === "HELPUSIMPOVE") {
    Component = <HelpUsImprove handleEvent={handleUserEvent} handleLeave={handleLeave}/>
  } else if (currentComponent === "RATESCALE") {
    Component = <RatingScale handleEvent={handleUserEvent} childAction={childAction}
      maximumRating={6} messageTextAfterRating='Thank you! Tell us more.' showMessageAfterRating={true}
      heading='Rate your experience' ratingLowText='Not Satisfied' ratingHighText='Very Satisfied' />
  } else if (currentComponent === "FEEDBACKFORM") {
    Component = <FeedbackForm formHeadingText='Tell us more'
      questionExperience='What did you like the most?'
      placeholderExperience='Tell us your experience (optional)'
      questionImprovement='What did you like the least?'
      placeholderImprovement='Let us know how we can improve (optional)'
      questionEmail='Your email'
      placeholderEmail='Your email address (optional)'
      sumbitButtonText='Submit' 
      handleEvent={handleUserEvent}      
      childAction={childAction} />
  }else if (currentComponent === "THANKYOUCARD")  {
    Component = <ThankyouCard heading='Thank you!' subtitle='Your feedback is valuable to us.'/>
    setTimeout(() => {
      callDispatch(dispatch,"");
    },3000);
  }

  return (
    <div className="parent">
      <div className="child">
        <div className="appContent">
          <div className={`${styles.root} ${styles[`${containerStyle}`]}`}>
            {Component}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
