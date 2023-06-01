//Variáveis que irão mudar de valor conforme o sistema é executado;
//Basicamente irá receber os acertos, erros e branco do ultimo simulado feito
var acertos = 0;
var erros = 0;
var branco = 0;

//Sistema de abas
var currentTab = null
var currentTabNum = -1


//Sistema de questões
var currentQuestion = 1

//Função para carregar as respostas do usuário
function loadAnswersVG() {
	//Reseta os acertos, erros e questões em branco
    acertos = 0;
    erros = 0;
    branco = 0;
    let resultTable = document.getElementById("resultado") //recebe a tabela do html
    let history = JSON.parse(localStorage.getItem("history")) //converte o histórico em um JSON
    let last = history['history'][history['history'].length - 1] //pega o último elemento do array

    //Passa por uma loop pelas 50 questões do simulado
    for (let i = 1; i <= 50; i++) {
        //Dá à variavel o valor da questão escolhida se tiver sido escolhida, caso contrário será '-'
        let selected = last != null && last['Q' + i] != undefined ?
            last['Q' + i].selected : '-'

        //Variável para dar nome à classe
        let answerClass = "blank-td";

        //Checa se o usuário respondeu à questão
        //De acordo com as condições, irá somar 1 em alguma variável
        if (selected != '-') {
            //Se estiver correta, answerClass recebe o nome da classe para a resposta correta
            if (selected == corrects['Q' + i]) {
                answerClass += ', correct'
                acertos++
            } else {
                //Se estiver errada, answerClass recebe o nome da classe para a resposta errada
                answerClass += ', wrong'
                erros++
            }
        } else {
            branco++
        }

        //Adiciona um html da resposta à tabela
        resultTable.innerHTML +=
            '<tr>' +
            '<td class="blank-td">' + i + '</td>' +
            '<td class="' + answerClass + '">' + selected + '</td>' +
            '</tr>'
    }
}

//Carrega o gabarito com as respostas definitivas
function loadGabaritoVG() {
    //Carrega a tabela do gabarito
    let gabaritoTable = document.getElementById("gabarito")
    //Faz um loop pelas respostas corretas
    for (c in corrects) {
        //Adiciona as respostas corretas à tabela
        gabaritoTable.innerHTML +=
            '<tr>' +
            '<td class="blank-td">' + c.substring(1) + '</td>' +
            '<td class="blank-td">' + corrects[c] + '</td>' +
            '</tr>'
    }
}

//Carrega o desempenho do usuário
function loadPerformanceVG() {
    //Carrega o total de acertos
    let aProgress = document.getElementById("p-acerto") //Recebe a barra de progresso
    let aText = document.getElementById("t-acerto") //Recebe o texto em porcentagem
    let aQuestions = document.getElementById("q-acerto") //Recebe a quantidade
    let aPercent = acertos * 100 / 50 //Calcula a porcentagem

    aText.innerHTML = aPercent + '%' //Insere a porcentagem no texto HTML
    aProgress.style.width = aPercent + '%' //Insere a largura da barra
    aQuestions.innerHTML = acertos //Insere a quantidade de acertos

    //Carrega o total de erros
    let eProgress = document.getElementById("p-erro") //Recebe a barra de progresso
    let eText = document.getElementById("t-erro") //Recebe o texto em porcentagem
    let eQuestions = document.getElementById("q-erro") //Recebe a quantidade
    let ePercent = erros * 100 / 50 //Calcula a porcentagem
    let bPercent = branco * 100 / 50 //Calcula a porcentagem

    eText.innerHTML = (ePercent + bPercent) + '%' //Insere a porcentagem no texto HTML
    eProgress.style.width = (ePercent + bPercent) + '%' //Insere a porcentagem na largura do style
    eQuestions.innerHTML = erros + branco //Insere a quantidade de erros

    //Carrega o total de questões em branco
    let bProgress = document.getElementById("p-branco") //Recebe a barra de progresso
    let bText = document.getElementById("t-branco") //Recebe o texto em porcentagem
    let bQuestions = document.getElementById("q-branco") //Recebe a quantidade

    bText.innerHTML = bPercent + '%' //Insere a porcentagem no texto HTML
    bProgress.style.width = bPercent + '%' //Insere a porcentagem na largura do style
    bQuestions.innerHTML = branco //Insere a quantidade de brancos

    //Carrega o tempo total gasto com as questões
    let history = JSON.parse(localStorage.getItem("history")) //converte o histórico em um JSON
    let last = history['history'][history['history'].length - 1] //pega o último elemento do array
    let tIntTotalTime = 0 //cria uma variável para contagem de tempo
    let tTime = document.getElementById("total-time").querySelectorAll("p")[1] //recebe o elemento da página responsávle pelo tempo

	//Passa num laço for para somar o tempo de todas as questões
    for (q in last) {
        tIntTotalTime += last[q].time
    }

	//Cria uma variavel recebendo o tempo somado
    let tTotalTime = new Date(tIntTotalTime)

	/*
	*Adiciona um texto na página com base no tempo recebido
	*Caso o tempo passe de horas, irá formatar de forma que apareça as horas, minutos e segundos
	*Caso dure apenas minutos, irá formatar de forma que apareça minutos e segundos
	*Caso dure apenas segundos, irá formatar de forma que apareça apenas segundos
	*/
    if (tTotalTime.getUTCHours() != 0) {
        tTime.innerHTML = tTotalTime.getUTCHours() + " horas, " + tTotalTime.getUTCMinutes() + " minutos e "
            + tTotalTime.getUTCSeconds() + " segundos"
    } else if (tTotalTime.getUTCMinutes() != 0) {
        tTime.innerHTML = tTotalTime.getUTCMinutes() + " minutos e "
            + tTotalTime.getUTCSeconds() + " segundos"
    } else {
        tTime.innerHTML = tTotalTime.getUTCSeconds() + " segundo(s)"
    }

    //Carrega a média de tempo por questão respondida
    let qTotalTime = new Date(tIntTotalTime / ((last == null || getLength(last) == 0) ? 1 : getLength(last))) //Recebe o tempo se existir
    let qTime = document.getElementById("time-per-question").querySelectorAll("p")[1] //Recebe o elemento da página para alterá-la

	/*
	*Adiciona um texto na página com base no tempo recebido
	*Caso o tempo passe de horas, irá formatar de forma que apareça as horas, minutos e segundos
	*Caso dure apenas minutos, irá formatar de forma que apareça minutos e segundos
	*Caso dure apenas segundos, irá formatar de forma que apareça apenas segundos
	*/
    if (qTotalTime.getUTCHours() != 0) {
        qTime.innerHTML = qTotalTime.getUTCHours() + " horas, " + qTotalTime.getUTCMinutes() + " minutos e "
            + qTotalTime.getUTCSeconds() + " segundos"
    } else if (qTotalTime.getUTCMinutes() != 0) {
        qTime.innerHTML = qTotalTime.getUTCMinutes() + " minutos e "
            + qTotalTime.getUTCSeconds() + " segundos"
    } else {
        qTime.innerHTML = qTotalTime.getUTCSeconds() + " segundo(s)"
    }
}

