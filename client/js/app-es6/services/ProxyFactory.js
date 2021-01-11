export class ProxyFactory {
	static create(objeto, props, acao) {
		return new Proxy(objeto, {
			// Precisa do get para tratamento de métodos conforme abaixo;
			// Isso funciona assim porque toda vez que chama um método primeiro executa um getter do método
			get(target, prop, receiver) {
				if (props.includes(prop) && ProxyFactory._ehFuncao(target, prop)) {
					return function(){
						console.log(`método '${prop}' interceptado`);
						let retorno = Reflect.apply(target[prop], target, arguments);
						acao(target);
						return retorno;
					}
				}
				return Reflect.get(target, prop, receiver);
			},
			// Precisa do set para tratamento de propriedades que é o caso da mensagem
			set(target, prop, value, receiver) {
				let retorno = Reflect.set(target, prop, value, receiver);
				if (props.includes(prop)) {
					console.log(`propriedade '${prop}' interceptada`);
					acao(target);
				}
				return retorno;
			}
		});
	}

	static _ehFuncao(target, prop) {
		return typeof (target[prop]) === typeof (Function);
	}
}


