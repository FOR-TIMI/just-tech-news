const  { User } = require('../models')

const userData = [
       {
        "username": "test",
        "email": "test@gmail.com",
        "password": "password"
        },
        
        {
        "username": "candy",
        "email": "candy@gmail.com",
        "password": "candy1234"
        },
        {
        "username": "lernatino",
        "email": "lernantino@gmail.com",
        "password": "password"
        }
]


const seedUsers  = () => User.bulkCreate(userData);

module.exports = seedUsers