/**
 * Cria uma função para o modo escuro
 */
function dark_mode() {
    var night_theme = document.getElementById("checkin");
    localStorage.setItem("dark_mode", night_theme.checked) //guarda na memória se o modo escuro está ou não está ativo

    if (night_theme.checked == true) {
        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let links = document.querySelectorAll(".nav-link")
        for (k in links) {
            links[k].className = 'nav-link-dark' //Muda a classe
        }

        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let btnBlackFilled = document.querySelectorAll('.btn-black');
        for (k in btnBlackFilled) {
            if (btnBlackFilled[k].classList != undefined)
                btnBlackFilled[k].classList.replace('btn-black', 'btn-black-dark')
        }

        //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnBlackOutline = document.querySelectorAll('.btn-outline-black');
        for (k in btnBlackOutline) {
            if (btnBlackOutline[k].classList != undefined)
                btnBlackOutline[k].classList.replace('btn-outline-black', 'btn-outline-black-dark') //troca a classe
        }

        //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnWhiteFilled = document.querySelectorAll('.btn-white');
        for (k in btnWhiteFilled) {
            if (btnWhiteFilled[k].classList != undefined)
                btnWhiteFilled[k].classList.replace('btn-white', 'btn-white-dark') //troca a classe
        }

        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let btnWhiteOutline = document.querySelectorAll('.btn-none-white');
        for (k in btnWhiteOutline) {
            if (btnWhiteOutline[k].classList != undefined)
                btnWhiteOutline[k].classList.replace('btn-none-white', 'btn-none-white-dark') //troca a classe
        }

        //Recebe todos os elementos com a respectiva tag para mudá-la em um laço for
        let titles = document.querySelectorAll('h2')
        for (k in titles) {
            if (titles[k].classList != undefined)
                titles[k].style.color = "white"
        }

        //Recebe todos os elementos com a respectiva tag para mudá-la em um laço for
        let texts = document.querySelectorAll('table th')
        for (k in texts) {
            if (texts[k].classList != undefined)
                texts[k].style.backgroundColor = "#2b1055"
        }

        //Recebe todos os elementos com a respectiva tag para mudá-la em um laço for
        let paragraphs = document.querySelectorAll('p')
        for (p in paragraphs) {
            if (paragraphs[p].classList != undefined)
                paragraphs[p].style.color = "#FFFFFF"
        }

        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let data = document.querySelectorAll('.blank-td')
        for (k in data) {
            if (data[k].classList != undefined) {
                data[k].style.color = "white"
                data[k].style.backgroundColor = "#1C1C1C"
            }
        }

		/*
		*Verifica se a tab atual é a de número 0, caso seja, irá alterar os elementos dentro da tabela.
		*É necessário para que não haja erros ao alterar todos os elementos existentes
		*/
        if (currentTabNum == 0) {
			//As tags abaixo mudam cor de fundo e cor da fonte
            document.getElementById("acertos").style.backgroundColor = "#1A1A1A"
            document.getElementById("acertos").style.color = "white"
            document.getElementById("warning").style.color = "white"

			//Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
            let progress = document.querySelectorAll(".progress")
            for (k in progress) {
                if (progress[k].classList != undefined) {
                    progress[k].classList.replace('progress', 'progress-dark')
                }
            }
        }

        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let tab = document.querySelector(".tab-selected")
        if (tab != null)
            tab.className = "tab-selected-dark"

        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let unselecteds = document.querySelectorAll(".tab-unselected")
        for (let k = 0; k < unselecteds.length; k++) {
            unselecteds[k].classList = "tab-unselected-dark"
        }

		/*
		*Verifica se a tab atual é a de número 3, caso seja, irá alterar os elementos dentro da tabela.
		*É necessário para que não haja erros ao alterar todos os elementos existentes
		*/
        if (currentTabNum == 3) {
            let statistic = document.querySelectorAll(".statistic-button")
			//Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
            for (let k = 0; k < statistic.length; k++) {
                statistic[k].classList = "statistic-button-dark"
            }
        }
		
		//As tags abaixo mudam cor de fundo, borda e cor da fonte
        document.getElementById("footer-spc").style.background = "#2b1055";; //Muda o estilo
        document.getElementById("footer-spc").style.borderColor = "#2b1055";; //Muda o estilo
        document.getElementById('header').style.backgroundColor = "#2b1055";; //Muda o estilo
		document.body.style.backgroundColor = "#181818"; //Muda o estilo

    } else {
        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let links = document.querySelectorAll(".nav-link-dark")
        for (k in links) {
            links[k].className = 'nav-link'
        }

        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let btnBlackFilled = document.querySelectorAll('.btn-black-dark');
        for (k in btnBlackFilled) {
            if (btnBlackFilled[k].classList != undefined)
                btnBlackFilled[k].classList.replace('btn-black-dark', 'btn-black') //troca a classe
        }

        //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnBlackOutline = document.querySelectorAll('.btn-outline-black-dark');
        for (k in btnBlackOutline) {
            if (btnBlackOutline[k].classList != undefined)
                btnBlackOutline[k].classList.replace('btn-outline-black-dark', 'btn-outline-black') //troca a classe
        }

        //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnWhiteFilled = document.querySelectorAll('.btn-white-dark');
        for (k in btnWhiteFilled) {
            if (btnWhiteFilled[k].classList != undefined)
                btnWhiteFilled[k].classList.replace('btn-white-dark', 'btn-white') //troca a classe
        }

        //Recebe todos os botões com a respectiva classe para mudá-la em um laço for
        let btnWhiteOutline = document.querySelectorAll('.btn-none-white-dark');
        for (k in btnWhiteOutline) {
            if (btnWhiteOutline[k].classList != undefined)
                btnWhiteOutline[k].classList.replace('btn-none-white-dark', 'btn-none-white') //troca a classe
        }

        //Recebe todos os elementos com a respectiva tag para mudá-la em um laço for
        let titles = document.querySelectorAll('h2')
        for (k in titles) {
            if (titles[k].classList != undefined)
                titles[k].style.color = "#92bd1e"
        }

        //Recebe todos os elementos com a respectiva tag para mudá-la em um laço for
        let texts = document.querySelectorAll('table th')
        for (k in texts) {
            if (texts[k].classList != undefined)
                texts[k].style.backgroundColor = "#92bd1e"
        }

        //Recebe todos os elementos com a respectiva tag para mudá-la em um laço for
        let paragraphs = document.querySelectorAll('p')
        for (p in paragraphs) {
            if (paragraphs[p].classList != undefined)
                paragraphs[p].style.color = "#000000"
        }

        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let data = document.querySelectorAll('.blank-td')
        for (k in data) {
            if (data[k].classList != undefined) {
                data[k].style.color = "black"
                data[k].style.backgroundColor = "white"
            }
        }

		/*
		*Verifica se a tab atual é a de número 0, caso seja, irá alterar os elementos dentro da tabela.
		*É necessário para que não haja erros ao alterar todos os elementos existentes
		*/
        if (currentTabNum == 0) {
            document.getElementById("acertos").style.backgroundColor = "white"
            document.getElementById("acertos").style.color = "black"

            let progress = document.querySelectorAll(".progress-dark")
            for (k in progress) {
                if (progress[k].classList != undefined) {
                    progress[k].classList.replace('progress-dark', 'progress')
                }
            }

            document.getElementById("warning").style.color = "black"
        }

        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let tab = document.querySelector(".tab-selected-dark")
        if (tab != null)
            tab.className = "tab-selected"

        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let unselecteds = document.querySelectorAll(".tab-unselected-dark")
        for (let k = 0; k < unselecteds.length; k++) {
            unselecteds[k].classList = "tab-unselected"
        }

        //Recebe todos os elementos com a respectiva classe para mudá-la em um laço for
        let graphicTitles = document.querySelectorAll(".graphic-title")
        for (let k = 0; k < graphicTitles.length; k++) {
            graphicTitles[k].style.color = "rgba(0, 0, 0, 0.5)"
        }

		/*
		*Verifica se a tab atual é a de número 3, caso seja, irá alterar os elementos dentro da tabela.
		*É necessário para que não haja erros ao alterar todos os elementos existentes
		*/
        if (currentTabNum == 3) {
            let statistic = document.querySelectorAll(".statistic-button-dark")
            for (let k = 0; k < statistic.length; k++) {
                statistic[k].classList = "statistic-button"
            }
        }

		//As tags abaixo mudam cor de fundo e cor da fonte
        document.body.style.backgroundColor = "#F5F5F5";
        document.getElementById("footer-spc").style.background = "#92bd1e";
        document.getElementById("footer-spc").style.borderColor = "#92bd1e";
        document.getElementById('header').style.backgroundColor = "#92bd1e";

    }

}

