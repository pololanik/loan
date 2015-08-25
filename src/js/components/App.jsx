import React, {PropTypes} from 'react';
import Slider from './Slider.jsx';
import CalculationView from './CalculationView.jsx';

export default React.createClass({

  _getCalculation() {
    let amount = this.refs.amount.getValue();
    let term = this.refs.term.getValue();
    this.props.handleChange(amount, term);
  },

  _onChangeSlider() {
    this._getCalculation()
  },

  render() {
    let {calculation, sliderConfig} = this.props;

    if (sliderConfig) {
      let {amountMin, amountMax, amountStep, amountDefaultValue,
        termMin, termMax, termStep, termDefaultValue} = sliderConfig;
        return (
        <div style={{width: 300}}>
          <Slider ref="amount" min={amountMin} max={amountMax} step={amountStep} defaultValue={amountDefaultValue} onChange={this._onChangeSlider}/>
          <Slider ref="term" min={termMin} max={termMax} step={termStep} defaultValue={termDefaultValue} onChange={this._onChangeSlider}/>
          {calculation && <CalculationView data={calculation}/>}
        </div>
      );
    } else {
      return <span/>;
    }
  }
});
