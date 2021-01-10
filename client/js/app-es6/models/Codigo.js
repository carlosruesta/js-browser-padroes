class Codigo {

	static ehValido(codigo) {

		// validaCodigo('GWZ-JJ-12'); // válido
		// validaCodigo('1X1-JJ-12'); // inválido

		// cria a expressão regular. Poderíamos ter usado
		// a sintaxe new RegExp(/\D{3}-\D{2}-\d{2}/)
		// \D é qualquer coisa não dígito
		// \D{3} é qualquer coisa não dígito que forme um grupo de 3 caracteres
		// \d é qualquer dígito.
		const expressao = /\D{3}-\D{2}-\d{2}/;

		// toda expressão regular possui o método test
		// que recebe o alvo do teste, retornando true
		// se passou, e false se falhou
		if (!expressao.test(codigo)) {
			throw new Error('Código válido!');
		}

		return true;
	}

}

class CodigoFlavio {

	constructor(texto) {

		if(!this._valida(texto)) throw new Error(`O texto ${texto} não é um código válido`);
		this._texto = texto;
	}

	_valida(texto) {

		return /\D{3}-\D{2}-\d{2}/.test(texto);
	}

	get texto() {

		return this._texto;
	}
}