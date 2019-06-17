import React, {Component} from 'react';
import styles from './styles.css'

import Snow from './components/snow'
import Smoke from './components/smoke'
import Unsnow from './components/unsnow'
import Thunder from './components/thunder'
import More from './components/more'

class Canshow extends Component {
  render() {
    return (
      <div ref={this.ref} className={styles.canshow} style={this.state.rootStyle}>
        {this.state.handleMethod === 'canvas' &&
        <canvas width={this.state.rootSize[0]} height={this.state.rootSize[1]}/>}
        {this.state.handleMethod === 'video' &&
        <video className={styles.video} style={this.state.videoStyle} autoPlay loop/>}
      </div>
    );
  }

  //------------------------------------------------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.config = this.props.config ? this.props.config : {
      opacity: 1,
      zIndex: 1,
      type: 'default'
    }
    this.ref = React.createRef()
    this.state = {
      rootSize: [100, 100],
      rootStyle: {
        zIndex: this.config.zIndex,
        opacity: this.config.opacity
      },
      canvasStyle: {
        // background: 'black'
      },
      videoStyle: {},
      handleBox: ['snow', 'rain', 'smoke', 'unsnow', 'thunder', 'more'],
      methodVideo: ['thunder', 'more'],
      handleMethod: 'canvas'
    }
  }

  componentDidMount() {
    this.init()
  }

  // componentWillUnmount() {
  //     removeEventListener()
  // }
  //------------------------------------------------------------------------------------------------------------------

  // 初始化
  init() {
    this.initSize();
    this.initMethod();
    setTimeout(() => {
      this.control(this.props.effect)
    })
  }

  initSize() {
    this.setState({
      rootSize: [this.ref.current.clientWidth, this.ref.current.clientHeight]
    })
  }

  initMethod() {
    let method = this.state.handleMethod;
    if (this.state.methodVideo.indexOf(this.props.effect) !== -1) method = 'video';
    this.setState({
      handleMethod: method
    })
  }

  onResize() {
    // window.addEventListener('resize',()=>{
    //     console.log('xixi')
    // })
    // window.onresize = () => {
    //     [...document.querySelectorAll('.canshow canvas')].map(e => {
    //         e.width = e.parentNode.clientWidth
    //         return null
    //     })
    // }
  }

  // 调度中心
  // import 异步
  // control(effect) {
  //   if (this.state.handleBox.indexOf(effect) === -1 || !effect) effect = 'snow';
  //   import('./components/' + effect + '.js').then(res => {
  //     let Show = res.default;
  //     let show = new Show(this.ref.current, this.props.config);
  //     show.init()
  //   })
  // }
  // 同步
  control(effect) {
    if (this.state.handleBox.indexOf(effect) === -1 || !effect) effect = 'snow';
    let show = new Snow(this.ref.current, this.config)
    switch (effect) {
      case'smoke':
        show = new Smoke(this.ref.current, this.config)
        break;
      case'unsnow':
        show = new Unsnow(this.ref.current, this.config)
        break;
      case'thunder':
        show = new Thunder(this.ref.current, this.config)
        break;
      case'more':
        show = new More(this.ref.current, this.config)
        break;
    }
    show.init()
  }
}

export default Canshow;
