import React, {MouseEvent} from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from '../emoji/emoji.module.scss';
import emojiSVGUrl from '../../assets/images/smile.svg';

export interface IEmoji {
    handleEvent:  (e: MouseEvent<HTMLInputElement>) => void;
}

const Emoji: React.FC<IEmoji> =(props)=>{
    
    return (
        <CSSTransition in={true} classNames="emoji" timeout={200} unmountOnExit>
          <div className={styles.emojiWrapper}>
            <div data-testid="emoji-svg-url" data-name="EMOJI" style={{ backgroundImage: `url(${emojiSVGUrl})` }} className={styles.emoji} onMouseOver={props.handleEvent}>
              <span role="img" aria-label="Happy!" className={styles.emojiContent}></span>
            </div>
          </div>
        </CSSTransition>
    )
}

export default Emoji;