require('dotenv').config();
const { Sequelize } = require('sequelize');
let sequelize;

if(process.env.DATABASE_URL){
	console.log('Conectando ao banco de dados remoto...');
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
		protocol: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
		logging: process.env.NODE_ENV === 'development' ? console.log : false,
	});
} else {
	console.log('Conectando ao banco de dados local...');
	sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			dialect: 'postgres',
			logging: process.env.NODE_ENV === 'development' ? console.log : false,
		}
	);

}

const testConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log('Conexão com o banco de dados estabelecida com sucesso.');
	} catch (error) {
		console.error('Erro ao conectar ao banco de dados:', error);
	}
};

module.exports = { sequelize, testConnection };