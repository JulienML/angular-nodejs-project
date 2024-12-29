async function populateTables(Student: any, Subject: any, Mark: any) {
  try {
    await Student.bulkCreate([
      { name: 'Ali' },
      { name: 'Adrien' },
      { name: 'Julien' },
      { name: 'Mathieu' },
      { name: 'Thomas' },
      { name: 'Jérémy' },
      { name: 'Sarah' },
      { name: 'Maxence' },
      { name: 'Antoine' },
      { name: 'Louise' },
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
      // First test, coefficient 2
      { id_student: 1, id_subject: 1, mark: 18, coefficient: 2 },
      { id_student: 2, id_subject: 1, mark: 12, coefficient: 2 },
      { id_student: 3, id_subject: 1, mark: 14, coefficient: 2 },
      { id_student: 4, id_subject: 1, mark: 16, coefficient: 2 },
      { id_student: 5, id_subject: 1, mark: 17, coefficient: 2 },
      { id_student: 6, id_subject: 1, mark: 10, coefficient: 2 },
      { id_student: 7, id_subject: 1, mark: 13, coefficient: 2 },
      { id_student: 8, id_subject: 1, mark: 15, coefficient: 2 },
      { id_student: 9, id_subject: 1, mark: 17, coefficient: 2 },
      { id_student: 10, id_subject: 1, mark: 11, coefficient: 2 },  

      // Second test, coefficient 1
      { id_student: 1, id_subject: 1, mark: 17, coefficient: 1},
      { id_student: 2, id_subject: 1, mark: 12, coefficient: 1 },
      { id_student: 3, id_subject: 1, mark: 14, coefficient: 1 },
      { id_student: 4, id_subject: 1, mark: 16, coefficient: 1 },
      { id_student: 5, id_subject: 1, mark: 15, coefficient: 1 },
      { id_student: 6, id_subject: 1, mark: 17, coefficient: 1 },
      { id_student: 7, id_subject: 1, mark: 13, coefficient: 1 },
      { id_student: 8, id_subject: 1, mark: 17, coefficient: 1 },
      { id_student: 9, id_subject: 1, mark: 17, coefficient: 1 },
      { id_student: 10, id_subject: 1, mark: 12, coefficient: 1 },

      // Third test, coefficient 3
      { id_student: 1, id_subject: 1, mark: 19, coefficient: 3},
      { id_student: 2, id_subject: 1, mark: 13, coefficient: 3 },
      { id_student: 3, id_subject: 1, mark: 16, coefficient: 3 },
      { id_student: 4, id_subject: 1, mark: 11, coefficient: 3 },
      { id_student: 5, id_subject: 1, mark: 13, coefficient: 3 },
      { id_student: 6, id_subject: 1, mark: 12, coefficient: 3 },
      { id_student: 7, id_subject: 1, mark: 17, coefficient: 3 },
      { id_student: 8, id_subject: 1, mark: 10, coefficient: 3 },
      { id_student: 9, id_subject: 1, mark: 11, coefficient: 3 },
      { id_student: 10, id_subject: 1, mark: 10, coefficient: 3 },

      // Physics
      // First test, coefficient 1
      { id_student: 1, id_subject: 2, mark: 20, coefficient: 1},
      { id_student: 2, id_subject: 2, mark: 12, coefficient: 1 },
      { id_student: 3, id_subject: 2, mark: 15, coefficient: 1 },
      { id_student: 4, id_subject: 2, mark: 17, coefficient: 1 },
      { id_student: 5, id_subject: 2, mark: 16, coefficient: 1 },
      { id_student: 6, id_subject: 2, mark: 18, coefficient: 1 },
      { id_student: 7, id_subject: 2, mark: 12, coefficient: 1 },
      { id_student: 8, id_subject: 2, mark: 14, coefficient: 1 },
      { id_student: 9, id_subject: 2, mark: 16, coefficient: 1 },
      { id_student: 10, id_subject: 2, mark: 14, coefficient: 1 },

      // Second test, coefficient 2
      { id_student: 1, id_subject: 2, mark: 19, coefficient: 2},
      { id_student: 2, id_subject: 2, mark: 12, coefficient: 2 },
      { id_student: 3, id_subject: 2, mark: 13, coefficient: 2 },
      { id_student: 4, id_subject: 2, mark: 15, coefficient: 2 },
      { id_student: 5, id_subject: 2, mark: 16, coefficient: 2 },
      { id_student: 6, id_subject: 2, mark: 16, coefficient: 2 },
      { id_student: 7, id_subject: 2, mark: 12, coefficient: 2 },
      { id_student: 8, id_subject: 2, mark: 12, coefficient: 2 },
      { id_student: 9, id_subject: 2, mark: 13, coefficient: 2 },
      { id_student: 10, id_subject: 2, mark: 12, coefficient: 2 },

      // Third test, coefficient 3
      { id_student: 1, id_subject: 2, mark: 18, coefficient: 3},
      { id_student: 2, id_subject: 2, mark: 10, coefficient: 3 },
      { id_student: 3, id_subject: 2, mark: 11, coefficient: 3 },
      { id_student: 4, id_subject: 2, mark: 12, coefficient: 3 },
      { id_student: 5, id_subject: 2, mark: 14, coefficient: 3 },
      { id_student: 6, id_subject: 2, mark: 12, coefficient: 3 },
      { id_student: 7, id_subject: 2, mark: 9, coefficient: 3 },
      { id_student: 8, id_subject: 2, mark: 11, coefficient: 3 },
      { id_student: 9, id_subject: 2, mark: 12, coefficient: 3 },
      { id_student: 10, id_subject: 2, mark: 10, coefficient: 3 },

      // Informatic
      // First test, coefficient 3
      { id_student: 1, id_subject: 3, mark: 18, coefficient: 3},
      { id_student: 2, id_subject: 3, mark: 12, coefficient: 3 },
      { id_student: 3, id_subject: 3, mark: 17, coefficient: 3 },
      { id_student: 4, id_subject: 3, mark: 16, coefficient: 3 },
      { id_student: 5, id_subject: 3, mark: 15, coefficient: 3 },
      { id_student: 6, id_subject: 3, mark: 18, coefficient: 3 },
      { id_student: 7, id_subject: 3, mark: 16, coefficient: 3 },
      { id_student: 8, id_subject: 3, mark: 17, coefficient: 3 },
      { id_student: 9, id_subject: 3, mark: 20, coefficient: 3 },
      { id_student: 10, id_subject: 3, mark: 13, coefficient: 3 },

      // Second test, coefficient 2
      { id_student: 1, id_subject: 3, mark: 19, coefficient: 2},
      { id_student: 2, id_subject: 3, mark: 14, coefficient: 2 },
      { id_student: 3, id_subject: 3, mark: 16, coefficient: 2 },
      { id_student: 4, id_subject: 3, mark: 20, coefficient: 2 },
      { id_student: 5, id_subject: 3, mark: 14, coefficient: 2 },
      { id_student: 6, id_subject: 3, mark: 15, coefficient: 2 },
      { id_student: 7, id_subject: 3, mark: 19, coefficient: 2 },
      { id_student: 8, id_subject: 3, mark: 20, coefficient: 2 },
      { id_student: 9, id_subject: 3, mark: 20, coefficient: 2 },
      { id_student: 10, id_subject: 3, mark: 12, coefficient: 2 },

      // Third test, coefficient 1
      { id_student: 1, id_subject: 3, mark: 20, coefficient: 1},
      { id_student: 2, id_subject: 3, mark: 11, coefficient: 1 },
      { id_student: 3, id_subject: 3, mark: 15, coefficient: 1 },
      { id_student: 4, id_subject: 3, mark: 17, coefficient: 1 },
      { id_student: 5, id_subject: 3, mark: 15, coefficient: 1 },
      { id_student: 6, id_subject: 3, mark: 17, coefficient: 1 },
      { id_student: 7, id_subject: 3, mark: 20, coefficient: 1 },
      { id_student: 8, id_subject: 3, mark: 15, coefficient: 1 },
      { id_student: 9, id_subject: 3, mark: 14, coefficient: 1 },
      { id_student: 10, id_subject: 3, mark: 13, coefficient: 1 }
    ]);

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

export { populateTables };