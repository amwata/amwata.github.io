"use strict"
class UI{
    constructor(){
        this.tnav =document.querySelector(".tnav")
        this.snav = document.querySelector("nav")
        this.loader = document.querySelector(".loader")
        this.bar = document.querySelector(".bar")
        this.logoBox = document.querySelector(".header")
        this.logo = document.querySelector(".h1")
        this.logoHr = document.querySelector(".hr")
        this.logoH = document.querySelector(".h3")
        this.horizon = document.querySelector(".horizon")
        this.body = document.querySelector("body")
    }
    toggleNav(){
        this.tnav.classList.toggle("activetnav")
        this.snav.classList.toggle("snav")
        this.toggleBodyscroll()
    }
    endLoad(t=0){
        this.toggleBodyscroll()
        setTimeout(()=>{
        this.loader.style.display = "none"
        this.toggleBodyscroll()
        },t*1000)
    }
    animate(){
        this.animLogo()
    }
    
    animLogo(){
    this.animBg(this.logoBox,`rgba(48,80,112,.4)`,.2,.3)
    this.animBshadow(this.logoBox,`inset 0 0 5px rgba(32,48,128,.8)`,.2,.3)
    this.animCol(this.logo,`rgba(80,16,48,1)`,.3,.4)
    this.animCol(this.logoH,`rgba(208,224,240,1)`,.3,.6)
    this.animTransform(this.logoHr,`scaleX(1)`,.3,.8)
    this.animTransform(this.horizon,`rotate(-15deg) scale(1)`,.5,.8)
    }
    animCol(el,col,t,d){
        this.transition(el,t,d)
        el.style.color = col
    }
    animTransform(el,val,t,d){
        this.transition(el,t,d)
        el.style.transform = val
    }
    animBg(el,col,t,d){
        this.transition(el,t,d)
        el.style.background = col
    }
    animBshadow(el,col,t,d){
        this.transition(el,t,d)
        el.style.boxShadow  = col
    }
    transition(el,t,d){
        el.style.transition = `${t}s ease-out ${d}s`
    }
    toggleBodyscroll(){
        if(this.body.classList.contains("noscroll")){
           this.body.classList.remove("noscroll")
        }else{
            this.body.classList.add("noscroll")
        }
    }
    linkMail(id,sbj,msg,...adrs){
        let co = adrs[0]
        let cc = adrs.splice(1).join()
        let sbjCoded = encodeURIComponent(sbj)
        let msgCoded = encodeURIComponent(msg)
        document.querySelector(id).href = `mailto:${co}?cc=${cc}&subject=${sbjCoded}&body=${msgCoded}`
    }
}

let sb = 0,scroll

function listeners(){
    const t = 0,d = (t*1000 + 10)
    const sbj = document.querySelector("#sbj")
    const msg = document.querySelector("#msg")
    const bar = document.querySelector(".tnav")
   // let barNav = document.querySelector("#bar")
    const nlinks = document.querySelectorAll(".nlink")
    const ui = new UI()
    ui.endLoad(t)
    bar.addEventListener("click", (e)=>{
        ui.toggleNav()
    })
    nlinks.forEach(i => {
    i.addEventListener("click", (e)=>{
        ui.toggleNav()
    })
    })
    setTimeout(()=>{
        ui.animate()
    },d)
  document.querySelector("#mail").addEventListener("click",()=>{
       let sb = sbj.value
       let ms = msg.value
       ui.linkMail("#mail",sb,ms,"saseda0@gmail.com","akechsamwel@students.ku.ac.ke")
   })
   scroll()
  }
  let raf = function(cb){setTimeout(cb,1000)}
  scroll = ()=>{
  let barNav = document.querySelector("#bar")
          if(sb < window.pageYOffset){
          	barNav.style.top = "-45px"
          	}else if(sb > window.pageYOffset ){
          	barNav.style.top = "0px"
          	}
    	raf(scroll)
    	sb = window.pageYOffset 
   }
  /* document.addEventListener("scroll",()=>{
        if(window.pageYOffset > offset){
            barNav.style.top = "-45px"
            offset = window.pageYOffset
        }else{
            barNav.style.top = "0px"
            offset = window.pageYOffset
        }
   })*/