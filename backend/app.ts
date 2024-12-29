import express, { Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import { Sequelize, DataTypes } from 'sequelize';
import cors from 'cors';
import { populateTables } from './seed';

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


// Synchronizing the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};

const startServer = async () => {
  await syncDatabase();
  await populateTables(Student, Subject, Mark);
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
    components: {
      schemas: {
        Student: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
          },
        },
        StudentNoId: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
        },
        StudentWithAverage: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
            average: {
              type: 'number',
              format: 'float',
            },
          },
        },
        Subject: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
          },
        },
        SubjectNoId: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
        },
        Mark: {
          type: 'object',
          properties: {
            id_student: {
              type: 'integer',
              format: 'int64',
            },
            id_subject: {
              type: 'integer',
              format: 'int64',
            },
            mark: {
              type: 'integer',
              format: 'int64',
            },
            coefficient: {
              type: 'integer',
              format: 'int64',
            },
          },
        },
        MarkNoIds: {
          type: 'object',
          properties: {
            mark: {
              type: 'integer',
              format: 'int64',
            },
            coefficient: {
              type: 'integer',
              format: 'int64',
            },
          },
        },
      },
    },
  },
  apis: ['app.ts'],
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(jsDocOptions)));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  console.log('API documentation available at http://localhost:3000/docs');
});

// Subjects CRUD

/**
 * @openapi
 * /subjects:
 *  get:
 *    description: Get all subjects
 *    responses:
 *      200:
 *        description: A JSON array of all subjects with their IDs and names
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Subject'
 */
app.get('/subjects', async (req: Request, res: Response) => {
  const subjects = await Subject.findAll();
  res.json(subjects);
});

/**
 * @openapi
 * /subjects:
 *  post:
 *    description: Create a new subject
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SubjectNoId'
 *    responses:
 *      201:
 *        description: The created subject
 *        schema:
 *          $ref: '#/components/schemas/Subject'
 */
app.post('/subjects', async (req: Request, res: Response) => {
  const subject = await Subject.create(req.body);
  res.status(201).json(subject);
});

/**
 * @openapi
 * /subjects/{id}:
 *  put:
 *    description: Update an existing subject
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the subject to update
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SubjectNoId'
 *    responses:
 *      200:
 *        description: The modified subject
 *        schema:
 *          $ref: '#/components/schemas/Subject'
 */
app.put('/subjects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const subject = await Subject.update(req.body, { where: { id } });
  res.json(subject);
});


/**
 * @openapi
 * /subjects/{id}:
 *  delete:
 *    description: Delete an existing subject
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the subject to delete
 *        schema:
 *          type: integer
 *    responses:
 *      204:
 *        description: The subject was deleted successfully
 */
app.delete('/subjects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Subject.destroy({ where: { id } });
  res.status(204).send();
});

// Marks CRUD

/**
 * @openapi
 * /marks:
 *  get:
 *    description: Get all marks
 *    responses:
 *      200:
 *        description: A JSON array of all marks with their IDs, value and coefficient
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Mark'
 *      500:
 *        description: An error occurred while fetching marks
 */
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


/**
 * @openapi
 * /marks:
 *  post:
 *    description: Create a new mark
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MarkNoIds'
 *    responses:
 *      200:
 *        description: The created mark
 *        schema:
 *          $ref: '#/components/schemas/Mark'
 */
app.post('/marks', async (req: Request, res: Response) => {
  const mark = await Mark.create(req.body);
  res.status(201).json(mark);
});

/**
 * @openapi
 * /marks/{id}:
 *  put:
 *    description: Update an existing mark
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the mark to update
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MarkNoIds'
 *    responses:
 *      200:
 *        description: The modified mark
 *        schema:
 *          $ref: '#/components/schemas/Mark'
 */
app.put('/marks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const mark = await Mark.update(req.body, { where: { id } });
  res.json(mark);
});

/**
 * @openapi
 * /marks/{id}:
 *  delete:
 *    description: Delete an existing mark
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the mark to delete
 *        schema:
 *          type: integer
 *    responses:
 *      204:
 *        description: The mark was deleted successfully
 */
app.delete('/marks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Mark.destroy({ where: { id } });
  res.status(204).send();
});

// Students CRUD

/**
 * @openapi
 * /students:
 *  get:
 *    description: Get all students
 *    responses:
 *      200:
 *        description: A JSON array of all students with their IDs and names
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Student'
 */
app.get('/students', async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll(); // Récupère tous les étudiants
    res.json(students); // Retourne les données en format JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching students.' });
  }
});

/**
 * @openapi
 * /students:
 *  post:
 *    description: Create a new student
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/StudentNoId'
 *    responses:
 *      201:
 *        description: The created student
 *        schema:
 *          $ref: '#/components/schemas/Student'
 */
app.post('/students', async (req: Request, res: Response) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

/**
 * @openapi
 * /students/{id}:
 *  put:
 *    description: Update an existing student
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the student to update
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/StudentNoId'
 *    responses:
 *      200:
 *        description: The modified student
 *        schema:
 *          $ref: '#/components/schemas/Student'
 */
app.put('/students/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await Student.update(req.body, { where: { id } });
  res.json(student);
});

/**
 * @openapi
 * /students/{id}:
 *  delete:
 *    description: Delete an existing student
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the student to delete
 *        schema:
 *          type: integer
 *    responses:
 *      204:
 *        description: The student was deleted successfully
 */
app.delete('/students/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Student.destroy({ where: { id } });
  res.status(204).send();
});

/**
 * @openapi
 * /students/averages:
 *  get:
 *    description: Get the average marks of all students
 *    responses:
 *      200:
 *        description: A JSON array of all students with their IDs, names and average marks
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/StudentWithAverage'
 */
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