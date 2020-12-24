class NegociacaoService {

	constructor() {
		this._http = new HttpService();
	}

	obterNegociacoes() {
		return Promise.all([
			this.obterNegociacoesDaSemana(),
			this.obterNegociacoesDaSemanaAnterior(),
			this.obterNegociacoesDaSemanaRetrasada(),
		])
		.then(respostas => {
			return respostas.reduce((respostaPorSemana, negociacoesSemana) => respostaPorSemana.concat(negociacoesSemana), []);
		})
		.catch(
			erro => {
				throw new Error(erro);
			}
		);
	}

	/** UTLIZANDO PROMESSAS MAS SIMPLIFICANDO O CODIGO AO UTILIZAR O HTTPSERVICE QUE CENTRALIZA O AJAX **/

	// obterNegociacoesDaSemana() {
	// 	return new Promise((resolve, reject) => {
	// 		this._http.get('/negociacoes/semana')
	// 			.then(resposta => {
	// 				resolve(this.criaNegociacoes(resposta));
	// 			})
	// 			.catch(erro => {
	// 				console.log(erro);
	// 				reject('Não foi possível obter as negociações da semana');
	// 			});
	// 	});
	// }

	/** CODIGO QUE NÃO RECRIA PROMESA E REENVIA A PROMESSA VINDA DO HTTPSERVICE **/
	obterNegociacoesDaSemana() {
		return this._http.get('/negociacoes/semana')
				.then(resposta => {
					return this.criaNegociacoes(resposta);
				})
				.catch(erro => {
					console.log(erro);
					throw new Error('Não foi possível obter as negociações da semana');
				});
	}

	obterNegociacoesDaSemanaAnterior() {
		return new Promise((resolve, reject) => {
			this._http.get('/negociacoes/anterior')
				.then(resposta => {
					resolve(this.criaNegociacoes(resposta));
				})
				.catch(erro => {
					console.log(erro);
					reject('Não foi possível obter as negociações da semana anterior');
				});
		});
	}

	obterNegociacoesDaSemanaRetrasada() {
		return new Promise((resolve, reject) => {
			this._http.get('/negociacoes/retrasada')
				.then(resposta => {
					resolve(this.criaNegociacoes(resposta));
				})
				.catch(erro => {
					console.log(erro);
					reject('Não foi possível obter as negociações da semana retrasada');
				});
		});
	}

	criaNegociacoes(resposta) {
		return resposta.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
	}

	/** IMPLEMENTANDO AS PROMESAS SEM CUIDAR DA DUPLICACAO DE CODIGO **/

	/**
	 * No método obterNegociacoesDaSemana() temos que ter acesso ao retorno,
	 * porque será na controller que levantaremos os dados com os quais atualizaremos
	 * o model e a View ser renderizada.
	 * Para isto, o método receberá a função chamada cb (callback).
	 */
	// obterNegociacoesDaSemana() {
	//
	// 	return new Promise((resolve, reject) => {
	// 		let xhr = new XMLHttpRequest();
	//
	// 		xhr.open('GET', '/negociacoes/semana');
	//
	// 		/** Aqui estou definindo o que acontece ao mudar de status o XHR
	// 		 * É um tratador do evento onreadystatechange **/
	// 		xhr.onreadystatechange = () => {
	//
	// 			/** Aqui somente estamos validando o status da requisição Ajax **/
	// 			if (xhr.readyState === XMLHttpRequest.DONE) {
	//
	// 				/** Aqui estamos validando o status da resposta
	// 				 * Para garantir que a resposta foi com sucesso preciso verificar o status da resposta.
	// 				 * Isso é o que o servidor me disse ao processar a requisição **/
	//
	// 				if (xhr.status === 200) {
	// 					resolve(JSON.parse(xhr.responseText)
	// 							.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
	// 				} else {
	// 					reject('Não foi possível obter as negociações da semana');
	// 					console.log(xhr.responseText);
	// 				}
	// 			}
	// 		};
	// 		xhr.send();
	// 	});
	// }
	//
	// obterNegociacoesDaSemanaAnterior() {
	//
	// 	return new Promise((resolve, reject) => {
	// 		let xhr = new XMLHttpRequest();
	//
	// 		xhr.open('GET', '/negociacoes/anterior');
	//
	// 		/** Aqui estou definindo o que acontece ao mudar de status o XHR
	// 		 * É um tratador do evento onreadystatechange **/
	// 		xhr.onreadystatechange = () => {
	//
	// 			/** Aqui somente estamos validando o status da requisição Ajax **/
	// 			if (xhr.readyState === XMLHttpRequest.DONE) {
	//
	// 				/** Aqui estamos validando o status da resposta
	// 				 * Para garantir que a resposta foi com sucesso preciso verificar o status da resposta.
	// 				 * Isso é o que o servidor me disse ao processar a requisição **/
	//
	// 				if (xhr.status === 200) {
	// 					resolve(JSON.parse(xhr.responseText)
	// 						.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
	// 				} else {
	// 					reject('Não foi possível obter as negociações da semana anterior');
	// 					console.log(xhr.responseText);
	// 				}
	// 			}
	// 		};
	// 		xhr.send();
	// 	});
	// }
	//
	// obterNegociacoesDaSemanaRetrasada() {
	//
	// 	return new Promise((resolve, reject) => {
	// 		let xhr = new XMLHttpRequest();
	//
	// 		xhr.open('GET', '/negociacoes/retrasada');
	//
	// 		/** Aqui estou definindo o que acontece ao mudar de status o XHR
	// 		 * É um tratador do evento onreadystatechange **/
	// 		xhr.onreadystatechange = () => {
	//
	// 			/** Aqui somente estamos validando o status da requisição Ajax **/
	// 			if (xhr.readyState === XMLHttpRequest.DONE) {
	//
	// 				/** Aqui estamos validando o status da resposta
	// 				 * Para garantir que a resposta foi com sucesso preciso verificar o status da resposta.
	// 				 * Isso é o que o servidor me disse ao processar a requisição **/
	//
	// 				if (xhr.status === 200) {
	// 					resolve(JSON.parse(xhr.responseText)
	// 						.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
	// 				} else {
	// 					reject('Não foi possível obter as negociações da semana retrasada');
	// 					console.log(xhr.responseText);
	// 				}
	// 			}
	// 		};
	// 		xhr.send();
	// 	});
	// }

	// /** USANDO CALLBACK
	//  * No método obterNegociacoesDaSemana() temos que ter acesso ao retorno,
	//  * porque será na controller que levantaremos os dados com os quais atualizaremos
	//  * o model e a View ser renderizada.
	//  * Para isto, o método receberá a função chamada cb (callback).
	//  */
	// obterNegociacoesDaSemana(callback) {
	//
	// 	return new Promise((resolve, reject) => {
	// 		let xhr = new XMLHttpRequest();
	//
	// 		xhr.open('GET', '/negociacoes/semana');
	//
	// 		/** Aqui estou definindo o que acontece ao mudar de status o XHR
	// 		 * É um tratador do evento onreadystatechange **/
	// 		xhr.onreadystatechange = () => {
	//
	// 			/** Aqui somente estamos validando o status da requisição Ajax **/
	// 			if (xhr.readyState === XMLHttpRequest.DONE) {
	//
	// 				/** Aqui estamos validando o status da resposta
	// 				 * Para garantir que a resposta foi com sucesso preciso verificar o status da resposta.
	// 				 * Isso é o que o servidor me disse ao processar a requisição **/
	//
	// 				if (xhr.status === 200) {
	// 					callback(null,
	// 						JSON.parse(xhr.responseText)
	// 							.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
	// 				} else {
	// 					callback('Não foi possível obter as negociações.', null);
	// 					console.log(xhr.responseText);
	// 				}
	// 			}
	// 		};
	// 		xhr.send();
	// 	});
	// }
}