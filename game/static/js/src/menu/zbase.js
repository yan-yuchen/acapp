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
