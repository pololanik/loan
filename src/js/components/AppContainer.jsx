import React from 'react';
import LoanStore from '../stores/LoanStore.js';
import LoanCreators from '../actions/LoanCreators.js';
import App from './App.jsx';

export default React.createClass({

  getInitialState() {
    return {
      sliderConfig: null,
      calculation: null,
      amount: null,
      term: null
    }
  },

  componentDidMount() {
    LoanCreators.getSlidersConfig();
    LoanStore.addChangeListener(this._onChange);
  },

  componentDidUpdate(prevProps, prevState) {
    let {amount, term} = this.state;

    if (amount !== null && term !== null) {
      var calc = LoanStore.getCalculation(amount,term);
      if (!calc) { // get calculation from server
        LoanCreators.getCalculation(amount,term)
      } else if (calc !== this.state.calculation) { // get calculation from cache
        this.setState({
          calculation: calc
        });
      }
    }
  },

  componentWillUnmount() {
    LoanStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    let {amount, term} = this.state;
    this.setState({
      calculation: LoanStore.getCalculation(amount, term),
      sliderConfig: LoanStore.getSlidersConfig()
    });
  },

  _handleChange(amount, term) {
    this.setState({
      amount: amount,
      term: term
    });
  },

  render() {
    let {calculation, sliderConfig} = this.state;
    return (
      <App calculation={calculation} sliderConfig={sliderConfig} handleChange={this._handleChange}/>
    );
  }
});
