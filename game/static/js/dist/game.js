class AcGameMenu{
    constructor(root){   //构造函数，传入acgame对象
        this.root=root;
        this.$menu=$(`
<div class="ac-game-menu">
    
</div>
`);
        this.root.$ac_game.append(this.$menu);
        
    }
}
class AcGame {
    constructor(id) {
        this.id = id;
        this.$ac_game = $('#' + id);   //将对象的id赋给ac_game
        this.menu = new AcGameMenu(this);  //创建菜单对象，调用其构造函数

    }

}

