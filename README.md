# Node & React Final Project
Julien DE VOS, Adrien DE MAILLY NESLE, Thomas GOUTORBE, Mathieu COWAN

# Project Description

The goal of this project is to create a full-stack application that allows users to manage student grades. The application consists of two main parts: a backend server built with Node.JS and Express, and a frontend client built with Angular.

# Table of Contents

* [Explanation of the web pages](#explanation-of-the-web-pages)
  * [Home Page](#home-page)
  * [All Marks Page](#student-list-page)
  * [Grade Configuration Page](#grade-configuration-page)
  * [Grade Visualization Application](#grade-visualization-application)
* [User Guide](#user-guide)
  * [Prerequisites](#prerequisites)
  * [Create the database](#create-the-database)
  * [Run the server](#run-the-server)

# Explanation of the web pages

Each page is easily accessible from the navigation bar at the top of the page.

## Home Page

The home page shows all students in the database with their overall grade average using `ag-grid`.

![Home Page](./screens/home.png)

When you arrive the Home Page, you will see the navigation bar (black band) with "Home" and all of the other pages, you just need to click on it's name to go to the page you want to go to.

Obviously, you automatically arrive on the Home page, but you can always click on "Home" when you are on another page to go back to it.
Here, you can see an ag-Grid displaying each student's ID, name, and overall average mark (calculated as the average of all their grades) from the database.
When your cursor is on the grid you can always scroll to see all of the remaining rows.

### Sorting
With ag-grid it is possible to sort the data on the grid. You do that by clicking on the feature you wish to sort by. 
For instance, if you click a first time on the feature (title of column) "ID" or any numerical feature, you will see an up-arrow next to the name of column which means that you can see now the data ordered by ID in ascending order, if you click again you will see a down-arrow which means that you can see now the data ordered by ID in descending order. If you click a final time, the sorting will be back to the initial sorting of the data.
For features which represent categorical data (letters), for instance "Name", you can do the same thing, it will be by alphabetical order.

*See the following image as an example of filtering by Name by ascending order.*
![Home_screen1](./screens/Home_screen1.png)

it is the same principle for descending order. 
**Sorting cannot be done simultaneously with multiple features.**


### Filtering
With 'ag-Grid' it is also possible to filter the data on the grid. You do that by clicking on the icon which is on the top right of the column which interests you (at the level of the title of the column), then you will have two sorts of filtering:

#### Filtering on numerical data
You can filter by the following functions : equal, does not equal, greater than, greater than or equal to, less than, less than or equal to, between, blank, not blank.
You choose one function to do your filtering then you enter your argument

*On this image you see the following filtering by ID : lower than 5*
![Home_screen2](./screens/Home_screen2.png)

Once you enter your argument, you can choose or not to do a AND or a OR with another function 

*On this image you see the following filtering by ID : lower than 5 OR equal 8*
![Home_screen3](./screens/Home_screen3.png)

*Exemple of console of filtering*
![Home_screen6](./screens/Home_screen6.png)


#### Filtering on categorical data (letters)
You can filter by the following functions : Contains, Does not contain, Equals, Does not equal, Begins with, Ends with, Blank, Not Blank.
You choose one function to do your filtering than then you enter your argument 

*On this image you see the following filtering by Name : Contains o*
![Home_screen4](./screens/Home_screen4.png)

Once you enter your argument, you can choose or not to do a AND or a OR with another function
*You can also do simultaneous filtering on multiple features, and you can also do one sorting simultaneously to your filtering*

*On this image you see the following filtering by Name : Contains o AND equals Begins with L*
![Home_screen5](./screens/Home_screen5.png)

*To take out the filtering you just go back on the filtering icon you selected and you delete the argument you put for the filtering, and it will go back to normal*

*Exemple of console of filtering*
![Home_screen7](./screens/Home_screen7.png)

## All Marks Page

The All Marks page displays all the marks of all students in the database using `ag-grid`.

![All Marks Page](./screens/all-marks.png)

Here you see an ag-grid which displays, for each mark of the database, the corresponding Student ID, Student Name, Subject ID, Subject Name and Mark Value.
The principle of filtering and sorting of the data is exactly the same as in the Home Page, it is simply more interesting here since we have more rows and columns in the ag-grid.


## Grade Configuration Page

The Grade Configuration page allows the user to interact with the database by
- Adding/Deleting a student
- Adding/Deleting a subject
- Adding/Updating/Deleting a mark

![Grade Configuration Page](./screens/grade-configuration.png)

## Grade Visualization Application

The Grade Visualization page displays three different visualizations of the data in the database using `highcharts`:

1. Average Grades by Student
2. Average Grades by Subject
3. Individual Student Grades

### 1. Average Grades by Student
This bar chart shows the average grades for all students. Each bar represents a student, and the height corresponds to their average grade across all subjects.

![Average Grades by Student](./screens/chart1.png)

### 2. Average Grades by Subject
This bar chart displays the average grades for each subject. Each bar represents a subject, and the height reflects the average grade for that subject.

![Average Grades by Subject](./screens/chart2.png)

### 3. Individual Student Grades
This line chart allows users to visualize the grades of a specific student across different subjects. The user can enter a student name, and the chart dynamically updates to show the grades for the entered student.

![Individual Student Grades](./screens/chart3.png)

# User Guide

In this section, we will explain how to run the project on your local machine.

## Prerequisites

Start by cloning the repository on your local machine:

```bash
git clone https://github.com/JulienML/angular-nodejs-project.git
```

Then, navigate to the backend folder and install the required dependencies:

```bash
cd angular-nodejs-project/backend
npm install
```

Next, navigate to the frontend folder and install the required dependencies:

```bash
cd angular-nodejs-project/frontend
npm install
```

## Create the database

In order to run the project, you need to create a PostgreSQL database. To do so, start by creating a user on pgAdmin with the following credentials:

- username: `SchoolDbUser`
- password: `admin`

Make sure that the option `Can login?` is enabled.

Then, create a database named `SchoolDb` owned by `SchoolDbUser`.

The database will be automatically populated with some sample data when you run the server.

## Run the server

To run the server, navigate to the backend folder and run the following command:

```bash
npm start
```

This will start the server on `http://localhost:3000`.
The Swagger API documentation is available at `http://localhost:3000/docs`.

To run the frontend, navigate to the frontend folder and run the following command:

```bash
ng serve
```

This will start the frontend on `http://localhost:4200`.
