const hasText = (text) => {
	return textStartsWith(text).exists() // 是否存在指定文本
}
const musicNotify = () => {
	const m = '/storage/emulated/0/netease/cloudmusic/Music/Mark Pride - River Flows In You (Original Mix).mp3'
	media.playMusic(m);
	sleep(media.getMusicDuration());
}
const start = () => {
	console.log("开始运行")
	// 是否有结算按钮
	if (hasText("当前页面拥挤，")) {
		console.log("页面拥挤需要重新加载")
		text("重新加载").findOne().click()
		sleep(1000)
		start()
	} else if (hasText("去结算")) {
		console.log("找到结算按钮")
		swipe(316,520,316,1120,400)
		sleep(3000)
		// 点击结算
		id('btn_submit').findOne().click()
		sleep(1000)
		start()
	} else if (hasText("请选择送达时间")) {
		console.log("没有可选时间返回")
		// 返回
		back()
		sleep(1000)
		start()
	}else if (hasText("微信支付")) {
		console.log("找到微信支付")
		// 点击结算
		text('微信支付').findOne().click()	
		sleep(1000)
		//点击立即支付
		id('btn_submit').findOne().click()
		musicNotify()
	}else {
		console.log("失败返回")
		musicNotify()
	}
}
start()

// const appName = "盒马";
// launchApp(appName);
// sleep(3000);
// media.pauseMusic()
// sleep(7000)
// media.stopMusic()