//Função para carregar a tab de acertos e erros por tema
function loadCategoriesVI() {
    let history = JSON.parse(localStorage.getItem("history")) //converte o histórico em um JSON
    let last = history['history'][history['history'].length - 1] //pega o último elemento do array
    let element = document.querySelector("#tab-item") //recebe o container
    let categories = {} //cria um dicionário para receber os temas

    //Cria as categorias existentes, bem como os acertos, erros e questões de cada tema
    for (item in last) {
		//cria um item no dicionário caso o tema ainda não exista
        if (!(last[item].category in categories)) {
            categories[last[item].category] = {
                'acertos': 0,
                'erros': 0,
                'question': []
            }
        }

		//Caso a questão esteja certa, irá somar 1 em acertos, caso não, irá somar 1 em erros
        categories[last[item].category][last[item].correct ? 'acertos' : 'erros']++
		//Adiciona a questão do tema
        categories[last[item].category]['question'].push(item)
    }

	/*
	*Passa cada tema em um laço, separando as questões em quantas ele respondeu, quantas ele respondeu, acertou e errou (1),
	*suas respectivas categorias (2)
	*/
    for (c in categories) {
        let node = document.createElement("div")
        node.className = "d-flex flex-column mb-50"

        //1 - Para calculos
        let cTotal = (categories[c]['acertos'] + categories[c]['erros'])
        let cCorrect = Math.round(categories[c]['acertos'] * 100 / cTotal)
        let cWrong = Math.round(categories[c]['erros'] * 100 / cTotal)

        //2 - Categoria
        let nodeCategory = document.createElement('p')
        nodeCategory.className = "principal-title-category"
        nodeCategory.innerHTML = c;

        //Categoria DIV
        let categoryNode = document.createElement('div')
        categoryNode.className = "d-flex d-flex-space-between w-80"

        /*
		*Cria um container para adicionar todas as questões que foram respondidas
		*/
        let nodeAnswered = document.createElement('div')
        nodeAnswered.className = "d-flex flex-column"
        nodeAnswered.innerHTML = "<p class='title-category'>Respondidas</p>"
        nodeAnswered.innerHTML += "<p class='title-category'>" +
            cTotal +
            "</p>"


        /*
		*Cria um container para adicionar todas as questões corretas
		*/
        let nodeCorrect = document.createElement('div')
        nodeCorrect.className = "d-flex flex-column title-category"
        nodeCorrect.innerHTML = "<p>Acertos</p>"

        let progressCorrect = document.createElement('div')
		//Cria uma barra circular usando a lib loading-bar
        let pbCorrect = new ldBar(
            progressCorrect,
            {
                "value": cCorrect,
                "preset": "circle",
                "stroke": "green",
                "stroke-width": 8
            }
        )

		//adiciona os elementos ao container
        nodeCorrect.appendChild(progressCorrect)

        /*
		*Cria um container para adicionar todas as questões erradas
		*/
        let nodeWrong = document.createElement('div')
        nodeWrong.className = "d-flex flex-column title-category"

        nodeWrong.innerHTML = "<p>Erros</p>"
        let progressWrong = document.createElement('div')
		
		//Cria uma barra circular usando a lib loading-bar
        let pbWrong = new ldBar(
            progressWrong,
            {
                "value": cWrong,
                "preset": "circle",
                "stroke": "red",
                "stroke-width": 8
            }
        )

		//adiciona os elementos ao container
        nodeWrong.appendChild(progressWrong)

		//adiciona todos os containers ao container principal, onde será devidamente estilizado
        categoryNode.appendChild(nodeAnswered)
        categoryNode.appendChild(nodeCorrect)
        categoryNode.appendChild(nodeWrong)

        //Apresenta as questões que o usuário acertou e errou de maneira horizontal
		//As primeiras variáveis são responsáveis por criar e estilizar o elemento
        let cQuestions = categories[c]['question']
        let questionNode = document.createElement("ul")
        questionNode.className = "question-box d-flex"
		/*
		*O laço for é responsável por estilizar cada questão
		*Caso o usuário tenha acertado a questão, ele irá ter um fundo verde, caso tenha errado, será vermelho
		*/
        for (q in cQuestions) {
            let qItem = document.createElement("li")
            let thisValue = q
            qItem.innerText = cQuestions[q]

            qItem.classList.add("question-box-item")
            qItem.classList.add(last[cQuestions[q]].correct ? "correct" : "wrong")

			/*
			*Responsável por "bordificar" os elementos, caso tenha apenas um, ele irá ter bordas em todas as direções (primeira condição)
			*Caso seja o primeiro elemento, terá bordas apenas do lado esquerdo (segunda condição)
			*Caso seja o ultimo elemento, terá bordas apenas do lado direito (terceira condição)
			*Caso não seja nenhum dos dois, não terá bordas (não irá cair em condição, então não irá "bordificar")
			*/
            if (cQuestions.length == 1) {
                qItem.classList.add("border-completely")
            } else if (q == 0) {
                qItem.classList.add("border-left")
            } else if (q == (cQuestions.length - 1)) {
                qItem.classList.add("border-right")
            }

			/*Adiciona um listener para fazer o elemento da questão servir como um botão, caso seja clicado irá abrir a questão em uma nova aba*/
            qItem.addEventListener("click", () => {
                window.open("./" + cQuestions[thisValue] + "_A" + corrects[cQuestions[thisValue]].toLowerCase() + ".html",
                    "_blank")
            })

            questionNode.appendChild(qItem) //Adiciona a questão ao container
        }


		//Adiciona todas as informações (barras, questões) ao container secundário
        node.appendChild(nodeCategory)
        node.appendChild(categoryNode)
        node.appendChild(questionNode)

		//Adiciona todas as informações (barras, questões) ao container principal (tab)
        element.appendChild(node)

		/*
		*Responsável por fazer os elementos de progress-bar funcionarem em um tamanho fixo.
		*Irá passar todos eles em um laço for e irá defini-los com largura e altura fixa e irá centralizar o texto da porcentagem
		*/
        let progresses = document.querySelectorAll(".ldBar")
        for (let i = 0; i < progresses.length; i++) {
            progresses[i].style.width = "200px"
            progresses[i].style.height = "200px"
            progresses[i].classList.add("label-center")
        }
    }
}

