# CURSO 1: Conhecendo o Browser e padrões de projeto

### Aula 02

+ Para criarmos uma classe, usamos a palavra reservada class seguida do nome da classe. Por convenção, nomes de classe começam em letra maiúscula. Curiosamente essa convenção se chama pascal case.
+ Para definirmos atributos de instância de uma classe, precisamos adicionar na sua definição um constructor. 
    + É através do construtor que adicionamos na variável implícita this as propriedades que desejamos que toda instância da classe tenha.
+ Por convenção, adotamos que os atributos privados devem usar o prefixo _ (underline), indicando para o desenvolvedor que ele só pode acessá-lo. 
    + Vimos como adicionar métodos nas classes, e estes, sim, podem acessar os atributos privados.
+ Temos um método que conseguimos acessar como uma propriedade, bastando ser antecedido pela palavra especial get, desta forma, estaríamos gerando um getter. 
    + Quem acessa a sua classe acredita que se trata de uma propriedade, mas na verdade, trata-se por "debaixo dos panos" de um método.
+ Usamos o Object.freeze() para congelar um objeto depois de criado. 
    + Como Object.freeze() é shallow (raso), ele será aplicado nas propriedades do objeto, as propriedades que são objetos não serão todas congeladas.
    + A ação ficará apenas na superfície. 
    + Para resolver esta questão, falamos um pouco sobre programação defensiva. 
    + Quando alguém tentar acessar a data, nós retornaremos uma nova data. 
    + Fizemos o mesmo com o construtor e com isso, evitamos que alguém consiga de fora da classe alterar algum item do estado interno.

### Aula 03

+ Criamos o construtor:
    + Chamamos o event.preventDefault() para evitar recarregar o formulario (comportamento padrão) quando clicar no botão incluir (type=submit). 
    + Com o event.preventDefault(), a controller cancelará a submissão do formulário para poder capturar os dados da negociação e incluir na lista. 
    Ainda não colocamos constructor, porque a negociação ainda não tem nenhum atributo de classe.

+ No index.html dentro da tag <form>, adicionaremos **onsubmit** para submeter o formulário. E na instância de negociacaoController, chamaremos o método adiciona(event):
    + Inspirado por framework como o AngularJS, por exemplo, que faz a associação de uma ação da controller utilizando um evento. 
    + Usaremos isso, para escrever menos código na parte JavaScript. 
    + Como nossa página é dependente de JS, podemos fazer isso facilmente
    
+ Em JavaScript temos as First Class Functions, podemos declarar a variável $ - como usado no jQuery - e dentro, jogaremos o document.querySelector.
    + Quando colocamos o querySelector dentro do $, ele passa a ser executado fora do contexto de document e isto não funciona.
    + Nós queremos que ao colocarmos o querySelector para o $, ele mantenha a associação com o document. Para isto, usaremos o bind()
    + Estamos informando que o querySelector irá para a variável $, mas ainda manterá uma associação com document

+ Para melhorar a performance evitando a leitura repetidas vezes do DOM
    + Adicionaremos o constructor e moveremos os inputs para dentro dele. 
    + Mas em vez de criarmos uma variável, criaremos atributos de instâncias com o this.
    + Usaremos esta estratégia como se fosse um caching até o fim do curso.
      
### Aula 05

+ Para calculo do footer precisamos de uma função que retorne um valor.
    + Só que quando usamos uma instrução, não podemos adicionar uma sequência de instruções. 
    + Seremos espertos e adicionaremos uma função dentro do $. 
    + Utilizaremos uma **Immediately-invoked function expression (IIFE)** ou a **função imediata**. 
    + Trata-se de um recurso usado na criação de escopo em JavaScript, que nos ajudará a colocar um bloco na expressão, sendo executado imediatamente. 
    + No caso, o $ receberá o total.

# CURSO 2: Aprofundando em MVC, padrão Proxy e Factory

### Aula 01
 
