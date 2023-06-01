//Abaixo são declaradas diversas variáveis, que serão utilizadas no efeito de "Parallax" no site.
let floresta = document.getElementById('floresta');            //Define o elemento de id floresta como a variável floresta.
let colinas = document.getElementById('colinas');              //Define o elemento de id colinas como a variável colinas.
let text_1 = document.getElementById('text_1_parallax');       //Define o elemento de id text_1_parallax como a variável text_1.
let text_2 = document.getElementById('text_2_parallax');       //Define o elemento de id text_2_parallax como a variável text_2.
let title = document.getElementById('title_parallax');         //Define o elemento de id title_parallax como a variável title.

window.addEventListener('scroll', function(){       //Adiciona um Evento ao script, que, ao ser ativado, desencadeará uma função.
    let value = window.scrollY;                     //Declara a variável "value" como o movimento de "scroll vertical" da página.
    //Define a velocidade com que cada imagem se moverá quando o usuário "rolar" pela página, o que gera o "Movimento Parallax".
    floresta.style.bottom = value * 0 + 'px';       //O elemento referente à variável floresta se move na mesma velocidade do scroll da página.
    colinas.style.top = value * 0.34 + 'px';        //O elemento referente à variável floresta se move em uma velocidade 0.34 vezes mais rápida do que o scroll original da página.
})

/**
 * Cria uma função para o modo escuro
 */
