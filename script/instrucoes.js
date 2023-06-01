
/**
 * Cria uma função para o modo escuro
 */
function dark_mode() {
    //Irá setar o modo escuro na memória
    var night_theme = document.getElementById("checkin");
	localStorage.setItem("dark_mode", night_theme.checked)

    //Se o modo escuro estiver ativo, irá mudar o estilo dos elementos abaixo
    if (night_theme.checked == true) {
     //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
    let links = document.querySelectorAll(".nav-link")
    for(k in links){
        links[k].className = 'nav-link-dark'
    }

     //Recebe todos os elementos com a respectiva tag para mudá-la em um laço for
    let titles = document.querySelectorAll("h2")
    for(let k = 0; k < titles.length; k++){
        titles[k].style.color = "#441F7F"
    }

      //Recebe todos os elementos com a respectiva tag para mudá-la em um laço for
    let list = document.querySelectorAll("li")
    for(let k = 0; k < list.length; k++){
        list[k].style.color = "white"
    }

      //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnBlackFilled = document.querySelectorAll('.btn-black');
        for(k in btnBlackFilled){
            if(btnBlackFilled[k].classList != undefined)
                btnBlackFilled[k].classList.replace('btn-black', 'btn-black-dark')
        }
    
        //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnBlackOutline = document.querySelectorAll('.btn-outline-black');
        for(k in btnBlackOutline){
            if(btnBlackOutline[k].classList != undefined)
                btnBlackOutline[k].classList.replace('btn-outline-black', 'btn-outline-black-dark') //troca a classe
        }
        
        //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnWhiteFilled = document.querySelectorAll('.btn-white');
        for(k in btnWhiteFilled){
            if(btnWhiteFilled[k].classList != undefined)
                btnWhiteFilled[k].classList.replace('btn-white', 'btn-white-dark') //troca a classe
        }
    
        //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnWhiteOutline = document.querySelectorAll('.btn-none-white');
        for(k in btnWhiteOutline){
            if(btnWhiteOutline[k].classList != undefined)
                btnWhiteOutline[k].classList.replace('btn-none-white', 'btn-none-white-dark') //troca a classe
        }

	/*As tags a seguir irão mudar coisas como cor de fundo, cor da borda ou cor da fonte*/
    document.querySelector("p").style.color = "white"
    document.getElementById("instruction-window").style.backgroundColor = "#1C1C1C"
    document.getElementById("footer-spc").style.background = "#2b1055";
    document.getElementById("footer-spc").style.borderColor = "#2b1055";
    document.getElementById('header').style.backgroundColor = "#2b1055";
	document.body.style.backgroundColor = "#121212";
} else {

    //Trata os links
    let links = document.querySelectorAll(".nav-link-dark")
    for(k in links){
        links[k].className = 'nav-link'
    }
      //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
    let titles = document.querySelectorAll("h2")
    for(let k = 0; k < titles.length; k++){
        titles[k].style.color = "#92bd1e"
    }
	

      //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnBlackFilled = document.querySelectorAll('.btn-black-dark');
        for(k in btnBlackFilled){
            if(btnBlackFilled[k].classList != undefined)
                btnBlackFilled[k].classList.replace('btn-black-dark', 'btn-black') //troca a classe
        }
    
        //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnBlackOutline = document.querySelectorAll('.btn-outline-black-dark');
        for(k in btnBlackOutline){
            if(btnBlackOutline[k].classList != undefined)
                btnBlackOutline[k].classList.replace('btn-outline-black-dark', 'btn-outline-black') //troca a classe
        }
        
        //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnWhiteFilled = document.querySelectorAll('.btn-white-dark');
        for(k in btnWhiteFilled){
            if(btnWhiteFilled[k].classList != undefined)
                btnWhiteFilled[k].classList.replace('btn-white-dark', 'btn-white') //troca a classe
        }
    
        //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnWhiteOutline = document.querySelectorAll('.btn-none-white-dark');
        for(k in btnWhiteOutline){
            if(btnWhiteOutline[k].classList != undefined)
                btnWhiteOutline[k].classList.replace('btn-none-white-dark', 'btn-none-white') //troca a classe
        }

      //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
    let list = document.querySelectorAll("li")
    for(let k = 0; k < list.length; k++){
        list[k].style.color = "black"
    }

	/*As tags a seguir irão mudar coisas como cor de fundo, cor da borda ou cor da fonte*/
    document.querySelector("p").style.color = "black"
    document.getElementById("footer-spc").style.background = "#92bd1e";
    document.getElementById("footer-spc").style.borderColor = "#92bd1e";
    document.getElementById('header').style.backgroundColor = "#92bd1e";
	document.getElementById("instruction-window").style.backgroundColor = "white"
    document.body.style.backgroundColor = "#F5F5F5";
}

}

//Ao carregar o site, irá verificar na memória do site se o modo escuro esteve ativo pela última vez,
//e se a resposta for sim, irá ligar o modo escuro novamente
if(localStorage.getItem("dark_mode") == 'true'){
	let night_theme = document.getElementById("checkin")
	night_theme.checked = true
	dark_mode()
}