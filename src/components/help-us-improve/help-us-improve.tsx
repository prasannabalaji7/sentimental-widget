import React, { useState, useEffect , MouseEvent} from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from '../help-us-improve/help-us-improve.module.scss';

export interface IHelpUsImprove {
    handleLeave :  (e: MouseEvent<HTMLInputElement>) => void;
    handleEvent:  (e: MouseEvent<HTMLInputElement>) => void;
}


export const HelpUsImprove: React.FC<IHelpUsImprove> = (props) => {
  const [state, setState] = useState({ mounted: false });
  useEffect(() => {
    if (!state.mounted) {
      setState({ mounted: true });
    }    
  }, [state])

  const { mounted } = state;

  return <CSSTransition in={mounted} data-name="HELPUSIMPROVE" onClick={props.handleEvent} onMouseLeave={props.handleLeave} classNames={{ enter: styles.buttonEnter, appear: styles.buttonAppear, enterDone: styles.buttonEnterDone }} timeout={{ appear: 100, enter: 200, exit: 200 }}>
      <button data-testid="button-text" className={styles.button}>HELP US IMPROVE</button>
  </CSSTransition>
}
