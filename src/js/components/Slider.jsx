import React, {PropTypes} from 'react';

export default React.createClass({
  propTypes: {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    defaultValue: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired
  },

  getInitialState() {
    let {defaultValue} = this.props;
    return {
      numberOfSegments: this._getNumberOfSegments(),
      value: defaultValue,
      mouseDown: false
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this._triggerChange();
    }
  },

  _getNumberOfSegments() {
    let {min,max, step} = this.props;
    return (max - min) / step;
  },

  _getSegmentFromEvent(e) {
    let {numberOfSegments} = this.state;
    let sliderWidth = this.refs.main.getDOMNode().clientWidth;
    let posPercent = e.pageX / sliderWidth;
    return Math.round(posPercent * numberOfSegments);
  },

  _getValueFromSegment(segmentNumber) {
    let {min, step} = this.props;
    return min + step * segmentNumber;
  },

  _getPercentFromSegment(segmentNumber) {
    let {numberOfSegments} = this.state;
    return segmentNumber / numberOfSegments * 100;
  },

  _getPercentFromValue(value) {
    let {numberOfSegments} = this.state;
    let {min, step} = this.props;
    return (value - min) / step / numberOfSegments * 100;
  },

  _getHandleStyle() {
    let {value} = this.state;
    return {
      left: this._getPercentFromValue(value) + '%'
    }
  },

  _triggerChange() {
    let {value} = this.state;
    let {onChange} = this.props;
    if (onChange) {
      onChange(value);
    }
  },

  _getSelectOptios() {
    let {numberOfSegments} = this.state;

    let options = [];
    for (let i = 0; i <= numberOfSegments; i++) {
      let value = this._getValueFromSegment(i);
      options.push(<option key={i} value={value}>{value}</option>)
    }

    return options;
  },

  _setValueFromEvent(e) {
    let segmentNumber = this._getSegmentFromEvent(e);
    this.setState({
      handlePos: segmentNumber
    });

    let value = this._getValueFromSegment(segmentNumber);
    this.setState({
      value: value
    });
  },

  _handleClick(e) {
    //this._setValueFromEvent(e);
  },

  _handleChange(e) {
    this.setState({
      value: e.target.value
    });
  },

  _handleMouseDown(e) {
    this._setValueFromEvent(e);
    this.setState({
      mouseDown: true
    })
  },
  _handleMouseMove(e) {
    if (this.state.mouseDown) {
      this._setValueFromEvent(e);
    }
  },

  _handleMouseUp() {
    this.setState({
      mouseDown: false
    })
  },

  _handleMouseLeave() {
    this.setState({
      mouseDown: false
    })
  },

  setValue(value) {
    this.setState({
      value: value
    })
  },

  getValue() {
    let {value} = this.state;
    return value;
  },

  render() {
    let {min, max} = this.props;
    let {value} = this.state;
    return (
      <div className="slider" ref="main">
        <div className="meter"/>
        <div className="handle" style={this._getHandleStyle()}/>
        <div className="topLayer"
             onMouseDown={this._handleMouseDown}
             onMouseUp={this._handleMouseUp}
             onMouseMove={this._handleMouseMove}
             onMouseLeave={this._handleMouseLeave}
             onClick={this._handleClick}
          />
        <span className="min">{min}</span>
        <span className="max">{max}</span>
        <select onChange={this._handleChange} value={value}>
          {this._getSelectOptios()}
        </select>
      </div>
    );
  }
});
