
"use strict"

window.onload = () =>{
"use strict"
	const{random:rand,round:rnd,floor} = Math,
		loader = document.querySelector(".loader"),
		 phrases =[["For the Time ","I spent on","Tegmark's Life 3.0","I learnt that","Systems can be","Improved to better","Handle Uncertainty"],
			   	  ["We can sometimes","wake up to","the solution of","debugging a code","that our subconscious","has been working on"],
			      ["Fully Understanding","The Concepts of","Physics can be","Extremely Challenging","and perhaps","unnecessary except","to illustrate the","idea of Universality"],
				  ["Being a Theoretical"," Physicist You think","to really understand","something only to","find that you don't","know crap about it"]],

	imgs = ["img1.png","img3.png","img4.png","img6.png"],
	glpBg = ["glpbx1", "glpbx2","glpbx3","glpbx4"],
	
    hdClose = document.querySelector(".hdclose"),
	hdNav = document.querySelector("nav"),
	hdMn = document.querySelector(".hdmn"),
	hdMark = document.querySelector(".dsktop .hdmn .hdslide"),
	mobMark = document.querySelector(".mobile .hdmn .hdslide"),
	mobMrk = document.querySelector(".mobslide"),
	sec = document.querySelector("#home"),
	hdlinks = document.querySelectorAll(".dsktop .hdmn .li a"),
	mobLinks = document.querySelectorAll(".mobile .hdmn .li a"),
	lists = document.querySelectorAll("header nav .hdmn .li"),
	mobNav = document.querySelector(".mobile"),
	mark = document.querySelector("#sklmarker"),
	sklsView = document.querySelector(".skillsview"),
	spans = document.querySelectorAll(".skills span"),
	ctnTec = document.querySelector("#techctn"),
	ctnPer = document.querySelector("#persctn"),
	per = document.querySelector("#per"),
	tec = document.querySelector("#tec"),
    views = document.querySelectorAll(".inview"),
    raf = requestAnimationFrame || ((ts)=>(setTimeout(ts,1000/60))),
	hmview = document.querySelector(".hmdiv"),
    glView = document.querySelector(".glview"),
	glMdl = document.querySelector(".glmdl"),
	glimgPop = document.querySelector(".glimgpop"),
	glCtns = document.querySelectorAll(".glctn"),
	glimgBxs = document.querySelectorAll(".glimgbx"),
	glpBx = document.querySelectorAll(".glpbx"),
	glClose = document.querySelector(".glclose"),
	ctcSbj = document.querySelector("#ctcsbj"),
	ctcMsg = document.querySelector("#ctcmsg"),
	ctcMail = document.querySelector("#ctcmail")
	
	const endLoad = () => {
		loader.style.display = "none"
		toggleBodyscroll()
	}
	
	const arrSwap = (a, b, arr) =>{
    	let temp = arr[a]
    	arr[a] = arr[b]
    	arr[b] = temp 
	}
	
	const events = () => {
		
		hdClose.addEventListener("click",(e)=>{
			hdClose.classList.toggle("active")
			mobNav.classList.toggle("activea")
			document.body.classList.toggle("blur")
			if(!glMdl.classList.contains("glmdlv")){
				toggleBodyscroll()
			}
		})
		
		mobLinks.forEach(li =>{
			li.addEventListener("click",(e)=>{
				const offsetTop = document.querySelector(e.target.getAttribute("href")).offsetTop
				e.preventDefault()
				mobMarker(li)
				addScroll()
				glMdl.classList.remove("glmdlv")
				if(offsetTop != null){
					hdClose.classList.remove("active")
					mobNav.classList.remove("activea")
					document.body.classList.remove("blur")
					setTimeout(()=>{ 
					window.scrollTo({ top: offsetTop, behavior: "smooth" })
					},700)
				}
		
			})
		})
		
		hdlinks.forEach(li =>{
			li.addEventListener("click",(e)=>{
				e.preventDefault()
				hdMarker(li)
				addScroll()
				glMdl.classList.remove("glmdlv")
				const offsetTop = document.querySelector(e.target.getAttribute("href")).offsetTop
				if(offsetTop != null){
					hdClose.classList.remove("active")
					mobNav.classList.remove("activea")
					document.body.classList.remove("blur")
					setTimeout(()=>{ 
						window.scrollTo({ top: offsetTop, behavior: "smooth" })
					},300)
			    }
			})
		})
		
		spans.forEach(span =>{
			span.addEventListener("click", (e)=>{
				marker(e.target)
				if(e.target == tec){
					ctnTec.style.display = "flex"
					ctnPer.style.display = "none"
				}else if(e.target == per){
					ctnPer.style.display = "flex"
					ctnTec.style.display = "none"
				}
			})
		})
		
		glimgBxs.forEach(i=>{
			i.addEventListener("click",()=>{
			removeScroll()
			glMdl.classList.add("glmdlv")
			Object.assign(glimgPop.style,{background: `${i.style.background} no-repeat`, backgroundSize:"100%", backgroundPosition:"50%"})
			})
		})
	
		glClose.addEventListener("click",(e)=>{
			addScroll()
			glMdl.classList.toggle("glmdlv")
		})
		window.addEventListener("click",(e)=>{
			if( e.target == glMdl){
				addScroll()
				glMdl.classList.remove("glmdlv")
			}
			if(e.target == mobNav ){
				hdClose.classList.remove("active")
				mobNav.classList.remove("activea")
				document.body.classList.remove("blur")
				if(!glMdl.classList.contains("glmdlv")){
					addScroll()
				}
			}
		})
		
		ctcMail.addEventListener("click",()=>{
			let sb = ctcSbj.value
			let ms = ctcMsg.value
			linkMail(ctcMail, sb, ms, "saseda0@gmail.com", "akechsamwel@students.ku.ac.ke")
		})
	}
	const hdMarker = (e) =>{
		hdMark.style.top = `${e.offsetTop}px`
		hdMark.style.left = `${e.offsetLeft}px`
		hdMark.style.width = `${e.offsetWidth}px`
		hdMark.style.height = `${e.offsetHeight}px`
	}
	
    const mobMarker = (e) =>{
		mobMark.style.top = `${e.offsetTop}px`
		mobMark.style.left = `${e.offsetLeft}px`
		mobMark.style.width = `${e.offsetWidth}px`
		mobMark.style.height = `${e.offsetHeight}px`
	}
	
	const rRand =(x,y=0)=>{
		return rnd(rand()*(y-x)) +x
	}
 
	const slidView =()=>{
		mobLinks.forEach(li=>{
			let sec = document.querySelector(li.hash)
			if(isInView(sec, 50, false)){
				mobMarker(li)
			}
		})
		hdlinks.forEach(li=>{
			let sec = document.querySelector(li.hash)
			if(isInView(sec, 50, false)){
				hdMarker(li)
			}
		})
		if(isInView(sec, 50, false)){
			document.body.classList.add("navbg")}else{document.body.classList.remove("navbg")
		}
		
		views.forEach(view=>{
			if(isInView(view, 30)){
				view.classList.add("toview")
			}else{view.classList.remove("toview")}
 		})
 		if(isInView(hmview, 50, false)){
 			hmview.classList.add("toview")
 		}else{hmview.classList.remove("toview")}
 		if(isInView(sklsView, 30, false)){
 			sklsView.classList.add("progactive")
 		}else{sklsView.classList.remove("progactive")}
 		raf(slidView)
	}

	const isInView = (el, p, d = true) =>{
		const percentVisible = p/100,
		{top:elemTop, bottom:elemBottom, height:elemHeight}= el.getBoundingClientRect(),
		overhang = elemHeight * (1 - percentVisible)
 	
 		if(!d){return (elemTop >= -overhang && elemBottom <= window.innerHeight + overhang)}
		return elemBottom <= window.innerHeight + overhang
	}
 
	const randglBg = () =>{
		let path = "imgs/"
		for(let i = glCtns.length-1;i>=0;i--){
 			const t = floor(rand()*i)
			arrSwap(i, t, imgs)
   			Object.assign(glimgBxs[i].style,{background:`url(${path + imgs[i]}) no-repeat` , backgroundSize:"cover"})
	
			arrSwap(i, t, glpBg)
			if(glpBx[i].classList.length  <=1){
				glpBx[i].classList.add(glpBg[i])
			}
		}
	}

	const createPhrase  = () =>{
   		for(let i = phrases.length - 1;i>=0; i--){
    		glpBx[i].innerHTML = ""
    		const t = floor(rand()*i)
    		arrSwap(i, t, phrases)
    		for(let j = 0; j < phrases[i].length ; j++){	
				let p = document.createElement("p")
 				let tx = phrases[i][j]
	    		let mlr = 1/tx.length * 200
				glpBx[i].append(p)
				p.textContent = tx
				Object.assign(p.style,{zIndex:`${rRand(10)}`,margin:`${rRand(3)}px ${mlr}%`,transform:`rotate(${rRand(-3,3)}deg)`});
			}
		}	
	}
	
	let createEl = (id, text, per) =>{
		let box = document.createElement("div"),
			bar = document.createElement("div"),
			txt = document.createElement("p"),
			prog = document.createElement("div"),
			span = document.createElement("span"),
			pct = document.createElement("p")
	
			box.setAttribute("class","sklsbx")
			bar.setAttribute("class","sklbar")
			box.setAttribute("style",`--perc:${per}`)
			prog.setAttribute("class","sklprog")
			txt.textContent = text
			pct.textContent = `${per}%`
	
			span.appendChild(pct)
			prog.appendChild(span)
			bar.appendChild(txt)
			box.appendChild(bar)
			box.appendChild(prog)
	
			id.appendChild(box)
		//	box.classList.add("active")
	}
	
	let marker = (e) =>{
		mark.style.left = `${e.offsetLeft}px`
		mark.style.width = `${e.offsetWidth}px`
	}
	
	let tecSkills =(id)=>{
		let skills = new Map()
			skills.set("React", 85)
			skills.set("JavaScript", 90)
			skills.set("Git", 70)
			skills.set("HTML & CSS", 85)
			skills.set("TensorFlow", 55)
			skills.set("SQL", 75)
			skills.set("NodeJs", 70)
			skills.set("WordPress", 75)
			skills.set("UI/UX", 75)
	
		for (let [k, v]of skills){
				createEl(id, k, v)
		}
		skills.clear()
	}
	
	const toggleBodyscroll = () =>{
		if (!document.body.classList.contains("noscroll")){
			document.body.classList.add("noscroll")
		}else{document.body.classList.remove("noscroll")}
	},
		addScroll = () =>{
			if (document.body.classList.contains("noscroll")){
				document.body.classList.remove("noscroll")
			}
		},
		removeScroll = () =>{
		    if (!document.body.classList.contains("noscroll")){
		    	document.body.classList.add("noscroll")
		    }
		}
	const linkMail = (id,sbj,msg,...adrs) => {
		let co = adrs[0]
		let cc = adrs.splice(1).join()
		let sbjCoded = encodeURIComponent(sbj)
		let msgCoded = encodeURIComponent(msg)
		id.href = `mailto:${co}?cc=${cc}&subject=${sbjCoded}&body=${msgCoded}`
	}
	
	let perSkills = (id) =>{
		let skills = new Map()
			skills.set("Problem Solving", 85)
			skills.set("TeamWork", 90)
			skills.set("Communication", 90)
			skills.set("Speed", 85)
			skills.set("Self Motivation", 95)
	
		for (let [k, v]of skills){
			createEl(id, k, v)
		}
		skills.clear()
	}
	setTimeout(() =>{
		endLoad()
		tecSkills(ctnTec)
		perSkills(ctnPer)
   	 	slidView()
		randglBg()
		createPhrase()
		events()},2000)
}