+ Implementamos uma forma de evitar chamar o método update do Model ListaNegociacoes;
    + Para isso passamos como função a chamada de atualiza (chamada desde o Controller, no contexto do controller)
    + O model vai receber essa funcao e executa-la toda vez que alguém chamar os métodos que alteram o model  
    
    + Primeira implementacao: Usamos function()
        + Passamos para o model o contexto e a funcao (function()). O contexto é o proprio controller, para ele nao se perder;
        + A funcao recebe como parametro o model, para poder enviar ele como parametro no momento da execução;
        + A function() tem um comportamento dinámico em relação ao contexto. Dado que estamos trabalhando com this... termina se perdendo um pouco. Por conta disso passamos o contexto;
        + Para executar corretamente esta estrategia fazemos uso da API de reflexão do JavaScript, Reflection API, usando reflect.apply()
            + ```Reflect.apply(this._armadilha, this._contexto, [this]);```
            + O primeiro parametro é a função;
            + O segundo parâmetro é o contexto;
            + O terceiro parâmetro é o parâmetro da função que deve ser passado como array por conta do reflection;

    + Segunda implementacao: Usamos arrow function  
        + Arrow function não é apenas uma maneira sucinta de escrever uma função, ela também tem um característica peculiar: 
            + O escopo de this é léxico, em vez de ser dinâmico como a outra função (function). 
            + Isto significa que o this não mudará de acordo com o contexto. Ele mantem o contexto no momento da declaracao da arrow function 
            + Da maneira como estruturamos o código, o this será NegociacaoController - 
                + Esta condição será mantida independente do local em que chamemos a arrow function, porque ela está amarrada a um escopo imutável.
                
    + Então, o this de uma arrow function é léxico, enquanto o this de uma função padrão é dinâmico. 
        Com esse ajuste, conseguimos deixar o nosso código mais sucinto.

+ O padrão de projeto Observer
    + No final das contas estamos usando o padrão de projeto Observer 
    + Sempre que queremos notificar partes do sistema interessadas quando um evento importante for disparado em nosso sistema.
    + No contexto da nossa aplicação, entendemos um evento como o ato de adicionar ou esvaziar nossa lista de negociações. 
    + É a view que está interessada em observar esse evento e tomar uma ação, no caso, se atualizar com base no estado mais atual do modelo.

### Aula 02

+ Nesta segunda aula teremos como objetivo tirar a armadilha do nosso model ListaNegociacoes 
    + A armadilha é um código de infraestrutura orientado a resolver um problema da view e está dentro do nosso model;
    + Isso será evitado agora e passaremos e tentaremos utilizar o padrão de projeto PROXY
+ O Proxy neste caso será um cara que tratará com o objeto (objeto puro) e aplicará as mudanças necessárias sem afetar o modelo original;
    + A intenção aqui é colocar as armadilhas entre os métodos do objeto real e a implementação do método no proxy;
+ O padrão de projeto Proxy nada mais é do que um objeto "falso", "mentiroso", que envolve e encapsula o objeto real que queremos interagir. 
    + É como se fosse uma interface, entre o objeto real e o resto do código. 
    + Conseguimos assim controlar o acesso aos seus atributos e métodos. 
    + Nele também podemos pendurar códigos que não cabem de estar alocados nos nossos modelos, 
        mas que necessitam ser executados no caso de uma alteração ou atualização do mesmo.

+ get(target, prop, receiver) {}
    + O target é o objeto real, que é encapsulado pelo proxy.
        + É este objeto que não queremos "sujar" com armadilhas ou qualquer código que não diga respeito ao modelo.
    + O prop é a propriedade que está sendo lida.
    + O receiver é uma referência ao próprio proxy.  É na configuração do handler do Proxy que colocamos armadilhas.
    
### Aula 03
+ Para evitar um código muito verboso nesta aula ocódigo para criação do Proxy foi transportado para uma factory;
    + A factory terá todos os tratamentos tanto para armadilhas de métodos como de propriedades
    + A factory criará metodo estático que será chamado desde o controller para criação dos proxies;
+ Ao criar esses proxies para ListaNegociacoes e Mensagem está se criando DATABIND (associacao de dados)
    + No caso é uma associação entre o modelo e a view. Então toda vez que mudar o model deveria mudar também a view.
    + Isso é chamado de databind unidirecional;
+ Usamos o REST OPERATOR para passar um array de parametros num único parametro
    + Ao fazer isso evita mandar um array e o rest operator junta tudo na hora que recebe os parametros soltos;
    + Mas sobre REST: utilizamos "..." antes do último parâmetro, e assim tudo que nós passarmos de "extra" será colocado dentro de um array 
+ Sobre o padrão de projeto Factory:
    + Ele é utilizado quando precisamos facilitar a criação de um objeto.
    + É ideal quando queremos criar objetos similares, com apenas seus detalhes diferentes, que podemos passar nos argumentos da Factory.
    + É bom para abstrair a criação de um objeto complexo, já que o programador que utilizar a Factory não precisa necessariamente saber como é feita esta operação.
