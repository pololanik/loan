/**
 * Created by petrpololanik on 25.08.15.
 */
import LoanCreators from '../actions/LoanCreators.js';
import jquery from 'jquery';
import modRewrite from 'connect-modrewrite';

export default {
  getCalculation(amount,term) {
    setTimeout(() => {
      LoanCreators.receiveCalculation(amount,term,{
        value: parseInt(Math.random()*1000)
      })
    },50);
  },

  getSlidersConfig() {
    setTimeout(() => {
      LoanCreators.receiveSlidersConfig({
        amountMin: 5000,
        amountMax: 20000,
        amountStep: 500,
        amountDefaultValue: 5000,
        termMin: 3,
        termMax: 12,
        termStep: 1,
        termDefaultValue: 3
      })
    },50);
  }
};

