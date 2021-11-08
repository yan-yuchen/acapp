class Player extends AcGameObject {
    constructor(playground, x, y, radius, color, speed, is_me) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx=0;
        this.vy=0;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;
        this.eps = 0.1;
        this.move_length = 0;

    }

    start(){
        
        if (this.is_me) {
            this.add_listening_events();
        }
        
    }

    add_listening_events() {
        let outer = this;
        // 禁用右键呼出菜单
        this.playground.game_map.$canvas.on("contextmenu", function() {
            return false;
        });

        // 监听鼠标位置
        this.playground.game_map.$canvas.mousedown(function(e) {
            if (e.which === 3) {  // 1. 鼠标左键  2. 鼠标滚轮  3. 鼠标右键
                outer.move_to(e.clientX, e.clientY);
            }
        });
    }

    // 计算欧几里得距离，求出当前点到目标点的模长
    get_dist(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    //计算距离与角度
    move_to(tx, ty) {  // tx, ty表示需要移动到的目标点的x坐标和y坐标
        this.move_length = this.get_dist(this.x, this.y, tx, ty);  // 计算移动距离
        let angle = Math.atan2(ty - this.y, tx - this.x);        //arctan, 计算移动角度 y / x
        this.vx = Math.cos(angle);  // 单位圆上横方向的速度，乘1省略
        this.vy = Math.sin(angle);   // 单位圆上纵方向的速度，乘1省略
    }

    update(){
        
        if (this.move_length < this.eps) {
            this.move_length = 0;
            this.vx = this.vy = 0;
        }
        else 
        {
            let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
            //console.log(this.move_length);  //用于测试
            this.x += this.vx * moved;
            this.y += this.vy * moved;
            this.move_length -= moved;
        }
        

        this.render();
    }

    render() {     //渲染函数
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}



