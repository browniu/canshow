import React, {Component} from 'react';
import Canshow from 'canshow'
import Highlight from 'react-highlight'
import "highlight.js/styles/atom-one-dark.css";

class Canvas extends Component {
  render() {
    return (
      <div className={'canshowTemp'}>
        <div className="banner">
          <div className="button"/>
          {this.state.selectAble && <Canshow effect={this.state.selected} config={{type: this.state.selectedType}}/>}
        </div>
        <div className="panel">
          <select name="effect" id="effect" onChange={(e) => {
            this.setState({selected: e.target.value, selectAble: false})
            setTimeout(() => this.setState({selectAble: true}))
          }}>
            {Object.keys(this.state.selects).map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          {this.state.selects[this.state.selected].length > 1 &&
          <select name="type" id="type" onChange={(e) => {
            this.setState({selectedType: e.target.value, selectAble: false})
            setTimeout(() => this.setState({selectAble: true}))
          }}>
            {this.state.selects[this.state.selected].map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          }
        </div>
        <Highlight language="jsx">
          {`<Canshow effect={'${this.state.selected}'} config={{type: '${this.state.selectedType}'}}/>`}
        </Highlight>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      selects: {
        snow: ['default'],
        unsnow: ['default'],
        smoke: ['default'],
        thunder: ['default', 'pulse', 'electric'],
        more:['default']
      },
      selected: 'snow',
      selectedType: 'default',
      selectAble: true
    }
  }

}

export default Canvas;
