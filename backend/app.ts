
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
  username: 'SchoolDbUser',
  password: 'admin',
  database: 'SchoolDb',
  logging: false,
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
    defaultValue: 1
  }
});

//Relationships
Student.hasMany(Mark, { foreignKey: 'id_student' });
Mark.belongsTo(Student, { foreignKey: 'id_student' });

Subject.hasMany(Mark, { foreignKey: 'id_subject' });
Mark.belongsTo(Subject, { foreignKey: 'id_subject' });


//Relationships
Student.hasMany(Mark, { foreignKey: 'id_student' });
Mark.belongsTo(Student, { foreignKey: 'id_student' });

Subject.hasMany(Mark, { foreignKey: 'id_subject' });
Mark.belongsTo(Subject, { foreignKey: 'id_subject' });


// Synchronizing the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};

//Data seed
const populateDatabase = async () => {
  try {
    await Student.bulkCreate([
      { name: 'Ali' },
      { name: 'Adrien' },
      { name: 'Julien' },
      { name: 'Mathieu' },
      { name: 'Thomas' },
    ]);

    await Subject.bulkCreate([
      { name: 'Mathematics' },
      { name: 'Physics' },
      { name: 'Informatic' },
    ]);

    await Mark.bulkCreate([
      { id_student: 1, id_subject: 1, mark: 15, coefficient: 2 },
      { id_student: 2, id_subject: 1, mark: 12, coefficient: 2 },
      { id_student: 3, id_subject: 1, mark: 14, coefficient: 2 },
      { id_student: 4, id_subject: 1, mark: 16, coefficient: 2 },
      { id_student: 5, id_subject: 1, mark: 18, coefficient: 2 },
      { id_student: 1, id_subject: 1, mark: 13, coefficient: 1 },
      { id_student: 2, id_subject: 1, mark: 10, coefficient: 1 },
      { id_student: 3, id_subject: 1, mark: 13, coefficient: 1 },
      { id_student: 4, id_subject: 1, mark: 17, coefficient: 1 },
      { id_student: 5, id_subject: 1, mark: 17, coefficient: 1 },
      { id_student: 1, id_subject: 1, mark: 16, coefficient: 3 },
      { id_student: 2, id_subject: 1, mark: 14, coefficient: 3 },
      { id_student: 3, id_subject: 1, mark: 12, coefficient: 3 },
      { id_student: 4, id_subject: 1, mark: 18, coefficient: 3 },
      { id_student: 5, id_subject: 1, mark: 16, coefficient: 3 },

      { id_student: 1, id_subject: 2, mark: 10, coefficient: 1 },
      { id_student: 2, id_subject: 2, mark: 13, coefficient: 1 },
      { id_student: 3, id_subject: 2, mark: 16, coefficient: 1 },
      { id_student: 4, id_subject: 2, mark: 13, coefficient: 1 },
      { id_student: 5, id_subject: 2, mark: 17, coefficient: 1 },
      { id_student: 1, id_subject: 2, mark: 12, coefficient: 2 },
      { id_student: 2, id_subject: 2, mark: 14, coefficient: 2 },
      { id_student: 3, id_subject: 2, mark: 14, coefficient: 2 },
      { id_student: 4, id_subject: 2, mark: 14, coefficient: 2 },
      { id_student: 5, id_subject: 2, mark: 15, coefficient: 2 },
      { id_student: 1, id_subject: 2, mark: 15, coefficient: 3 },
      { id_student: 2, id_subject: 2, mark: 16, coefficient: 3 },
      { id_student: 3, id_subject: 2, mark: 15, coefficient: 3 },
      { id_student: 4, id_subject: 2, mark: 18, coefficient: 3 },
      { id_student: 5, id_subject: 2, mark: 16, coefficient: 3 },
      
      { id_student: 1, id_subject: 3, mark: 18, coefficient: 3 },
      { id_student: 2, id_subject: 3, mark: 17, coefficient: 3 },
      { id_student: 3, id_subject: 3, mark: 16, coefficient: 3 },
      { id_student: 4, id_subject: 3, mark: 20, coefficient: 3 },
      { id_student: 5, id_subject: 3, mark: 19, coefficient: 3 },
      { id_student: 1, id_subject: 3, mark: 16, coefficient: 2 },
      { id_student: 2, id_subject: 3, mark: 18, coefficient: 2 },
      { id_student: 3, id_subject: 3, mark: 14, coefficient: 2 },
      { id_student: 4, id_subject: 3, mark: 18, coefficient: 2 },
      { id_student: 5, id_subject: 3, mark: 18, coefficient: 2 },
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
};

const startServer = async () => {
  await syncDatabase();
  await populateDatabase();
  sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log('Connection to the PostgreSQL database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the PostgreSQL database:', error);
  }
};

startServer();

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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(jsDocOptions)));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Subjects CRUD
app.get('/subjects', async (req: Request, res: Response) => {
  const subjects = await Subject.findAll();
  res.json(subjects);
});

