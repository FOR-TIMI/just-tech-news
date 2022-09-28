const router = require('express').Router();
const {Post, User, Vote} = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', async(req,res) => {
    try{
        const posts = await Post.findAll({
            // Query configuration
            attributes: [
              'id',
              'post_url',
              'title',
              'created_at',
              [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            order: [['created_at', 'DESC']],
            include: [
              {
                  model: User,
                  attributes: ['username']
              }
          ]
          })

          if(!posts.length){
            res.status(404).json({message: "There are no posts yet"});
            return;
          }
          res.json(posts)
    }
    catch(err){
        res.status(500).json({message: err})
    }



})

router.get('/:id', async(req,res) => {
 try{
    const post = await Post.findOne({
        where: {
          id : req.params.id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ]
        ,
        include : {
          model : User,
          attributes: ['username']
        }
           
      })
    
    if(!post){
      res.status(404).json({message: 'That post does not exist'})
      return;
    }
     
     res.json(post)
 }
 catch(err){
    res.status(500).json({message: 'Something went wrong', err})
 }

})

router.post('/', async(req,res)=> {
  try{
    const {user_id, post_url,title} = req.body
    const newPost = await Post.create({user_id, post_url, title});
    res.json(newPost)
   }
   catch(err){
    res.status(500).json({message: "Something went wrong", err})
   }
})

router.put('/upvote', (req, res) => {
  Post.upvote(req.body, { Vote })
    .then(updatedPostData => res.json(updatedPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
 });


router.put('/:id', async(req,res) => {
   try{
    const post = await Post.update(
    {
        title : req.body.title
    }, 
    {
        where : {
            id : req.params.id
        }
    }
    
    )

    if(!post){
        res.status(404).json({message : "That post does not exist"});
        return;
    }

    res.json(post)

   }
   catch(err){
    res.status(500).json({message : "Something went wrong", err })
   }
})

router.delete('/:id', async(req,res) => {
try{
    const post = await Post.destroy({
        where : {
            id : req.params.id
        }
    })

    if(!post){
        res.status(400).json({message:"Post not found"})
        return;
    }
    res.json(post)
}
catch(err){
    res.status(500).json({message: "Something went wrong", err})
}
})

module.exports = router