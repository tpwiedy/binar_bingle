import { Sequelize } from 'sequelize';
import { logger } from './logging.js';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: (msg) => logger.info(msg),
});

sequelize
  .authenticate()
  .then(() => {
    logger.info(
      'Connection to the database has been established successfully.'
    );
  })
  .catch((error) => {
    logger.error('Unable to connect to the database:', error);
  });

export default sequelize;
