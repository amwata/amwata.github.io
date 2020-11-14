"use strict"

let timer, colArr, cmpl, btns, cmplArr, intID, score, i, rate, boxCol, Fate, lpsmdl, lpspop

let init = () =>{
	timer=10
	score = 0
  	btns = document.querySelectorAll("button")
	colArr = ["red", "yellow", "blue", "green" ,"purple"]
	boxCol = document.getElementById("box")
	cmpl = document.getElementById("txt")
	lpsmdl = document.querySelector(".lpsmdl")
	lpspop = document.querySelector(".lpspop")
	cmplArr = ["Cool *!", "Nice !!","Awesome" + "<br>" + "!!*","Amazing" + "<br>" + "!*!*","Spectacular" + "<br>" + "€*!!","Superb" + "<br>" + "£*!","Excellent" + "<br>" + "$*!!","Splendid" + "<br>" + "¥*!*","Marvellous" + "<br>" + "€$*","Incredible" + "<br>" + "*$!!"]
 	i = 0
 	Fate = document.getElementById("gain")
	rate = document.getElementById("lapse")
	intID = setInterval(counter,1000)
	rate.innerHTML=""
	btns.forEach(item => {
		item.addEventListener("click", colorShift)
	}) 
   	boxCol.style.background = colArr[Math.floor(Math.random()*5)]
	for(let i=0;i<btns.length;i++){
		btns[i].style.background = colArr[i]
 	}
 	document.querySelector(".loader").style.display = "none"
}

const returnScore = () => {
	Fate.value = score
	score++
	timer++
 	if(score < 10) {
      Fate.value = "0" + score
 	}else { Fate.value = score}
	if(score % 5==0) {
		if (i>=0 && i<cmplArr.length) {
 			cmpl.innerHTML = cmplArr[i]
		}
		i++
	}else { cmpl.innerHTML = "" }
}

const incorrectScore = () => {
	timer--
    cmpl.innerHTML = ""
    Fate.value = score
    if ((score !==0)&&(score % 5==0)) {i--}
    if (score > 0) { score-- }
    if (score < 10) { Fate.value = "0" + score}
    else {Fate.value = score}
}

const randBtn = () => {
    for(let i = btns.length-1; i >= 0; i--){
        const r=Math.floor(Math.random()*i);
        [btns[i].innerHTML ,btns[r].innerHTML ] = [btns[r].innerHTML ,btns[i].innerHTML ]
    }
 }
 
const randBtnc = () =>{
    for(let i = btns.length-1; i>=0; i--){
        const t = Math.floor(Math.random()*i);
        [btns[i].style.background, btns[t].style.background] = [btns[t].style.background, btns[i].style.background]
    }
}

function colorShift() {
	this.innerHTML== boxCol.style.background ? returnScore() : incorrectScore()
    let boxShuffle = Math.floor(Math.random() * 5)
	boxCol.style.background = colArr[boxShuffle]
    randBtn()
    randBtnc()
}
   
const counter = () =>{
     rate.innerHTML = timer
     timer--
     if (timer < 0) {
     	clearInterval(intID)
    	btns.forEach(item => {
    		item.removeEventListener("click", colorShift)
    	})
     lpsmdl.classList.add("active")
     Fate.value = "0" + score
     lpspop.innerHTML = ""
     lpspop.innerHTML = `<p>Your Score Was: 0${score}</p>`
     lpspop.innerHTML =`${lpspop.innerHTML} <a href="#" onclick="a()"> Try Again! </a>`
     }
}

const a = () => {
	timer = 10
  	score = 0
	lpsmdl.classList.remove("active")
 	intID = setInterval(counter, 1000)
	let j = Math.floor(Math.random() * 5)
	boxCol.style.background = colArr[j]
    randBtn()
    randBtnc()
 	btns.forEach(item => {
    	item.addEventListener("click", colorShift)
    })
    i=0
    cmpl.innerHTML = ""
    Fate.value = "0" + score
    rate.innerHTML = timer
	lpspop.innerHTML = ""
}

window.onload=()=>{
	setTimeout(init, 2000)
}
