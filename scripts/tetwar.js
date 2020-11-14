"use strict"

let up, rt, dn, lt, nav, res, brd, ctx, w, wt, ct, h, ht, au, au2, p, ai, level, life, score, g, t, tf, raf
const SQ=10, R=30, C=16, PIECES = [[[0,1,0],[1,1,1],[1,0,1]],
                [[1,1,0],[0,1,1],[1,1,0]],
                [[1,0,1],[1,1,1],[0,1,0]],
                [[0,1,1],[1,1,0],[0,1,1]]]

const init =()=> {
    up = document.querySelector("#up")
    lt = document.querySelector("#lt")
    rt = document.querySelector("#rt")
    dn = document.querySelector("#dn")
    nav = document.querySelector("#nav")
    res = document.querySelector("#res")
    au = document.querySelector("#au")
    au2 = document.querySelector("#au2")
    au.preload = "auto"
    au2.preload = "auto"
    t=0
    au2.pause()
    au2.currentTime = 0
    document.addEventListener("click", moveRot)
    
    raf = requestAnimationFrame || ((ts)=>(setTimeout(ts,1000/60)))
    brd = []     
    tf = 10
    score =g =t=0
    level = 1
    life = 3
    let c = document.getElementById("c")
    c.width = w = 210
    c.height = h = 300
    ctx = c.getContext("2d")
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, w, h)
    ht = R - 1
    wt = C - 1
    ct = Math.floor((R + 1) / 2)
    ai = []
    spiral()
    p = new GameObj(C/2-1, 2*R/3-1, PIECES, "#2d0")
    document.querySelector(".loader").style.display = "none"
    for(let i=0;i<=1; i+=1/2 ){
        for(let j=0;j <2;j++){
               ai.push(new Enemy((C-3)*j,(R-4)*i,PIECES,"#d20"))
        }
    }
}

const render=()=> {
    ctx.fillStyle ="#000"
    ctx.fillRect(0, 0, w, h)
    drwLn(ctx, C, R, "#789")
    drwTxt("SCORE", 16.5, 2, "#789", "13px ns")
    drwTxt(score, 17.5, 4, "#789", "20px ns")
    drwTxt("LEVEL", 16.5, 27, "#789", "13px ns")
    drwTxt(level, 17.5, 29, "#789", "20px ns")
    drwTxt("L I F E", 16.5, 15, "#789", "13px ns")
    drwTxt(life, 17.5, 17, "#789", "20px ns")
}

const draw = (ts) =>{
    if(life>=0){
        render()
        p.render()
        p.updateAmo(ts)
        for(let u=0;u <ai.length; u++){
        	ai[u].render()
         	if(p.damaged(ai[u])){
            life--
       	}
        p.hit(ai[u])
        ai[u].hit(p)
        if(Math.floor(ts)%(tf*5)==0){
        	switch(rand(3)){
            	case 0:
            		ai[u].fire()
            		break;
            	case 2:
            		ai[u].fire()
            		break;
            	case 1:
            		p.x<ai[u].x ? ai[u].moveLt() :ai[u].moveRt()
            		break;
            	case 3:
             		p.y>ai[u].y ? ai[u].moveDn() : ai[u].moveUp()
             		break;
             }
         }
         ai[u].updateAmo(ts)
         if(ai[u].damaged(p)){
         	ai.splice(u,1)
            score++
            if(score % 5==0){
            	level++
                tf -= 1
                if(tf<1) tf=1
             }
         }
         if(rand(10)<1){
             if(ai.length <= rand(4)){
                 ai.push(new Enemy((C-3)*rand(1),(R-4)*(rand(2)/2),PIECES,"#d20"))
             }
        }
    	}
	}else{
    	au2.play()
   		document.removeEventListener('click',moveRot)
        res.addEventListener("click",()=>{
        	init()
            render()
        })
        if(Math.floor(ts)%2==0){
            drawSQ(brd[g].x,brd[g].y,"#2d0")
            g++
            if(g>0){
               drawSQ(brd[t].x,brd[t].y,"#d20")
                t--
            }
            if(g>=brd.length-1 || t<=0){
               g = 0
               t = brd.length -1
            }
         }
    }
    raf(draw)
}

