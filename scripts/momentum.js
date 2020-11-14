"use strict"

let block1, block2, col1, col2, vel, raf, dit1, dit2, ts, text, textSize, c, cx, w, h, pi, width, height, m1, m2

let init = () => {
    c = document.getElementById("c")
    cx = c.getContext("2d")
    c.width = w = window.innerWidth 
    c.height = h = window.innerHeight
    
    cx.fillStyle = "#448"
    cx.fillRect(0, 0, w, h)
    text = 0
    raf = requestAnimationFrame || ((ts)=>(setTimeout(ts,1000/60)))
    pi = String.fromCharCode(0x03C0)
    ts = 1000
    textSize = 25
    width = 20
    height = 40
    dit1 = -2
    dit2 = 4
    vel = 2
    
    col1 = "#0d98ba"
    col2 = "#0dba86"
    m1 = Math.pow(10, dit1)
    m2 = Math.pow(10, dit2)
    block1 = new Block(150, normalize(dit1, -2, 5) * 80 + 20, 0, m1, col1)
    block2 = new Block(300, normalize(dit2, -2, 5) * 80 + 20, -vel/ts, m2, col2)
    
    controls()
    draw()
}

const endLoad = () => {
	document.querySelector(".loader").style.display = "none"
}

let normalize = (x, min, max) => {
    return (x - min)/(max - min)
}

let controls = () =>{
    const sliders = document.querySelectorAll(".slider"),
        vls = document.querySelectorAll(".vl")
    sliders.forEach((slider,i)=>{
        vls[i].textContent = slider.value
        slider.oninput = () =>{
            vls[i].textContent = slider.value
           
        }
    })
}

let eventL = () =>{
    let ma = document.querySelector(".m1"),
        mb = document.querySelector(".m2"),
        vl = document.querySelector(".vel")
        
    window.addEventListener("input", (e) =>{
        if(e.target == ma){
           dit1 = parseFloat(e.target.value)
           
           m1 = Math.pow(10, dit1)
           block1 = null 
           block1 = new Block(50, normalize(dit1, -2, 5) * 80 + 20, 0, m1, col1)
        }
        if(e.target == mb){
            dit2 = parseFloat(e.target.value)
           m2 = Math.pow(10, dit2)
           block2 = null 
           block2 = new Block(250, normalize(dit2, -2, 5) * 80 + 20, -vel/ts, m2, col1)
        }
        if(e.target == vl){
            vel = parseFloat(e.target.value)
           block2 = null 
           block2 = new Block(250, normalize(dit2, -2, 5) * 80 + 20, -vel/ts, m2, col1)
        }
    })
}

function render(){
    cx.fillStyle = "#7080a0"
    cx.fillRect(0, 0, w, h)
    cx.beginPath()
    cx.strokeStyle = "#234"
    cx.lineWidth = 2
    cx.moveTo(width, 0)
    cx.lineTo(width, h - height)
    cx.lineTo(w, h-height)
    cx.stroke()
}

function draw(){
    render()
    for(let i=0;i<ts;i++){
        if(block1.collide(block2)){
            const v1 = block1.bounce(block2)
            const v2 = block2.bounce(block1)
            block1.v = v1
            block2.v = v2
            block1.col = "#98ba0d"
            block2.col = "#98ba0d"
            text++
        }else{
            block1.col = "#0d98ba"
            block2.col = "#0dba86"
        }  
       if( block1.hitWall()){
           text++
           block1.v *= -1
           block1.col = "#98ba0d"
       }
   
       if(block2.hitWall()){
           block2.v *= -1
           text = 0
       }

    block1.update()
    block2.update()
    }
        block1.show()
        block2.show()
        
        count(`Approximating`, w/2, h/2 - 25, "#234",18)
        count(`${pi}=${text}`, w/2, h/2, "#234", 28)
    
    raf(draw)
}


class Block{
    constructor(x, wd, v, m, col){
        this.x = x
        this.w = wd
        this.y = h - wd - height
        this.v = v
        this.col = col
        this.m = m
    }
    
    hitWall(){
        return(this.x <= width || this.x >= w)
    }
    
    collide(other){
        return !(this.x + this.w < other.x || this.x > other.x + other.w)
    }
    
    bounce(other){
        const sumM = this.m + other.m
        let newV = (this.m - other.m) / sumM * this.v
        newV += (2*other.m/sumM) * other.v
        return newV 
    }
    
    update(){
        this.x += this.v
    }
    
    show(){
     drawRect(this.x, this.y, this.w, this.w, this.col)
     this.updateLbl()
    }
    
    updateLbl(){
        cx.fillStyle = "#234"
        cx.font = `22px ns` 
        cx.fillText(this.m, this.x, this.y - 10)
    }
}


function drawRect(x, y, w, h, col){
    cx.fillStyle = col
    cx.fillRect(x, y, w, h)
    cx.strokeRect(x, y, w, h)
}

function count(txt, x, y, col,ts){
    cx.fillStyle = col
    cx.font = `${ts}px ns` 
    cx.fillText(txt, x, y)
}

window.onload = () => {
    setTimeout(() =>{
    endLoad()
    eventL()
    init()
    raf(draw)
    },2000)
    
}


