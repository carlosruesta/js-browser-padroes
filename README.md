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
    