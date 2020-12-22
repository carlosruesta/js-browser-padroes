class NegociacaoService {

	/**
	 * No método obterNegociacoesDaSemana() temos que ter acesso ao retorno,
	 * porque será na controller que levantaremos os dados com os quais atualizaremos
	 * o model e a View ser renderizada.
	 * Para isto, o método receberá a função chamada cb (callback).
	 */
	obterNegociacoesDaSemana(callback) {

		let xhr = new XMLHttpRequest();

		xhr.open('GET', '/negociacoes/semana');

		/** Aqui estou definindo o que acontece ao mudar de status o XHR
		 * É um tratador do evento onreadystatechange **/
		xhr.onreadystatechange = () => {

			/** Aqui somente estamos validando o status da requisição Ajax **/
			if (xhr.readyState === XMLHttpRequest.DONE) {

				/** Aqui estamos validando o status da resposta
				 * Para garantir que a resposta foi com sucesso preciso verificar o status da resposta.
				 * Isso é o que o servidor me disse ao processar a requisição **/

				if (xhr.status === 200) {
					callback(null,
						JSON.parse(xhr.responseText)
							.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
				} else {
					callback('Não foi possível obter as negociações.', null);
					console.log(xhr.responseText);
				}
			}
		};
		xhr.send();
	}
}