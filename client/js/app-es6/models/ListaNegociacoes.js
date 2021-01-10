class ListaNegociacoes {

	constructor() {
		// this._contexto = contexto;
		// this._armadilha = armadilha;
		this._negociacoes = [];
	}

	adiciona(negociacao) {
		this._negociacoes.push(negociacao);

		// essa aqui seria uma gambiarra para fazer uma atribuicao na this._negociacoes
		// mas seria um codigo que traria complicacoes de performance, alem de ser bem feio
		// this._negociacoes = [].concat(this._negociacoes, negociacao);

		// this._armadilha(this);
		// Reflect.apply(this._armadilha, this._contexto, [this]);
	}

	get negociacoes() {
		// Isso aqui é um macete para evitar que venha um cara e adicione negociacoes
		// direto na classe sendo que esse propriedade é privada
		// Uma forma bem legal de blindar o código do model
		return [].concat(this._negociacoes);
	}

	esvazia() {
		this._negociacoes = [];
		// this._armadilha(this);
		// Reflect.apply(this._armadilha, this._contexto, [this]);
	}

	get volumeTotal() {
		return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
	}

	ordena(criterio) {
		this._negociacoes.sort(criterio);
	}

	inverteOrdem(criterio) {
		this._negociacoes.reverse();
	}

}