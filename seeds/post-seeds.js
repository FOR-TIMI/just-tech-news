const { Post }= require('../models')

const postData = [
    {
        "user_id": 1,
        "title": "I don't know why y'all can't just leave this buddy to run",
        "post_url": "https://runbuddy.com/",
    },
    {
        "user_id": 2,
        "title": "I don't know why y'all can't just leave this buddy to run",
        "post_url": "https://runbuddy.com/",
    },
    {
        "user_id": 3,
        "title": "Runbuddy???",
        "post_url": "https://runbuddy.com/",
    }
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts