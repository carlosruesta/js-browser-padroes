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


		ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
			.catch(erro => this._mensagem.texto = erro);

	}

	adiciona(event) {
		event.preventDefault();

		let negociacao = this._criaNegociacao();

		ConnectionFactory
			.getConnection()
			.then(conexao => new NegociacaoDao(conexao))
			.then(dao => dao.adiciona(negociacao))
			.then(() => {
				this._listaNegociacoes.adiciona(negociacao);
				this._mensagem.texto = "Negociação adicionada com sucesso!";
				this._limpaFormulario();
			})
			.catch(erro => this._mensagem.texto = erro);
	}

	importaNegociacoes() {
		let service = new NegociacaoService();

		/** MULTIPLAS PROMESSAS COM ORDEM DE EXECUÇÃO **/
		service.obterNegociacoes()
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

		ConnectionFactory
			.getConnection()
			.then(conexao => new NegociacaoDao(conexao))
			.then(dao => dao.apagaTodos())
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