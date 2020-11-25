class ListaNegociacoes {

	constructor() {
		this._negociacoes = [];
	}

	adiciona(negociacao) {
		this._negociacoes.push(negociacao);
	}

	get negociacoes() {
		// Isso aqui é um macete para evitar que venha um cara e adicione negociacoes
		// direto na classe sendo que esse propriedade é privada
		// Uma forma bem legal de blindar o código do model
		return [].concat(this._negociacoes);
	}
}