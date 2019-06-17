class Thunder {
  constructor(root, config) {
    this.root = root
    this.config = config
    this.type = {
      default: 'https://test-1257187612.cos.ap-shanghai.myqcloud.com/lighting2.mp4',
      pulse: 'https://test-1257187612.cos.ap-shanghai.myqcloud.com/lighting3.mp4',
      electric: 'https://test-1257187612.cos.ap-shanghai.myqcloud.com/lighting_electric.mp4'
    }
  }

  init() {
    const video = this.root.firstChild;
    video.src = this.type[this.config.type]
  }
}

export default Thunder;