+ FACTORY METHOD: As fábricas não só fazem parte do nosso código, como também da API do JavaScript. Já existem várias classes que aproveitam esse padrão.
    + Por exemplo, a classe String possui um método (ou factory method) para transformar vários CharCode em uma string:
        + let abc = String.fromCharCode(65, 66, 67);  // "ABC"COPIAR CÓDIGO
    + A classe Array pode receber uma string ou um iterável, como lista ou mapas, para criar um array:
        + let d = Array.from("abc") => retorna ["a", "b", "c"]
+ Um FACTORY METHOD nem sempre precisa estar dentro de uma classe dedicada. 
    + No exemplo desse exercício, não existe uma classe StringFactory ou ArrayFactory. 
    + O método pode fazer parte da classe em questão.
    + O factory method não precisa se chamar create ou constroi. Outros nomes são válidos, como from ou getInstance.
    
### Aula 04
+ Implementaremos requisições AJAX na mão => Para isso usaremos XMLHttpRequest
+ Toda requisição AJAX passa por estados. Num desses estados a requisição nos entregará os dados retornados do servidor. 
+ Por isso, precisamos interagir com esses estados e especificar que adicionaremos os dados de um deles no nosso model. 
+ O xhr tem o evento *onreadystatechange* que dispara toda vez que muda o estado do XHR (Ajax)
+ Esse evento pode ser programado passando para ele uma arrow funtion que será chamada sempre que o estado do xhr for modificado.
+ Estados possíveis de um requisição AJAX? Listaremos abaixo os estados:
    + UNSENT = 0        XMLHttpRequest foi criado. Mas o método open() não foi chamado ainda. A requisição ainda não iniciada. 
    + OPENED = 1        O método open() foi invocado. A conexão com o servidor estabelecida. 
                        Durante esse estado, os headers da requisição podem ser inseridos usando o método setRequestHeader() 
                        e o método send() pode ser chamado, iniciando a busca.
    + HEADERS_RECEIVED = 2      O método send() foi chamado. A requisição foi recebida e os cabeçalhos de respostas foram recebidos.
    + LOADING = 3       Processando a requisição. A resposta da requisição está sendo recebida. 
                        Se o responseType for "text" ou  um texto em branco, o responseText terá o texto parcial da resposta conforme seu carregamento.
    + DONE = 4          A requisição está concluída e a resposta está pronta.
                        Isso pode significar que a transferência foi concluída com êxito ou que falhou.
                        
+ Error-first Callback 
    + É um padrão que foi adotado no mundo Node.js. 
    + O callback é uma função chamada quando uma tarefa for executada, como uma requisição Ajax ou o acesso ao banco de dados. 
    + Dado que a qualquer momento pode acontecer um erro no processamento e aí vem a questão de como lidar com isso.
    + A convenção é que cada callback receba sempre o erro no primeiro parâmetro. 
    + Na função callback, basta então verificar esse parâmetro para saber se ocorreu um erro ou não!
    
### Aula 05

+ Pyramid of Doom (pirâmide da desgraça) e
    + Quando temos uma função aninhada dentro de outra. 
    + A pirâmide é um forte indício de que temos problemas de legibilidade do código, na verdade, é o sintoma de um problema maior, **o Callback Hell**. 
+ Callback Hell
    + Ocorre quando temos requisições assíncronas executadas em determinada ordem, que chama vários callbacks seguidos.
    + Vale ressaltar: em uma situação de erro seria complicado o tratamento do erro.
+ Padrão de projeto chamado Promessa (Promise, em inglês)    
    + Servirá para lidar com a complexidade da programação assíncrona.
    + O ES6 suporta a promise nativamente, então, o método deverá retornar uma Promise(), que receberá dois parâmetros ( resolve e reject). 
    + Padrão básico de uma promesa:
        + new Promise(() => {});
        + A função passada como parâmetro recebe 2 parâmetros: resolve e reject
          new Promise((resolve, reject) => {});
    + Para capturar a resposta de uma promise:
      + minhaPromessa
          .then(mensagem => console.log(mensagem))
          .catch(erro => console.log(erro));
+ Uso de Promise.all([])
    + Todas as promises do array serão exibidos na sequência e o resultado estará em um array de resultados
        + O array de resultados somente é preenchido se TODAS as promises deram certo
    + Em caso de erro, ele será capturado uma única vez.
        + O erro corresponde à primeira promise que deu errado.
