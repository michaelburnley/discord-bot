export default {
	attributes: {
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
		},
		color: {
			type: Sequelize.INTEGER,
		},
		hoist: {
			type: Sequelize.BOOLEAN,
		},
		position: {
			type: Sequelize.INTEGER,
		},
		permissions: {
			type: Sequelize.STRING,
		},
		managed: {
			type: Sequelize.BOOLEAN,
		},
		mentionable: {
			type: Sequelize.BOOLEAN,
		},
	},
	associations: () => {
		Role.belongsTo(Guild);
	},
	options: {
		tableName: `roles`,
		createdAt: `created_at`,
		updatedAt: `updated_at`,
		underscored: true,
		classMethods: {},
		instanceMethods: {},
		hooks: {},
	},
};

