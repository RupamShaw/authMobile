import { SET_TOAST, RESET_TOAST } from './types';

export const INITIAL_STATE = {
  message: '',
  color: '#FF5959',
  duration: 5000,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOAST:
      return {
        ...state,
        message: action.message,
        color: action.color,
        duration: action.duration,
      };
    case RESET_TOAST:
      return {
        ...state,
        message: '',
      };
    default:
      return state;
  }
};