+ Criação de um HttpService que trata centraliza as chamadas de XMLHttpRequest e pode ser utilizado para centralizar 
as chamadas de tipo POST, PUT, DELETE     

# CURSO 3: Salvando dados localmente com IndexedDB

### Aula 01 - Guardando negociações offline com IndexedDB

+ Objeto **window** =>  escopo global do JavaScript
+ IndexedDB é o banco de dados do JavaScript, acessado pelo escopo global **window**
+ No console: window.indexedDB
    + Retorna: IDBFactory {}        
    + Trata-se de uma "fábrica" para criarmos bancos no IndexedDB - temos a opção de acessá-lo também diretamente.
+ Uso do método indexedDB.open() que retorna uma instância de IDBOpenDBRequest. É uma requisição de abertura do banco.
    + Precisaremos lidar com um tríade de eventos disparados quando tentarmos acessar um banco no IndexedDB.
        + onupgradeneeded   =>  evento dispara quando cria ou altera um banco já existente
        + onsuccess         =>  evento dispara quando conecta com o banco
        + onerror           =>  evento dispara quando acontece um erro de conexão ou criação do banco
    + Uso de createObjectStore() para criar as "tabelas" ou repositorios de dados propriamente ditos

### Aula 02 - Criando o ConnectionFactory.js

+ O ConnectionFactory permite criar conexões únicas, permite o unico camionho para fechar a conexão.
+ Foram implementados padrões Module Pattern e Monkey Patch
+ Ainda foram utilizadas IIFE => função anônima que se invoca automaticamente; 

### Aula 03 - Implementando o padrão DAO

+ O padrão DAO
    + A vantagem está ligada com a capacidade de isolar todo o código que acessa seu repositório de dados em um único lugar. 
    + Toda vez que o desenvolvedor precisar realizar operações de persistência ele verá que existe um único local para isso, seus DAO's.
    + DAO faz parte da camada de persistência, funciona como uma fachada para a API do IndexedDB. 
    + Repare que para usar o DAO não é preciso saber os detalhes do store ou cursor, request
+ Uso aninhado de Promises "PRIMISES CHAINNING"
    + Neste capitulo aprimoramos o uso de promisees. Todos os realcionamentos com o exterior estão sendo feito usando promises
    + O uso de promises aninhadas é super interessantes
    + Alem de melhorar a visibilidade do código, permite que ter um único catch que resolve para todos os then
    
### Aula 04 - Lapidando aplicação

+ Importação de negociações. Vamos implementar mecanismos que evitem a duplicando das negociações.
    + 1ra tentativa: antes de adicionar, procurar negociacao dentro da listaNegociacoes usando IndexOf() --> não atende
    + 2da tentativa: converter objeto em string usando JSON.stringfy() para facilitar a comparação
        + Aqui poderia ser feito um código para percorrer a listaNegociacoes toda vez que adicionar uma negociacao
    + 3ra tentativa: Usar método some() que todo array. Esse método 'some' faz exatamente o que precisamos;
    
+ Função SOME
    + A função some itera sobre o array, assim como forEach, filter e map. 
    + No entanto, seu retorno é true ou false. 
    + Ela retorna true logo assim que encontrar o primeiro elemento que for condizente com o critério de comparação utilizado. 
    + Quando dizemos, "logo assim", significa que a função parará de iterar nos elementos da lista, 
        porque já encontrou pelo menos algum (some) que atenda ao critério.
        
### Aula 05 - Uso de Fetch Api

+ A Fetch API usa o padrão de projeto promise.
    + Podemos encadear chamadas do .then, inclusive tratar erros com .catch.
+ Existem polyfis disponíveis na internet que garantem a presença da Fetch API em navegadores que não a suportam, mas é importante que o navegador suporte no mínimo a API de promise.
    + Programadores front-end têm ficado cada vez mais interessados nessa API, ao ponto de utilizá-la em seus projetos, tudo com auxílio de um polyfill.
+ Por mais que seja utilizada por muitos desenvolvedores, a Fetch API ainda está sujeita a mudanças, pois é experimental ainda (pelo menos até agosto/2016).
    + O fato de ser experimental não afastou os desenvolvedores e muitos deles usam um polyfill para suportar esse recurso em navegadores que não o suportam. 
    + Mas é importante estar atento que o browser precisa suportar promises.
    
### Aula 06 - Uso de transpile - Babel

+ EcmaScript 2009 = ES5 (muito antigo)
+ EcmaScript 2015 = ES6 (muitas novidades como classes, promisses, let, const, arrow functions, rest parameters, etc)

