require('dotenv').config();
const express = require('express');
const { testConnection } = require('./config/database');
const { syncDatabase } = require('./models');
const resumeRoutes = require('./routes/resumes.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api', (req, res) => {
	res.send('API de Currículos - Backend');
});

app.use('/api/resumes', resumeRoutes);

app.set('view engine', 'pug');

const startServer = async () => {
	try {
		await testConnection();
		await  syncDatabase({ alter: true });
		app.listen(port, () => {
			console.log(`Servidor rodando na porta ${port}`);
		});
	} catch (error) {
		console.error('Erro ao iniciar o servidor:', error);
	}
};

startServer();

module.exports = app;