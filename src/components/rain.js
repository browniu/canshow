class Snow {
    constructor(root) {
        this.root = root
    }

    init() {
        this.render()
    }

    render() {
        const canvas = this.root.firstChild
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#3bd016";
        ctx.fillRect(120, 120, 100, 100);
    }
}

export default Snow;