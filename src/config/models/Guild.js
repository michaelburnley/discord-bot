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
		icon: {
			type: Sequelize.STRING,
		},
		icon_hash: {
			type: Sequelize.STRING,
		},
		splash: {
			type: Sequelize.STRING,
		},
		discovery_splash: {
			type: Sequelize.STRING,
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

