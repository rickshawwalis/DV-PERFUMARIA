const inputTarefa = document.querySelector('.input-tarefa');//Recebe os dados do input texto;
const btnTarefa = document.querySelector('.btn-tarefa'); //recebe button;
const tarefas = document.querySelector('.tarefas'); //gera uma <ul> que será preenchida por <li>;


function salvarTarefas() { //Essa função tem a finalidade de salvar as tarefas em um objeto do tipo JSON na memória local do navegador do usuário.
    const liTarefas = tarefas.querySelectorAll('li'); //A primeira linha da função seleciona todos os elementos <li> dentro do elemento <ul> com classe "tarefas" usando o método querySelectorAll.
    const listaDeTarefas = []; //essa linha é responsável por criar a estrutura de dados que será usada para armazenar as tarefas em forma de array. Sem ela, não haveria um lugar para armazenar as tarefas antes de transformá-las em formato JSON e salvá-las no armazenamento local.

    for (let tarefa of liTarefas) {//percorre todos os elementos <li> obtidos na primeira linha da função e extrai o texto da tarefa utilizando a propriedade innerText.
        let tarefaTexto = tarefa.innerText; //Com essa linha de código, o texto da tarefa será armazenado em uma variável para que possa ser processado posteriormente, por exemplo, para remover a palavra "Apagar" e limpar espaços em branco, como é feito nas linhas seguintes.
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); // (olhar codigo da linha 22 para entender) o método replace() para remover a palavra "Apagar". Neste caso, a substring "Apagar" será substituída por uma string vazia, ou seja, removida da string tarefaTexto/ metodo trim() é usado para remover espaços em branco no início e no final da string resultante. O resultado final é uma string contendo apenas o texto da tarefa, sem a palavra "Apagar" ou quaisquer espaços em branco adicionais.
        listaDeTarefas.push(tarefaTexto); 
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //JSON.stringify() é usada para converter um objeto JavaScript em uma string JSON. 
    localStorage.setItem('tarefas', tarefasJSON); // Essa linha de código armazena os dados convertidos para JSON em um item do localStorage.O localStorage é uma forma de armazenamento local no navegador, que permite armazenar dados chave-valor no navegador do usuário. O método setItem é usado para armazenar um item no localStorage, onde o primeiro argumento 'tarefas' é a chave para o item, e o segundo argumento tarefasJSON é o valor do item. No caso desse código, a chave 'tarefas' é usada para armazenar uma string JSON que representa uma lista de tarefas. Isso permite que os dados sejam armazenados localmente e recuperados posteriormente quando o usuário retornar à página.
}

function criaBotaoApagar(ev) { //Essa função cria a imagem "X" para apagar;
    const imagemApagar = document.createElement('img'); //Cria a tag img;
    //botaoApagar.innerText = 'Apagar';
    imagemApagar.setAttribute('src', 'excluir.png'); //localiza a imagem e insere;
    imagemApagar.setAttribute('class', 'apagar');//cria uma classe chamada apagar;
    ev.innerText += ' '; //Adiciona um espaço em branco entre o texto a imagem;
    ev.appendChild(imagemApagar); //Adiciona a imagem criada anteriormente como um filho do elemento de imagem passado como parâmetro;
}

function criaTarefa(textoInput) {  //Essa função cria o ,<li> dentro da ul (class tarefas do html);
    const li = document.createElement('li');//Cria a tag <li>;
    tarefas.appendChild(li); //Através de "tarefas" que foi criado para referenciar <ul>, será criado dentro dela as <li>;
    li.innerText = textoInput; //define o texto que será exibido dentro do elemento <li>;
    inputTarefa.value = ''; //Limpa os dados digitados no input texto;
    inputTarefa.focus(); //Define o foco do cursor no input texto;
    criaBotaoApagar(li); //Essa função é responsável por criar e adicionar o botão de "apagar" na tarefa criada, no caso em cada tag <li> criada;
    salvarTarefas();//executa a função salvarTarefas
}

btnTarefa.addEventListener('click', function () { //ativa o input button;
    if (!inputTarefa.value) return; // Se estiver vazio, o código irá sair da função usando o comando return sem executar as próximas linhas;
    criaTarefa(inputTarefa.value); // essa linha de código é responsável por criar um novo elemento <li> e adicionar esse elemento na lista de tarefas <ul>;
});

inputTarefa.addEventListener('keypress', function (e) { //permite enviar dados do input text ao clicar em enter;
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

document.addEventListener('click', function (e) { //permite apagar;
    const el = e.target; //target ajuda na localização quando o elemento é clicado
    if (el.classList.contains('apagar')) {//localiza a classe chamada 'apagar'
        el.parentElement.remove();//O método parentElement é usado para selecionar o elemento HTML pai do botão "Apagar", que é o elemento li que representa a tarefa na lista de tarefas. Em seguida, o método remove() é usado para remover o elemento pai da lista de tarefas.
        salvarTarefas();//executa a função salvarTarefas
    }
});

function adicionaTarefasSalvas() { //(mantem os codigos mesmo se atualizar a pagina)Este código é responsável por recuperar as tarefas salvas anteriormente no armazenamento local do navegador (localStorage) e adicioná-las à lista de tarefas na página, para que o usuário possa continuar trabalhando com essas tarefas.
    const tarefas = localStorage.getItem('tarefas'); //Obtém as tarefas salvas anteriormente no armazenamento local do navegador por meio do método localStorage.getItem('tarefas'). Isso retorna uma string que representa as tarefas em formato JSON.
    const listaDeTarefas = JSON.parse(tarefas); //Converte a string JSON de volta para um objeto JavaScript com a função JSON.parse(), atribuindo o resultado à variável listaDeTarefas.

    for (let tarefa of listaDeTarefas) { //Essa parte do código é um loop que percorre cada tarefa na lista de tarefas (armazenada em listaDeTarefas) e chama a função criaTarefa() passando a tarefa como argumento. Em outras palavras, ele cria uma nova tarefa na página para cada tarefa salva na lista de tarefas armazenada no localStorage. Isso é importante porque permite que o usuário continue a trabalhar em suas tarefas salvas mesmo após fechar e reabrir a página.
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();