function dark_mode() {
    //Irá setar o modo escuro na memória
    var night_theme = document.getElementById("checkin");
	localStorage.setItem("dark_mode", night_theme.checked)

    //Se o modo escuro estiver ativo, irá mudar o estilo dos elementos abaixo
    if (night_theme.checked == true) {
	/*As tags a seguir irão mudar coisas como cor de fundo, cor da borda ou cor da fonte*/
    document.body.style.backgroundColor = "#121212";
    document.getElementById("downloads").style.backgroundColor = "#2b1055";
    document.getElementById("fepese").style.backgroundColor = "#2b1055";
    document.getElementById("inicio").style.background = "linear-gradient(#2b1055, #7597de)";
    document.getElementById("inicio").style.color = "white";
    document.getElementById('epagri').style.backgroundColor = "#121212";
    document.getElementById('epagri').style.color = "white";
    document.getElementById('pmi').style.backgroundColor = "#121212";
    document.getElementById('pmi').style.color = "white";

    //Trata os links
    let links = document.querySelectorAll(".nav-link")
    for(k in links){
        links[k].className = 'nav-link-dark'
    }

    //Recebe todos os elementos com a respectiva classe para alterar seu estilo uma por uma em um laço for
    let btnBlackFilled = document.querySelectorAll('.btn-black');
    for(k in btnBlackFilled){
        if(btnBlackFilled[k].classList != undefined)
            btnBlackFilled[k].classList.replace('btn-black', 'btn-black-dark')
    }

    //Recebe todos os elementos com a respectiva classe para alterar seu estilo uma por uma em um laço for
    let btnBlackOutline = document.querySelectorAll('.btn-outline-black');
    for(k in btnBlackOutline){
        if(btnBlackOutline[k].classList != undefined)
            btnBlackOutline[k].classList.replace('btn-outline-black', 'btn-outline-black-dark')
    }
    
    //Recebe todos os elementos com a respectiva classe para alterar seu estilo uma por uma em um laço for
    let btnWhiteFilled = document.querySelectorAll('.btn-white');
    for(k in btnWhiteFilled){
        if(btnWhiteFilled[k].classList != undefined)
            btnWhiteFilled[k].classList.replace('btn-white', 'btn-white-dark')
    }

    //Recebe todos os elementos com a respectiva classe para alterar seu estilo uma por uma em um laço for
    let btnWhiteOutline = document.querySelectorAll('.btn-none-white');
    for(k in btnWhiteOutline){
        if(btnWhiteOutline[k].classList != undefined)
            btnWhiteOutline[k].classList.replace('btn-none-white', 'btn-none-white-dark')
    }

    document.getElementById('img-agri').src = "./img/night-agriculture.jpg"; //Muda a fonte da imagem do elemento
    document.getElementById('img-test').src = "./img/night-concurso.jpg"; //Muda a fonte da imagem do elemento
	/*As tags a seguir irão mudar coisas como cor de fundo, cor da borda ou cor da fonte*/
    document.getElementById("footer-spc").style.background = "#2b1055";
    document.getElementById("footer-spc").style.borderColor = "#2b1055";
    document.getElementById('header').style.backgroundColor = "#2b1055";
    document.getElementById('bold-title-epagri').style.color = "#693594";
    document.getElementById('bold-epagri').style.color = "#693594";
    document.getElementById('bold-link-epagri').style.color = "#693594";
    document.getElementById('bold-title-pmi').style.color = "#693594";
    document.getElementById('bold-pmi').style.color = "#693594";
} else {
	/*As tags a seguir irão mudar coisas como cor de fundo, cor da borda ou cor da fonte*/
    document.body.style.backgroundColor = "#F5F5F5";
    document.getElementById("downloads").style.backgroundColor = "#92bd1e";
    document.getElementById("fepese").style.backgroundColor = "#92bd1e";
    document.getElementById("inicio").style.background = "linear-gradient(rgb(131, 212, 236), rgb(255, 255, 255)";
    document.getElementById("inicio").style.color = "black";
    document.getElementById('epagri').style.backgroundColor = "white";
    document.getElementById('epagri').style.color = "black";
    document.getElementById('pmi').style.backgroundColor = "white";
    document.getElementById('pmi').style.color = "black";

    //Recebe todos os elementos com a respectiva classe para alterar seu estilo uma por uma em um laço for
    let links = document.querySelectorAll(".nav-link-dark")
    for(k in links){
        links[k].className = 'nav-link'
    }

    //Recebe todos os elementos com a respectiva classe para alterar seu estilo uma por uma em um laço for
    let btnBlackFilled = document.querySelectorAll('.btn-black-dark');
    for(k in btnBlackFilled){
        if(btnBlackFilled[k].classList != undefined)
            btnBlackFilled[k].classList.replace('btn-black-dark', 'btn-black')
    }

    //Recebe todos os elementos com a respectiva classe para alterar seu estilo uma por uma em um laço for
    let btnBlackOutline = document.querySelectorAll('.btn-outline-black-dark');
    for(k in btnBlackOutline){
        if(btnBlackOutline[k].classList != undefined)
            btnBlackOutline[k].classList.replace('btn-outline-black-dark', 'btn-outline-black')
    }
    
	//Recebe todos os elementos com a respectiva classe para alterar seu estilo uma por uma em um laço for
    let btnWhiteFilled = document.querySelectorAll('.btn-white-dark');
    for(k in btnWhiteFilled){
        if(btnWhiteFilled[k].classList != undefined)
            btnWhiteFilled[k].classList.replace('btn-white-dark', 'btn-white')
    }

    //Recebe todos os elementos com a respectiva classe para alterar seu estilo uma por uma em um laço for
    let btnWhiteOutline = document.querySelectorAll('.btn-none-white-dark');
    for(k in btnWhiteOutline){
        if(btnWhiteOutline[k].classList != undefined)
            btnWhiteOutline[k].classList.replace('btn-none-white-dark', 'btn-none-white')
    }

    document.getElementById('img-agri').src = "./img/agricultura.jpg"; //Muda a fonte da imagem do elemento
    document.getElementById('img-test').src = "./img/concurso.jpg"; //Muda a fonte da imagem do elemento
	/*As tags a seguir irão mudar coisas como cor de fundo, cor da borda ou cor da fonte*/
    document.getElementById("footer-spc").style.background = "#92bd1e";
    document.getElementById("footer-spc").style.borderColor = "#92bd1e";
    document.getElementById('header').style.backgroundColor = "#92bd1e";
    document.getElementById('bold-title-epagri').style.color = "#92bd1e";
    document.getElementById('bold-epagri').style.color = "#92bd1e";
    document.getElementById('bold-link-epagri').style.color = "#92bd1e";
    document.getElementById('bold-title-pmi').style.color = "#92bd1e";
    document.getElementById('bold-pmi').style.color = "#92bd1e";
}
}

//Ao carregar o site, irá verificar na memória do site se o modo escuro esteve ativo pela última vez,
//e se a resposta for sim, irá ligar o modo escuro novamente
if(localStorage.getItem("dark_mode") == 'true'){
	let night_theme = document.getElementById("checkin")
	night_theme.checked = true
	dark_mode()
}