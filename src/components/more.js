class Thunder {
  constructor(root, config) {
    this.root = root
    this.config = config
    this.type = {
      default: 'https://test-1257187612.cos.ap-shanghai.myqcloud.com/more_movement_2.mp4',
    }
  }
    init() {
      const video = this.root.firstChild;
      video.src = this.type[this.config.type]
    }
}

export default Thunder;
