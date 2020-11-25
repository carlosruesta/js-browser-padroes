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

		// cria a data errada por conta do timezone
		let data1 = new Date(this._inputData.value);

		// passando um array para o Date funciona bem
		let data2 = new Date(this._inputData.value.split('-'));

		// passando uma string separada por virgula. Isso seria feito pelo Date ao receber um array (juntaria com join e virgula)
		// usando expressao regular para substituir '-' por virgula
		let data3 = new Date(this._inputData.value.replace(/-/g, ','));

		// Utilizando o spread operator do ES6
		// Gera a data errada com o mes de dezembro
		// O segundo parametro do mês, precisará diminuir o valor em 1 a menos
		let data4 = new Date(...this._inputData.value.split('-'));

		// utilizando o spread operator do ES6, map, e arrow function (=>)
		// Precisamos transformar o segundo parametro para isso faremos uso de programacao funcional (map, arrow function, etc)
		let data5 = new Date(...
			this._inputData.value
				.split('-')
				.map((item, indice) => (indice === 1) ? item - 1 : item)
		);

		console.log(data1);
		console.log(data2);
		console.log(data3);
		console.log(data4);
		console.log(data5);

		let negociacao = new Negociacao(
			data5,
			this._inputQuantidade.value,
			this._inputValor.value
		);

		console.log(negociacao);

	}
s
}