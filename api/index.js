require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
const { syncDatabase } = require('./models');
const resumeRoutes = require('./routes/resumes.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.get('/api', (req, res) => {
	res.send('API de Currículos - Backend');
});

app.use('/api/resumes', resumeRoutes);

app.set('view engine', 'pug');

(async () => {
	try {
		await testConnection();
		await  syncDatabase({ alter: true });
	} catch (error) {
		console.error('Erro ao iniciar o servidor:', error);
	}
})();

module.exports = app;