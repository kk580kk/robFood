
'ui';
ui.layout(
    <relative w='*' h='*' bg='#426e6d'>
        <text id='title' w='auto' h='auto' text='上海疫情买菜辅助工具' textColor1='#7A000000' textSize='{{device.width/10}}px'
            shadowColor='#000000' shadowRadius='20' />
        <text id="pre1" w='auto' h='auto' padding='10' marginTop='-10' textSize='20dp'
            layout_below='title' shadowColor='#000000' shadowRadius='5' text="权限要求：" />
        <text id="pre2" w='auto' h='auto' padding='10' marginTop='-10' textSize='20dp'
            layout_below='pre1' shadowColor='#000000' shadowRadius='5' text="1. 无障碍操作 权限" />
        <text id="pre3" w='auto' h='auto' padding='10' marginTop='-10' textSize='20dp'
            layout_below='pre2' shadowColor='#000000' shadowRadius='5' text="2. 悬浮窗口 权限" />
        <text id="body1" w='auto' h='auto' padding='10' marginTop='-10' textSize='20dp'
            layout_below='pre3' shadowColor='#000000' shadowRadius='5' text="使用办法：" />
        <text id="body2" w='auto' h='auto' padding='10' marginTop='-10' textSize='20dp'
            layout_below='body1' shadowColor='#000000' shadowRadius='5' text="1. 叮咚/盒马购物车添加好需要购买的菜品" />
        <text id="body3" w='auto' h='auto' padding='10' marginTop='-10' textSize='20dp'
            layout_below='body2' shadowColor='#000000' shadowRadius='5' text="2. 打开本程序" />
        <text id="body4" w='auto' h='auto' padding='10' marginTop='-10' textSize='20dp'
            layout_below='body3' shadowColor='#000000' shadowRadius='5' text="3. 切换回叮咚/盒马" />
        <text id="body5" w='auto' h='auto' padding='10' marginTop='-10' textSize='20dp'
            layout_below='body4' shadowColor='#000000' shadowRadius='5' text="4. 打开购物车页面，选中购买项" />
        <text id="body6" w='auto' h='auto' padding='10' marginTop='-10' textSize='20dp'
            layout_below='body5' shadowColor='#000000' shadowRadius='5' text="5. 通过悬浮球启动脚本" />
        <text id="body7" w='auto' h='auto' padding='10' marginTop='-10' textSize='20dp'
            layout_below='body6' shadowColor='#000000' shadowRadius='5' text="6. 停止脚本是【悬浮窗第三个】" />
    </relative>
);

/**
 * Auto Js 悬浮球
 */

//导入FloatButton模块
var { FloatButton, FloatButtonConfig } = require('./FloatButton/init');

let fb = new FloatButton();

//修改停靠动画时间
FloatButtonConfig.time.direction = 510;

/**
 * 悬浮球创建事件
 */
fb.on('create', function () {
    //设置logo图标
    fb.setIcon('file://res/logo.png');
    //设置logo图标着色
    //fb.setTint('#FFFFFF');
    //设置logo背景颜色
    fb.setColor('#FFFFFF');
    //设置所有按钮大小 默认40
    fb.setAllButtonSize(42);
    //设置所有按钮内边距 默认8
    //fb.setAllButtonPadding(8);

    //添加菜单按钮
    fb.addItem('叮咚买菜')
        //设置图标
        .setIcon('file://res/dingdong.png')
        //图标着色
        .setTint('#FFFFFF')
        //背景颜色
        .setColor('#019581')
        //点击事件
        .onClick((view, name) => {
            toastLog('启动【' + name + '】脚本')
            //返回 true:保持菜单开启 false:关闭菜单
            setTimeout(() => {
                StartDingdong();
            }, 100);
            engines.execScript(
                "robfood:dingdong",
                "var StartDingdong = require('./dingdong').Start;\n" +
                "StartDingdong();\n"
            );
            return false;
        });

    fb.addItem('盒马鲜生')
        //设置图标
        .setIcon('file://res/hema.png')
        //图标着色
        .setTint('#FFFFFF')
        //背景颜色
        .setColor('#019581')
        //点击事件
        .onClick((view, name) => {
            toastLog('启动【' + name + '】脚本')
            //返回 true:保持菜单开启 false:关闭菜单
            engines.execScript(
                "robfood:hema",
                "var StartHema = require('./hema').Start;\n" +
                "StartHema();\n"
            );
            return false;
        });

        fb.addItem('STOP')
        //设置图标
        .setIcon('file://res/stop.png')
        //图标着色
        .setTint('#FFFFFF')
        //背景颜色
        .setColor('#019581')
        //点击事件
        .onClick((view, name) => {
            toastLog('启动【' + name + '】脚本')
            //返回 true:保持菜单开启 false:关闭菜单
            engines.stopAllAndToast()
            return false;
        });
    fb.setAutoCloseMenuTime(3000);
});

//菜单按钮点击事件
fb.on('item_click', (view, name, state) => {
    //如果在addItem中添加了onClick事件 则不会在这里触发
    toastLog('item_click:' + name);
    //返回 true:保持菜单开启 false:关闭菜单
    return false;
});

//UI联动
//菜单状态改变事件
fb.on('menu_state_changed', value => {
    log('菜单状态 : ' + (value ? '开启' : '关闭'))
});

//停靠方向改变事件
fb.on('direction_changed', value => {
    log('停靠方向 : ' + (value ? '右侧' : '左侧'))
});

//屏幕方向改变事件
fb.on('orientation_changed', value => {
    log('屏幕方向:', '屏幕方向 : ' + (value ? '横屏' : '竖屏'))
});

//按钮显示事件
fb.on('show', () => {
    log('悬浮窗显示');
});

//按钮隐藏事件
fb.on('hide', () => {
    log('悬浮窗隐藏');
});


fb.show()
