class ListaNegociacoes {

	constructor(armadilha) {
		// this._contexto = contexto;
		this._armadilha = armadilha;
		this._negociacoes = [];
	}

	adiciona(negociacao) {
		this._negociacoes.push(negociacao);
		this._armadilha(this);
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
		this._armadilha(this);
		// Reflect.apply(this._armadilha, this._contexto, [this]);
	}
}