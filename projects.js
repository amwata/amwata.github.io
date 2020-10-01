window.onload=()=>{
listeners()
let isInView,anim
     	const boxes = document.querySelectorAll(".inview")
     	const txb = document.querySelectorAll(".slidetxb")
     	
     	let raf = requestAnimationFrame || function(cb){setTimeout(cb,1000/60)}
     	function animate(){
     	boxes.forEach(b =>{
     	if(isInView(b,10)){
     		b.classList.add("slideB")
     	   }else{b.classList.remove("slideB")}
   		})
   		raf(animate)
   		}
  
  isInView = (el,p) =>{
	const percentVisible = p/100,
     {top:elemTop, bottom:elemBottom, height:elemHeight}= el.getBoundingClientRect(),
      overhang = elemHeight * (1 - percentVisible)
  
  	return (elemTop >= -overhang) && (elemBottom <= window.innerHeight + overhang)
  }
 	//animate()
   // raf(slidetxb)
 //	raf(animate)
 	init()
 	anima()
 }
