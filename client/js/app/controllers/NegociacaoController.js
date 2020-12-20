class NegociacaoController {

	constructor() {

		// Macete para simular o comportamento do jQuery
		let $ = document.querySelector.bind(document); // neste caso o QuerySelector se manterá vinculado ou docuemnt via a função bind

		this._inputQuantidade = $('#quantidade');
		this._inputData = $('#data');
		this._inputValor = $('#valor');

		// this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));

		let self = this;
		this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
			get(target, prop, receiver) {
				if (['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) === typeof(Function)) {

					return function(){
						console.log(`método '${prop}' interceptado`);
						Reflect.apply(target[prop], target, arguments);
						self._negociacoesView.update(target);
					}
				}
				return Reflect.get(target, prop, receiver);
			}
		});

		this._negociacoesView = new NegociacoesView($('#negociacoesView'))
		this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem = new Mensagem();
		this._mensagemView = new MensagemView($('#mensagemView'));
		this._mensagemView.update(this._mensagem);
	}

	adiciona(event) {
		event.preventDefault();

		let negociacao = this._criaNegociacao();
		this._listaNegociacoes.adiciona(negociacao);
		//this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem.texto = "Negociação adicionada com sucesso!";
		this._mensagemView.update(this._mensagem);

		this._limpaFormulario();
		// console.log(this._listaNegociacoes);
	}

	_criaNegociacao() {
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		);
	}

	_limpaFormulario() {
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0
		this._inputData.focus();
	}

	apagaNegociacoes() {
		this._listaNegociacoes.esvazia();
		//this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem.texto = "Negociações apagadas com sucesso!";
		this._mensagemView.update(this._mensagem);
	}
}