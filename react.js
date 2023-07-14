class ReactGUIPopup {
	constructor(parent){
		this.parent = parent;
		this.me = document.createElement("div");
		this.me.style = `
    width: 100vw;
	height: 100vh;
	position: fixed;
	top:0px;
	color:black;
	font-family: sans-serif;
	left:0px;
	scale:0;
	margin-left:0px;
	opacity:0;
	z-index: 2147483646;
	align-items:center;
	animation-name:none;
	animation-fill-mode: forwards;
	animation-duration:0.2s;
	transistion: 0.2s;`;
		this.me.id = "reactguipopup";
		this.bgbox = document.createElement("div");
		//this.bgbox.class = "reactguipopupbg";
		this.bgbox.style = `width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0,0.75);`
		this.ptext = document.createElement("div");
		//this.ptext.class = "reactguipopupbox";
		this.ptext.style = `background-color:white;
	color:black;
	width: auto;
	height: auto;
	margin: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);`
		this.bgbox.appendChild(this.ptext)
		this.me.appendChild(this.bgbox)
		this.parent.style += `
@keyframes reactguipopupshow {
	from {scale:0;opacity:0;}
	to {scale:1;opacity:1;}
}
@keyframes reactguipopuphide {
	from {scale:1;opacity:1;}
	to {scale:0;opacity:0;}
}`
		this.callback = null;
		this.parent.appendChild(this.me)
	}
	setCallback(f) {
		this.callback = f;
	}
	hide() {
		this.me.style['scale'] = 0;
		this.me.style['opacity'] = 0;
		this.me.style['transition'] = "0.2s";
	}
	popup(title,message) {
		this.ptext.innerHTML = `<h1>${title}</h1>`
		this.ptext.innerHTML += `<p>${message}</p>`;
		this.me.style['scale'] = 1;
		this.me.style['opacity'] = 1;
		this.me.style['transition'] = "0.2s";
		
	}
	closeablePopup(title,message) {
		this.cd = document.createElement("div")
		this.cd.style = "right:0px;position:absolute;"
		this.cb = document.createElement("button")
		this.cb.onclick = () => {
			this.me.style['scale'] = 0;
			this.me.style['opacity'] = 0;
			this.me.style['transition'] = "0.2s";
		}
		this.cb.innerHTML = "X";
		this.cd.appendChild(this.cb)
		this.ptext.innerHTML = "";
		this.ptext.appendChild(this.cd)
		this.ptext.innerHTML += `<h1>${title}</h1>`
		this.ptext.innerHTML += `<p>${message}</p>`;
		this.me.style['scale'] = 1;
		this.me.style['opacity'] = 1;
		this.me.style['transition'] = "0.2s";
	}
}
class ReactGUINotification {
	constructor(parent) {
		this.parent = parent
		this.me = document.createElement("div");
		this.me.style['font-family'] = "sans-serif"
		this.title = document.createElement("h3")
		this.title.style['font-family'] = "sans-serif"
		this.text = document.createElement("p")
		this.text.style['font-family'] = "sans-serif";
		//this.text.style['text-overflow'] = "wrap"
		this.close = document.createElement("button")
		this.close.innerHTML = "X"
		this.close.style["right"] = "0px";
		this.close.style['position'] = "absolute";
		this.me.appendChild(this.close)
		this.me.style = `
z-index: 2147483647;
min-width: 300px;
min-height:100px;
max-width:300px;
max-height:100vh;
position: fixed;
left: 100vw;
color:black;
background-color: white;
box-shadow: 0px 0px 3px grey;
overflow-wrap: break-word;

`
		this.me.appendChild(this.title)
		this.me.appendChild(this.text)
		this.t = null;
		this.to = 0;
		this.sftc = false;
		window.addEventListener("resize",() => {
			if (this.me.style.left != "100vw") {
				this.me.style['left'] = document.body.offsetWidth-this.me.offsetWidth
			}
		})
		this.me.onmouseenter = () => {
			if (this.sftc) {
				if (this.t) {
					clearTimeout(this.t)
				}
				this.me.style['left'] = document.body.offsetWidth-this.me.offsetWidth
				this.me.style['transition'] = "0.3s ease-in-out"
			}
		}
		this.me.onmouseleave = () => {
			if (this.sftc) {
				this.t = setTimeout(() => {
					this.sftc = false
					this.hide()
				},this.to)
			}
		}
		this.close.onclick = () => {
			if (this.t) {
				clearTimeout(this.t)
			}
			this.hide()
		}
		parent.appendChild(this.me)
	}
	setBackgroundColor(c) {
		this.me.style['background-color'] = c
	}
	show(title,text) {
		if (this.t) {
			clearTimeout(this.t)
		}
		this.title.innerHTML = title
		this.text.innerHTML = text
		this.me.style['left'] = this.parent.offsetWidth-this.me.offsetWidth-30
		this.me.style.opacity = 1
		this.me.style['transition'] = "0.3s ease-in-out"
	}
	showForTime(title,text,time) {
		this.sftc = true
		this.to = time
		if (this.t != null) {
			clearTimeout(this.t)
			this.t = null
		}
		this.title.innerHTML = title
		this.text.innerHTML = text
		this.me.style['left'] = this.parent.offsetWidth-this.me.offsetWidth-30
		this.me.style['transition'] = "0.3s ease-in-out"
		this.t = setTimeout(() => {
			this.hide()
			this.sftc = false
		},300+time)
	}
	hide() {
		this.me.style['left'] = "100vw"
		this.me.style['transition'] = "0.3s ease-in-out"
		this.t = null;
		this.sftc = false
		this.to = 0;
	}
}
class ReactGUIScreen {
	constructor(parent,zindex) {
		this.parent = parent
		this.z
		this.me = document.createElement("div");
		this.me.style['left'] = "100vw";
		if (zindex != undefined) {
			this.me.style['z-index'] = zindex;
		}
		this.me.hidden = false;
		this.me.style.top = "0px";
		this.me.style.position = "absolute";
		this.me.style.width = "100vw";
		this.me.style.height = "100vh";
		this.me.style['background-color'] = "white";
		this.me.style['transition'] = "1s ease-in-out";
		this.bar = document.createElement("div");
		this.titlebox = document.createElement("h1");
		this.titlebox.style['margin-top'] = "0px"
		this.titlebox.innerHTML = "";
		this.titlebox.style["font-family"] = "sans-serif"
		this.titlebox.style['top'] = "0px";
		this.titlebox.style['postition'] = "absolute";
		this.bar.style.width="100vw";
		this.bar.style.height="5vh";
		this.closebutton = document.createElement("div");
		this.closebutton.style=`right:0px;position:absolute;height:100%;`;
		this.cb = document.createElement("button");
		this.cb.innerHTML = "X";
		this.cb.onclick = this.doCallback;
		this.cb.style.height = "5vh";
		this.closebutton.appendChild(this.cb)
		this.bar.style['background-color'] = "white";
		this.screen = document.createElement("div");
		this.screen.style.width="100%";
		this.screen.style.height="100vh";
		this.bar.style['display'] = "flex";
		this.bar.style['flex-direction'] = "row";
		this.bar.appendChild(this.titlebox)
		this.bar.appendChild(this.closebutton)
		this.me.appendChild(this.bar)
		this.me.appendChild(this.screen)
		this.parent.appendChild(this.me)
		this.screen.style['gap'] = "0px";
		this.closeonclose = true;
		this.callback = null;
		this.t = null;
		this.cb.onclick = () => {
			this.close()
			if (this.callback) {
				this.callback()
			}
		}
	}
	setBackgroundColor(c) {
		this.screen.style['background-color'] = c;
	}
	setClosable(c) {
		this.closebutton.hidden = !c
	}
	setTitle(t) {
		this.titlebox.innerHTML = t
	}
	setContent(c) {
		this.screen.innerHTML = c;
	}
	addElement(e) {
		this.screen.appendChild(e.object());
	}
	dest() {
		this.me.hidden = true;
	}
	switch(d) {
		if (d) {
			this.me.style['left'] = "-50vw";
		} else {
			this.me.style['left'] = "0%";
		}
	}
	close() {
		this.me.style['left'] = "100vw";
		this.me.style['transition'] = "0.25s ease-in";
		
	}
	open() {
		this.me.style['left'] = "0%";
		this.me.style['transition'] = "0.25s ease-out";
	}
	doCallback() {
		this.callback()
	}
	setCallback(c) {
		this.callback = c;
		
	}
	
