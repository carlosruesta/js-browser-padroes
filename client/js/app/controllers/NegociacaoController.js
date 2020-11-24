class NegociacaoController {

	adiciona(event) {
		event.preventDefault();

		// Macete para simular o comportamento do jQuery
		let $ = document.querySelector.bind(document); // neste caso o QuerySelector se manterá vinculado ou docuemnt via a função bind

		let inputQuantidade = $('#quantidade');
		let inputData = $('#data');
		let inputValor = $('#valor');

		console.log(inputQuantidade.value);
		console.log(inputData.value);
		console.log(inputValor.value);
	}

}