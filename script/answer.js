//Objeto para receber dados da questão da página
const page = {
    currentPage: document.querySelector("#active li").innerHTML, //recebe o número da questão atual
    answered: false, //boolean se está respondida ou não
    selectedQuestion: null, //alternativa selecionada
    time: new Date(), //tempo que o usuário demorou para responder a questão
    categoryQuestion: document.querySelector("#category").innerHTML, //categoria da questão
    selectQuestion: (alternative) => {
        //verifica se a página já não foi respondida
        if(page.answered)
            return

        //verifica se há uma alternativa selecionada ou não
        if(page.selectedQuestion == null){
            correctButton = document.querySelectorAll("#buttons button")[2] //seleciona o botão corrigir
           
            correctButton.classList.add("bg-black") //dá um efeito de botão ao botão de corrigir
            correctButton.classList.remove("disabled") //habilidade o botão de corrigir
            
        } else if(page.selectedQuestion != alternative.toLowerCase()){
            document.querySelector('[name="Q' + page.currentPage + "_A" + page.selectedQuestion + '"]')
                    .classList.remove("selected") //remove a classe da alternativa selecionada
        } 
        
        //verifica se a alternativa selecionada é a mesma que a página
        if(page.selectedQuestion != alternative.toLowerCase()){
            page.selectedQuestion = alternative.toLowerCase()
    
            //muda a classe da alternativa selecionada
            document.querySelector('[name="Q' + page.currentPage + "_A" + page.selectedQuestion + '"]')
                    .classList.add("selected")
        }
    },
    //responde oficialmente a questão
    answer: () => {
        //verifica se a questão selecionada existe mesmo
        if(page.selectedQuestion != null){
           //correta = document.getElementById('correta').getElementsByClassName('letter')[0].innerHTML.toLowerCase()
            correta = corrects['Q' + page.currentPage].toLowerCase() //recebe a resposta correta
            page.answered = true //muda o status da questão para respondida
            page.answerQuestion(correta == page.selectedQuestion, correta.toUpperCase()) //responde a questão
            simulado.storageAnswer(correta == page.selectedQuestion); //armazena a resposta
            page.showPopUp() //mostra o popup                
        }
    },
    //cehca se a questão está respondida
    checkQuestion: () => {
        values = JSON.parse(localStorage.getItem("current_session")) //converte o simulado atual em json

        if(values != null && values['Q' + page.currentPage] != undefined){
            element = document.querySelectorAll("#buttons button")[2] //seleciona o terceiro elemento
            
            element.classList.add("bg-black") //adiciona um efeito de botão a classe
            element.classList.remove("disabled") //remove os status de inativo da classe

            //Remove o botão escondido de estatísticas
            document.querySelectorAll("#buttons button")[1].classList.remove("hide")

            alternatives = document.querySelectorAll(".letter")
            //faz um loop pelas alternativas
            for(n in alternatives){
                //Se ela for a selecionada pelo usuário, adiciona uma classe a ela
                if(alternatives[n].innerHTML == values['Q' + page.currentPage].selected){
                    alternatives[n].parentElement.classList.add("selected")
                    break
                }
            }

            //define a questão como respondida
            page.answered = true
            //responde a questão
            page.answerQuestion(values['Q' + page.currentPage].correct, corrects['Q' + page.currentPage], true)
        }
    },
    //Função para responder a questão
    answerQuestion: (correct, correctLetter, checked = false) => {
        alternatives = document.querySelectorAll(".alternative")

        //Faz um loop pelas alternativas para deixá-las vermelhas ou verdes
        for(n in alternatives){
            alternative = alternatives[n] //recebe a alternativa
            //verifica se é um botão (ultrapassado)
            if(alternative.tagName == "BUTTON"){
                //Se a alternativa for correta, deixa ela verde
                if(alternative.querySelector(".letter").innerHTML == correctLetter.toUpperCase())
                    alternative.classList.add("correct")
                else
                    alternative.classList.add("wrong") 
                    //Se for incorreta, a deixa vermelha

                //remove o estado pendente de não respondida da alternativa
                alternative.classList.remove("pending")
            }
        }

        //Recebe o botão de corrigir e o transforma no botão de prosseguir
        button = document.querySelectorAll("#buttons button")[2] //recebe o botão

        //Se é a ultima questão, o botão some
        if(page.currentPage == 50){
            button.className = "invisible"
        } else{//Se não for a última questão, ele vira o botão prosseguir
            button.innerHTML = "Prosseguir" //muda seu texto
            button.removeAttribute("onclick") //remove seu listener
            button.addEventListener("click", page.nextQuestion) //adiciona outro listener para prosseguir
        }
        document.querySelectorAll("#buttons button")[1].classList.remove("hide") //remove a classe hide do botão de estatítiscas

        //Cria um texto que informa ao usuário se ele
        //acertou ou errou a questão
        warning = document.querySelector("#definitive") //recebe o texto
        warning.innerHTML = correct ? "Parabéns, você acertou!" : "Que pena, você errou!" //muda seu texto
        warning.className = correct ? "btn definitive-correct" : "btn definitive-wrong" //muda sua classe de acordo com a resposta

        if(!checked){
            //page.configurePopUp(correct, correctLetter, document.querySelectorAll("#correta span")[1].innerHTML)
            //Configura o popup
            page.configurePopUp(
                correct, 
                correctLetter, 
                document.querySelectorAll(
                    '#question button[name="Q' + page.currentPage + "_A" + correctLetter.toLowerCase() + '"] span'
                    )[1].innerHTML
                )
            page.showPopUp()
        }
    },
    configurePopUp: (correct, correctLetter, answer) => {
        /*
        *Configura o pop up de acordo com a resposta dada pelo usuário.
        *Se for correta, irá definir uma classe e um texto para a resposta.
        *Se for errada, irá definir uma classe (vermelha) e um texto para a resposta
        */
        document.querySelector("#answer-title").innerHTML = correct ?  "Parabéns, você acertou!" : "Que pena, você errou!"
        document.querySelector("#answer-title").className = correct ?  "definitive-correct" : "definitive-wrong"
        document.querySelector("#answer-letter").innerHTML = "A resposta correta é a letra '" + correctLetter + "'!"
        document.querySelector("#answer-text").innerHTML = answer
    },
    showPopUp: () => {
        //Mostra o popup
        document.querySelector("#popup-window").className = "show"

    },
    closePopUp: () => {
        //Esconde o popup
        document.querySelector("#popup-window").className = "hide"
    },
    closeStatisticPopUp: () => {
        //Esconde o popup
        document.querySelector("#statistic-window").className = "hide"
		//Faz o browser esperar 300, para executar a função para esvaziar o html do gráfico
		setTimeout(() => {
			document.querySelector("#statistic-graphic").innerHTML = ""
		}, 300)
    },
    nextQuestion: () => {
        //Recebe o número da próxima questão
        nextPage = parseInt(page.currentPage) + 1
        //Recebe os links de questões disponiveis na página
        availableLinks = document.querySelectorAll("#navigator a")
        link = null

        //Passa um loop pelos links disponiveis
        for(n in availableLinks){
            currentLink = availableLinks[n]

            //Caso o link seja a próxima questão, irá gravar na variável link para redirecionar
            //o usuário
            if(currentLink.tagName == "A"){
                if(currentLink.querySelector("li").innerHTML == nextPage){
                    link = currentLink.getAttribute("href")
                }
            }
        }

        //Redireciona o usuário
        window.location.href = link
    },
    statistics: () => {
		/*Funciona como um reset para o pop-up de estatísticas, para que nada seja carregado duas vezes*/
        document.querySelector("#statistic-graphic").innerHTML = ''
        document.querySelector("#statistic-window").className = ""

		/*Insere um texto na tag selecionada*/
        document.querySelector("#statistic-content").querySelector("p").innerHTML = 
            "A seguir, serão apresentadas estatísticas que foram geradas de forma fictícia para a questão " + page.currentPage +
            ", ou seja, não correspondem a dados reais. O gráfico representa a quantidade de pessoas que selecionaram cada questão."
        
		/*
		*Os códigos a seguir irão criar um container para receber o gráfico feito pela lib Plotly,
		*onde irá receber as informações das estatísticas, cada alternativa e criar um gráfico de barras com base nisso
		*Alguns códigos a seguir criam também o elemento no qual o gráfico será inserido
		*/
        let box = document.querySelector("#statistic-graphic")
        box.innerHTML = ''
        let graphicBox = document.createElement("div")

        var xValue = ['A', 'B', 'C', 'D', 'E'];

        var yValue = statistics['Q' + page.currentPage]

		//cria as informações
        var trace1 = {
          x: xValue,
          y: yValue,
          type: 'bar',
          text: yValue.map(String),
          textposition: 'auto',
          hoverinfo: 'none',
          marker: {
            color: 'rgb(197,234,203)',
            opacity: 0.6,
            line: {
              color: 'rgb(114,168,124)',
              width: 1.5
            }
          }
        };
        
        var data = [trace1];
        
		//Cria o layout do gráfico
        var layout = {
          title: 'Gráfico de média de respostas por alternativa',
          barmode: 'stack',
          xaxis: {title: 'Alternativas'},
          yaxis: {title: 'Quantidade de respostas'}
        };
        
		//Cria o gráfico
        Plotly.newPlot(graphicBox, data, layout);

		//Adiciona o gráfico ao container
        box.appendChild(graphicBox)
    }
}