	setCloseOnClose(c) {
		this.closeonclose = c;
	}
	
}
class ReactGUIButton {
	constructor(text,id) {
		this.theme = {
			click: {
				background: "rgb(255,255,255)",
				foreground: "rgb(0,127,255)",
			},
			hover: {
				background: "rgb(0,127,255)",
				foreground: "rgb(255,255,255)",
			},
			normal: {
				background: "rgb(0,64,255)",
				foreground: "rgb(255,255,255)",
			},
		}
		this.button = document.createElement("button");
		this.button.innerHTML = text;
		this.button.id = id;
		this.button.style['background-color'] = "rgb(0,64,255)"
		this.button.style['border-radius'] = "18px";
		this.button.style['font-size'] = "18px";
		this.button.style['padding'] = "10px";
		this.button.style['border'] = "0px none"
		this.button.style['color'] = "white";
		this.button.onmouseenter = () =>{this.hoveron()};
		this.button.onmouseleave = () =>{this.hoveroff()};
		this.button.onmousedown = () =>{this.mousedown()};
		this.button.onmouseup = () => {this.mouseup()};
	}
	setTooltip(tip) {
		this.button.title = tip
	}
	setCallback(c) {
		this.button.onclick = c;
	}
	object() {
		return this.button;
	}
	mousedown() {
		this.button.style['background-color'] = this.theme.click.background
		this.button.style['color'] = this.theme.click.foreground;
	}
	mouseup() {
		this.button.style['background-color'] = this.theme.hover.background
		this.button.style['color'] = this.theme.hover.foreground;
	}
	hoveron() {
		this.button.style['background-color'] = this.theme.hover.background
		this.button.style['color'] = this.theme.hover.foreground;
	}
	hoveroff() {
		this.button.style['background-color'] = this.theme.normal.background
		this.button.style['color'] = this.theme.normal.foreground;
	}
}
class ReactGUIImage {
	
