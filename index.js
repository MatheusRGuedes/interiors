const hamburger = document.querySelector('.hamburger');
const lines = document.querySelectorAll('.line');
const nav = document.querySelector('nav');
const lists = document.querySelectorAll('nav ul');
const hamburgerForm = document.querySelector('.nav-form');

hamburger.addEventListener("click", () => {
	nav.classList.toggle("open");
	hamburger.classList.toggle("change");
	
	//for each percorerá todos as linhas adicionando a classe
	lines.forEach(line => line.classList.toggle("changelines"));
	lists.forEach(ul => {
		ul.classList.toggle('fade');
	})
	hamburgerForm.classList.toggle('fade');
})

const searchBox = document.querySelector('.searchConteiner');
function drop() {
	searchBox.style.display = 'block';
}
function closeDrop() {
	//nao aceita apenas 'close'
	searchBox.style.display = 'none';
}

//adiciona borda nos links de navegação

const links = document.querySelectorAll('nav ul li a');
links[0].classList.add('bordered');

for (let i = 0; i < links.length; i++) {
	links[i].onclick = function () {

		const bordered = document.querySelector('nav ul li a.bordered');

		if (bordered) {
			bordered.classList.remove('bordered');
		}

		this.classList.add('bordered');
	}
}

//--------------------- Verificar formulario -----------------

//função que verifica email
function checkMail(mail){	
	var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);	
		if(typeof(mail) == "string") {		
			if(er.test(mail)) { return true; }	
		} 
	else if(typeof(mail) == "object") {		
		if(er.test(mail.value)) { 						
			return true; 				
		}	
	} 
	else {		
		return false;		
	}
}

function verificar() {
	const erro1 = document.querySelector('.error1');
	const correct1 = document.querySelector('.correct1');

	const newsNome = document.getElementById('newsNome').value;
	const errorNameMsg = document.querySelector('.errorNameMsg');

	//muda para falso para números
	// verificar numero em letra com numero
	if (!isNaN(newsNome) || newsNome == "") {
		errorNameMsg.innerHTML = 'Informe um nome válido'; 
		erro1.classList.add('visible'); //FINALIZAR
		
		if (correct1.visible)
			correct1.classlist.remove('visible');
	}
	else {
		var numeros = 0;
		for (var i=0; i<newsNome.length; i++) {
			if (newsNome[i] >= 0 || newsNome[i] <= 9) {
				numeros += 1;
			}
		}
		if (numeros == 0) {
			errorNameMsg.innerHTML = "";
			correct1.classList.add('visible');
			erro1.classList.remove('visible');
		}
		else {
			errorNameMsg.innerHTML = "Informe um nome válido";
			correct1.classList.remove('visible');
			erro1.classList.add('visible');
		}
	}

	const newsEmail = document.getElementById('newsEmail').value;

	const erro2 = document.querySelector('.error2');
	const correct2 = document.querySelector('.correct2');

	const errorEmailMsg = document.querySelector('.errorEmailMsg');
	var verificarEmail = checkMail(newsEmail); //variavel com booleano se email é verdadeiro
		
	if (newsEmail == "" || verificarEmail == false || verificarEmail == undefined) {
		errorEmailMsg.innerHTML = 'Informe um email válido';
		erro2.classList.add('visible');
		correct2.classList.remove('visible');
	} else {
		errorEmailMsg.innerHTML = "";
		erro2.classList.remove('visible');
		correct2.classList.add('visible');
	}
}

const newsSubmit = document.getElementById('newsSubmit').onclick = verificar;

/*-------------------------JQUERY-----------------------------*/

//Debounce do Lodash
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

//self envolking
(function() {
	var $target = $('.anime , .anime2 , .anime3'),
		animationClass = 'anime-start',
		//n deixa mais q 3 quartos da tela em branco, muda com o tamanho da janela
		offset = $(window).height() * 3.5/4; 

	function animeScroll() {
		//distancia do topo
		var documentTop = $(document).scrollTop();

		//para cada elemento com a classe anime
		$target.each(function() {
			//this refere ao target
			var itemTop = $(this).offset().top;
			// > valor do topo do element - 710
			if (documentTop > itemTop - offset) {
				$(this).addClass(animationClass);
			} else {
				$(this).removeClass(animationClass);
			}
		})

	}

	animeScroll();

	//evita que seje ativada varias vezes a animeScroll
	$(document).scroll(debounce(function() {
		animeScroll();
	}, 100));

})();
