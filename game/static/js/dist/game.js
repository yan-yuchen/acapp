class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-field">
    <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
        单人模式
    </div>
    <br>
    <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">
        多人模式
    </div>
    <br>
    <div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
         设置
    </div>
 </div>
</div>
                                                                                   `);
        this.root.$ac_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.ac-game-menu-field-item-single-mode');
        this.$multi_mode = this.$menu.find('.ac-game-menu-field-item-multi-mode');
        this.$settings = this.$menu.find('.ac-game-menu-field-item-settings');

        this.start();     //在构造函数中调用start函数
    }

    start() {            //定义start函数
        this.add_listening_events();
    }

    add_listening_events() {    //监听函数
        let outer = this;
        this.$single_mode.click(function(){  //当被点击时调用
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mode.click(function(){
            console.log("click multi mode");
        });
        this.$settings.click(function(){
            console.log("click settings");
        });
    }

    show() {  // 显示menu界面
        this.$menu.show();
    }

    hide() {  // 关闭menu界面
        this.$menu.hide();
    }
}


let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);

        this.has_called_start = false;  // 是否执行过start函数
        this.timedelta = 0;  // 当前帧距离上一帧的时间间隔
    }

    start() {  // 只会在第一帧执行一次
    }

    update() {  // 每一帧均会执行一次
    }

    on_destroy() {  // 在被销毁前执行一次
    }

    destroy() {  // 删掉该物体
        this.on_destroy();

        for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;   //上一帧的时间
let AC_GAME_ANIMATION = function(timestamp) {  //传入的参数是时间
    for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
        let obj = AC_GAME_OBJECTS[i];
        if (!obj.has_called_start) { //如果没有执行过第一帧，就执行start函数
            obj.start();
            obj.has_called_start = true;
        } else {                    //如果执行过第一帧
            obj.timedelta = timestamp - last_timestamp; //计算时间间隔，所有物件都是按时间移动的，按帧来移动可能会因为浏览器不同而造成最终移动速度不同
            obj.update();
        }
    }
    last_timestamp = timestamp;

    requestAnimationFrame(AC_GAME_ANIMATION); //递归调用
}


requestAnimationFrame(AC_GAME_ANIMATION); //告诉浏览器，希望执行一个动画，并要求浏览器在下次重绘之前使用指定的回调函数更新动画
class GameMap extends AcGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.$canvas = $(`<canvas></canvas>`);  //使用canvas
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);
    }

    start() {
    }

    update() {
        this.render();
    }
    
    //渲染函数
    render() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}

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



class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`);

        //this.hide();
        this.root.$ac_game.append(this.$playground);

        //canvas settings
        this.width = this.$playground.width();
        this.height = this.$playground.height();

        // 创建地图(canvas)
        this.game_map = new GameMap(this);

        // 创建玩家
        this.players = [];
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.15, true));

        this.start();
    }

    start() {
    }

    show() {  // 打开playground界面
        this.$playground.show();
    }

    hide() {  // 关闭playground界面
        this.$playground.hide();
    }
}


export class AcGame {
    constructor(id) {
        this.id = id;
        this.$ac_game = $('#' + id);
        this.menu = new AcGameMenu(this);
        this.playground = new AcGamePlayground(this);

        this.start();
    }

    start() {
    }
}

