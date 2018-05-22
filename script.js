var table = document.getElementById("table");
var cnsl = document.getElementById("console");
var boolean = true;
if(!table){
	console.log("no rows");
	boolean = false;
}
else if (table.children.length === 0){
	console.log("no rows");
	boolean = false;
}
else{
	var pfx  = ["webkit", "moz", "MS", "o", ""];
	for (var i = 0; i < table.children.length; i++){
		for( var j = 0; j < table.children[i].children.length; j++){
			if(i === (table.children.length-1) && j === (table.children[i].children.length-1)){
				table.children[i].children[j].className = "endAnim";
			}

			/*регистрация определенных обработков событий анимации*/
			PrefixedEvent(table.children[i].children[j], "AnimationStart", 
				function(){
					cnsl.innerHTML += "<br>cell " + this.innerHTML + " animation start";
					console.log("cell " + this.innerHTML + " animation start");
					cnsl.scrollTop = cnsl.scrollHeight;
				}
				, pfx);
			PrefixedEvent(table.children[i].children[j], "AnimationEnd", 
				function(){
					cnsl.innerHTML += "<br>cell " + this.innerHTML + " animation end";
					console.log("cell " + this.innerHTML + " animation end");
					if (this.className === "endAnim anim"){
						animEnd();
					}
					cnsl.scrollTop = cnsl.scrollHeight;
				}
				, pfx);
		}
	}
}

if (boolean === true){ /*если все условия выполнились*/
	var btn = document.getElementById("buttonStart");
	btn.onclick = function(){
		this.value = "in progress";
		this.disabled = true;
		cnsl.innerHTML = "progress start";
		console.log("progress start");
		var interval = 0;
		for (var i = 0; i < table.children.length; i++){
			for( var j = 0; j < table.children[i].children.length; j++){
				setTimeout(
					(function(element){
			            return function(){
			            	element.classList.add("anim");
			            }
			        })(table.children[i].children[j]), interval);	
				interval+=800*0.6;
			}
		}
	};
}

function PrefixedEvent(element, type, callback, pfx) { /*функция для кроссбраузерности регистрации определенной обработки события анимации*/
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p] + type, callback, false);
    }
}

function animEnd(){/*конец анимации, приводим объякты к начальному состоянию*/
	var btn = document.getElementById("buttonStart");
	document.getElementById("buttonStart").value = "start";
	for (var i = 0; i < table.children.length; i++){
		for( var j = 0; j < table.children[i].children.length; j++){
			table.children[i].children[j].classList.remove("anim");
		}
	}
	cnsl.innerHTML += "<br>progress end";
	console.log("progress end");
	btn.disabled = false;
}