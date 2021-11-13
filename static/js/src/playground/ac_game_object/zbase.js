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
