class Smoke {
    constructor(root, dom) {
        this.root = root
    }

    init() {
        const canvas = this.root.firstChild;
        canvas.height = canvas.height / 3
        canvas.setAttribute('style', 'position:absolute;bottom:-2px;top:unset;filter: blur(1px);')
        const ctx = canvas.getContext("2d");
        this.render(canvas, ctx)
    }

    render(canvas, ctx) {

        // 预设参数
        let params = {
            count: 50,
            velocity: 0.5,
            url: 'https://test-1257187612.cos.ap-shanghai.myqcloud.com/smoke_texture_5.png'
        };

        // 创建存储粒子的数组
        let smokes = [];

        // 画布的尺寸
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        // 创建材质
        let imageObj = new Image();
        imageObj.src = params.url;
        imageObj.onload = () => {
            smokes.forEach((particle) => {
                particle.setImage(imageObj);
            });
        };


        // 粒子实例方法
        function Smoke(context) {

            // 设置初始位置
            this.x = 0;
            this.y = 0;

            // 纵横速度
            this.xVelocity = 0;
            this.yVelocity = 0;

            // 圆角大小
            this.radius = 7;

            // 存储上下文，绘制的时候需要
            this.context = context;

            // 绘制粒子的具体方法
            this.draw = () => {
                if (this.image) {
                    this.context.globalAlpha = this.alpha;
                    let fillWidth = canvasWidth / 2.3
                    let fillHeight = fillWidth - fillWidth * (this.x / canvasWidth * this.y / canvasHeight)
                    this.context.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight, this.x, this.y, fillWidth, fillHeight);
                }
            };

            // 刷新粒子
            this.update = () => {
                // 改变粒子的位置
                this.x += this.xVelocity;
                this.y += this.yVelocity;

                // 边界检测
                // 右边缘
                if (this.x >= canvasWidth + 100) {
                    this.xVelocity = -this.xVelocity;
                    this.x = canvasWidth + 100;
                }
                // 左边缘
                else if (this.x <= -100) {
                    this.xVelocity = -this.xVelocity;
                    this.x = -100;
                }
                // 底边缘
                if (this.y >= canvasHeight + 20) {
                    this.yVelocity = -this.yVelocity;
                    this.y = canvasHeight + 20;
                }
                // 上边缘
                else if (this.y <= 0) {
                    this.yVelocity = -this.yVelocity;
                    this.y = 0;
                }
                // 越靠近边缘，透明度越低
                // 纵向透明度变化要比横向的明显
                this.alpha = (1 - Math.abs(canvasWidth * 0.5 - this.x) / canvasWidth) * (0.7 - Math.abs(canvasHeight * 0.5 - this.y) / canvasHeight);
            };

            // 设置粒子位置方法
            this.setPosition = (x, y) => {
                this.x = x;
                this.y = y;
            };

            // 设置速度方法
            this.setVelocity = (x, y) => {
                this.xVelocity = x;
                this.yVelocity = y;
            };

            this.setImage = (image) => {
                this.imageWidth = image.width;
                this.imageHeight = image.height;
                this.image = image;
            }
        }

        // 生成一个min,max大小之间的随机数
        function generateRandom(min, max) {
            return Math.random() * (max - min) + min;
        }

        // 初始化
        if (canvas.getContext) {
            // 创建粒子，并设置他们的位置什么的，当然都是随机的
            for (let i = 0; i < params.count; ++i) {
                let smoke = new Smoke(ctx);

                // 随机位置
                smoke.setPosition(generateRandom(-300, canvasWidth), generateRandom(0, canvasHeight));

                // 设置随机速度
                smoke.setVelocity(generateRandom(-params.velocity, params.velocity), generateRandom(-params.velocity, params.velocity));
                smokes.push(smoke);
            }
        }

        // 绘制
        (function draw() {
            // 清除画布
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            // 重绘粒子
            smokes.forEach(function (particle) {
                particle.draw();
            });
            // 刷新粒子
            smokes.forEach((smoke) => {
                smoke.update();
            });
            // 请求动画帧
            window.requestAnimationFrame(() => {
                draw();
            })
        })()
    }
}

export default Smoke;