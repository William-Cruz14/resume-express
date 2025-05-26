const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const Resume = sequelize.define('Resume', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING(255),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'O nome não pode estar vazio.',
			},
			len: {
				args: [3, 255],
				msg: 'O nome deve ter entre 3 e 255 caracteres.',
			}
		}
	},
	email: {
		type: DataTypes.STRING(255),
		allowNull: false,
		unique: {
			msg: 'O e-mail já está em uso.',
		},
		validate: {
			isEmail: {
				msg: 'O e-mail deve ser um endereço de e-mail válido.',
			},
			notEmpty: {
				msg: 'O e-mail não pode estar vazio.',
			},
		}
	},

	phone: {
		type: DataTypes.STRING(20),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'O telefone não pode estar vazio.',
			},
			isNumeric: {
				msg: 'O telefone deve conter apenas números.',
			},
			len: {
				args: [10, 20],
				msg: 'O telefone deve ter entre 10 e 20 caracteres.',
			}
		}
	},

	linkedin: {
		type: DataTypes.STRING,
		allowNull: true,
		validate: {
			isUrl: {
				msg: 'O LinkedIn deve ser uma URL válida.',
			},
			len: {
				args: [0, 255],
				msg: 'O LinkedIn deve ter no máximo 255 caracteres.',
			}
		}
	},

	github: {
		type: DataTypes.STRING,
		allowNull: true,
		validate: {
			isUrl: {
				msg: 'O GitHub deve ser uma URL válida.',
			},
			len: {
				args: [0, 255],
				msg: 'O GitHub deve ter no máximo 255 caracteres.',
			}
		}
	},
	summary: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'A descrição não pode estar vazia.',
			},
			len: {
				args: [10, 1000],
				msg: 'A descrição deve ter entre 10 e 1000 caracteres.',
			}
		}
	},
	experience: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

	education: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	skills: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: true,
		defaultValue: [],
	}
}, {
	tableName: 'resumes',
	timestamps: true,
});

module.exports = Resume;