//Função responsável por carregar os gráficos
function loadGraphics() {
    let history = JSON.parse(localStorage.getItem("history")) //converte o histórico em um JSON
    let last = history['history'][history['history'].length - 1] //pega o último elemento do array

    //Carrega a aba
    let tab = document.querySelector("#tab-item")

    //Container principal de gráficos
    let graphicsContainer = document.createElement("div")
    graphicsContainer.className = "d-flex flex-column w-100 w-center mb-50"

    //Cria os containers para o container principal de gráficos
    let firstGraphicsContainer = document.createElement("div")
    firstGraphicsContainer.className = "d-flex w-100 w-center"

    let secondGraphicsContainer = document.createElement("div")
    secondGraphicsContainer.className = "d-flex w-100 w-center"

    //Container para o gráfico de acertos
    let answersGraphic = document.createElement("div")
    answersGraphic.className = "d-flex-center flex-column w-50 mb-50"

    //Cria o título do gráfico
    let answerGText = document.createElement("p")
    answerGText.className = "graphic-title"
    answerGText.innerText = "Acertos e Erros"
    answersGraphic.appendChild(answerGText)

    let cAnswers = document.createElement("div")

    //Cria o gráfico de acerto, bem como suas informações de eixo x e y
    let xAnswersValues = ['Acertos', 'Erros']
    let yAnswerValues = [acertos, erros + branco]

	//cria as informações do gráfico
    let answersTrace = {
        x: xAnswersValues,
        y: yAnswerValues,
        type: 'bar',
        text: yAnswerValues.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
            color: ['rgb(0,255,0)', 'rgb(255, 0, 0)'],
            opacity: 0.6,
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    }

    let answerData = [answersTrace]
	//cria o layout do gráfico
    var answerLayout = {
        title: '',
        barmode: 'stack',
        autosize: false,
        width: 500,
        height: 500,
        plot_bgcolor: "rgba(255, 255, 255, 0.01)",
        paper_bgcolor: "rgba(255, 255, 255, 0.01)"
    };


	//cria o gráfico
    Plotly.newPlot(cAnswers, answerData, answerLayout);

	//adiciona o gráfico ao container
    answersGraphic.appendChild(cAnswers)

    //Cria o container para o gráfico de questões
    let questionsGraphic = document.createElement("div")
    questionsGraphic.className = "d-flex-center flex-column w-50 mb-50"

    //Cria o título do gráfico
    let questionGText = document.createElement("p")
    questionGText.className = "graphic-title"
    questionGText.innerText = "Questões Respondidas e em Branco"
    questionsGraphic.appendChild(questionGText)

    let cQuestions = document.createElement("div")

    //Cria o gráfico de ques~toes em branco e respondidas, bem como suas informações de eixo x e y
    let xQuestionsValues = ['Respondidas', 'Branco']
    let yQuestionsValues = [acertos + erros, branco]
	
	//cria as informações do gráfico
    let questionsTrace = {
        x: xQuestionsValues,
        y: yQuestionsValues,
        type: 'bar',
        text: yQuestionsValues.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
            color: ['rgb(0,255,200)', 'rgb(255, 255, 0)'],
            opacity: 0.6,
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    }

    let questionData = [questionsTrace]
	//cria o layout do gráfico
    var questionLayout = {
        title: '',
        barmode: 'stack',
        autosize: false,
        width: 500,
        height: 500,
        plot_bgcolor: "rgba(255, 255, 255, 0.01)",
        paper_bgcolor: "rgba(255, 255, 255, 0.01)"
    };

	//cria o gráfico
    Plotly.newPlot(cQuestions, questionData, questionLayout);
	
	//adiciona o gráfico ao container
    questionsGraphic.appendChild(cQuestions)

    //Cria o container para o gráfico de questões complexas
    let complexQuestionsGraphic = document.createElement("div")
    complexQuestionsGraphic.className = "d-flex-center flex-column w-100 mb-50"

    //Cria o título do gráfico
    let complexQuestionGText = document.createElement("p")
    complexQuestionGText.className = "graphic-title"
    complexQuestionGText.innerText = "Tempo e Questões"
    complexQuestionsGraphic.appendChild(complexQuestionGText)

    let cComplexQuestions = document.createElement("div")

    //Cria o gráfico complexo de questões e seus dados
    let categories = {}

    //Cria as categorias, bem com os acertos e erros por cada tema e questão
    for (item in last) {
        if (!(last[item].category in categories)) {
            categories[last[item].category] = {
                'acertos': 0,
                'erros': 0,
                'question': []
            }
        }

        categories[last[item].category][last[item].correct ? 'acertos' : 'erros']++
        categories[last[item].category]['question'].push(item)
    }
	
	//Diversas listas que irão servir como montagem do gráfico sunburst
    let cqQuestions = [];
    let cqParents = [];
    let cqLabels = [];
    let cqInfo = [];
    let cqColor = [];

	/*
	*As categorias serão passadas em um laço for
	*Cada laço irá recolher informações e criar textos sobre cada tema
	*As variáveis criadas acima irão receber esses textos e valores,
	*onde ele irá receber o tema, o número da questão,
	*o texto que irá aparecer quando o mouse for passado por cima da questão 
	*(que contém o tempo, tema, acerto, erro e resposta selecionada)
	*Caso a questão esteja correta, irá aparecer de forma verde no sunburst,
	*caso contrário, ficará vermelho
	*/
    for (c in categories) {
        let stringfied = c.replaceAll(" ", "<br>")
        let totalIntTime = 0;

		//Adiciona as informações às listas
        cqQuestions.push(c)
        cqParents.push("")
        cqLabels.push(stringfied)
        cqColor.push("rgb(50, 50, 255)")
        cqInfo.push("-1")

		/*
		*Passa cada questão em um laço for para recolher informações sobre a 
		*questão, tempo gasto, acerto e erro, alternativa seleciona e alternativa 
		*correta
		*/
        for (q in categories[c]['question']) {
            let cqTemp = categories[c]['question'][q]
			//Variável que irá recolher a questão atual
            let cqQuestion = last[cqTemp]
			//Variável que irá recolher o tempo gasto na questão
            let cqTime = new Date(cqQuestion.time)
            totalIntTime += cqQuestion.time

			//As listas irão fazer um push das variáveis criadas
            cqQuestions.push(cqTemp)
            cqParents.push(c)
            cqLabels.push(cqTemp)
			/*
			*Essa lista em questão será formatada de forma que mostre a questão selecionada,
			*a resposta selecionada, a resposta correta e o tempo gasto na questão
			*/
            cqInfo.push(
                "Questão " + cqTemp.replace("Q", "") + "<br>" +
                c + "<br>" +
                "Resposta selecionada: " + cqQuestion.selected + "<br>" +
                "Resposta correta: " + corrects[cqTemp] + "<br>" +
                "Tempo: " +
                ((cqTime.getUTCMinutes() != 0 ?
                    (cqTime.getUTCMinutes() + " minuto(s) e ") : "") +
                    cqTime.getUTCSeconds() + " segundo(s)")
            )
			
			//A questão ficará vermelha se estiver errada; e verde se estiver correta
            cqColor.push(cqQuestion.correct ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)")
        }
		
		//Irá receber o tempo total gasto em determinado tema
        let totalTime = new Date(totalIntTime)
		/*
		*Essa lista em questão será formatada de forma que mostre o tempo total gasto,
		*mostrando apenas o necessário se existir (por exemplo, não irá mostrar horas se o usuário
		*não tiver gasto pelo menos 1 hora no simulado)
		*/
        cqInfo[cqInfo.indexOf("-1")] = "Tempo: " +
            (totalTime.getUTCHours() != 0 ?
                (totalTime.getUTCHours() + " hora(s), ") : "") +
            ((totalTime.getUTCMinutes() != 0 ?
                (totalTime.getUTCMinutes() + " minuto(s) e ") : "") +
                totalTime.getUTCSeconds() + " segundo(s)");

    }


	/*Cria as informações do gráfico*/
    let complexQuestionsData = [{
        type: "sunburst",
        maxdepth: 2,
        ids: cqQuestions,
        labels: cqLabels,
        parents: cqParents,
        hovertext: cqInfo,
        outsidetextfont: { size: 20, color: "#377eb8" },
        leaf: { opacity: 0.8 },
        marker: {
            line: { width: 2 },
            colors: cqColor
        },
    }];

	//Cria o layout do gráfico
    let complexQuestionLayout = {
        "margin": { "l": 0, "r": 0, "b": 0, "t": 0 },
        autosize: false,
        width: 500,
        height: 500,
        plot_bgcolor: "rgba(255, 255, 255, 0)",
        paper_bgcolor: "rgba(255, 255, 255, 0)",
        hoverlabel: {
            align: "left"
        }
    };

	//Cria o gráfico
    Plotly.newPlot(cComplexQuestions, complexQuestionsData, complexQuestionLayout);
	
	//Adiciona o grafico ao container
    complexQuestionsGraphic.appendChild(cComplexQuestions)

	/*
	*Os appends a seguir irão adicionar um container ao outro container,
	*isso até chegar no container principal, no qual tudo ficará devidamente formatado
	*/
    firstGraphicsContainer.appendChild(answersGraphic)
    firstGraphicsContainer.appendChild(questionsGraphic)
    secondGraphicsContainer.appendChild(complexQuestionsGraphic)

    graphicsContainer.appendChild(firstGraphicsContainer)
    graphicsContainer.appendChild(secondGraphicsContainer)

    tab.appendChild(graphicsContainer)

}

