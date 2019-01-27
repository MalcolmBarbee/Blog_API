
const bodyParser = require('body-parser');
const express = require('express');
const x = express();
const {userService} = require('../Blog_API/backend/routes/user');
const {postService} = require('../Blog_API/backend/routes/post');
const {commService} = require('../Blog_API/backend/routes/comment');
const port = 3001;

x.use(bodyParser.urlencoded({ extended: false }));
//or
x.use(bodyParser.json())


x.use('/user', userService)
// x.use('/userAll',userService)
 x.use('/post', postService.postService)
// x.use('/postsAll', postService)
 x.use('/comments', commService.commService)
// x.use('/commentsAll',commService)

x.listen(port, () => {
    console.log(`Yote!${port}`)
});


//private* Needs to be protected with the auth token