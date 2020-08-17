
let slides,sec,imgBox,dir,iter

const {random:rand,round:rnd} = Math
const rRand =(x,y=0)=>{
	return rnd(rand()*(y-x)) +x
}

const init=()=>{
    sec = document.querySelector(".imgsec")
	slides = document.querySelector(".slides")
    imgBox = document.querySelector("#img")
    dir = "/"
    iter = 1
	
}

const phs =[["For the Time I spent","on Tegmark's Life 3.0","I learnt that Systems","can be Improved to","better Handle Uncertainty"],
	        ["We can sometimes","wake up to the solution","of debugging a code","that our subconscious","has been working on"],
	        ["Fully Understanding","Concepts of Physics can","be Extremely Challenging","and perhaps unnecessary","except to illustrate","the idea of Universality"],
	        ["As a Theoretical Physicist","You think to really","understand something","only to find that you don't","know crap about it"],
	        ["A Transcendental","Number can never be","a Multiple of an","Integer Polynomial","- totally Unnecessary but","to satisfy my inner geek"],
	        ["Dark was the Night","Cold was the Ground","in the vast Cosmic Arena","stars stretched","in a never-ending line"],
	        ["Tell me of the Martian Cities","Aren't they a Mystery?","the buildings are shaped","like geometric patterns","too fantastic for"," Human mind to Imagine"]]
		  
		  
const cols =[[45,67, 123],
			 [101,57, 42],
			 [55,103,145],
			 [31,142,156],
			 [76,81,109],
			 [105,45,102],
		     [121,92, 23]]
		     
const imgs = ["img1.png","img2.png","img3.png","img4.png","img5.png","img6.png","img7.png"]

const slide = (i,p) =>{
    let k = 0,h,r,g,b
    let q = parseInt(p[i].length)
       let tId = setInterval(()=>{
		h = document.createElement("h4")
		let t = p[i][k]
		r = cols[i][0] 
		g = cols[i][1] 
		b = cols[i][2] 
		let mlr = 1/t.length * 250
		Object.assign(h.style,{position:"relative",display:"block",zIndex:`${rRand(10)}`,color:"#eef",transformOrigin:"50%",margin:`${rRand(3)}px ${mlr}%`,boxSizing:"border-box",textAlign:"center",transform:`rotate(${rRand(-3,3)}deg) translateY(40px)`,background:`rgba(${r},${g}, ${b})`,boxShadow:"0 0 10px rgba(0,0,0,.7)",padding:"5px 0",fontWeight:"400",fontSize:"1.1em",lineHeight:"1em",transition:".5s ease-out",opacity:"0",fontFamily:`'Baloo Da 2',Arial`});
		h.textContent = t
		slides.append(h)
		h.style.transition =".5s ease-out"
		setTimeout(()=>{
		h.style.transform = `rotate(${rRand(-2,2)}deg) translateY(20px)`
		h.style.opacity = `1`
		},50)
		k++
		(k < q) ? false :clearInterval(tId)
		},800)
		slides.innerHTML=""
}
const imgSlider = (dir,imf) =>{
    let bg= `url(${dir + imf})`
    Object.assign(imgBox.style,{background:`${bg}`,backgroundSize:"cover"})
}

const anima =()=>{
	if(sec.classList.contains("slideB")){
	slide(0,phs)
	imgSlider(dir,imgs[0])
    setInterval(()=>{
		slide(iter,phs)
		imgSlider(dir,imgs[iter])
		iter++
		(iter>=phs.length) ? iter=0 : true
	},10000)
	sec.classList.remove("slideB")
	}else{requestAnimationFrame(anima)}
}
