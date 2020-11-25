class NegociacaoController {

	constructor() {

		// Macete para simular o comportamento do jQuery
		let $ = document.querySelector.bind(document); // neste caso o QuerySelector se manterá vinculado ou docuemnt via a função bind

		this._inputQuantidade = $('#quantidade');
		this._inputData = $('#data');
		this._inputValor = $('#valor');
	}

	adiciona(event) {
		event.preventDefault();

		let negociacao = new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		);

		console.log(negociacao);
		console.log(DateHelper.dataParaTexto(negociacao.data));

	}
}