const promise = require('pg-promise')({});
const db = promise('postgres/localhost/blog')


commentRouter = {}


commentRouter.create = (author, post_id, title, body) => {
    return db.none('INSERT INTO comment (id, author, post_id, title, body) VALUES (${id}, ${author}, ${post_id}), ${title}, ${body})', {id: id, author: author, post_id: post_id, title: title, body: body})
}

commentRouter.read = (post_id) => {
    return db.one('SELECT author, title, body FROM comment WHERE post_id = ${post_id}', {post_id: post_id})
}

commentRouter.update = (title, body) => {
    return db.one('UPDATE comment SET title=${title}, body=${body} WHERE (${title}, ${body})', {title: title, body: body})
};

commentRouter.delete = (author, title, body) => {
    return db.none('DELETE FROM comment where id = ${comment_id}', {comment_id})
};

commentRouter.getAuthor = (token) => {
    return db.one('SELECT id FROM users WHERE token = ${token}', {token});
}
commentRouter.getCommentId = (comment_id) =>{
    return db.one('SELECT author FROM comments WHERE id = ${comment_id}',{comment_id})
}
commentRouter.compareToken = (id) =>{
    return db.one ('SELECT token FROM users WHERE id = ${id}',{id});
}

module.exports = {
    commentRouter
}