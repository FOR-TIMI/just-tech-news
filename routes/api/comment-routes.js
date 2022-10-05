const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
  try{
    const comments = await Comment.findAll({});
     
    if(!comments.length){
      res
      .status(404)
      .json({message : "There are no comments yet"})
      return;
    }

   res.json({ comments})
  }
  catch(err){
    res
    .status(500)
    .json({error: err})
  }

});

router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
});

router.delete('/:id', async (req, res) => {
try{
  const comment = await Comment.destroy({ 
    where : {
      id : req.params.id
    }
  }) 

  if(!comment){
    res
    .status(404)
    .json({message: "could not find that comment"})
  }

}
catch(err){
  res
  .status(500)
  .json({message : "Something went wrong with the server"})
}

});

module.exports = router;