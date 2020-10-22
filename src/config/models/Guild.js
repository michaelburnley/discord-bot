export default {
	attributes: {
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING(255),
		},
		icon: {
			type: Sequelize.STRING(255),
		},
		icon_hash: {
			type: Sequelize.STRING(255),
		},
		splash: {
			type: Sequelize.STRING(255),
		},
		discovery_splash: {
			type: Sequelize.STRING(255),
		},
		owner_id: {
			type: Sequelize.BIGINT,
		},
	},
	associations: () => {
		Guild.hasMany(User);
		Guild.hasMany(Role);
		Guild.hasMany(Channel);
	},
	options: {
		tableName: `guilds`,
		createdAt: `created_at`,
		updatedAt: `updated_at`,
		underscored: true,
		classMethods: {},
		instanceMethods: {},
		hooks: {},
	},
};

