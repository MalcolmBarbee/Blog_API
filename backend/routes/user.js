const express = require('express');
const user = express.Router();
const link = require('../services/user.js')


user.post('/user', (req, res) => {
    let {username, email, password} = req.body; 
    if(!username ||!email ||!password) res.json({Error: 'Missing username, email or password'})
    bcrypt.hash(password,10).then((encryptedPass)=> {
     return userRouter.createUser(username, email, encryptedPass).then((users)=>{
         res.json({users})
       })
    .catch(err=>{
         res.status(404).json({error: err.toString('utf-8')})
       })
    })
});

user.get('/user/:user_id', (req, res) => {
    const {user_id} = req.params;
    
        userRouter.read(user_id).then(response => {
            delete response.token
            res.json(response)
        })
        .then((encryptedPassword) => {
            if (password === user.password) {
                return ('Accepted')
            }
            const {name, email} = req.body;

    user.create(name, email)
    .then(() => {
        res.json({success: `User with username ${name} was created`})
    });
      }) .catch(err => {
          res.json(err.toString());
      })
      return ('Incorrect Password')
});

const {username, email, password, token} = req.body; 
bcrypt.hash(password,10).then((encryptedPass)=> {
 return userService.createUser(username, email, encryptedPass, token).then((users)=>{
     res.json({users})
   })
.catch(err=>{
     res.status(404).json({error: err.toString('utf-8')})
   })
});

user.allUsers().then(() => {
    res.json({message: 'Here are the list of all users', user: user})
})

user.put('/:user_id', (req, res) => {
      const {user_id} = req.params
      const {username, email, password} = req.body
      if(!password){
          userRouter.update(user_id, username, passwrod, email)
          .then(() => {
              return userRouter.read(user_id)
          })
          .then((response) => {
              delete resposne.token
              res.json(response)
          })
          .catch(err=>{
              res.json(err.toString())
          })
      }
      else if (password){
          bcrypt.hash(password, 10)
          .then((encrptedPassword) => {
             link.update(user_id, username, encryptedPassword, email).then(()=> {
                 return link.read(user_id)
             })
             .then((response)=> {
                 delete response.token
                 res,json(response)
             })
          })
          .catch(err=> {
              res.json(err.toString())
          })
      }
});
//private

user.delete('/:user_id', (req,res) => {
    const {user_id} = req.params
    link.delete(user_id).then(()=>{
        res.send(`Delete user with id: ${user_id}`)
    })
    .catch(err=>{
        res.send(err.toString());
    })
})

user.delete('/user/:user_id', (req, res) => {
    const {user_id} = req.params;

    bcrypt.compare(password, user.password)
    .then((encryptedPassword) => {
        if (password === user.password) {
            return ('Accepted')
        }
        return ('Incorrect Password')
    })
        link.delete(user_id).then(()=>{
            res.send(`Delete user with id: ${user_id}`)
        })
        .catch(err=>{
            res.send(err.toString());
        })
    })

    
//private

user.get('/user/:user_id/posts', (req, res) => {
    const {id} = req.params
    postService.read(id)
    .then((response)=> {
        res.json(response)
    })
    .catch(err => {
        res.json(err.toString())
    })
});

user.get('/user/:user_id/posts/:post_id', (req, res) => {
    const {user_id, post_id} = req.params
    postService.read(user_id)
    .then((response) => {
        //res is an array
        response.forEach(obj => {
            if(response[i].id === parseInt(post.id)) res.json(response[i])
        })
    })

   .catch(err=> {
       res.json(err.toString)
   })
});

user.get('/user/:user_id/comments', (req, res) => {
    const {user_id} = req.params
    link.read(user_id, comment_id).then((response) => {
        response(data)
    })

});

user.get('/user/:user_id/comments/:comment_id', (req, res) => {
    const {user_id, comment_id} = req.params
    link.read(user_id).then((response) => {
        response(data)
    })
});

user.post('/user/login', (req, res) => {
    let {user_id, username, password} = req.body;
    if(!user_id || !username || !password) res.json({Error: 'Must enter id, username, and password'})
    link.read(user_id).then(data => {
            if(username != data) throw new Error('Incorrerct username')
            return bcrypt.compare(password, data.password)
        },err => {
            throw new Error('username does not exist')
        })
        .then(response=> {
            if(!response) throw new Error ('Password is incorrect')
            return link.read(user_id)
        })
        .then((username) => {
        if(username != data.username) throw new Error ('Already logged in')
        const token = uuid();
        
        link.update(user_id, username=null, password=null, email=null, token)
        res.json({status: 'login successful', token})
        })
    })
    .catch(err=> {
        res.json(err.toString())
    })

user.delete('/:user_id', (req,res) => {
    const {user_id} = req.params
    link.delete(user_id).then(()=>{
        res.send(`Delete user with id: ${user_id}`)
    })
    .catch(err=>{
        res.send(err.toString());
    })
})

module.exports = {
    user
}