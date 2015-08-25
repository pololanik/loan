import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import LoanAPI from '../utils/LoanAPI.js';

export default {
  getCalculation(amount, term) {
    LoanAPI.getCalculation(amount, term);
  },

  receiveCalculation(amount, term,data) {
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.RECEIVE_CALCULATION,
      amount: amount,
      term: term,
      data: data
    });
  },

  getSlidersConfig() {
    LoanAPI.getSlidersConfig();
  },

  receiveSlidersConfig(data) {
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.RECEIVE_SLIDERS_CONFIG,
      data: data
    });
  }
};
