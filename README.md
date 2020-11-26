# js-browser-padroes

### Aula 02

+ Para criarmos uma classe, usamos a palavra reservada class seguida do nome da classe. Por convenção, nomes de classe começam em letra maiúscula. Curiosamente essa convenção se chama pascal case.
+ Para definirmos atributos de instância de uma classe, precisamos adicionar em sua definição um constructor. É através do construtor que adicionamos na variável implícita this as propriedades que desejamos que toda instância da classe tenha.
+ Por convenção, adotamos que os atributos privados devem usar o prefixo _ (underline), indicando para o desenvolvedor que ele só pode acessá-lo. Vimos como adicionar métodos nas classes, e estes, sim, podem acessar os atributos privados.
+ Temos um método que conseguimos acessar como uma propriedade, bastando ser antecedido pela palavra especial get, desta forma, estaríamos gerando um getter. Quem acessa a sua classe acredita que se trata de uma propriedade, mas na verdade, trata-se por "debaixo dos panos" de um método.
+ Usamos o Object.freeze() para congelar um objeto depois de criado. Como Object.freeze() é shallow (raso), ele será aplicado nas propriedades do objeto, mas as propriedades que são objetos não serão todas congeladas.
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