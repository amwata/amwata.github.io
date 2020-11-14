"use strict"

let fall, symSize, cx, w, h, raf, frameCt = 0, falls = []

window.onload = () =>{
    setTimeout(() => {
    init()
    raf(draw)
    }, 2000)
}

function init(){
    let c = document.getElementById("c")
    cx = c.getContext("2d")
    c.width = w = window.innerWidth 
    h = c.height = window.innerHeight
    cx.fillStyle="#000"
    cx.fillRect(0,0,w,h)
    
    raf = requestAnimationFrame || ((ts)=>(setTimeout(ts,1000/60)))
    symSize = 20
    let n = w / symSize + symSize
    let x = 0
    for(let i=0; i < n; i++){
        fall = new Fall()
        fall.generateSym(x, rand(-100,100))
        falls.push(fall)
        x +=symSize 
    }
    endLoad()
    draw()
}
const endLoad = () => {
	document.querySelector(".loader").style.display = "none"
}

function render(){
    cx.fillStyle="rgba(0, 0, 0, 0.4)"
    cx.fillRect(0,0,w,h)
}

function draw(framesN){
    frameCt++
    if(Math.floor(framesN) % 100 == 0){
    	frameCt = 0
    }
    
    render()
    falls.forEach((fall)=>{
        fall.render()
    })
    raf(draw)
}

class Symbol{
    constructor(x,y,sp,col,s){
        this.x = x
        this.y = y
        this.sp = sp
        this.col = col
        this.val
        this.switchRate = rand(1,20)
        this.s = s
    }
    render(){
        text(this.s, this.val, this.x, this.y, this.col)
        this.rain()
        this.setRandSym()
    }
    setRandSym(){
        if(frameCt  % this.switchRate == 0){
            this.val = String.fromCharCode(
            0X03B1 + rand(0,47)
            )
        }
    }
    rain(){
        this.y = (this.y >= h) ? 0 : this.y += this.sp
    }
}
class Fall{
    constructor(){
        this.syms = []
        this.totalSyms = rand(3,10)
        this.sp = rand(1,10)
    }
    generateSym(x,y){
        let s = rand(7,25) 
        for(let i = 0; i<=this.totalSyms;i++){
            let rCol = rand(0,5) ==1 ? "rgba(150,255,200)" : "rgba(0,200,50)"
           let sym = new Symbol(x, y, this.sp, rCol, s)
            sym.setRandSym()
            this.syms.push(sym)
            y -= symSize 
        }
    }
    render(){
        this.syms.forEach(sym=>{
            sym.render()
        })
    }
}

function rand(x,y){
    return Math.round(Math.random() * (y-x)) + x;
}

function text(s,txt,x,y,col){
    cx.fillStyle = col
    cx.font = `${s}px lighter Aerial` 
    cx.fillText(txt,x,y)
}

