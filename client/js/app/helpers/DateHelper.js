class DateHelper {

	constructor() {
		throw new Error('DateHelper não pode ser instanciado');
	}

	static dataParaTexto(data) {
		return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`;
	}

	static textoParaData(texto) {

		// Implementando Fail Fast
		// Validando que o texto deve entrar no formato correto yyyy-mm-dd
		if (!/\d{4}-\d{2}-\d{2}/.test(texto)) {
			throw new Error(`${texto} deveria estar no formato AAAA-MM-DD`);
		}

		// cria a data errada por conta do timezone
		let data1 = new Date(texto);

		// passando um array para o Date funciona bem
		let data2 = new Date(texto.split('-'));

		// passando uma string separada por virgula. Isso seria feito pelo Date ao receber um array (juntaria com join e virgula)
		// usando expressao regular para substituir '-' por virgula
		let data3 = new Date(texto.replace(/-/g, ','));

		// Utilizando o spread operator do ES6
		// Gera a data errada com o mes de dezembro
		// O segundo parametro do mês, precisará diminuir o valor em 1 a menos
		let data4 = new Date(...texto.split('-'));

		// utilizando o spread operator do ES6, map, e arrow function (=>)
		// Precisamos transformar o segundo parametro para isso faremos uso de programacao funcional (map, arrow function, etc)
		let data5 = new Date(...
			texto
				.split('-')
				.map((item, indice) => (indice === 1) ? item - 1 : item)
		);

		console.log(data1);
		console.log(data2);
		console.log(data3);
		console.log(data4);
		console.log(data5);

		return new Date(...texto.split('-').map((item,indice) => item - indice % 2));

	}
}