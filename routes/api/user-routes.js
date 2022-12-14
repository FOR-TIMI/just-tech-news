const router = require('express').Router();
const { User, Vote, Post, Comment } = require('../../models');


// GET /api/users
router.get('/', (req, res) => {
      // Access our User model and run .findAll() method)
  User.findAll({
    attributes: { exclude: ['password'] },
    // replace the existing `include` with this
include: [
    {
      model: Post,
      attributes: ['id', 'title', 'post_url', 'created_at']
    },
    {
      model: Post,
      attributes: ['title'],
      through: Vote,
      as: 'voted_posts'
    },
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'created_at'],
      include: {
        model: Post,
        attributes: ['title']
      }
  }
]
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    res.status(500).json({message: err});
  });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
       
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'post_url', 'created_at']
          },
          {
            model: Post,
            attributes: ['title'],
            through: Vote,
            as: 'voted_posts'
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
              model: Post,
              attributes: ['title']
            }
        }
      ]
        
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

// This route will be found at http://localhost:3001/api/users/login in the browser.
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
      
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
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