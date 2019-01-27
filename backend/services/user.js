const promise = require('pg-promise')({});
const db = promise('postgres/localhost/blog');


userRouter = {}


userRouter.create = (username, email, password, token) => {
    return db.none('INSERT INTO user (id, username, email, password, token) VALUES (${id}, ${username}, ${email}, ${password}, ${token})', {id: id, username: username, email: email, password: password, token: token})
}

userRouter.read = (id) => {
    return db.one('SELECT * FROM user WHERE id = ${id}', {id: id})
}

userRouter.update = (username, email, password, token=null) => {
    const arr = [username, email, password, token]
    const arrString = ['username', 'email', 'password', 'token']

    let sqlStr = 'UPDATE user SET ' + arr.reduce((acc, element, i) => {
        if (element){
            acc += arrString[i] + '=${' + arrString[i] + '},'
            return acc
        }
        return acc
    }, '')
    sqlStr = sqlStr.slice(0, sqlStr.length-1)
    sqlStr +=' WHERE id=${id}'
    return db.none('UPDATE user SET username=${username}, email=${email}, password=${password}, token=${token} WHERE (${username}, ${email}, ${password}, ${token})', {username, email, password, token})
}

userRouter.delete = (username, email, password, token) => {
    return db.none('SELECT id, username, email, password, token FROM user VALUE (${id}, ${username}, ${email}, ${password}, ${token})')
};
userRouter.readPosts = (id) => {
    return db.any('SELECT users.username , posts.* FROM posts JOIN users ON author= users.id WHERE author = ${id};', {id});
}
userRouter.readPost = (id, post_id) => {
    return db.one('SELECT users.username , posts.* FROM posts JOIN users ON author = users.id WHERE (author = ${id} AND posts.id = ${post_id});', {id, post_id})
}
userRouter.readComments = (id) => {
    return db.any('SELECT users.username, comments.* FROM comments JOIN users ON author = users.id WHERE author = ${id};'), {id}
}
userRouter.readComment = (id, comment_id) => {
    return db.any('SELECT users.username, comments.* FROM comments JOIN users ON author = users.id WHERE (author = ${id} AND id = ${comment_id});'), {id, comment_id}
}
userRouter.login = (username) => {
    return db.one('SELECT password FROM users WHERE username = ${username}', {username})
}
userRouter.token = (username, token) => {
    return db.none('UPDATE users SET token = ${token} WHERE username = ${username}', {username, token})
}
userRouter.ckToken = (id) => {
    return db.one('SELECT token FROM users WHERE id = ${id}', {id})
}
module.exports = userRouter;

