export class View {

	constructor(elemento) {
		this._elemento = elemento;
	}

	template(model) {
		throw new Error("Esse método precisa ser implementado!");
	}

	update(model) {
		this._elemento.innerHTML = this.template(model);
	}
}