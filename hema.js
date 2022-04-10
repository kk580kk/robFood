const appName = "盒马";
launchApp(appName);
sleep(3000);
auto.waitFor()
const hasText = (text) => {
	return textStartsWith(text).exists() // 是否存在指定文本
}
const waitAnyTime = (timer) => {
	sleep(timer)
	console.log("休息等待时间：" + timer)
}
const musicNotify = () => {
	const m = '/storage/emulated/0/netease/cloudmusic/Music/Mark Pride - River Flows In You (Original Mix).mp3'
	media.playMusic(m);
	sleep(media.getMusicDuration());
}
const tryBack = () => {
	back()
	console.log("尝试返回")
}
const start = () => {

	let flag = true;
	let failCount = 0;
	while (flag) {
		// 是否有结算按钮
		if (hasText("结算")) {
			failCount = 0
			console.log("找到结算按钮")
			// 点击结算
			id('button_cart_charge').findOne().click()
			waitAnyTime(500 + random() * 1000)
		} else if (id("title").text("选择时间").exists()) {			
			failCount = 0;
			console.log("开始尝试选择送达时间")
			var sc = id("period_title").find()
			console.log("找到可选时间：" + sc.length)
			for (var i = 0; i < sc.length; i++) {
				var tv = sc[i];		
				var sub = tv.parent().findOne(id("period_post_fee"))
				if (sub != null) {
					console.log(tv.text()+":"+sub.text())
				} else {
					console.log("找到可选时间：" + tv.text())
					tv.parent().click()

					flag = false
					do {
						waitAnyTime(2000 + random() * 1000)

						console.log("时间已经选择，立即支付")
						//点击立即支付
						id('next_text').findOne().click()
					} while (hasText("立即支付"));
				}
			}
		} else if (hasText('提交订单') && textStartsWith("￥").findOne().text().indexOf("0") != 1) {
			console.log(textStartsWith("￥").findOne().text())
			console.log(textStartsWith("￥").findOne().text().indexOf("0"))

			className("android.widget.TextView").text("提交订单").findOne().parent().click()
			musicNotify()
		} else if (hasText('非常抱歉') || hasText('很抱歉')) {
			console("抱歉没货")
			// 返回上一页
			tryBack()
			waitAnyTime(1000 + random() * 2000)
		} else if (failCount <= 10) {
			console.log("失败次数：" + failCount)
			failCount++
			waitAnyTime(5000 + random() * 5000)
		} else {
			console.log("失败返回")
			musicNotify()
			flag = false
		}
	}
}
start()

// const appName = "盒马";
// launchApp(appName);
// sleep(3000);
// media.pauseMusic()
// sleep(7000)
// media.stopMusic()