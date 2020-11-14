let c, w, h, raf, grav, fireworks = []
const{atan2,PI,cos,sin,sqrt,random,round} = Math

function init(){
    let cvs = document.querySelector("#c")
    c = cvs.getContext("2d")
    w = cvs.width = window.innerWidth
    h = cvs.height = window.innerHeight
    c.fillStyle = "rgba(0,0,0)"
    c.fillRect(0,0,w,h)
	raf = requestAnimationFrame || ((ts)=>(setTimeout(ts,1000/60)))
	endLoad()
    grav = Vector.create(0, 0.05)
}

function render(){
    c.fillStyle = "rgba(0, 0, 0, 0.15)"
    c.fillRect(0,0,w,h)
}

const endLoad = () => {
	document.querySelector(".loader").style.display = "none"
}
		
function draw(){
    render()
    if(rand(10) < 1){
        fireworks.push(new Firework())
    }
    for(let i = fireworks.length -1; i>=0; i--){
        fireworks[i].update()
        fireworks[i].show()
        if(fireworks[i].done()){
            fireworks.splice(i,1)
        }
    }
    raf(draw)
}

class Particle{
    constructor(x,y,hu){
        this.pos = Vector.create(x,y)
        this.hu = hu
        this.vel = Vector.create(0,rand(-8,-3))
        this.acc = Vector.create(0,0)
        this.size = 3
        this.lifeSpan = 1
    }
    applyForce(force){
        this.acc.add(force)
    }
    update(){
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }
    show(){
        point(this.pos.x,this.pos.y,`hsla(${this.hu},100%, 50%, ${this.lifeSpan}`,this.size,c)
    }
}

class Fwrkpart extends Particle{
    constructor(x,y,hu){
        super(x,y,hu)
        this.vel = Vector.create(rand(-1,1),rand(-1,1))
        this.vel.setLen(1)
        this.vel.setAngle(rand(-180,180))
        this.vel.mult(rand(2,8))
    }
    update(){
        super.update()
        this.vel.mult(0.92)
        this.lifeSpan -=0.01
    }
     done(){
        if(this.lifeSpan < 0){
            return true
        }else{return false}
   }
}

class Firework{
    constructor(){
        this.hl = rand(360)
        this.firework = new Particle(rand(w),h,this.hl)
        this.exploded = false
        this.particles = []
    }
    update(){
    if(!this.exploded){
        this.firework.applyForce(grav)
        this.firework.update()
        if(this.firework.vel.y >=0){
            this.exploded = true
            this.explode()
            }
        }
        for(let i=this.particles.length-1; i>=0; i--){
            this.particles[i].applyForce(grav)
            this.particles[i].update()
            if(this.particles[i].done()){
                this.particles.splice(i,1)
            }
        }
    }
    done(){
        if(this.exploded && this.particles.length ==0){
            return true
        }else{ return false}
    }
    show(){
        if(!this.exploded){
        	this.firework.show()
        }else{
            for(let i=0; i<this.particles.length; i++){
                this.particles[i].show()
            }
        }
    }
    explode(){
        for(let i = 0; i<rand(100,250); i++){
            let p = new Fwrkpart(this.firework.pos.x, this.firework.pos.y,this.hl)
            this.particles.push(p)
        }
    }
}

function rand(x,y=0){
    return round(random() * (y-x)) + x
}

function point(x, y, col, d, c){
    c.fillStyle = col
    c.fillRect(x, y, d, d)
}

window.onload =()=>{
    setTimeout(() => {
    init()
    raf(draw)
    },2000)
}