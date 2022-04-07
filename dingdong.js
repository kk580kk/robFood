const hasText = (text) => {
	return textStartsWith(text).exists() // 是否存在指定文本
}
const musicNotify = () => {
	const m = '/storage/emulated/0/netease/cloudmusic/Music/Mark Pride - River Flows In You (Original Mix).mp3'
	media.playMusic(m);
	sleep(media.getMusicDuration());
}
const waitAnyTime = (timer) => {
	sleep(timer)
	console.log("休息等待时间：" + timer)
}
const tryBack = () => {
	back()
	console.log("尝试返回")
}
const start = () => {
	let flag = true;
	let failCount = 0;
	while (flag) {
		console.log("开始运行")
		// 是否有结算按钮
		if (hasText("加载失败，点击重新加载")) {
			failCount++
			console.log("购物车没有了，重新加载")
			id("base_page_btn").findOne().click()
			waitAnyTime(2000 + random() * 2000)
		} else
			if (hasText("加载失败，请重新尝试")) {
				failCount++
				console.log("加载失败需要重新加载")
				if (failCount % 4 < 6 * random()) {
					console.log("点击刷新：" + failCount)
					id("ll_reload_action").findOne().click()
				} else {
					console.log("点击返回：" + failCount)
					id("tv_back_cart").findOne().click()
				}
				waitAnyTime(2000 + random() * 4000)
			} else if (hasText("当前页面拥挤，")) {
				failCount++
				console.log("页面拥挤需要重新加载")
				if (failCount % 6 < 10 * random()) {
					console.log("点击刷新：" + failCount)
					id("ll_reload_action").findOne().click()
				} else {
					console.log("点击返回：" + failCount)
					id("tv_back_cart").findOne().click()
				}
				waitAnyTime(2000 + random() * 4000)
			} else if (hasText("去结算")) {
				failCount = 0;
				console.log("找到结算按钮")
				swipe(316, 520, 316, 1120, 400)
				waitAnyTime(2000 + random() * 3000)
				// 点击结算
				id('btn_submit').findOne().click()
			} else if (hasText("微信支付")) {
				failCount = 0;
				console.log("找到微信支付")
				// 点击结算
				text('微信支付').findOne().parent().parent().click()
				waitAnyTime(2000 + random() * 1000)
				//点击立即支付
				id('tv_submit').findOne().click()
			} else if (hasText("选择送达时间")) {
				failCount = 0;
				console.log("开始尝试选择送达时间")
				// 点击结算
				var sc = id('cl_item_select_hour_root').find()
				console.log("找到可选时间：" + sc.length)
				for (var i = 0; i < sc.length; i++) {
					var tv = sc[i];
					var sub = tv.findOne(id("tv_item_select_hour_desc"))
					if (sub != null) {
						console.log(sub.text())
					} else {
						tvt = tv.findOne(id("tv_item_select_hour_title"))
						console.log("找到可选时间：" + tvt.text())
						tv.click()

						waitAnyTime(2000 + random() * 4000)

						flag = false

						musicNotify()

						waitAnyTime(2000 + random() * 4000)
						console.log("时间已经选择，立即支付")
						//点击立即支付
						id('tv_submit').findOne().click()
					}
				}
				if (flag) {
					tryBack()
					waitAnyTime(200 + random() * 1000)
					tryBack()
				}
			} else if (failCount <= 10) {
				console.log("失败次数：" + failCount)
				failCount++
				waitAnyTime(5000 + random() * 5000)
			} else {
				console.log("失败返回")
				musicNotify()
				flag = false
			}

		console.log("结束运行")
		waitAnyTime(500 + random() * 500)
	}
}
start()

// const appName = "盒马";
// launchApp(appName);
// sleep(3000);
// media.pauseMusic()
// sleep(7000)
// media.stopMusic()