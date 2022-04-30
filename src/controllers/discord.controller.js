const axios = require('axios');

exports.redirect = (req, res) => {
    res.send({
        status: 'success',
        code: 200,
        data: {
            url: `https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=identify%20guilds%20email&response_type=code&redirect_uri=${process.env.FRONT_URL}:${process.env.FRONT_PORT}/dashboard&prompt=consent`,
        }
    });
};

exports.authorize = async (req, res) => {
    const code = req.query.code;
    const url = `https://discordapp.com/api/oauth2/token`;
    const body = new URLSearchParams();

    body.append('client_id', process.env.CLIENT_ID);
    body.append('client_secret', process.env.CLIENT_SECRET);
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('redirect_uri', `${process.env.FRONT_URL}:${process.env.FRONT_PORT}/dashboard`);

    axios.post(url, body).then(response => {
        const token = response.data.access_token;
        const url = `https://discordapp.com/api/users/@me`;
        const headers = {
            Authorization: `Bearer ${token}`
        };

        axios.get(url, {headers}).then(response => {
            const user = response.data;
            const body = new URLSearchParams();
            body.append('identifier', user.id);
            body.append('email', user.email);
            body.append('username', user.username);
            body.append('discriminator', user.discriminator);
            body.append('avatar', user.avatar);

            const headers = {
                ContentType: 'application/xxx-www-form-urlencoded'
            };

            axios.post(`${process.env.API_URL}:${process.env.API_PORT}/api/v1/users/`, body, {headers}).then((response) => {
                res.send({
                    success: true,
                    code: 200,
                    data: {
                        token: token
                    }
                });
            }).catch(err => {
                res.send({
                    status: 'error',
                    code: 500,
                    message: err.message
                });
            });
        }).catch(err => {
            res.send({
                status: 'error',
                code: 500,
                message: err.message
            });
        });
    }).catch(err => {
        res.send({
            status: 'error',
            code: 500,
            message: err.message
        });
    });
};

exports.revoke = (req, res) => {
    const token = req.query.token;
    const url = `https://discordapp.com/api/oauth2/token/revoke`;
    const body = new URLSearchParams();
    const headers = {
        ContentType: 'application/xxx-www-form-urlencoded'
    };

    body.append('client_id', process.env.CLIENT_ID);
    body.append('client_secret', process.env.CLIENT_SECRET);
    body.append('token', token);

    axios.post(url, body, {headers}).then(response => {
        res.send({
            status: 'success',
            code: 200,
            message: 'Token revoked'
        });
    }).catch(err => {
        res.send({
            status: 'error',
            code: 500,
            message: err.message
        });
    });
};