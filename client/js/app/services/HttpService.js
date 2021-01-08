class HttpService {

	_handleErrors(res) {
		if (!res.ok) throw new Error(res.statusText);
		return res;
	}

	get(url) {
		return fetch(url)
			.then(res => this._handleErrors(res))
			.then(res => res.json());
	}

	post(url, dado) {
		let init = {
			headers: { 'Content-Type': 'application/json' },
			method: 'post',
			body: JSON.stringify(dado)
		};

		return fetch(url, init)
			.then(res => this._handleErrors(res));
	}

	getWithAjax (url) {

		return new Promise((resolve, reject) => {

			let xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			/** Aqui estou definindo o que acontece ao mudar de status o XHR
			 * É um tratador do evento onreadystatechange **/
			xhr.onreadystatechange = () => {

				/** Aqui somente estamos validando o status da requisição Ajax **/
				if (xhr.readyState === XMLHttpRequest.DONE) {

					/** Aqui estamos validando o status da resposta
					 * Para garantir que a resposta foi com sucesso preciso verificar o status da resposta.
					 * Isso é o que o servidor me disse ao processar a requisição **/
					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject(xhr.responseText);
					}
				}
			};
			xhr.send();
		});
	}

	postWithAjax (url, dado) {

		return new Promise((resolve, reject) => {

			let xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject(xhr.responseText);
					}
				}
			};
			xhr.send(JSON.stringify(dado));
		});

	}
}