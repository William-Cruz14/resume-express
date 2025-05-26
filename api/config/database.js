require('dotenv').config();
const { Sequelize } = require('sequelize');
let sequelize;


if (process.env.DATABASE_URL) {
	console.log('Conectando ao banco de dados remoto...');
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
		logging: false, // Desative logs em produção
	});
} else {

	console.warn('DATABASE_URL não encontrada. Tentando conexão local...');

	const requiredVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT'];
	const missingVars = requiredVars.filter(varName => !process.env[varName]);

	if (missingVars.length) {
		throw new Error(`Variáveis de ambiente necessárias não configuradas: ${missingVars.join(', ')}`);
	}

	sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			dialect: 'postgres',
			logging: process.env.NODE_ENV === 'development',
		}
	);
}

const testConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log('Conexão com o banco de dados estabelecida com sucesso.');
		return true;
	} catch (error) {
		console.error('Erro ao conectar ao banco de dados:', error);
		return false;
	}
};

module.exports = { sequelize, testConnection };