//Objeto para receber o simulado
const simulado = {
    questions: {},
    //Armazena a questão na memória
    storageAnswer: (answer) => { 
		if(simulado.questions == null)
			simulado.questions = {}
	
        //Cria um dicionário com informações sobre a resposta
        simulado.questions['Q' + page.currentPage] = {
            selected: page.selectedQuestion.toUpperCase(),
            correct: answer,
            time: new Date() - page.time,
            category: page.categoryQuestion
        }
        
        //Salva a resposta dada pelo usuário
        localStorage.setItem("current_session", JSON.stringify(simulado.questions))
    },
    //Carrega as questões
    loadQuestions: () => {
        //Verifica se o simulado atual já teve alguma questão respondida
        if(localStorage.getItem("current_session") != null){
            //recebe as questões respondidas em JSON
            simulado.questions = JSON.parse(localStorage.getItem("current_session"))
        }
    }
}

//Termina o simulado
function finish(){
    //Recebe o histórico de simulados
    let simulados = 
        localStorage.getItem("history") != null && 
        localStorage.getItem("history") != undefined ? JSON.parse(localStorage.getItem("history")) : {"history" : []}

    //Insere o simulado atual no array
    simulados.history[simulados.history.length] = simulado.questions
    //Salva o histórico novamente
    localStorage.setItem("history", JSON.stringify(simulados))
    //Reseta o simulado atual
    localStorage.setItem("current_session", null);

    //Redireciona o usuário para a página de resultado
    window.location.href = "finish.html"
}

simulado.loadQuestions() //carrega o histórico de questões respondidas
page.checkQuestion() //Checa se a questão foi respondida ou não



/**
 * Cria uma função para o modo escuro
 */
function dark_mode(dark) {
    if (dark == true) {
    document.body.style.backgroundColor = "#8051CC"; //Muda a cor de fundo
    document.getElementById("active").style.backgroundColor = "#2B1055" //Muda a cor de fundo
    document.querySelector("header").style.color = "rgba(255, 255, 255, 0.75)" //Muda a cor da fonte

} else {
    document.body.style.backgroundColor = "#BADB57"; //Muda a cor de fundo
    document.getElementById("active").style.backgroundColor = "#617C15" //Muda a cor de fundo
    document.querySelector("header").style.color = "rgba(0, 0, 0, 0.5)" //Muda a cor da fonte
}

}

//Ao carregar o site, irá verificar na memória do site se o modo escuro esteve ativo pela última vez,
//e se a resposta for sim, irá ligar o modo escuro novamente
if(localStorage.getItem("dark_mode") == 'true'){
	dark_mode(true)
}