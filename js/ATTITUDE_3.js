var animation = (function () {
	var anim = {};

	var grupoPiramide = null, bloqueOcultaPiramide = null, bordeOjo = null, rellonoOjo = null, grupoOjoInt = null, grupoPestanas = null, grupoMano = null,
		loaded = false;

	// Animation Login
	// Animation public methods
	anim.load = function() {
		anim.element = Snap("#attitude_3"); //Almacenara el identificador de SVG con el que se debe trabajar

		Snap.load("img/ATTITUDE_3.svg", function (f) {
			// Cargamos los elementos del SVG
			grupoPiramide = f.select("g[id='grupoPiramide']");
			bloqueOcultaPiramide = anim.element.path({d:"M300,250 L0,250 L0,100 L300,100 L300,250", fill:"#FFFFFF"});
			bordeOjo = f.select("path[id='bordeOjo']").attr({d:"M 183.369,196.739 Q 154.669,196.739 125.437,196.739 Q 154.669,196.739 183.369,196.739", fill:"none"});
			rellonoOjo = f.select("path[id='rellonoOjo']").attr({d:"M 183.369,196.739 Q 154.669,196.739 125.437,196.739 Q 154.669,196.739 183.369,196.739", fill:"none"});
			grupoOjoInt = f.select("g[id='grupoOjoInt']");
			grupoPestanas = f.select("g[id='grupoPestanas']").attr({display:"none"});
			grupoMano = f.select("g[id='grupoMano']");

			anim.element.append(grupoPiramide);
			anim.element.append(bloqueOcultaPiramide);
			anim.element.append(grupoPestanas);
		});
	}
	anim.play = function() {
		document.getElementById('play').disabled = true;
		document.getElementById('pause').disabled = false;
		
		this.timestapInit = new Date().getTime();
		this.timeConsumed = 0;
		
		this.animacionPiramide(1500);
	}

	anim.pause = function() {
		document.getElementById('pause').disabled = true;
		document.getElementById('resume').disabled = false;

		this.timestapPause = new Date().getTime();
    	var diff = this.timestapPause - this.timestapInit;
    	console.log(diff);
    	console.log(this.timeConsumed);
    	this.timeConsumed = this.timeConsumed + diff;
    	console.log(this.timeConsumed);

        anim.pause.grupoPiramide = grupoPiramide.stop();
        anim.pause.bloqueOcultaPiramide = bloqueOcultaPiramide.stop();
        anim.pause.bordeOjo = bordeOjo.stop();
        anim.pause.rellonoOjo = rellonoOjo.stop();
        anim.pause.grupoOjoInt = grupoOjoInt.stop();
        anim.pause.grupoPestanas = grupoPestanas.stop();
        anim.pause.grupoMano = grupoMano.stop();
	}
	anim.resume = function () {
		document.getElementById('pause').disabled = false;
		document.getElementById('resume').disabled = true;

        if(anim.timeConsumed > 1 && anim.timeConsumed < 1500){
            anim.animacionPiramide(1500 - anim.timeConsumed);
        }else if(anim.timeConsumed > 1500 && anim.timeConsumed < 2500){
            anim.animacionAperturaOjo(2500 - anim.timeConsumed);
        }else if(anim.timeConsumed > 2500 && anim.timeConsumed < 3700){
            anim.animacionCierreOjo(3500 - anim.timeConsumed);
        }else if(anim.timeConsumed > 3500 && anim.timeConsumed < 4500){
            anim.animacionAperturaOjo(4500 - anim.timeConsumed);
        }else if(anim.timeConsumed > 4500 && anim.timeConsumed < 5000){
            anim.animacionMano(5000 - anim.timeConsumed);
        }else if(anim.timeConsumed > 5000 && anim.timeConsumed < 6000){
            anim.animacionCierreMano(6000 - anim.timeConsumed);
        }else if(anim.timeConsumed > 6000 && anim.timeConsumed < 7000){
            anim.animacionCierreOjo(7000 - anim.timeConsumed);
        }else{
            anim.animacionCierrePiramide(8000 - anim.timeConsumed);
        }
        this.timestapInit = new Date().getTime();
	}

	anim.animacionPiramide = function(ms){
        if(ms>1){
    		bloqueOcultaPiramide.animate({transform:"t0,-150"}, ms, function(){
    			anim.animacionAperturaOjo(1000,true)
    		});
        }
	}

	anim.animacionAperturaOjo = function(ms,primeraApertura){		
        if(ms>1){
            anim.element.append(rellonoOjo);
    		anim.element.append(grupoOjoInt);
    		anim.element.append(bordeOjo);

    		grupoOjoInt.attr({transform:"t0,0 s0"});
    		rellonoOjo.attr({fill:"#FFFFFF", stroke:"#000000", strokeWidth:"3", strokeLinecap:"round", strokeLinejoin:"round", strokeMiterlimit:"10"});
    		bordeOjo.attr({fill:"none", stroke:"#000000", strokeWidth:"3", strokeLinecap:"round", strokeLinejoin:"round", strokeMiterlimit:"10"});
    		
    		grupoOjoInt.animate({transform:"t0,0 s1"},(ms - 500));
    		rellonoOjo.animate({d:"M 183.369,196.739 Q 154.669,170.548 125.437,196.739 Q 154.669,222.93 183.369,196.739"},ms);
    		bordeOjo.animate({d:"M 183.369,196.739 Q 154.669,170.548 125.437,196.739 Q 154.669,222.93 183.369,196.739"},ms, function(){
    			grupoPestanas.attr({display:"inline"});
    			if(primeraApertura){
    				setTimeout(function(){
    					anim.animacionCierreOjo(1000,true);
    				},500);
    			}else{
    				anim.animacionMano(500);
    			}
    		});
        }
	}

	anim.animacionCierreOjo = function(ms,primerCierre){
        if(ms>1){
    		grupoPestanas.attr({display:"none"});
    		grupoOjoInt.animate({transform:"t0,0 s0"},(ms));
    		rellonoOjo.animate({d:"M 183.369,196.739 Q 154.669,196.739 125.437,196.739 Q 154.669,196.739 183.369,196.739"},ms, function(){
    			if(primerCierre){
    				anim.animacionAperturaOjo(1000,false)	
    			}else{
    				bordeOjo.attr({fill:"none", stroke:"none"});
    				rellonoOjo.attr({fill:"none", stroke:"none"});
    				anim.animacionCierrePiramide(1000);
    			}
    		});
    		bordeOjo.animate({d:"M 183.369,196.739 Q 154.669,196.739 125.437,196.739 Q 154.669,196.739 183.369,196.739"},ms);
        }
	}

	anim.animacionMano = function(ms){
        if(ms>1){
    		anim.element.append(grupoMano);

    		grupoMano.attr({transform:"t0,0 s0"});
    		grupoMano.animate({transform:"t0,0 s1"},ms, function(){
    			anim.animacionCierreMano(1000);
    		});
        }
	}

	anim.animacionCierreMano = function(ms){
        if(ms>1){
    		grupoMano.animate({transform:"t0,0 s0"},ms, function(){
    			anim.animacionCierreOjo(1000, false);
    		});
        }
	}

	anim.animacionCierrePiramide = function(ms){
        if(ms>1){
    		bloqueOcultaPiramide.animate({transform:"t0,0"}, ms, function(){			
    			document.getElementById('play').disabled = false;
    			document.getElementById('pause').disabled = true;
    			document.getElementById('resume').disabled = true;
    		});
        }
	}
	

	return anim;

}());


window.onload = function(){
	document.getElementById('play').disabled = false;
	document.getElementById('pause').disabled = true;
	document.getElementById('resume').disabled = true;

	animation.load();
	document.getElementById('play').onclick=function(){
		animation.play();
	};
	document.getElementById('pause').onclick=function(){
		animation.pause();
	};
	document.getElementById('resume').onclick=function(){
		animation.resume();
	};
}
