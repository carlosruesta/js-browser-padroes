class NegociacaoController {

	constructor() {

		this._ordemAtual = '';

		// Macete para simular o comportamento do jQuery
		let $ = document.querySelector.bind(document); // neste caso o QuerySelector se manterá vinculado ou docuemnt via a função bind

		this._inputQuantidade = $('#quantidade');
		this._inputData = $('#data');
		this._inputValor = $('#valor');

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView($('#negociacoesView')),
			'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView($('#mensagemView')),
			'texto');

		this._service = new NegociacaoService();

		this._init();
	}

	_init() {
		this._service.lista()
			.then(negociacoes =>
				negociacoes.forEach(negociacao =>
					this._listaNegociacoes.adiciona(negociacao)))
			.catch(erro => this._mensagem.texto = erro);

		setInterval(() => {
			this.importaNegociacoes();
		}, 3000);
	}

	adiciona(event) {
		event.preventDefault();

		let negociacao = this._criaNegociacao();

		this._service
			.cadastra(negociacao)
			.then(mensagem => {
				this._listaNegociacoes.adiciona(negociacao);
				this._mensagem.texto = mensagem;
				this._limpaFormulario();
			})
			.catch(erro => this._mensagem.texto = erro);
	}

	importaNegociacoes() {

		/** MULTIPLAS PROMESSAS COM ORDEM DE EXECUÇÃO **/
		this._service
			.importa(this._listaNegociacoes.negociacoes)
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
				this._mensagem.texto = 'Negociações obtidas com sucesso';
			})
			.catch(erro => this._mensagem.texto = erro);

		/** PROMESA UNICA **/
		// let promise = service.obterNegociacoesDaSemana();
		// promise
		// 	.then(negociacoes => {
		// 		negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
		// 		this._mensagem.texto = 'Negociação da semana obtida com sucesso';
		// 	})
		// 	.catch(erro => this.mensagem.texto = erro);

		/** USANDO CALLBACK **/
		// /** Essa chamada precisará passar a callback para o service
		// * A função callback continuará o processamento após a execução do service **/
		// service.obterNegociacoesDaSemana(
		// 	(erro, negociacoes) => {
		// 		if (erro) {
		// 			this._mensagem.texto = erro;
		// 			return;
		// 		}
		//
		// 		negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
		// 		this._mensagem.texto = 'Negociações importadas com sucesso';
		// 	}
		// );
	}

	_criaNegociacao() {
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			parseInt(this._inputQuantidade.value),
			parseFloat(this._inputValor.value)
		);
	}

	_limpaFormulario() {
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0
		this._inputData.focus();
	}

	apagaNegociacoes() {

		this._service
			.apaga()
			.then(mensagem => {
				this._mensagem.texto = mensagem;
				this._listaNegociacoes.esvazia();
			})
			.catch(erro => this._mensagem.texto = erro);
	}

	ordena(coluna) {
		if(this._ordemAtual === coluna) {
			this._listaNegociacoes.inverteOrdem();
		} else {
			this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
		}
		this._ordemAtual = coluna;
	}
}