// The main screen
var screen0 = new ReactGUIScreen(document.body,0)
var notify = new ReactGUINotification(document.body)
//notify.showForTime("A","B",3000)
var sc0h = new ReactGUI_Heading(2);
var sc0b0 = new ReactGUIButton("ReactGUIVideoPlayer()");
var sc0b1 = new ReactGUIButton("ReactGUI_Heading()");
var sc0b2 = new ReactGUIButton("ReactGUISlider()");
var sc0b3 = new ReactGUIButton("ReactGUINotifications()");
var sc0b4 = new ReactGUIButton("ReactGUIPopover()");
sc0b3.setCallback(ont)
// The video player screen
var screen1 = new ReactGUIScreen(document.body,1)
var sc1vp = new ReactGUIVideoPlayer();
var sc1vurl = new ReactGUIButton("Select Video");
sc1vurl.setCallback(svp)
// The header test
var screen2 = new ReactGUIScreen(document.body,2)
for (let i=1;i<4;i++) {
	let h = new ReactGUI_Heading(i);
	h.setText(`Heading ${i}`);
	screen2.addElement(h)
}
// Slider Screen
var screen3 = new ReactGUIScreen(document.body,3);
var slider = new ReactGUISlider();
var slider_value = new ReactGUI_Paragraph();
slider_value.setText("50")
slider.setCallback(uv)
//Notifier Screen
var screen4 = new ReactGUIScreen(document.body,4)
var sc4h0 = new ReactGUI_Heading(2);
sc4h0.setText("Actions")
var sc4b0 = new ReactGUIButton("Show")
sc4b0.setCallback(ntfs)
var sc4b1 = new ReactGUIButton("Show for time")
sc4b1.setCallback(ntfsft)
var sc4b2 = new ReactGUIButton("Hide")
sc4b2.setCallback(ntfh)
var sc4h1 = new ReactGUI_Heading(2);
sc4h1.setText("Values")
var sc4d0 = new ReactGUI_HorizontalDiv();
var sc4tm = new ReactGUINumberInput();
var ntftl = new ReactGUITextInput();
var ntftx = new ReactGUITextInput();
var screen5 = new ReactGUIScreen(document.body,5)
var po = new ReactGUIPopover(document.body);
var poh = new ReactGUI_Heading(1);
var sc5h0 = new ReactGUI_Heading(2);
sc5h0.setText("Actions")
var sc5b0 = new ReactGUIButton("Show");
sc5b0.setCallback(psh)
var sc5b1 = new ReactGUIButton("Hide");
sc5b1.setCallback(phd)
var sc5h1 = new ReactGUI_Heading(2);
sc5h1.setText("Content:")
var sc5ti = new ReactGUIMultilineTextInput();
screen5.addElement(sc5h0)
screen5.addElement(sc5b0)
screen5.addElement(sc5b1)
screen5.addElement(sc5h1)
screen5.addElement(sc5ti)

sc4d0.addElement(sc4tm)
sc4d0.addElement(ntftl)
sc4d0.addElement(ntftx)

screen4.addElement(sc4h0)
screen4.addElement(sc4b0)
screen4.addElement(sc4b1)
screen4.addElement(sc4b2)
screen4.addElement(sc4h1)
screen4.addElement(sc4d0)
screen3.addElement(slider)
screen3.addElement(slider_value)
screen1.setBackgroundColor('black')
screen0.setTitle("React GUI Element Tester")
screen1.setTitle("ReactGUIVideoPlayer() - React GUI Element Tester")
screen2.setTitle("ReactGUI_Heading() - React GUI Element Tester")
screen3.setTitle("ReactGUISlider() - React GUI Element Tester")
screen4.setTitle("ReactGUINotification() - React GUI Element Tester")
screen5.setTitle("ReactGUIPopover() - React GUI Element Tester")
let p = new ReactGUIPopup(document.body);
screen1.addElement(sc1vp)
screen1.addElement(sc1vurl)
sc0h.setText("Video Player")
screen0.addElement(sc0h)
screen0.addElement(sc0b0)
screen0.addElement(sc0b1)
screen0.addElement(sc0b2)
screen0.addElement(sc0b3)
screen0.addElement(sc0b4)
sc0b0.setCallback(vp)
sc0b1.setCallback(oht)
sc0b2.setCallback(ost)
sc0b4.setCallback(opo)
screen0.setClosable(false)
screen0.open()
sc1vp.setStatusCallback(ve)
function opo() {
	screen5.open()
}
function uv(v) {
	slider_value.setText(v)
}
function nc() {
	p.popup("Uncloseable Window",`<p>This is sthe parent window you cannnot close it</p><div style="bottom:0px;right:0px;position:absolute;"><button onclick="p.hide()">OK</button></div>`)
}
function ont() {
	screen4.open()
}
function vp() {
	screen1.open()
}
function oht() {
	screen2.open()
	//screen0.switch(1)
}
function ost() {
	screen3.open()
}
function cvp() {
	screen1.close()
}
function vvsp(url) {
	p.popup("Please Wait",`<p>Loading</p>`)
	sc1vp.setSrc(url)
	
}
function svp() {
	p.popup("Select video URL:",`
<p>Enter a URL</p>
<input id="url"></input>
<div style="bottom:0px;right:0px;position:absolute;">
	<button onclick="vvsp(document.getElementById('url').value)">OK</button>
 </div>`)
}
function ve(e) {
	if (e == -200) {
		p.popup("Video Error:",`
<p>Error loading the video</p>
<div style="bottom:0px;right:0px;position:absolute;">
	<button onclick="p.hide()">OK</button>
 </div>`);
	} else if (e == 2) {
		p.hide()
	}
}
function ntfs() {
	notify.show(ntftl.getValue(),ntftx.getValue())
}
function ntfsft() {
	notify.showForTime(ntftl.getValue(),ntftx.getValue(),sc4tm.getValue())
}
function ntfh() {
	notify.hide()
}
function psh() {
	po.setContent(sc5ti.getValue())
	po.show()
}
function phd() {
	po.hide()
}