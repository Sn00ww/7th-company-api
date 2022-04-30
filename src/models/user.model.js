let dbConn = require('../../config/db.config');

let User = (user) => {
    this.identifier     = user.identifier;
    this.email          = user.email;
    this.username       = user.username;
    this.discriminator  = user.discriminator;
    this.avatar         = user.avatar;
}

User.getUsers = (result) => {
    dbConn.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('users: ', res);
        result(null, res);
    });
}

User.getUser = (id, result) => {
    dbConn.query('SELECT * FROM users WHERE id = ?', [id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log('user: ', res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: 'not_found'}, null);
    });
}

User.getUserByIdentifier = (identifier, result) => {
    dbConn.query('SELECT * FROM users WHERE identifier = ?', [identifier], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log('user: ', res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: 'not_found'}, null);
    });
}

User.getUserByToken = (user, result) => {
    console.log(user);
    dbConn.query('SELECT * FROM users WHERE identifier = ?', [user.id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log('user: ', res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: 'not_found'}, null);
    });
}

User.createUser = (newUser, result) => {
    dbConn.query('INSERT INTO users (identifier, email, username, discriminator, avatar, roles) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE email = ?, username = ?, discriminator = ?, avatar = ?', [
        newUser.identifier,
        newUser.email,
        newUser.username,
        newUser.discriminator,
        newUser.avatar,
        newUser.roles,
        newUser.email,
        newUser.username,
        newUser.discriminator,
        newUser.avatar,
    ], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('created user: ', { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
}

User.updateUser = (id, user, result) => {
    dbConn.query('UPDATE users SET email = ?, username = ?, discriminator = ?, avatar = ?, roles = ? WHERE id = ?', [
        user.email,
        user.username,
        user.discriminator,
        user.avatar,
        user.roles,
        id
    ], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            result({kind: 'not_found'}, null);
            return;
        }
        console.log('updated user: ', { id: id, ...user });
        result(null, { id: id, ...user });
    });
}

User.deleteUser = (id, result) => {
    dbConn.query('DELETE FROM users WHERE id = ?', [id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            result({kind: 'not_found'}, null);
            return;
        }
        console.log('deleted user with id: ', id);
        result(null, res);
    });
}

module.exports = User;