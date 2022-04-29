const User = require('../models/user.model');

exports.getUsers = (req, res) => {
    User.getUsers((err, data) => {
        if (err) {
            res.status(500).send({
                success: false,
                code: 500,
                message: err.message || "Some error occurred while retrieving users."
            });
        } else res.send({
            success: true,
            code: 200,
            data: data
        });
    });
}

exports.getUser = (req, res) => {
    User.getUser(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    success: false,
                    code: 404,
                    message: `User with id ${req.params.id} not found.`,
                });
            } else {
                res.status(500).send({
                    success: false,
                    code: 500,
                    message: "Error retrieving user with id " + req.params.id
                });
            }
        } else {
            res.send({
                success: true,
                code: 200,
                data: data
            });
        }
    });
}

exports.createUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            success: false,
            code: 400,
            message: "Content can not be empty."
        });
    }

    const user = {
        identifier:     req.body.identifier,
        email:          req.body.email,
        username:       req.body.username,
        discriminator:  req.body.discriminator,
        avatar:         req.body.avatar,
        roles:          JSON.stringify(["ROLE_USER"])
    };

    User.createUser(user, (err, data) => {
        if (err) {
            res.status(500).send({
                success: false,
                code: 500,
                message: err.message || "Some error occurred while creating the User."
            });
        } else res.send({
            success: true,
            code: 200,
            data: data
        });
    });
}

exports.updateUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            success: false,
            code: 400,
            message: "Content can not be empty!"
        });
    }

    const user = {
        email:          req.body.email,
        username:       req.body.username,
        discriminator:  req.body.discriminator,
        avatar:         req.body.avatar,
        roles:          req.body.roles
    };

    User.updateUser(req.params.id, user, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    success: false,
                    code: 404,
                    message: `User with id ${req.params.id} not found.`
                });
            } else {
                res.status(500).send({
                    success: false,
                    code: 500,
                    message: "Error updating user with id " + req.params.id
                });
            }
        } else res.send({
            success: true,
            code: 200,
            data: data
        });
    });
}

exports.deleteUser = (req, res) => {
    User.deleteUser(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    success: false,
                    code: 404,
                    message: `User with id ${req.params.id} not found.`
                });
            } else {
                res.status(500).send({
                    success: false,
                    code: 500,
                    message: "Could not delete user with id " + req.params.id
                });
            }
        } else res.send({
            success: true,
            code: 200,
            message: `User was deleted successfully!`
        });
    });
}