function loadAllQuestions() {
    //Carrega a aba
    let tab = document.querySelector("#tab-item")

    //Container principal de gráficos
    let graphicsContainer = document.createElement("div")
    graphicsContainer.className = "d-flex flex-column w-100 w-center mb-50"

    //Cria os containers para o container principal de gráficos
    let container = document.createElement("div")
    container.className = "d-flex flex-column w-100 w-center mb-50"

    let generalContainer = document.createElement("div")
    generalContainer.className = "d-flex-space-between w-100 w-center mb-50"

    //Cria o título do gráfico
    let answerGTitle = document.createElement("p")
    answerGTitle.className = "graphic-title"
    answerGTitle.innerText = "Questão " + currentQuestion

    //Cria o texto do gráfico
    let answerGText = document.createElement("p")
    answerGText.className = "text-center mb-20"
    answerGText.innerText = "A seguir, serão apresentadas estatísticas que foram geradas de forma fictícia para a questão" +
        ", ou seja, não correspondem a dados reais. O gráfico representa a quantidade de pessoas que " +
        "selecionaram cada questão."

	//Adiciona o titulo e o texto ao container
    container.appendChild(answerGTitle)
    container.appendChild(answerGText)

    let cAnswers = document.createElement("div")

	/*
	*variável com arrow function para que
	*varra cada alternativa setando suas cores
	*de acordo com a alternativa correta
	*Verde para correto e vermelho para incorreto
    */
	let loadColor = (alpha) => {
		/*Lista para receber a cor de cada alternativa*/
        let colors = []
		/*outra arrow function para retornar determinada alternativa
		  de acordo com o estado do for*/
        let numToLetter = (letter) => {
			//Switch para retornar a letra associada a determinado número
            switch(letter){
                case 0:
                    return 'A';
                case 1:
                    return 'B';
                case 2:
                    return 'C';
                case 3:
                    return 'D';
                case 4:
                    return 'E';
            }
        }

		//laço for que irá varrer alternativa por alternativa, verificando se é a correta.
		//Caso correta, irá adicionar à lista a cor verde; caso incorreta, vermelha
        for(let i = 0; i < 5; i++){
            if(corrects['Q' + currentQuestion] == numToLetter(i))
                colors.push('rgba(162,232,172,' + alpha + ')')
            else
                colors.push('rgba(229, 114, 114,' + alpha + ')')
        }
		
		//retorna a lista
        return colors;
    }

    //Cria o de respostas por alternativa, recebendo o eixo x e eixo y
    var xValue = ['A', 'B', 'C', 'D', 'E'];

    var yValue = statistics['Q' + currentQuestion]
	
	//cria os dados do gráfico
    var trace1 = {
        x: xValue,
        y: yValue,
        type: 'bar',
        text: yValue.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
            color: loadColor(0.8),
            opacity: 0.75,
            line: {
                color: loadColor(1),
                width: 1.5
            }
        }
    };

    var data = [trace1];
	
	//cria o layout do gráfico
    var layout = {
        title: 'Gráfico de média de respostas por alternativa',
        barmode: 'stack',
        xaxis: { title: 'Alternativas' },
        yaxis: { title: 'Quantidade de respostas' }
    };
	
	//cria o gráfico
    Plotly.newPlot(cAnswers, data, layout);

    //Cria o botão de retroceder
    let leftButton = document.createElement("div")
    leftButton.className = "statistic-button"
	leftButton.innerText = "<"

	/*
	*Cria um listener de click para o botão de retroceder
	*Caso a questão atual seja a 1, o botão não irá funcionar (irá simplesmente retornar),
	*caso contrário, irá decrementar a variável currentQuestion e mudar o titulo do gráfico,
	*assim como seus dados de respostas por alternativa,
	*criando assim um gráfico novo no lugar do antigo
	*/
    leftButton.addEventListener("click", () => {
        if (currentQuestion == 1)
            return;

        currentQuestion--
        answerGTitle.innerText = "Questão " + currentQuestion
        trace1.y = statistics['Q' + currentQuestion]
        trace1.text = statistics['Q' + currentQuestion].map(String)
        trace1.marker.color = loadColor(0.8)
        trace1.marker.line.color = loadColor(1)

        Plotly.newPlot(cAnswers, [trace1], layout);
    })

    //Cria o botão de avançar
    let rightButton = document.createElement("div")
    rightButton.className = "statistic-button"
	rightButton.innerText = ">"
	
	/*
	*Cria um listener de click para o botão de avançar
	*Caso a questão atual seja a 50, o botão não irá funcionar (irá simplesmente retornar),
	*caso contrário, irá incrementar a variável currentQuestion e mudar o titulo do gráfico,
	*assim como seus dados de respostas por alternativa,
	*criando assim um gráfico novo no lugar do antigo
	*/
    rightButton.addEventListener("click", () => {
        if (currentQuestion == 50)
            return;

        currentQuestion++
        answerGTitle.innerText = "Questão " + currentQuestion
        trace1.y = statistics['Q' + currentQuestion]
        trace1.text = statistics['Q' + currentQuestion].map(String)
        trace1.marker.color = loadColor(0.8)
        trace1.marker.line.color = loadColor(1)

        Plotly.newPlot(cAnswers, [trace1], layout);
    })
	
	//Adiciona os botões, gráficos e informações ao container secundário
    generalContainer.appendChild(leftButton)
    generalContainer.appendChild(cAnswers)
    generalContainer.appendChild(rightButton)

	//adiciona o container secundário ao principal
    container.appendChild(generalContainer)
	
	//Adiciona o container principal ao tab, estando devidamente estilizado e formatado
    tab.appendChild(container)
}

