import React from 'react';
import LoanStore from '../stores/LoanStore.js';
import LoanCreators from '../actions/LoanCreators.js';
import App from './App.jsx';

export default React.createClass({

  render() {
    let {data} = this.props;
    return (
      <div>
        Value: <strong>{data.value}</strong>
      </div>
    );
  }
});
