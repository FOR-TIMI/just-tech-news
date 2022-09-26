const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
      // Access our User model and run .findAll() method)
  User.findAll({
    // attributes: { exclude: ['password'] }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'User was not found'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
});

// POST /api/users
router.post('/', (req, res) => {
    const {username, password,email} = req.body
      // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
     User.create({ username, password, email })
     .then(dbUserData => res.json(dbUserData))
     .catch(err => {
        console.error(err)
        res.status(500).json(err) 
    })
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
   User.update(req.body, {
    individualHooks: true,
    where: {
        id: req.params.id
    }
   })
   .then(dbUserData => {
    if(!dbUserData[0]){
        res.status(404).json({message: 'No user found with this id'});
        return;
    }
    res.json(dbUserData);
   })
   .catch(err => {
    console.error(err)
    res.status(500).json(err)
   })
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.err(err)
        res.status(500).json(err);
    })

});

module.exports = router;