import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.PG_DATABASE || 'ArgueArena',
    process.env.PG_USER     || 'postgres',
    process.env.PG_PASSWORD || '1234',
    {
        host:    process.env.PG_HOST || 'localhost',
        port:    process.env.PG_PORT || 5432,
        dialect: 'postgres',
        logging: false,
        logging: console.log,
    }
);

export default sequelize;   