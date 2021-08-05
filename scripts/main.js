"use strict"

window.onload = () =>{
"use strict"
	const{random:rand,round:rnd,floor} = Math,
		loader = document.querySelector(".loader"),
		phrases =[["For the Time ","I spent on","Tegmark's Life 3.0","I learnt that","Systems can be","Improved to better","Handle Uncertainty"],
			   	  ["We can sometimes","wake up to","the solution of","debugging a code","that our subconscious","has been working on"],
			      ["Fully Understanding","The Concepts of","Physics can be","Extremely Challenging","and perhaps","unnecessary except","to illustrate the","idea of Universality"],
				  ["Being a Theoretical"," Physicist You think","to really understand","something only to","find that you don't","know crap about it"]],

	imgs = ["img5.png","img6.png","img4.png","img3.png"],
	glpBg = ["glpbx1", "glpbx2","glpbx3","glpbx4"],
	
    hdClose = document.querySelector(".hdclose"),
	hdNav = document.querySelector("nav"),
	hdMn = document.querySelector(".hdmn"),
	hdMark = document.querySelector(".dsktop .hdmn .hdslide"),
	mobMark = document.querySelector(".mobile .hdmn .hdslide"),
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
	glimgPop = document.querySelector(".glimgpop img"),
	glCtns = document.querySelectorAll(".glctn"),
	glimgBxs = document.querySelectorAll(".glimgbx img"),
	glpBx = document.querySelectorAll(".glpbx"),
	glClose = document.querySelector(".glclose"),
	skills = document.querySelector("#skills"),
	svc = document.querySelector("#services"),
	fields = Array.from(document.querySelectorAll(".blc"))
	
	const inValid = s => {
		return !s.trim().length
	}
	const isBlank = fs => {
		return fs.some(f => inValid(f.value))
	}
	
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
				const el = document.querySelector(e.target.getAttribute("href"))
			 	let offTop
			 	if(el == svc || el == skills){
			 		offTop = el.offsetParent.offsetParent.offsetTop + el.offsetTop
			 	}else offTop = el.offsetTop
			 	
				e.preventDefault()
				mobMarker(li)
				addScroll()
				glMdl.classList.remove("glmdlv")
				if(offTop != null){
					hdClose.classList.remove("active")
					mobNav.classList.remove("activea")
					document.body.classList.remove("blur")
					setTimeout(()=>{ 
						window.scrollTo({ top: offTop, behavior: "smooth" })
					},700)
				}
		
			})
		})
		
		hdlinks.forEach(li =>{
			li.addEventListener("click",(e)=>{
				const el = document.querySelector(e.target.getAttribute("href"))
				let offsetTop
				if(el == svc || el == skills){
					offsetTop = el.offsetParent.offsetParent.offsetTop
				}else offsetTop = el.offsetTop
				
				e.preventDefault()
				hdMarker(li)
				addScroll()
				glMdl.classList.remove("glmdlv")
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
			glimgPop.src = `${i.src}`
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
		
		const scriptURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfrFplE8qis-Sw90gyu83OyczcnRwmuTK9pFn0WO3YaF01NdA/formResponse"
		const form = document.forms['submit-sigmoid-response'],
		alrt = document.querySelector(".smtlrt")
		
		const hidEl = (el, cl) => {
			setTimeout(() => {
				el.classList.remove(cl)
			}, 3000)
		}
		
		form.addEventListener('submit', e => {
			e.preventDefault()
			alrt.innerHTML = `<p>Sending message...</p>`
			alrt.classList.add("alrtop")
			
			if(isBlank(fields)){
				alrt.innerHTML = `<span class="er"></span><p>Fields cannot be blank</p>`
				hidEl(alrt, "alrtop")
			}
			else if (navigator.onLine) {
				fetch(scriptURL, { method: 'POST', mode:'no-cors', body: new FormData(form)})
				.then(response => console.log('Success!', response)).then(() => {
					alrt.innerHTML = `<span class="sc"></span><p>Message sent</p>`
					form.reset()
					hidEl(alrt, "alrtop")
				})
				.catch((e) => {
					alrt.innerHTML = `<span class="er"></span><p>Try Again</p>`
					hidEl(alrt, "alrtop")
				})
			} else { 
				alrt.innerHTML = `<span class="er"></span><p>Connection error</p>`
				hidEl(alrt, "alrtop")
			}
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
			if(isInView(view, 20)){
				view.classList.add("toview")
			}else{view.classList.remove("toview")}
 		})
 		if(isInView(hmview, 50, false)){
 			hmview.classList.add("toview")
 		}else{hmview.classList.remove("toview")}
 		if(isInView(sklsView, 30)){
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
		for(let i = glCtns.length-1; i >= 0; i--){
 			const t = floor(rand()*i)
			arrSwap(i, t, imgs)
   			glimgBxs[i].src = `${path + imgs[i]}`
	
			arrSwap(i, t, glpBg)
			if(glpBx[i].classList.length <= 1){
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
			skills.set("NodeJs", 70)
			skills.set("JavaScript", 90)
			skills.set("Core Python", 85)
			skills.set("HTML & CSS", 85)
			skills.set("SQL", 75)
			skills.set("WordPress", 75)
	
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
	endLoad()
	tecSkills(ctnTec)
	perSkills(ctnPer)
   	slidView()
	randglBg()
	createPhrase()
	events()
	
	console.log(`                  .,,,,,,,,,,\n             ,;k0O#$00k000Oxc\n           :WNd'    ';MX;\n          ,0MM:        :WNd'\n          lWM:          :M0l\n          cNM:          :Mk:\n          .dNM:         :Kx;\n            ;kX:      :Kd'\n              ""-'cc-""'`)
}
