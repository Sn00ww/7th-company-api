const Formation = require('../models/formation.model');
const axios = require("axios");

exports.getFormations = (req, res) => {
    Formation.getFormations((err, data) => {
        if (err) {
            res.status(500).send({
                success: false,
                code: 500,
                message: err.message || "Some error occurred while retrieving formations."
            });
        } else res.send({
            success: true,
            code: 200,
            data: data
        });
    });
}

exports.getFormation = (req, res) => {
    Formation.getFormation(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    success: false,
                    code: 404,
                    message: `Formation with id ${req.params.id} not found.`,
                });
            } else {
                res.status(500).send({
                    success: false,
                    code: 500,
                    message: "Error retrieving formation with id " + req.params.id
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

exports.createFormation = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            success: false,
            code: 400,
            message: "Content can not be empty."
        });
    }

    const formation = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        formers: req.body.formers,
    };

    Formation.createFormation(formation, (err, data) => {
        if (err) {
            res.status(500).send({
                success: false,
                code: 500,
                message: err.message || "Some error occurred while creating the Formation."
            });
        } else res.send({
            success: true,
            code: 200,
            data: data
        });
    });
}

exports.updateFormation = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            success: false,
            code: 400,
            message: "Content can not be empty!"
        });
    }

    const formation = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        formers: req.body.formers,
    };

    Formation.updateFormation(req.params.id, formation, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    success: false,
                    code: 404,
                    message: `Formation with id ${req.params.id} not found.`
                });
            } else {
                res.status(500).send({
                    success: false,
                    code: 500,
                    message: "Error updating formation with id " + req.params.id
                });
            }
        } else res.send({
            success: true,
            code: 200,
            data: data
        });
    });
}

exports.deleteFormation = (req, res) => {
    Formation.deleteFormation(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    success: false,
                    code: 404,
                    message: `Formation with id ${req.params.id} not found.`
                });
            } else {
                res.status(500).send({
                    success: false,
                    code: 500,
                    message: "Could not delete formation with id " + req.params.id
                });
            }
        } else res.send({
            success: true,
            code: 200,
            message: `Formation was deleted successfully!`
        });
    });
}