//Carrega a visão geral
function loadOverview() {
	//recebe o container tab
    let tab = document.querySelector("#tab-item")

	//cria o tainer principal
    let container = document.createElement("section")
    container.className = "w-100 d-flex-space-between"

    //Variável para criar a tabela "Meu simulado"
    let resultSection = document.createElement("section")
    resultSection.className = "d-flex-self-start"
    resultSection.innerHTML =
        "<h2>Meu simulado</h2>" +
        "<table id='resultado' class='table'>" +
        "<tr>" +
        "<th class='upper-table'>Questão</th>" +
        "<th>Resposta</th>" +
        "</tr>" +
        "</table>" +
        "<p id='warning'><small>*<b>-</b>: questões em branco.</small></p>"

    //Variável para criar a tabela "Gabarito"
    let gabaritoSection = document.createElement("section")
    gabaritoSection.className = "d-flex-self-start"
    gabaritoSection.innerHTML =
        '<h2>Gabarito oficial</h2>' +
        '<table id="gabarito" class="table">' +
        '<tr>' +
        '<th>Questão</th>' +
        '<th>Resposta</th>' +
        '</tr>' +
        '</table>'

    //Variável para criar a tabela "Desempenho"
    let performanceSection = document.createElement("section")
    performanceSection.className = "d-flex-self-start"
    performanceSection.innerHTML =
        "<h2>Desempenho Geral</h2>" +
        '<section id="acertos" class="d-flex flex-column">' +
        '<div class="progress-box d-flex flex-column">' +
        '<p>Total de acertos: <span id="q-acerto"></span></p>' +
        '<div class="progress">' +
        '<span id="p-acerto" class="progress-green"></span>' +
        '<p id="t-acerto" class="progress-text">0%</p>' +
        '</div>' +
        '</div>' +

        '<div class="progress-box d-flex flex-column">' +
        '<p>Total de erros: <span id="q-erro"></span></p>' +
        '<div class="progress">' +
        '<span id="p-erro" class="progress-red"></span>' +
        '<p id="t-erro" class="progress-text">0%</p>' +
        '</div>' +
        '</div>' +

        '<div class="progress-box d-flex flex-column">' +
        '<p>Total de questões em branco: <span id="q-branco"></span></p>' +
        '<div class="progress">' +
        '<span id="p-branco" class="progress-blue"></span>' +
        '<p id="t-branco" class="progress-text">0%</p>' +
        '</div>' +
        '</div>' +

        '<div class="progress-box d-flex flex-column" id="total-time">' +
        '<p>Duração do simulado:</p>' +
        '<p class="time">' +
        '10 horas' +
        '</p>' +
        '</div>' +

        '<div class="d-flex flex-column" id="time-per-question">' +
        '<p>Média de tempo por questão:</p>' +
        '<p class="time">' +
        '10 horas' +
        '</p>' +
        '</div>' +
        '</section>' +
        '<p style="color: red;"><small>*as questões em branco são contabilizadas como erro.</small></p>'

	//Adiciona os respectivos filhos ao container principal e depois adiciona o container principal ao tab
    container.appendChild(resultSection)
    container.appendChild(gabaritoSection)
    container.appendChild(performanceSection)
    tab.appendChild(container)

    //Visão Geral
    loadAnswersVG() //carrega as respostas
    loadGabaritoVG() //carrega o gabarito
    loadPerformanceVG() //carrega o desempenho
}

