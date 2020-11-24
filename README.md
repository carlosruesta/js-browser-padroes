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


