"use strict"

let c, ctx, w, h, moleculeWidth, moleculeDepth, moleculeHeight, col, threshHold, totalWaves, wave, molecules, waveOffset, amp, sp, d, raf
const {sqrt, floor, sin, cos, tan, random:rand} = Math

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
    let ampl = document.querySelector(".amp"),
        depth = document.querySelector(".depth"),
        perspx = document.querySelector(".perspx"),
        perspy = document.querySelector(".perspy"),
        moles = document.querySelector(".moles")
    	window.addEventListener("input", (e) =>{
        if(e.target == ampl){
            amp = parseFloat(e.target.value)
        }
        if(e.target == moles){
            molecules = parseFloat(e.target.value)
        }
        if(e.target == depth){
            moleculeDepth = parseFloat(e.target.value)
        }
        if(e.target == perspx){
            moleculeWidth = parseFloat(e.target.value)
        }
        if(e.target == perspy){
            moleculeHeight = parseFloat(e.target.value)
        }
    })
}

let init = () => {
    c = document.getElementById("c")
    ctx = c.getContext("2d")
    w = c.width = window.innerWidth
    h = c.height = window.innerHeight
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, w, h)
     
    raf = requestAnimationFrame || ((ts)=>(setTimeout(ts,1000/60)))
    moleculeWidth = 20
    moleculeHeight = 10
    moleculeDepth = 5
    threshHold = 0.25
    molecules = 30
    amp = 2
    sp = 0
    d = 0.005
    col = ["#94bfdf", "#30b1ce", "#22798c"]

    wave = new Wave(col)
    waveOffset = molecules * threshHold
    ctx.translate(w / 2, 150)
    controls()
    draw()
}

const endLoad = () => {
	document.querySelector(".loader").style.display = "none"
}

let draw = () =>{
    ctx.fillStyle = "#000"
    ctx.fillRect(-w/2, -150, w, h)
    
    for(let x = 0; x < molecules; x++) {
        for(let y = 0; y < molecules; y++) {
            let dx = waveOffset - x,
                dy = waveOffset - y,
                dist = sqrt(dx * dx + dy * dy),
                z = sin(dist * sp) * amp + moleculeDepth
            wave.render(x, y, z)
        }
    }
    
    sp += d
    if(sp >= 1){
        d = -d
    }if(sp <= -1){
        d = -d
    }
    raf(draw)
}

window.onload = () =>{
    setTimeout(() => {
    endLoad()
    init()
    eventL()
    raf(draw)
    },2000)
}

class Wave {
    constructor(col){
        this.top = col[0]
        this.right = col[1]
        this.left = col[2]
    }
    render(x, y, z) {
        
        ctx.save()
        ctx.translate((x - y) * moleculeWidth / 2, (x + y) * moleculeHeight / 2)
       
        this.renderTop(z)
        this.renderLeft(z)
        this.renderRight(z)
        ctx.restore()    
    }
    renderTop(z){
        ctx.beginPath()
        ctx.moveTo(0, -z * moleculeHeight)
        ctx.lineTo(moleculeWidth / 2, moleculeHeight / 2 - z * moleculeHeight)
        ctx.lineTo(0, moleculeHeight - z * moleculeHeight)
        ctx.lineTo(-(moleculeWidth) / 2, moleculeHeight / 2 - z * moleculeHeight)
        ctx.closePath()
        ctx.fillStyle = this.top
        ctx.fill()
    }
    renderLeft(z){
        ctx.beginPath()
        ctx.moveTo(-moleculeWidth / 2, moleculeHeight / 2 - z * moleculeHeight)
        ctx.lineTo(0, moleculeHeight - z * moleculeHeight)
        ctx.lineTo(0, moleculeHeight)
        ctx.lineTo(-moleculeWidth / 2, moleculeHeight / 2)
        ctx.closePath()
        ctx.fillStyle = this.left
        ctx.fill()
    }   
    renderRight(z){
        ctx.beginPath()
        ctx.moveTo(moleculeWidth / 2, moleculeHeight / 2 - z * moleculeHeight)
        ctx.lineTo(0, moleculeHeight - z * moleculeHeight)
        ctx.lineTo(0, moleculeHeight)
        ctx.lineTo(moleculeWidth / 2, moleculeHeight / 2)
        ctx.closePath()
        ctx.fillStyle = this.right
        ctx.fill()

    }
}