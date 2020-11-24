class Negociacao {

	constructor(data, quantidade, valor) {
		// _data será Imutável
		// fazendo uso de uma programação defensiva.
		this._data = new Date(data.getTime()); //

		// Por convenção, adotamos que os atributos privados devem usar o prefixo _ (underline),
		// indicando para o desenvolvedor que ele só pode acessá-lo.
		this._quantidade = quantidade;
		this._valor = valor;

		Object.freeze(this);
		// Como Object.freeze() é shallow (raso), ele será aplicado nas propriedades do objeto,
		// mas as propriedades que são objetos não serão todas congeladas.
		// A ação ficará apenas na superfície. Para resolver esta questão, falamos um pouco sobre programação defensiva.
	}

	// Vimos como adicionar métodos nas classes, e estes, sim, podem acessar os atributos privados.

	// Temos um método que conseguimos acessar como uma propriedade, bastando ser antecedido pela palavra especial get,
	// desta forma, estaríamos gerando um getter.
	get volume() {
		return this._quantidade * this._valor;
	}

	get data() {
		return this._data;
	}

	get quantidade() {
		return this._quantidade;
	}

	get valor() {
		return this._valor;
	}

}