//Função para selecionar a tab
function selectTab(tab) {
	//Recebe as tabs e verifica se está no modo escuro para alterar suas informações
    let dark = localStorage.getItem("dark_mode") == 'true'
    let condition = dark ? 'tab-selected-dark' : 'tab-selected'

	//Verifica se a tab atual não é a que o usuário selecionou,
	//caso seja, não irá fazer nada
    if (currentTabNum != tab) {
		//seta a tab atual como a selecionada
        currentTabNum = tab
		
		//Se a tab atual não for nula, irá alterar sua classe
        if (currentTab != null)
            currentTab.className = dark ? "tab-unselected-dark" : "tab-unselected"

		//a tab recebe o elemento selecionado
        currentTab = document.querySelector("#tab-row").querySelectorAll("li")[tab]
        currentTab.className = condition

        //reseta a tab para esvaziar seu conteúdo
        document.querySelector("#tab-item").innerHTML = ""

		//Switch responsável por executar as funções que criarão toda a parte gráfica da tab
        switch (tab) {
            case 0:
                loadOverview()
                break
            case 1:
                loadCategoriesVI()
                break
            case 2:
                loadGraphics()
                break
            case 3:
                loadAllQuestions()
                break
        }

		//Se o modo escuro estiver ligado, mudará os elementos para o modo escuro
        if (localStorage.getItem("dark_mode") == 'true') {
            let night_theme = document.getElementById("checkin")
            night_theme.checked = true
            dark_mode()
        }
    }
}

//Função que retorna o length da lista de questões
function getLength(last){
	return Object.keys(last).length
}

//Checa se houve respostas por parte do usuário durante o simulado,
//caso não tenha, irá ocultar a opção de "Visão Individual" e "Estatísticas",
//pois se tornam inúteis para análise nesse caso
function checkAvailable() {
    let history = JSON.parse(localStorage.getItem("history")) //converte o histórico em um JSON
    let last = history['history'][history['history'].length - 1] //pega o último elemento do array
	let isDark = (localStorage.getItem("dark_mode") == 'true') ? ".tab-unselected-dark" : ".tab-unselected"

	//verifica se realmente não houve respostas por parte do usuário
    if (last == null || getLength(last) == 0) {
        document.querySelectorAll(isDark)[0].style.display = "none" //muda a visualização do botão para none
        document.querySelectorAll(isDark)[1].style.display = "none" //muda a visualização do botão para none
    }
}

//Seleciona a primeira opção/tab
selectTab(0)

//Verifica se o usuário fez o simulado
checkAvailable()
