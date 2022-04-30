let dbConn = require('../../config/db.config');

let Formation = (formation) => {
    this.id             = formation.id;
    this.name           = formation.name;
    this.imageUrl       = formation.imageUrl;
    this.description    = formation.description;
    this.formers        = formation.formers;
}

Formation.getFormations = (result) => {
    dbConn.query('SELECT * FROM formations', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('formations: ', res);
        result(null, res);
    });
}

Formation.getFormation = (id, result) => {
    dbConn.query('SELECT * FROM formations WHERE id = ?', [id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log('formations: ', res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: 'not_found'}, null);
    });
}

Formation.createFormation = (newFormation, result) => {
    dbConn.query('INSERT INTO formations (id, name, image_url, description, formers) VALUES (?, ?, ?, ?, ?)', [
        newFormation.id,
        newFormation.name,
        newFormation.imageUrl,
        newFormation.description,
        newFormation.formers
    ], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('created formation: ', {id: res.insertId, ...newFormation});
        result(null, {id: res.insertId, ...newFormation});
    });
}

Formation.updateFormation = (id, formation, result) => {
    dbConn.query('UPDATE formations SET name = ?, image_url = ?, description = ?, formers = ? WHERE id = ?', [
        formation.name,
        formation.imageUrl,
        formation.description,
        formation.formers,
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
        console.log('updated formation: ', { id: id, ...formation });
        result(null, { id: id, ...formation });
    });
}

Formation.deleteFormation = (id, result) => {
    dbConn.query('DELETE FROM formations WHERE id = ?', [id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            result({kind: 'not_found'}, null);
            return;
        }
        console.log('deleted formation with id: ', id);
        result(null, res);
    });
}

module.exports = Formation;