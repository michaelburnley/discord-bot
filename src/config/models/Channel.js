export default {
	attributes: {
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		type: {
			type: Sequelize.STRING(255),
		},
		guild_id: {
			type: Sequelize.INTEGER,
		},
		position: {
			type: Sequelize.INTEGER,
		},
		name: {
			type: Sequelize.STRING(255),
		},
		topic: {
			type: Sequelize.STRING(255),
		},
		nsfw: {
			type: Sequelize.BOOLEAN,
		},
		bitrate: {
			type: Sequelize.INTEGER,
		},
		user_limit: {
			type: Sequelize.INTEGER,
		},
		rate_limit_per_user: {
			type: Sequelize.INTEGER,
		},
		icon: {
			type: Sequelize.STRING(255),
		},
		owner_id: {
			type: Sequelize.BIGINT,
		},
		application_id: {
			type: Sequelize.BIGINT,
		},
		parent_id: {
			type: Sequelize.BIGINT,
		},
	},
	associations: () => {
		Channel.belongsTo(Guild, { as: `channels` });
	},
	options: {
		tableName: `channels`,
		createdAt: `created_at`,
		updatedAt: `updated_at`,
		underscored: true,
		classMethods: {},
		instanceMethods: {},
		hooks: {},
	},
};

