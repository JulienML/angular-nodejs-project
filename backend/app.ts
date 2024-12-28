
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
  password: 'mathieu',
  database: 'SchoolDb',
  logging: false,
})


// Définition des modèles
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
});

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

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
    defaultValue: 1,
  },
});

//Data seed
(async () => {
  try {
    await sequelize
      .sync({force:true})
      .then(() => {
        console.log('Database synced successfully !')
      })
      .catch((error) => {
        console.error('Error syncing database:', error);
      }); //synchronization of the models


    //faire une suppression marks puis les deux autres tables si on utilise la
    // Insertion of the students
    await Student.bulkCreate([
      { name: 'Ali' },
      { name: 'Adrien' },
      { name: 'Julien' },
      { name: 'Mathieu' },
      { name: 'Thomas' },
    ]);

    // Insertion of the subjects
    await Subject.bulkCreate([
      { name: 'Mathematics' },
      { name: 'Physics' },
      { name: 'Informatic' },
    ]);

    // Insertion of the marks
    await Mark.bulkCreate([
      // Mathematics
        //first test : coefficient 2
        //Example : Ali had a mark of 15/20 for his first mathematics test (coefficient 2)
      { id_student: 1, id_subject: 1, mark: 15, coefficient: 2 },
      { id_student: 2, id_subject: 1, mark: 12, coefficient: 2 },
      { id_student: 3, id_subject: 1, mark: 14, coefficient: 2 },
      { id_student: 4, id_subject: 1, mark: 16, coefficient: 2 },
      { id_student: 5, id_subject: 1, mark: 18, coefficient: 2 },
        //second test, coefficient 1
      { id_student: 1, id_subject: 1, mark: 13, coefficient: 1 },
      { id_student: 2, id_subject: 1, mark: 10, coefficient: 1 },
      { id_student: 3, id_subject: 1, mark: 13, coefficient: 1 },
      { id_student: 4, id_subject: 1, mark: 17, coefficient: 1 },
      { id_student: 5, id_subject: 1, mark: 17, coefficient: 1 },
        //third test, coefficient 3
      { id_student: 1, id_subject: 1, mark: 16, coefficient: 3 },
      { id_student: 2, id_subject: 1, mark: 14, coefficient: 3 },
      { id_student: 3, id_subject: 1, mark: 12, coefficient: 3 },
      { id_student: 4, id_subject: 1, mark: 18, coefficient: 3 },
      { id_student: 5, id_subject: 1, mark: 16, coefficient: 3 },

      // Physics
        //first test, coefficient 1
      { id_student: 1, id_subject: 2, mark: 10, coefficient: 1 },
      { id_student: 2, id_subject: 2, mark: 13, coefficient: 1 },
      { id_student: 3, id_subject: 2, mark: 16, coefficient: 1 },
      { id_student: 4, id_subject: 2, mark: 13, coefficient: 1 },
      { id_student: 5, id_subject: 2, mark: 17, coefficient: 1 },
        //second test, coefficient 2
      { id_student: 1, id_subject: 2, mark: 12, coefficient: 2 },
      { id_student: 2, id_subject: 2, mark: 14, coefficient: 2 },
      { id_student: 3, id_subject: 2, mark: 14, coefficient: 2 },
      { id_student: 4, id_subject: 2, mark: 14, coefficient: 2 },
      { id_student: 5, id_subject: 2, mark: 15, coefficient: 2 },
        //third test, coefficient 3
      { id_student: 1, id_subject: 2, mark: 15, coefficient: 3 },
      { id_student: 2, id_subject: 2, mark: 16, coefficient: 3 },
      { id_student: 3, id_subject: 2, mark: 15, coefficient: 3 },
      { id_student: 4, id_subject: 2, mark: 18, coefficient: 3 },
      { id_student: 5, id_subject: 2, mark: 16, coefficient: 3 },

      // Informatic
        //first test, coefficient 3
      { id_student: 1, id_subject: 3, mark: 18, coefficient: 3 },
      { id_student: 2, id_subject: 3, mark: 17, coefficient: 3 },
      { id_student: 3, id_subject: 3, mark: 16, coefficient: 3 },
      { id_student: 4, id_subject: 3, mark: 20, coefficient: 3 },
      { id_student: 5, id_subject: 3, mark: 19, coefficient: 3 },
        //second test, coefficient 2
      { id_student: 1, id_subject: 3, mark: 16, coefficient: 2 },
      { id_student: 2, id_subject: 3, mark: 18, coefficient: 2 },
      { id_student: 3, id_subject: 3, mark: 14, coefficient: 2 },
      { id_student: 4, id_subject: 3, mark: 18, coefficient: 2 },
      { id_student: 5, id_subject: 3, mark: 18, coefficient: 2 },
        //third test, coefficient 1
      { id_student: 1, id_subject: 3, mark: 14, coefficient: 1 },
      { id_student: 2, id_subject: 3, mark: 19, coefficient: 1 },
      { id_student: 3, id_subject: 3, mark: 15, coefficient: 1 },
      { id_student: 4, id_subject: 3, mark: 17, coefficient: 1 },
      { id_student: 5, id_subject: 3, mark: 20, coefficient: 1 },
    ]);

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  } 
})();


// Synchronizing the database
//sequelize.sync();

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
  apis: ['./app.ts'],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(jsDocOptions)));
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

//Api qui doit retourner l'id et noms des students ainsi que leur moyenne générale
app.get('/students/averages', async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.findAll();

    if (!students || students.length === 0) {
      res.status(404).json({ error: 'No students found.' });
      return;
    }

    const marks = await Mark.findAll();

    const result = students.map(student => {
      const studentMarks = marks.filter(mark => mark.get('id_student') === student.get('id'));

      const totalMarks = studentMarks.reduce(
          (sum, mark) => sum + (mark.get('mark') as number) * (mark.get('coefficient') as number),
          0
      );
      const totalCoefficients = studentMarks.reduce(
          (sum, mark) => sum + (mark.get('coefficient') as number),
          0
      );

      const average = totalCoefficients > 0 ? totalMarks / totalCoefficients : 0;

      return {
        id: student.get('id'),
        name: student.get('name'),
        average: parseFloat(average.toFixed(2)),
      };
    });

    res.status(200).json(result); // Retourner les 5 premiers étudiants
  } catch (error) {
    console.error('Error fetching averages:', error);
    res.status(500).json({ error: 'An error occurred while fetching averages.' });
  }
});