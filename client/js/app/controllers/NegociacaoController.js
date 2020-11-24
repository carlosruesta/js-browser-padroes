class NegociacaoController {

	constructor() {

		// Macete para simular o comportamento do jQuery
		let $ = document.querySelector.bind(document); // neste caso o QuerySelector se manterá vinculado ou docuemnt via a função bind

		this.inputQuantidade = $('#quantidade');
		this.inputData = $('#data');
		this.inputValor = $('#valor');
	}

	adiciona(event) {
		event.preventDefault();

		console.log(this.inputQuantidade.value);
		console.log(this.inputData.value);
		console.log(this.inputValor.value);
	}
s
}