	constructor() {
		this.me = document.createElement("img")
		this.me.style.width = "100%"
		this.me.style.height = "100%"
	}
	setSrc(src) {
		this.me.src = src
	}
	object() {
		return this.me
	}
}
class ReactGUI_HorizontalDiv {
	constructor() {
		this.div = document.createElement("div");
		this.div.style.display = 'flex';
		this.div.style['flex-direction'] = "row";
	}
	removeElement(e){
		this.div.remove(e.object())
	}
	addElement(e) {
		this.div.appendChild(e.object())
	}
	object() {
		return this.div;
	}
}

class ReactGUI_VerticalDiv {
	constructor(mode) {
		this.div = document.createElement("div");
		this.div.style.display = 'flex';
		this.div.style['flex-direction'] = "column";
	}
	removeElement(e){
		this.div.remove(e.object())
	}
	addElement(e) {
		this.div.appendChild(e.object())
	}
	object() {
		return this.div
	}
}
class ReactGUIVideoPlayer {
	constructor() {
		//Create the container
		this.me = document.createElement("div");
		this.video = document.createElement("video");
		this.controlbox = document.createElement("div");
		this.buttonbox = document.createElement("div");
		this.midbox = document.createElement("div");
		// Create the controls
		this.pos = document.createElement("input");
		this.vol = document.createElement("input");
		this.rewbutton = document.createElement("button");
		this.playbutton = document.createElement("button");
		this.fwdbutton = document.createElement("button");
		this.status = document.createElement("t");
		this.volstatus = document.createElement("t");
		//Setup each elements
		this.playbutton.innerHTML = "Play"
		this.fwdbutton.innerHTML = ">>"
		this.rewbutton.innerHTML = "<<"
		this.volstatus.innerHTML = "50%"
		this.pos.style.width = "100%"
		this.status.innerHTML = "--:--/--:--"
		this.video.width = 1920;
		this.video.height = 1080;
		//this.video.src = "about:blank";
		this.video.style.width = "100%";
		this.video.style.height = "80%";
		this.pos.type = "range"
		this.vol.type = "range"
		this.vol.max = 100
		this.vol.min = 0
		this.midbox.appendChild(this.status)
		this.midbox.appendChild(this.vol)
		this.midbox.appendChild(this.volstatus)
		this.status_update = null
		this.buttonbox.appendChild(this.rewbutton)
		this.buttonbox.appendChild(this.playbutton)
		this.buttonbox.appendChild(this.fwdbutton)
		this.controlbox.appendChild(this.pos)
		this.controlbox.appendChild(this.midbox)
		this.controlbox.appendChild(this.buttonbox)
		this.me.appendChild(this.video)
		this.me.appendChild(this.controlbox)
		//this.video.load();
		// Setup callback
		this.vol.oninput = () => {
			this.volstatus.innerHTML = `${this.vol.value}`
			this.video.volume = this.vol.value/100
		}
		this.fwdbutton.onclick = () => {
			this.video.currentTime += 5;
			if (this.video.currentTime > this.video.duration) {
				this.video.currentTime = this.video.duration;
			}
			this.pos.value = this.video.currentTime;
			this.video.ontimeupdate();
		}
		this.rewbutton.onclick = () => {
			this.video.currentTime -= 5;
			if (this.video.currentTime < 0) {
				this.video.currentTime = 0;
			}
			this.pos.value = this.video.currentTime;
			this.video.ontimeupdate();
		}
		this.video.onloadstart = () => {
			this.me.style.cursor = "wait";
			this.status_update(1)
		}
		this.video.onerror = () => {
			this.me.style.cursor = "auto";
			this.status.innerHTML = "ERROR";
			this.status_update(-200)
		}
		this.pos.oninput = () => {
			this.video.currentTime = parseFloat(this.pos.value);
		}
		this.video.oncanplay = () => {
			this.me.style.cursor = "auto";
			const time = this.formatTime(this.video.currentTime);
			const time2 = this.formatTime(this.video.duration);
			this.status.innerHTML = `${time.minutes}:${time.seconds} / ${time2.minutes}:${time2.seconds}`
			this.status_update(2)
		}
		this.video.ontimeupdate = () => {
			const time = this.formatTime(this.video.currentTime);
			const time2 = this.formatTime(this.video.duration);
			this.status.innerHTML = `${time.minutes}:${time.seconds} / ${time2.minutes}:${time2.seconds}`
			if (!this.video.paused) {
				this.pos.value = this.video.currentTime;
			}
		}
		this.video.ondurationchange = () => {
			this.pos.max = this.video.duration;
		}
		this.playbutton.onclick = () => {
			if (!this.video.paused) {
				this.video.pause()
				this.playbutton.innerHTML = "Play"
			} else {
				this.video.play()
				this.playbutton.innerHTML = "Pause"
			}
		}
	}
	setStatusCallback(f) {
		this.status_update = f
	}
	formatTime(timeInSeconds) {
		const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
		
		return {
			minutes: result.substr(3, 2),
			seconds: result.substr(6, 2),
		};
	}
	play() {
		this.playbutton.innerHTML = "Pause"
		this.video.play()
	}
	pause() {
		this.playbutton.innerHTML = "Play"
		this.video.pause()
	}
	setPos(pos) {
		this.video.currentTime = pos;
	}
	setSrc(src) {
		this.video.src = src;
		this.video.load();
	}
	object() {
		return this.me;
	}
}
class ReactGUIWebView {
	constructor() {
		this.me = document.createElement("iframe");
	}
	setSrc(src) {
		this.me.src = src;
	}
	object() {
		return this.me;
	}
}
class ReactGUISizer {
	constructor(w,h) {
		this.me = document.createElement("div")
		this.me.style.width = w
		this.me.style.height = h
	}
	addElement(e) {
		this.me.appendChild(e.object())
	}
	object() {
		return this.me
	}
}
class ReactGUI_Heading {
	constructor(level) {
		if (level == 1) {
			this.me = document.createElement("h1")
		} else if (level == 2) {
			this.me = document.createElement("h2")
		} else if (level == 3) {
			this.me = document.createElement("h3")
		} else if (level == 4) {
			this.me = document.createElement("h4")
		}
		this.me.style['font-family'] = "sans-serif"
	}
	setText(t) {
		this.me.innerHTML = t
	}
	setColor(c) {
		this.me.style.color = c
	}
	object() {
		return this.me
	}
}
class ReactGUI_Paragraph {
	constructor() {
		this.me = document.createElement("p")
	}
	setFontSize(s) {
		this.me.style['font-size'] = `${s}px`
	}
	setColor(c) {
		this.me.style.color = c
	}
	setText(t) {
		this.me.innerHTML = t
	}
	object() {
		return this.me
	}
}
class ReactGUI_Text {
	constructor() {
		this.me = document.createElement("t")
	}
	setFontSize(s) {
		this.me.style['font-size'] = `${s}px`
	}
	setText(t) {
		this.me.innerHTML = t
	}
	setColor(c) {
		this.me.style.color = c
	}
	object() {
		return this.me
	}
}
class ReactGUI_Form {
	constructor() {
		this.me = document.createElement("form")
		this.callback = null
	}
}
class ReactGUITextInput {
	constructor() {
		this.me = document.createElement("input")
		this.me.type = "text";
		this.callback = null;
		this.me.oninput = () => {
			if (this.callback) {
				this.callback()
			}
		}
	}
	setValue(v) {
		this.me.value = v
	}
	getValue() {
		return this.me.value
	}
	setCallback(c) {
		this.callback = c
	}
	object() {
		return this.me
	}
}
class ReactGUINumberInput {
	constructor() {
		this.me = document.createElement("input")
		this.me.type = "number";
		this.callback = null;
		this.me.oninput = () => {
			if (this.callback) {
				this.callback()
			}
		}
	}
	setValue(v) {
		this.me.value = v
	}
	getValue() {
		return parseInt(this.me.value)
	}
	setCallback(c) {
		this.callback = c
	}
	object() {
		return this.me
	}
}
class ReactGUISlider {
	constructor() {
		this.me = document.createElement("input")
		this.me.type = "range"
		this.me.min = 0
		this.me.max = 100
		this.me.value = 100
		this.callback = null
		this.me.oninput = () => {
			if (this.callback) {
				this.callback(this.me.value)
			}
		}
	}
	setValue(v) {
		this.me.value = v
	}
	setCallback(c) {
		this.callback = c
	}
	setMin(min) {
		this.me.min = min
	}
	setMax(max) {
		this.me.max = max
	}
	object() {
		return this.me
	}
}
class ReactGUIPopover {
	constructor(parent) {
		this.parent = parent
		this.me = document.createElement("div")
		this.me.style['border-radius'] = "18px"
		this.grabbox = document.createElement("div")
		this.grab = document.createElement("div")
		this.grabbox.style.width = "100%"
		this.grabbox.style.height = "20px";
		this.grab.style.width = "20px"
		this.grab.style.height = "3px"
		this.grab.style['background-color'] = "white";
		this.grab.style['left'] = "50%"
		this.grab.style['position'] = "absolute"
		this.grab.style['transform'] = "translate(-50%,100%)"
		this.me.style = "z-index:2147483645;color:white;"
		this.me.style['position'] = "absolute"
		this.me.style['top'] = "100vh"
		this.me.style['width'] = "100vw"
		this.me.style['left'] = "0px"
		this.me.style['height'] = "auto"
		this.me.style['max-height'] = "90vh";
		this.me.style['min-height'] = "10vh";
		this.me.style['background-color'] = "black"
		this.screen = document.createElement("div")
		this.screen.style.width = "100vw";
		this.screen.style.overflow = "wrap"
		this.screen.innerHTML = ""
		this.grabbox.appendChild(this.grab)
		this.me.appendChild(this.grabbox)
		this.me.appendChild(this.screen)
		this.shown = true;
		this.clicked = false;
		parent.appendChild(this.me)
		this.inith = document.body.offsetHeight-this.me.offsetHeight+10
		
		this.grabbox.onmousemove = (event) => {
			if (this.clicked && this.shown) {
				this.me.style.transition = ""
				this.me.style['bottom'] = ""
				if (event.clientY > this.inith) {
					this.me.style.top = event.clientY;
				}
			}
		}
		this.grabbox.onmousedown = () => {
			this.clicked = true;
			
			
		}
		this.grabbox.onmouseup = () => {
			this.clicked = false;
		}
		document.addEventListener("mousemove",(event) => {
			if (this.clicked && this.shown) {
				if (event.clientY > this.inith) {
					this.me.style.transition = ""
					this.me.style['bottom'] = ""
					this.me.style.top = event.clientY;
				}
			}
		})
		document.addEventListener("mouseup",() => {
			this.clicked = false;
			if (this.me.offsetTop > Math.round(this.inith+(this.me.offsetHeight/3))) {
				this.hide()
			} else {
				this.me.style.top = this.inith;
				this.me.style.transition = "0.2s ease-in-out"
			}
		})
		window.addEventListener("resize",() => {
			this.inith = document.body.offsetHeight-this.me.offsetHeight+10;
			if (this.shown) {
				this.me.style.top = this.inith;
				this.me.style.transition = "0.2s ease-in-out"
			}
		})
	}
	show() {
		//this.me.style['bottom'] = "0px"
		this.me.style['top'] = this.inith
		this.me.style.transition = "0.2s ease-in-out";
		this.shown = true;
		this.clicked = false;
	}
	hide() {
		this.shown = false;
		this.me.style.top = "100vh";
		this.me.style.transition = "0.2s ease-in-out"
	}
	object() {
		return this.me
	}
	addElement(e) {
		this.screen.appendChild(e.object())
		
	}
	setContent(c) {
		this.screen.innerHTML = c
		this.inith = document.body.offsetHeight-this.me.offsetHeight+16
	}
	removeElement(e) {
		this.screen.remove(e.object())
	}
}
class ReactGUIMultilineTextInput {
	constructor() {
		this.me = document.createElement("textarea")
		this.callback = null;
		this.me.onchange = () => {
			if (this.callback) {
				this.callback()
			}
		}
	}
	setValue(v) {
		this.me.value = v
	}
	getValue() {
		return this.me.value
	}
	setCallback(c) {
		this.callback = c
	}
	object() {
		return this.me
	}
}