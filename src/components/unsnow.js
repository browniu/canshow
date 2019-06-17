class Unsnow {
    constructor(root, dom) {
        this.root = root
    }

    init() {
        const canvas = this.root.firstChild;
        // canvas.height = canvas.height / 3
        canvas.setAttribute('style', 'filter: blur(1px)');
        const ctx = canvas.getContext("2d");
        this.render(canvas, ctx)
    }

    render(canvas, ctx) {
        let width = canvas.width;
        let height = canvas.height;
        (function Snowy() {
            let flake, arr = [];
            let num = 120, tsc = 1, sp = 1;
            let sc = 0.5, mv = 20, min = 1;
            for (let i = 0; i < num; ++i) {
                flake = new geneFlake();
                flake.y = Math.random() * (height + 50);
                flake.x = Math.random() * width;
                flake.t = Math.random() * (Math.PI * 2);
                flake.sz = (100 / (10 + (Math.random() * 100))) * sc;
                flake.sp = (Math.pow(flake.sz * .8, 2) * .15) * sp;
                flake.sp = flake.sp < min ? min : flake.sp;
                arr.push(flake);
            }
            (function drop() {
                window.requestAnimationFrame(drop);
                ctx.clearRect(0, 0, width, height);
                ctx.fillRect(0, 0, width, height);
                ctx.fill();
                for (let i = 0; i < arr.length; ++i) {
                    let flake = arr[i];
                    flake.t += .05;
                    flake.t = flake.t >= Math.PI * 2 ? 0 : flake.t;
                    flake.y += -flake.sp;
                    flake.x += Math.sin(flake.t * tsc) * (flake.sz * .3);
                    if (flake.sz > 0.01) flake.sz -= 0.01;
                    if (flake.y < height * 0.75) {
                        flake.y = height - Math.random() * mv;
                        flake.sz = (100 / (10 + (Math.random() * 100))) * sc;
                    }
                    if (flake.x > width + mv) flake.x = -mv;
                    if (flake.x < -mv) flake.x = width + mv;
                    flake.draw();
                }
            })();

            function geneFlake() {
                this.draw = function () {
                    this.gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
                    this.gradient.addColorStop(0, 'hsla(57,266%,266%,1)');
                    this.gradient.addColorStop(1, 'hsla(144,210%,249%,0)');
                    ctx.moveTo(this.x, this.y);
                    ctx.fillStyle = this.gradient;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
                    ctx.fill();
                }
            }
        })()
    }
}

export default Unsnow;