+ **Inspiração**
+ Durante todo o treinamento usufruímos como desenvolvedores dos recursos do ES2015 visando a escrita de um código mais elegante e mais fácil de manter. 
+ Não é raro o próprio desenvolvedor se questionar sobre a compatibilidade do seu código em relação aos seus usuários ou visitantes do site.
+ O desenvolvedor tem que se equilibrar na balança que ora pesa para o lado do que há de mais moderno da linguagem e ora para a questão de compatibilidade.
+ Para solucionar os problemas de compatibilidade e ainda permitir que o desenvolvedor utilize o que há de mais moderno da linguagem JavaScript 
    foram criados compiladores de código fonte para código fonte comumente chamados de transcompiladores (transpilers). 
+ A ideia é compilarmos um código-fonte escrito em ES2015 para ES5, garantindo a compatibilidade em diferentes tipos de browsers.
+ O resultado da transcompilação pode variar de transpiler para transpiler, mas o resultado final deve ser idêntico à funcionalidade original do código em ES2015. 
+ Inclusive não é raro o resultado da transcompilação para ES5 resulte em um código muito mais verboso.
+ O processo de transcompilação normalmente não é feito manualmente, mas por meio de ferramentas que tornam transparentes esse processo para o desenvolvedor
+ Evitando assim erros oriundos do esquecimento da compilação deste ou daquele arquivo que foi atualizado

+ **Babel** 
    + Possui recursos nativos que permitem o monitoramento e compilação de scripts de maneira automática, sem a intervenção do desenvolvedor.
        + O binário do Babel possui o modo watch que monitora mudanças de arquivo e quando configurado corretamente permite compilar nossos script sem que o desenvolvedor assuma essa responsabilidade.
    + Babel é um módulo do Node.js e depende dele para funcionar.
        + Ele é baixado através do npm, o gerenciador de pacotes da plataforma Node.js.
    + Babel é uma ferramenta que pode ser facilmente incluída em seu workflow de desenvolvimento. Mas como qualquer ferramenta, precisa ser configurada.
    + Configurações específicas do Babel ficam no arquivo oculto .babelrc.
    + Babel é ma ferramenta que traduz um código em outro, contudo ela não esta preparada gerar a conversão de qualquer código. 
        + Por isso é preciso instalar um preset para que ele seja capaz de transcompilar nosso código de ES2015 (ES6) para ES5!
    + O arquivo .babelrc deve estar no formato JSON e uma das exigências desse formato é usarmos aspas duplas para representar suas chaves, inclusive strings. 
        {
            "presets": ["es2015"]
        }
    + Não é recomendável instalar o Babel de forma global pois isso pode atrapalhar em outros projetos.
    + Para facilitar a chamada do Babel no projeto adicionamos um comando script no package.json do projeto. Isso facilita a execução
       + "build": "babel js/app-es6 -d js/app"
    + Para facilitar a depuração de código de solução de bugs em tempo de execução o Babel permite fazer um mapeamento entre codigo compilado e código original;
        + Adicionar --source-maps no comando do babel para que passe a funcionar o mapeamento
        + Mas como ele funciona por baixo dos panos? O arquivo sourcemap possui a estrutura do arquivo original, aliás, 
            **o arquivo original nem precisa existir em produção para que o sourcemap funcione**.
        + Se abrirmos o arquivo aluraframe/client/js/app/controllers/NegociacaoController.js, nosso arquivo transcompilador, no final dele temos o seguinte comentário especial:
            //# sourceMappingURL=NegociacaoController.js.map
            Veja que esse comentário indica para o browser qual sourcemap deve ser carregado.
        + Os arquivos sourcemaps serão baixados e se interferem no tempo de carregamento do site?
            + Não. Sourcemaps são baixados apenas quando você abre o dev tools. Os arquivo só serão baixados se existirem.
            
+ **Como funciona**
    + Quando usamos Babel, estamos adicionando em nosso projeto um **build step**, ou seja, um passo de construção em nossa aplicação.
    + Ela não pode ser consumida diretamente antes de passar por esse processo de construção.
    
