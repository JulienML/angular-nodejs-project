import express, { Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import { Sequelize, DataTypes } from 'sequelize';
import cors from 'cors';

// PostgreSQL database setup
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'SchoolDb',
})

// Model definition
const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

const Mark = sequelize.define('Mark', {
  id_student: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_subject: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mark: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  coefficient: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
})

// Synchronizing the database
sequelize.sync();

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the PostgreSQL database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the PostgreSQL database:', error);
  }
};

initializeDatabase();

const app = express();

app.use(express.json());
app.use(cors());

const jsDocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js with TypeScript API',
      version: '1.0.0',
    },
  },
  apis: ['app.ts'],
};

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(jsDocOptions)));

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
