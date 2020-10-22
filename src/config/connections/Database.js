/* eslint-disable no-process-env */
export default {
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,

	/**
	 * Valid adapter/ORM options are:
	 * `Sequelize` - For use with Google Cloud SQL
	 * More adapters and database types to come later
	 */
	adapter: `Sequelize`,

	/**
	 * Valid dialect options when using the Sequelize adapter:
	 * `mysql` - default if not specified
	 * `mariadb`
	 * `postgres`
	 * `mssql`
	 */
	dialect: process.env.DB_DIALECT,

	/**
	 * Valid syncing options are:
	 * false - Do not sync at all. Database tables must be built manually.
	 * `safe` - Creates new tables only if they don't exist. WILL NOT AFFECT EXISTING DATA OR TABLES.
	 * `alter` - Updates existing tables if schema changes. CAN DESTROY EXISTING DATA! (dev only)
	 * `force` - Will drop all tables and recreate them. DESTROYS ALL DATA! (dev only)
	 *
	 * NOTE: if NODE_ENV=production, `alter` or `force` will automatically be replaced with `safe`
	 */
	sync: `safe`,

	/**
	 * If you don't specify a connection in one of your models, the default will be used.
	 * Set this option to true if you want it to be the default connection.
	 */
	default: true,
};
