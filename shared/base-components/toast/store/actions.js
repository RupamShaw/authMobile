import {
  SET_TOAST,
  RESET_TOAST,
} from './types';

export function setToast(message, color, duration) {
  return ({
    type: SET_TOAST,
    message,
    color,
    duration,

  });
}

export function resetToast() {
  return ({
    type: RESET_TOAST,
    message: '',
  });
}
