"use strict"

let w, h, c, cx, col, cycles, raf, amp, freq, form, angle = 0
const {sin, cos, PI, tan} = Math,
    wave = []

const init = () => {
    c = document.getElementById("c")
    cx = c.getContext("2d")
    c.width = w = window.innerWidth 
    c.height = h = window.innerHeight
    cx.fillStyle = "#000"
    cx.fillRect(0, 0, w, h)
        
    raf = requestAnimationFrame || ((ts)=>(setTimeout(ts,1000/60)))
    cycles = 10
    amp = 25
    form = 20
    freq = 50      
    col = ["#99f", "#f0f", "#0f0", "#0ff", "#ff8"]
    controls()
    draw()
}

const endLoad = () => {
		document.querySelector(".loader").style.display = "none"
	}

let controls = () =>{
    const sliders = document.querySelectorAll(".slider"),
        vals = document.querySelectorAll(".val")
    sliders.forEach((slider,i)=>{
        vals[i].textContent = slider.value 
        slider.oninput = () =>{
            vals[i].textContent = slider.value
           
        }
    })
}

let eventL = () =>{
    let sCycles = document.querySelector(".cyc"),
        sFreq = document.querySelector(".freq"),
        sAmp = document.querySelector(".amp"),
        sForm = document.querySelector(".form")
        
    window.addEventListener("input", (e) =>{
        if(e.target == sCycles ){
            cycles = parseFloat(e.target.value)
        }
        if(e.target == sAmp ){
            amp = parseFloat(e.target.value)
        }
        if(e.target == sFreq ){
            freq = parseFloat(e.target.value)
        }
        if(e.target == sForm ){
            form = parseFloat(e.target.value)
        }
    })
}

const render = () => {
      cx.fillStyle = "rgb(0, 0, 0)"
      cx.fillRect(0, 0, w, h)
 
      let x = 0, y = 0,
          tx=w/4,
          ty=h/2,
          time = freq / 1000  

      for(let i = 0; i < cycles; i++){
          let px = x,
              py = y,
              n = i * form / 10 + 1,
              r = amp * (4 / (n * PI))
          x += r * cos(n * angle) * 2
          y += r * sin(n * angle) * 2
          circle(cx, tx + px, ty + py, 1, "#99f", 1)
          circle(cx, tx + px, ty + py, r * 2, col[i % col.length])
          line(tx + px, ty + py, x - px, y - py, "red", cx)
      }
      
      wave.unshift(y)
      line(tx + x, ty + y, tx - x, wave[0] - y, "#95d", cx)
      circle(cx, 2 * tx, wave[0] + ty,1, "#99f", 1)
      wave.forEach((a, i)=>
          points( 2 * tx + i, ty + wave[i], cx))
      if(wave.length > 250) wave.pop()
          
      angle += time
}

const draw = () => {
    render()
    raf(draw)
}

const points = ( x, y, c) => {
    c.strokeStyle = "#5ba"
    c.lineTo(x, y)
    c.stroke()
}

const circle = (cx, x, y, r, col, fill = false) => {
    cx.beginPath()
    cx.arc(x, y, r, 0, 2 * PI)
    if(fill){
        cx.fillStyle = col
        cx.fill()
    }
    cx.strokeStyle = col
    cx.stroke()
}
const line = (x1, y1, x2, y2, col, c) => {
      c.beginPath()
      c.moveTo(x1, y1)
      c.lineTo(x1 + x2,y1 + y2)
      c.strokeStyle =col
      c.stroke()
}

window.onload = () =>{
    setTimeout(() =>{
    	endLoad()
    	eventL()
    	init()
    	raf(draw)
    	},2000)
}