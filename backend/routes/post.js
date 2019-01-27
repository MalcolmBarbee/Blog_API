const express = require('express');
const post = express.Router();
const link = require('../services/post.js')

post.post('/post', (req, res) => {
    const {title, body} = req.body;
    link.getAuthor(myToken)
        .then((data) => {
            let author = Object.values(data)[0];
            link.create(author, title, body)
                .then(() => {
                    res.json(`Title: ${title} post fcreated by ${author}`)
                })
                .catch((err) => {
                    res.json(err.toString());
                })
        }, (err) => {
            res.json('Can only complete while logged in.')
        })
});//private

post.get('/post/:post_id', (req, res) => {
    postRouter.get('/:post_id', (req, res) => {
        const {post_id} = req.params;
        link.read(post_id)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json(err.toString());
            })
        })
});

post.put('/post/:post_id', (req, res) => {
    const {post_id} = req.params;
    const {title, body} = req.body;
    link.getPostId(post_id)
        .then((data) => {
            let newId = Object.values(data)[0];
            link.compareToken(newId)
                .then((data) => {
                    let newToken = Object.values(data)[0];
                    if (newToken === myToken) {
                        link.update(title, body, post_id)
                            .then(() => {
                                res.json(`Post ${post_id} has been updated`);
                            })
                            .catch((err) => {
                                res.json(err.toString());
                            })
                    } else {
                        res.json("Can only complete while logged in.")
                    }
                }, (err) => {
                    res.json(err.toString());
                })
        })
    res.json('')
});

post.delete('/post/:post_id', (req, res) => {
    const {post_id} = req.params;
    link.getPostId(post_id)
        .then((data) => {
            let newId = Object.values(data)[0];
            link.compareToken(newId)
                .then((data) => {
                    let newToken = Object.values(data)[0];
                    if (newToken === myToken) {
                        link.delete(post_id)
                            .then(() => {
                                res.json("Deleted post");
                            })
                            .catch((err) => {
                                res.json(err.toString());
                            })
                    } else {
                        res.json("Not logged in or Incorrect user.")
                    }
                }, (err) => {
                    res.json(err.toString());
                })
        })
    res.json('')
});

post.get('/post/:post_id/comments', (req, res) => {
    const {post_id} = req.params;
    link.readComments(post_id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err.toString());
        })
    res.json('')
});

post.get('/post/:post_id/comments/:comments_id', (req, res) => {
    const {post_id, comment_id} = req.params;
    link.readComment(post_id, comment_id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err.toString());
        })
    res.json('')
});

module.exports = {
    post
}