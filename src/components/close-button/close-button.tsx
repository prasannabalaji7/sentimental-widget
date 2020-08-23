import React, {MouseEvent}from 'react';
import styles from '../close-button/close_button.module.scss';

export interface ICloseButton {
    transitionTo?:any,
    positionTop:number,
    positionRight?:number,
    color?:string,
    handleEvent: (e:MouseEvent<HTMLInputElement>)=>void,
    childAction:(value:string)=>void
}

export const CloseButton:  React.FC<ICloseButton> = ({handleEvent,childAction, positionTop: top, positionRight: right, color }) => {
  return <button style={{ color, top, right  }} className={styles.button} onClick={(e)=>childAction("")}>
    &times;
  </button>
}
