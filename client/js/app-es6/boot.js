import {currentInstance} from './controllers/NegociacaoController';

let negociacaoController = currentInstance();

/* Ao tirar o Negociacao Controller do escopo global, precisaremos fazer o bind por aqui
*   Muito cuidado com o bind... precisamos passar a referencia correta para o NegociacaoController */

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apagaNegociacoes.bind(negociacaoController);