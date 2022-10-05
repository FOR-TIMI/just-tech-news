# just-tech-news

Functional Express.js API created to allow users to perform CRUD operations on  news data 

## Description
This is a backend for an e-commerce API that allows a front end developers to perform CRUD operations to the database from the Front end

## Table of Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [Screenshots](#Screenshots)
- [Contributions](#Contributions)
- [Live api link ](https://calm-meadow-66266.herokuapp.com/) // you have to use insomnia or postman



## Installation
To set up and utilise this project. Take the following steps.

- Step 1: Clone this repository
- ![image](https://user-images.githubusercontent.com/104241247/193981698-ce1db42f-9031-4655-9931-038fa1b6f64e.png)


- Step 2: Install dependencies by running the ``` npm install ``` command in the command line
- Step 3: Open your code editor by running the command ``` code . ```
- Step 4: Create your database.<br> Luckily, theres a schema.sql file that we can run to create the database automatically. 
You run this file by first logging in to you mysql server and running the ```source db/schema.sql ```
  command to create the database
- Step 5: Create .env file
- Step 6: Type in your database credentials. Ensure that they use the format
```
DB_NAME = new_db  // Our database name in this case 
DB_USER = YOUR mysql USERNAME 
DB_PW = YOUR mysql PASSWORD

```
OR
If you have a jawsDb url from your heroku 
```
JAWSDB_URL = `Your jawsBD URL`
```
- Step 7(Optional!): A seeds folder has been added to populate the database with some data.<br>
To run this seeds folder, we must run the ``` npm run seed ``` command. 

- Step 8: Start server. you can start ther server by simply running ```npm start ``` in the command line
- Step 9: Open Insomnia core/postman

- Step 10: You can create, read, update, and delete categories, tags, and products using these urls:
  - http://localhost:3001/api/posts
  - http://localhost:3001/api/posts/:id (required to delete, update, or just to read one post)
  - http://localhost:3001/api/users
  - http://localhost:3001api/users/:id(required to delete, update, or just to read one user)
  - http://localhost:3001/api/upvotes (PUT REQUEST REQUIRED!)
  - http://localhost:3001/api/comments/:id (required to delete, update, or just to read one comment)
  - http://localhost:3001/api/comments
  
## Usage
This Api can be used by any front end developer that want's to integrate a backend for their news web application

## Screenshots
![image](https://user-images.githubusercontent.com/104241247/193982065-a9edb4cf-abdd-4f94-b3fd-b58c53e17c80.png)
![image](https://user-images.githubusercontent.com/104241247/193982097-35547a8b-2ea4-4202-8513-749e7441816e.png)
![image](https://user-images.githubusercontent.com/104241247/193982130-bf84e644-d076-46d0-b650-0412907f78da.png)



## Contributions
Made with ❤️ by Timi

If you have any further questions please feel free to contact me at [femiladiranerife24@gmail.com](mailto:femiladiranerife24@gmail.com)