+ Instalação do Babel
    + O Babel é um módulo do Node. Então para precisamos incluir alguma forma que comunicação entre o Node e nosso projeto cliente (front)
    + Essa forma de comunicação acontece através de um arquivo chamado package.json.
    + O Package.json é uma caderneta onde anotamos todos os módulos do Node que a nossa app vai utilizar
    + Começamos inicializando o package.json no nosso projeto:
        npm init
    + Instalando o babel-cli. Módulo do babel que permite o uso do babel via console. Facilita para caramba. 
        npm install babel-cli@6.10.1 --save-dev
    + Foi criada a pasta node_modules
    + Instalar o babel-cli não é suficiente, precisaremos instalar o suporte ao ES2015. Para isso, vamos instalar o módulo babel-preset-es2015:
        npm install babel-preset-es2015@6.9.0 --save-dev
    + Agora que temos os dois módulos instalados, precisamos indicar para o Babel que ele deve usar o módulo babel-preset-es2015. 
    + Para isso, vamos criar o arquivo .babelrc dentro de client com a seguinte configuração:
        {
            "presets": ["es2015"]
        }    

+ **Atenção** 
    + O projeto não possui a pasta *node_modules* então precisará baixar as dependências abrindo o Terminal na pasta *client* e executar 
    o comando npm install. 
    + Este comando lerá seu arquivo package.json e baixará todas dependências listadas nele.

### Aula 07 - Trabalhando com módulos do ES2015

+ Sistema de módulos do ES2015 vem para resolver os problemas do escopo global e do carregamento sequencial e em ordem de scripts;
+ A plataforma Node.js resolveu o problema dos import/export adotando padrão CommonJS para criação de módulos
    + Ainda há bibliotecas como RequireJS que usam o padrão AMD (Assincronous Module Definition). 
    + O ES2015 especificou seu próprio sistema de módulos que resolve tanto o escopo global como o carregamento de scripts.
+ No ES2015 todo script é um módulo por padrão;
    + Se tivéssemos ativado o sistema de módulo do ES6, nenhuma definição de classe estaria no escopo global e a aplicação não funcionaria
    
+ **System JS**
    + Vamos definir como estes módulos devem ser carregados no navegador. 
    + Precisamos que os scripts sejam carregados em uma determinada ordem no seu sistema, definindo apenas o primeiro. 
    + A partir do primeiro módulo, serão carregados os demais. 
    + O responsável pelo processo é loader, porém, não existe um padrão nos navegadores. 
    + Vamos usar uma biblioteca de terceiro que atue como um loader de script. 
    + Uma biblioteca muito famosa é System JS (também tem o WebPack)
    
+ Instalação **System JS**
    + Vamos baixá-lo pelo NPM do Node.JS, e iremos colocá-lo na pasta node_modules.
    + Em seguida, vamos parar o Terminal. Dentro da pasta client, instalaremos o System JS.
        npm install systemjs@0.19.31 --save
    + O SystemJS é um script que precisa ser carregado com a aplicação em produção por isso precisa ser --save.
    + Dentro da pasta node_modules encontraremos o systemjs. 
    + Depois, importaremos o script no index.html, o arquivo ficará logo no início.

+ Usando o System JS
    + Para usalo chamamos ele via um script no index.html
    + Nesse script definimos qual será o primeiro módulo a ser carregado: boot.js
    + Esse boot.js carregará o controller que chamará todos os outros módulos;

+ System JS e Babel
    + Como estamos usando como loader o system.js, precisamos avisar ao Babel para que realize a transcompilação usando a sintaxe do mesmo arquivo para auxiliar a importação.
    + O transpiler é importante neste processo porque ele mudará o código dos módulos para adequá-los ao loader. 
    + Para isso instalaremos um plugin do Babel:
        npm install babel-plugin-transform-es2015-modules-systemjs@6.9.0 --save-dev
    + O plugin transforma o código do ES2015 para usar o SystemJS. É fundamental instalá-lo no Babel para que tudo funcione corretamente.
    + Após fazermos a gravação do plugin, vamos configurar para que o Babel utilize o recurso recém instalado, no arquivo .babelrc .
        {
            "presets" : ["es2015"],
            "plugins" : ["transform-es2015-modules-systemjs"]
        }
        
+ Não funcionam os ordenamentos nos cabecalhos da listagem
    + Para isso aplicamos o Singleton e exportamos uma função que retorna a instancia do Controller. 
    + Assim teremos uma única instância do Controller e poderemos atender diferentes pontos do sistema;  
    + Depois, trabalharemos com a **delegação de eventos** para substituir o evento onclick dos cabecalhos.
    + Quando clicarmos na coluna (na tag <th>), o JavaScript possui um sistema de eventos chamado **event bubbling**. 
    + Ao clicarmos, o evento "subirá" até a tag <tr> - que é o pai - e seguirá subindo até o body
    