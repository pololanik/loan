import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

let _calculations = []; // cache
let _slidersConfig = null;

function setCalculation(amount, term, calculation) {
  _calculations[`${amount}_${term}`] = calculation;
}

function setSliders(slidersConfig) {
  _slidersConfig = slidersConfig;
}

const LoanStore = assign({}, BaseStore, {
  getCalculation(amount, term) {
    return _calculations[`${amount}_${term}`] || null;
  },

  getSlidersConfig() {
    return _slidersConfig;
  },

  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;

    switch (action.type) {
      case Constants.ActionTypes.RECEIVE_CALCULATION:
        setCalculation(action.amount, action.term, action.data);
        LoanStore.emitChange();
        break;

      case Constants.ActionTypes.RECEIVE_SLIDERS_CONFIG:
        setSliders(action.data);
        LoanStore.emitChange();
        break;

      default:
        break;
    }
  })
});

export default LoanStore;
