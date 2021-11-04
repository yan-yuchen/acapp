class AcGame {
    constructor(id) {
        this.id = id;
        this.$ac_game = $('#' + id);   //将对象的id赋给ac_game
        this.menu = new AcGameMenu(this);  //创建菜单对象，调用其构造函数

    }

}

