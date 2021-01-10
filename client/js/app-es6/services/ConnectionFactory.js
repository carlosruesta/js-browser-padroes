var ConnectionFactory =  (() => {
	const stores = ['negociacoes'];
	const version = 4;
	const dbname = 'aluraframe';
	var connection = null;
	var close = null;

	return class ConnectionFactory {
		constructor() {
			throw new Error("ConnectionFactory não pode ser instanciada!");
		}

		static getConnection() {
			return new Promise((resolve, reject) => {

				let openRequest = window.indexedDB.open(dbname, version);

				// Precisaremos lidar com um tríade de eventos disparados quando tentarmos acessar um banco no IndexedDB.
				openRequest.onupgradeneeded = evento => {
					console.log('Cria ou altera um banco já existente');
					ConnectionFactory._createStore(evento.target.result);
				};

				openRequest.onsuccess = evento => {
					console.log('Conexão obtida com sucesso');
					if (!connection) connection = evento.target.result;
					close = connection.close.bind(connection);
					connection.close = function () {
						throw new Error("Você não pode fechar diretamente a conexão");
					}
					// reject("Erro na conexão");
					resolve(connection);
				};

				openRequest.onerror = evento => {
					console.log(evento.target.error);
					reject(evento.target.error.name);
				};
			});
		}

		static _createStore(connection) {
			stores.forEach(store => {
				if (connection.objectStoreNames.contains(store)) {
					connection.deleteObjectStore(store);
				}
				connection.createObjectStore(store, {autoIncrement: true});
			});
		}

		static closeConnection() {
			close();

			// outra forma para não usar o bind
			// Reflect.apply(close, connection, [])

			connection = null;
		}
	}
})();