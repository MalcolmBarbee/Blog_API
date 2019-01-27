const promise = require('pg-promise')({});
const db = promise('postgres/localhost/blog')


postRouter = {}


postRouter.create = (author, title, body) => {
    return db.none('INSERT INTO post (id, author, title, body) VALUES (${id}, ${author}, ${title}, ${body})', {id: id, author: author, title: title, body: body})
};

postRouter.read = (id) => {
    return db.any('SELECT * FROM post WHERE id = ${post_id}', {id: post_id})
};

postRouter.update = (title, body) => {
    return db.one('UPDATE post SET title=${title}, body=${body} WHERE id = ${post_id}', {title: title, body: body, id: post_id})
};

postRouter.delete = (author, title, body) => {
    return db.none('DELETE FROM comments WHERE post_id = ${post_id} AND WHERE id = ${post_id}')
};

postRouter.readComments = (post_id) => {
    return db.any('SELECT posts.author , comments.* FROM comments JOIN posts ON id=author WHERE post_id = ${post_id};', {post_id});
}
postRouter.readComment = (post_id, comment_id) => {
    return db.one('SELECT posts.author , comments.* FROM comments JOIN posts ON post_id=author WHERE (id = ${post_id} AND comments.id = ${comment_id});', {post_id, comment_id});
}
postRouter.getAuthor = (token) => {
    return db.one('SELECT id FROM users WHERE token = ${token}', {token});
}
postRouter.getPostId = (post_id) =>{
    return db.one('SELECT author FROM posts WHERE id = ${post_id}',{post_id})
}
postRouter.compareToken = (id) =>{
    return db.one ('SELECT token FROM users WHERE id = ${id}',{id});
}
module.exports = postRouter;
