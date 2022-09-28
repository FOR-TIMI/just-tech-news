const router = require('express').Router();
const {Post, User} = require('../../models');

router.get('/', async(req,res) => {
    console.log('======================');
    try{
        const posts = await Post.findAll({
            // Query configuration
            attributes : ['id', 'post_url', 'title', 'created_at'],
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
        attributes : ['id', 'post_url', 'title', 'created_at']
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