app.post('/subjects', async (req: Request, res: Response) => {
  const subject = await Subject.create(req.body);
  res.status(201).json(subject);
});

app.put('/subjects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const subject = await Subject.update(req.body, { where: { id } });
  res.json(subject);
});

app.delete('/subjects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Subject.destroy({ where: { id } });
  res.status(204).send();
});

// Marks CRUD
app.get('/marks', async (req: Request, res: Response) => {
  try {
    const marks = await Mark.findAll({
      include: [Student, Subject] // Inclut les relations nécessaires
    });
    res.json(marks);
  } catch (error) {
    console.error('Error fetching marks:', error);
    res.status(500).json({ error: 'An error occurred while fetching marks.' });
  }
});

app.post('/marks', async (req: Request, res: Response) => {
  const mark = await Mark.create(req.body);
  res.status(201).json(mark);
});

app.put('/marks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const mark = await Mark.update(req.body, { where: { id } });
  res.json(mark);
});

app.delete('/marks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Mark.destroy({ where: { id } });
  res.status(204).send();
});

// Students CRUD
app.get('/students', async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll(); // Récupère tous les étudiants
    res.json(students); // Retourne les données en format JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching students.' });
  }
});


app.post('/students', async (req: Request, res: Response) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

app.put('/students/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await Student.update(req.body, { where: { id } });
  res.json(student);
});

app.delete('/students/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Student.destroy({ where: { id } });
  res.status(204).send();
});

// Students CRUD
app.get('/students', async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll(); // Récupère tous les étudiants
    res.json(students); // Retourne les données en format JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching students.' });
  }
});


app.post('/students', async (req: Request, res: Response) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

app.put('/students/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await Student.update(req.body, { where: { id } });
  res.json(student);
});

app.delete('/students/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Student.destroy({ where: { id } });
  res.status(204).send();
});

// Subjects CRUD
app.get('/subjects', async (req: Request, res: Response) => {
  const subjects = await Subject.findAll();
  res.json(subjects);
});

app.post('/subjects', async (req: Request, res: Response) => {
  const subject = await Subject.create(req.body);
  res.status(201).json(subject);
});

app.put('/subjects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const subject = await Subject.update(req.body, { where: { id } });
  res.json(subject);
});

app.delete('/subjects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Subject.destroy({ where: { id } });
  res.status(204).send();
});

// Marks CRUD
app.get('/marks', async (req: Request, res: Response) => {
  try {
    const marks = await Mark.findAll({
      include: [Student, Subject] // Inclut les relations nécessaires
    });
    res.json(marks);
  } catch (error) {
    console.error('Error fetching marks:', error);
    res.status(500).json({ error: 'An error occurred while fetching marks.' });
  }
});


app.post('/marks', async (req: Request, res: Response) => {
  const mark = await Mark.create(req.body);
  res.status(201).json(mark);
});

app.put('/marks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const mark = await Mark.update(req.body, { where: { id } });
  res.json(mark);
});

app.delete('/marks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Mark.destroy({ where: { id } });
  res.status(204).send();
});
