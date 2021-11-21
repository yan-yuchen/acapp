class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";    // 默认时web平台
        if (this.root.AcWingOS) this.platform = "ACAPP"; // 传入和接受的参数必须一致
        this.username = "";
        this.photo = "";

        this.$settings = $(`
        <div class="ac-game-settings">
        </div>
        `);
        
        this.root.$ac_game.append(this.$settings);
        this.start();
    }

    start() {
        this.getinfo();
    }

    register() {      // 打开注册界面

    }

    login() {       // 打开登录界面

    }

    getinfo() {
        let outer = this;
        $.ajax({        // 传入一个字典
            url:"https://app273.acapp.acwing.com.cn/settings/getinfo/",
            type:"GET",
            data: {
                platform: outer.platform,      // 需要什么数据就传入什么数据，这里传入平台类型
            },
            // 调用成功的回调函数
            success: function(resp) {
                console.log(resp);      // resp就是返回的值，函数getinfo_web()返回的dict字典会传入resp中
                if (resp.result === "success") {            
                    // 获取到用户信息到，将其存储下来
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();        // 隐藏当前界面
                    outer.root.menu.show();     // 打开菜单界面
                } else {        // 登录未成功的时候，打开登录界面
                    outer.login();  
                }
            }
        });
    }

    hide() {
        this.$settings.hide();
    }

    show() {
        this.$settings.show();
    }

}
