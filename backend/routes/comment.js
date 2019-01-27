const express = require('express');
const comment = express.Router();
const link = require('../services/comment.js')

comment.post('/comment', (req, res) => {
    const {title, body, post_id} = req.body
    link.getAuthor(myToken).then((data) => {
    let author = Object.values(data)[0]
    link.create(author, title, post_id, body).then(() => {
        res.json(`Comment ${post_id} has been created by ${author}`)
    })
  })
});

comment.put('/:comment_id', (req, res) => {
    const {comment_id} = req.params
    const {title, body} = req.body
    link.getCommentId(comment_id).then((data) => {
        let newId = Object.values(data)[0]
    link.tokenCheck(newId).then((data) => {
        let newToken = Object.values(data)[0]
        if(newToken = myToken) {
            link.update(title, body, comment_id).then(() => {
                res.json(`Successfully updated comment ${comment_id}`)
            })
            .catch((err) => {
                res.json(err.toString())
            })
        } else {
            res.json('Incorrect user or login issue.')    
        }
    })
    })
});

comment.get('/:comment_id', (req, res) => {
    const {id} = req.params;
    link.read(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err.toString());
        })
});

comment.delete('/:comment_id', (req, res) => {
    const {
        comment_id
    } = req.params;
    CommentService.getCommentId(comment_id)
        .then((data) => {
            let newId = Object.values(data)[0];
            link.compareToken(newId)
                .then((data) => {
                    let newToken = Object.values(data)[0];
                    if (newToken === myToken) {
                        link.delete(comment_id)
                            .then(() => {
                                res.json("Deleted comment");
                            })
                            .catch((err) => {
                                res.json(err.toString());
                            })
                    } else {
                        res.json("Incorrect user of login issue.")
                    }
                }, (err) => {
                    res.json(err.toString());
                })
        })

    res.json('')
});

module.exports = {
    comment
}
