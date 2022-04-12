const start = () => {    
	const m = './sound/Mark Pride - River Flows In You (Original Mix).mp3'
    console.log(m)
    toast(m)
	media.playMusic(m);
	sleep(media.getMusicDuration());
}
start()