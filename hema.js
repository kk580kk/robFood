const appName = "盒马";
launchApp(appName);
sleep(3000);
auto.waitFor()
// 点击按钮
const clickSettle = () => {
	id('button_cart_charge').findOne().click()
}
const hasText = (text) => {
	return textStartsWith(text).exists() // 是否存在指定文本
}
const musicNotify = () => {
	const m = '/storage/emulated/0/netease/cloudmusic/Music/Mark Pride - River Flows In You (Original Mix).mp3'
	media.playMusic(m);
	sleep(media.getMusicDuration());
}
const start = () => {
	// 是否有结算按钮
	if (hasText("结算")) {
		// 点击结算
		clickSettle()
		sleep(1000)
		start()
	} else if (hasText('非常抱歉') || hasText('很抱歉')) {
		// 返回上一页
		back()
		sleep(60*2*1000)
		start()
	} else if (hasText('提交订单')) {
		className("android.widget.TextView").text("提交订单").findOne().parent().click()
		musicNotify()
	} else {
		back()
		sleep(1000)
		start()
	}
}
start()

// const appName = "盒马";
// launchApp(appName);
// sleep(3000);
// media.pauseMusic()
// sleep(7000)
// media.stopMusic()