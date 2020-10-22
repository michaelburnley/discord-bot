export default {
	attributes: {
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: Sequelize.STRING,
		},
		discriminator: {
			type: Sequelize.STRING,
		},
		avatar: {
			type: Sequelize.TEXT,
		},
		bot: {
			type: Sequelize.BOOLEAN,
		},
		system: {
			type: Sequelize.BOOLEAN,
		},
		mfa_enabled: {
			type: Sequelize.BOOLEAN,
		},
		locale: {
			type: Sequelize.STRING,
		},
		verified: {
			type: Sequelize.BOOLEAN,
		},
		email: {
			type: Sequelize.STRING,
		},
		flags: {
			type: Sequelize.INTEGER,
		},
		premium_type: {
			type: Sequelize.INTEGER,
		},
		public_flags: {
			type: Sequelize.INTEGER,
		},
	},
	associations: () => {
		User.hasMany(Role, { as: `roles` });
	},
	options: {
		tableName: `users`,
		createdAt: `created_at`,
		updatedAt: `updated_at`,
		underscored: true,
		classMethods: {},
		instanceMethods: {},
		hooks: {},
	},
};

