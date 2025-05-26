const { Resume } = require('../models');

const createResume = async (req, res) => {
	try {
		const newResume = await Resume.create(req.body);
		res.status(201).json(newResume);
	} catch (error) {
		console.error('Erro ao criar currículo:', error);

		if (error.name === 'SequelizeValidationError') {
			const erros = error.errors.map(err => (
				{ field: err.path, message: err.message }
			));
			return res.status(400).json({message: 'Erro de validação', errors: erros });
		}

		res.status(500).json({message: 'Erro interno do servidor', error: error.message });
	}
};

const getAllResumes = async (req, res) => {
	try {
		const resumes = await Resume.findAll();
		res.status(200).json(resumes);
	} catch (error) {
		console.error('Erro ao buscar currículos:', error);
		res.status(500).json({message: 'Erro interno do servidor', error: error.message });
	}
}

const getResumeById = async (req, res) => {
	try {
		const { id } = req.params;
		const resume = await Resume.findByPk(id);
		if (!resume) {
			return res.status(404).json({message: 'Currículo não encontrado'});
		}
		res.status(200).json(resume);
	} catch (error) {
		console.error('Erro ao buscar currículo:', error);
		res.status(500).json({message: 'Erro interno do servidor', error: error.message });
	}
};

const updateResume = async (req, res) => {
	try {
		const { id } = req.params;
		const dataToUpdate = req.body;

		const resume = await Resume.findByPk(id);

		if (!resume) {
			return res.status(404).json({message: 'Currículo não encontrado'});
		}
		await resume.update(dataToUpdate);
		res.status(200).json(resume);
	} catch (error) {
		console.error('Erro ao atualizar currículo:', error);
		if (error.name === 'SequelizeValidationError') {
			const errors = error.errors.map(err => ({ field: err.path, message: err.message }));
			return res.status(400).json({ message: "Erro de validação ao atualizar.", errors });
		}
		res.status(500).json({ message: "Ocorreu um erro interno ao tentar atualizar o currículo." });
	}
};

const deleteResume = async (req, res) => {
	try {
		const { id } = req.params;
		const resume = await Resume.findByPk(id);
		if (!resume) {
			return res.status(404).json({message: 'Currículo não encontrado'});
		}
		await resume.destroy();
		res.status(204).send();
	} catch (error) {
		console.error('Erro ao deletar currículo:', error);
		res.status(500).json({message: 'Erro interno do servidor', error: error.message });
	}
};

module.exports = {
	createResume,
	getAllResumes,
	getResumeById,
	updateResume,
	deleteResume,

}