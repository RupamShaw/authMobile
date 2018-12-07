import React from 'react';
import { connect } from 'react-redux';
import {
  string,
  func,
  number,
} from 'prop-types';
import { resetToast } from './store/actions';
import { Toast } from './Toast';
import {
  ERROR_COLOR,
} from '../../baseStyles';
import Config from '../../config';

export class ToastWrapper extends React.Component {
  componentDidUpdate(prevProps) {
    const { message, duration } = this.props;
    if (prevProps.message === '' && message !== '') {
      this.timeoutHandle = setTimeout(this.closeTimer, duration);
    }
  }

  closeTimer=() => {
    const { dispatchResetToast } = this.props;
    clearTimeout(this.timeoutHandle);
    dispatchResetToast();
  }

  render() {
    const { message, color, duration } = this.props;
    return message !== ''
      ? <Toast message={message} color={color} duration={duration} handleClose={this.closeTimer} />
      : null;
  }
}

const mapStateToProps = state => ({
  message: state.toast.message,
  color: state.toast.color,
  duration: state.toast.duration,
});

const mapDispatchToProps = dispatch => ({
  dispatchResetToast: () => dispatch(resetToast()),
});

ToastWrapper.defaultProps = {
  duration: Config.ToastMessageDuration,
  color: ERROR_COLOR,
};

ToastWrapper.propTypes = {
  message: string.isRequired,
  color: string,
  dispatchResetToast: func.isRequired,
  duration: number,
};

export const ConnectToastWrapper = connect(mapStateToProps, mapDispatchToProps)(ToastWrapper);
