import { ActionType } from "../actions/root-action";
import { Action, Reducer } from 'redux';
import {NEXT_COMPONENT,PARENT_CLASS} from '../enum';


interface InitialStateInterface {
  currentComponent:string,
  containerStyle :string
}
export const initialState: InitialStateInterface = {
  currentComponent: "EMOJI",
  containerStyle : PARENT_CLASS.DEFAULT
}

export interface DispatchAction extends Action {
  payload: any;
}


export const reducer: Reducer<InitialStateInterface,DispatchAction> = (state=initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_COMPONENT: {
      const updatedState = Object.assign({}, state);
      switch(action.payload){
        case "EMOJI":
        updatedState.currentComponent = NEXT_COMPONENT.EMOJI;
        updatedState.containerStyle = PARENT_CLASS.STEP_1
        return updatedState;
        case "HELPUSIMPROVE":
        updatedState.currentComponent = NEXT_COMPONENT.HELPUSIMPOVE;
        updatedState.containerStyle = PARENT_CLASS.STEP_2
        return updatedState;
        case "AFTERRATING":
        updatedState.currentComponent = NEXT_COMPONENT.RATESCALE;
        updatedState.containerStyle = PARENT_CLASS.STEP_3
        return updatedState;
        case "FEEDBACKFORM":
        updatedState.currentComponent = NEXT_COMPONENT.FEEDBACKFORM;
        updatedState.containerStyle = PARENT_CLASS.STEP_2
        return updatedState;
        default:
        updatedState.currentComponent = "EMOJI";
        updatedState.containerStyle = PARENT_CLASS.DEFAULT
        return updatedState;

      }
    }

    default: return initialState;
  }
};