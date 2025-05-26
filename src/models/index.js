const { sequelize } = require('../config/database');
const SequelizeLib = require('sequelize');
const Resume = require('./resume.model');

const db = {
	sequelize,
	Sequelize: SequelizeLib,
	Resume,
};

const syncDatabase = async (options = {}) => {
	try {
		await sequelize.sync(options);
		console.log('Modelos sincronizados com o banco de dados com sucesso! 🔄');
	} catch (error) {
		console.error('Erro ao sincronizar modelos com o banco de dados 🙁:', error);
		throw error;
	}
};

module.exports = {
	...db,
	syncDatabase,
};