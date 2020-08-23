import React, { useEffect, useState, MouseEvent} from 'react';
import { CSSTransition } from 'react-transition-group';
import { CloseButton } from '../close-button/close-button';
import styles from '../feedback-form/feedback-form.module.scss';

const initialLocalState = {
  mounted: false,
  likedMost: '',
  likedLeast: '',
  email: ''  
};

interface IFeedbackForm {
  formHeadingText: string,
  questionExperience: string,
  placeholderExperience: string,
  questionImprovement: string,
  placeholderImprovement: string,
  questionEmail: string,
  placeholderEmail: string,
  sumbitButtonText: string,
  childAction : (value:string)=>void;
  handleEvent:  (e: MouseEvent<HTMLInputElement>) => void;
}

export const FeedbackForm : React.FC<IFeedbackForm>  = ({ handleEvent,childAction,questionExperience, placeholderExperience, questionImprovement, placeholderImprovement, questionEmail, placeholderEmail, sumbitButtonText, formHeadingText }) => {
  const [localState, setLocalState] = useState(initialLocalState);

  useEffect(() => {
    if (!localState.mounted) {
      setLocalState({ ...localState, mounted: true });
    }    
  }, [localState])

  const { mounted, likedLeast, likedMost, email } = localState;
  const isSubmitButtonDisabled = likedLeast === "" && likedMost === "" && email === "";

   return <CSSTransition 
    in={mounted} 
    classNames={{ 
      enter: styles.formEnter, 
      appear: styles.FormAppear, 
      enterDone: styles.formEnterDone,
      exit: styles.formExit,
      exitActive: styles.formExitActive,
      exitDone: styles.formExitDone
    }} 
    timeout={{ appear: 100, enter: 200, exit: 200 }}
    >
    <div className={styles.form}>
      <div className={styles.header}>
        <CloseButton positionTop={0} positionRight={0} handleEvent={(e)=>handleEvent} childAction={childAction}/>
        <h4 data-testid="form-heading">{formHeadingText}</h4>
      </div>
      <form className={styles.body}>
        <div className={styles.formGroup}>
          <label data-testid="question-experience-label" className={styles.label}>{questionExperience}</label>
          <textarea data-testid="question-experience-textarea" value={likedMost}  onChange={(e) => setLocalState({ ...localState, likedMost: e.target.value  })} placeholder={placeholderExperience}></textarea>
        </div>

        <div className={styles.formGroup}>
          <label data-testid="improve-experience-label"  className={styles.label}>{ questionImprovement }</label>
          <textarea data-testid="improve-experience-textarea" value={likedLeast} onChange={(e) => setLocalState({ ...localState, likedLeast: e.target.value  })}  placeholder={placeholderImprovement}></textarea>
        </div>

        <div className={styles.formGroup}>
          <label data-testid="email-input-label" className={styles.label}>{questionEmail}</label>
          <input data-testid="email-input" value={email} onChange={(e) => setLocalState({ ...localState, email: e.target.value  })}  type="email" placeholder={placeholderEmail} />        
        </div>

        <div className={styles.submitButtonStyles}>
          <button data-testid="submit-button" onClick={(e)=>{
               e.preventDefault();
               childAction("FEEDBACKFORM");
            }} disabled={isSubmitButtonDisabled}>{sumbitButtonText}</button>
        </div>
      </form>
    </div>
  </CSSTransition>
}