class GameObj{
    constructor(x, y, tetro, col){
            this.x = x
            this.y = y
            this.tetro = tetro
            this.col = col
            this.tetroN = 0
            this.activeTetro = this.tetro[this.tetroN]
            this.amos = []
    }
    render(){
        for(let r = 0; r < this.activeTetro.length; r++){
            for(let c = 0; c < this.activeTetro.length; c++){
                if( this.activeTetro[r][c]){
                    drawSQ(this.x + c,this.y + r, this.col)
                 }
            }
        } 
    }
      rotate(n){
             this.tetroN=n
             this.activeTetro = this.tetro[this.tetroN]
    }
      moveUp(){
            this.rotate(0)
            if(!this.collision(0,-1,this.activeTetro)){
            this.y--
        }
          this.render()
    }
    moveRt(){
            this.rotate(1)
                if(!this.collision(1,0,this.activeTetro)){
                    this.x++
              }
            this.render()
    }
    moveDn(){
            this.rotate(2)
            if(!this.collision(0,1,this.activeTetro)){
                      this.y++
        }
        this.render()
    }
    moveLt(){
            this.rotate(3)
            if(!this.collision(-1,0,this.activeTetro)){
                  this.x--
        }
        this.render()
    }
    fire(){
        let amo = new Amo(this.x +1, this.y + 1,this.col,this.tetroN)
           this.amos.push(amo)
           return true
    }
    collision(x,y,piece){
            for(let r = 0; r < piece.length; r++){
                  for(let c = 0; c < piece.length; c++){
                        if(!piece[r][c]){
                              continue
                }
                        let newX = this.x + c + x
                        let newY = this.y + r + y
    
                        if(newX < 0 || newX >= C || newY >= R|| newY < 0){
                              return true
                      }
            }
        }
        return false
    }
      damaged(other){
            for(let r = 0; r < this.activeTetro.length; r++){
                  for(let c = 0; c < this.activeTetro.length; c++){
                        if(!this.activeTetro[r][c]){
                              continue
                }
                        let newX = this.x + c 
                        let newY = this.y + r 
                        for(let i=0;i<other.amos.length;i++){
                            if(other.amos[i].x >=this.x && other.amos[i].x <= newX  && other.amos[i].y >= this.y && other.amos[i].y <=newY){
                           other.amos.splice(i,1)
                           return true
                            }
                        }
                 }
            }
    }
    
    hit(other){
        for(let i = 0;i< this.amos.length;i++){
            for(let j = 0;j<other.amos.length;j++){
            if(this.amos[i].hit(other.amos[j])){
                    this.amos.splice(i,1)
                    other.amos.splice(j,1)
                }
            }
        }
    }
    updateAmo(ts){
           for(let i=0; i<this.amos.length;i++){
           if(Math.floor(ts)%2==0){
                this.amos[i].update()
                }
                 if(this.amos[i].offScreen()){
                       this.amos.splice(i,1)
                 }else
                      this.amos[i].render()
        }
    }    
}

class Enemy extends GameObj{
      constructor(x, y, tetro, col){
           super(x, y, tetro, col)
           this.life = 1
      }
}

class Amo{
    constructor(x, y, col, orientation){
        this.x = x
           this.y = y
           this.s = 1
           this.col = col
           this.a = orientation 
    }
    render(){
             drawSQ(this.x, this.y, this.c)
    }
    update(){
    switch(this.a){
             case 0:
                 this.y -= this.s
             break
             case 1:
                 this.x += this.s
             break
             case 2:
                 this.y += this.s
             break
             case 3:
                 this.x -= this.s
             break
        }
    }
    offScreen(){
          if(this.x <0 || this.x >= C-0.5 || this.y >= R|| this.y < 0){
                return true
              }
         return false
    }
   hit(other){
        if(this.x === other.x && this.y === other.y){
            return true
        }
        return false
    }
}
 
const drwLn=(ctx,x,y,col)=>{
    ctx.beginPath()
    ctx.lineWidth = 1.5
    ctx.strokeStyle = col
    ctx.moveTo((x*SQ)+1,1)
    ctx.lineTo((x*SQ)+1,(y*SQ)-1)
    ctx.stroke()
}

const drwTxt=(txt,x,y,col,f)=>{
    ctx.fillStyle=col
    ctx.font = f
    ctx.fillText(txt,x*SQ,y*SQ)
}

const moveRot=(e)=>{
    if(e.target==up){
        p.moveUp()
    }
    if(e.target==dn){
        p.moveDn()
    }
    if(e.target==lt){
        p.moveLt()
    }
    if(e.target==rt){
        p.moveRt()
    }
    if(e.target==nav){
        p.fire()
        au.play()
    }
    if(e.target==res){
        init()
        render()
    }
}

const drawSQ=(x,y,col)=>{
    rnRect(ctx, x*SQ +0.5, y*SQ +0.5, SQ - 2, SQ - 2, 3, col)
}

const rnRect=(ctx, x, y, w, h, r,col)=>{
    ctx.strokeStyle = col
    ctx.beginPath()
    ctx.lineWidth = 1.5
    ctx.moveTo(x, y + r)
    ctx.lineTo(x, y + h - r)
    ctx.quadraticCurveTo(x, y + h, x + r, y + h)
    ctx.lineTo(x + w - r, y + h)
    ctx.quadraticCurveTo(x + w, y + h, x + w, y + h-r)
    ctx.lineTo(x + w, y + r)
    ctx.quadraticCurveTo(x + w, y, x + w - r, y)
    ctx.lineTo(x + r, y)
    ctx.quadraticCurveTo(x, y,x, y + r)
    ctx.closePath()
    ctx.stroke()
}

const spiral=()=>{
    for(let i = 0;i<ct;i +=1){
        for(let j=i;j<=wt;j +=1){
            brd.push({x:j,y:i})
        }
        for(let j=i;j<=ht;j +=1){
            brd.push({x:wt,y:j})
        }
        for(let j=wt-1;j>=i;j -=1){
            brd.push({x:j,y:ht})
        }
        for(let j=ht-1;j>i;j -=1){
            brd.push({x:i,y:j})
        }
        ht -=1
        wt -=1
    }
}

window.onload =()=>{
    setTimeout(()=>{
    init()
    raf(draw)
    },2000)
}
const rand=(x,y=0)=>{
    return Math.round(Math.random() * (y-x)) + x
}
