"use strict"

let cx, w, h, t, cols, raf, a, b, i, s = 20, x = 0, y = 0

	a = 0
    b =0
    i = 0
window.onload =() => {
    setTimeout(() => {
    init()
    raf(draw)
    },2000)
}

let controls = () => {
    const sliders = document.querySelectorAll(".slider"),
        vals = document.querySelectorAll(".val")
    sliders.forEach((slider,i) => {
        vals[i].textContent = slider.value 
        slider.oninput = (e) =>{
            vals[i].textContent = slider.value
        }
    })
}

const eventL = () => {
	const size = document.querySelector(".size"),
	ptn = document.querySelector(".ptn")
	window.addEventListener('input', (e) =>{
		if(e.target == size){
			s = parseFloat(e.target.value)
		}
		if(e.target == ptn){
			switch (parseFloat(e.target.value )){
				case 1:
					a = 1
					b = 0
					i = 0
					break;
				case 2:
					a = 0
					b = 1
					i = 0
					break;
				default:
					a = 1
					b = 1
					i = 0
			}
		}
	})
}

const init = ()=>{
    let c = document.querySelector("#c")
    cx = c.getContext("2d")
    c.width = w = window.innerWidth
    c.height = h = window.innerHeight
    cx.fillStyle = "#000"
    cx.fillRect(0, 0, w, h)
    
    raf = requestAnimationFrame || ((ts)=>(setTimeout(ts,1000/60)))
    cols = ["0f0","f00","00f","0ff","f0f","ff0"]
    eventL()
    controls()
    endLoad()
}

const line = (x, y, x1, y1) =>{
    cx.strokeStyle = `#${cols[i %cols.length]}`
    cx.beginPath()
    cx.moveTo(x, y)
    cx.lineTo(x1, y1)
    cx.stroke()
}

const rand = (x, y = 0) => {
    return Math.round(Math.random()*(y-x) + x)
}

const endLoad = () => {
	document.querySelector(".loader").style.display = "none"
}

const draw = () => {
	if(rand(100) % 2== 0){
    	if(rand(1) < 1){
    	    line(x, y, x+s, y+s)
        }else{ line(x+s, y, x, y+s)}
     	x += s
     	i += a
     }
    if(x >= w){
        x = 0
        y += s
        if(y >= h) {
            cx.fillStyle = "#000"
            cx.fillRect(0, 0, w, h)
            y = 0
        }
        i += b
    }
    raf(draw)
}