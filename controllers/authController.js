const bcrypt = require('bcrypt');
const model = require('../models/index');
const jwtHelper = require('../helper/jwtVerification');

const authController = {
    store: async (req, res) => {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        try {
            const data = await model.users.findOrCreate({ where: {email: email}, defaults: {name,password: hash} });
            const token = await jwtHelper.generateToken({ id: data.id });

            if (data) {
                res.status(201).json({
                    status: true,
                    message: 'User created successfully',
                    data: data,
                    token: token
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'failed to create user',
                });
            }
        } catch (err) {
            res.status(500).json({
                status: false,
                message: 'something went wrong',
                error: err.message
            });
        }
    },

    authenticated: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await model.users.findOne({where: {email: email}});
            if (user !== null) {
                const isValidPassword = await bcrypt.compare(password, user.password);
                if(isValidPassword) {
                    const token = await jwtHelper.generateToken({id: user.id})
                    res.status(200).json({
                        status: true,
                        data: user,
                        token: token
                    });
                } else {
                    res.status(400).json({
                        status: true,
                        message: 'Invalid email or password'
                    });
                }
                
            } else {
                res.status(400).json({
                    status: true,
                    message: 'Unauthorized credentials'
                });
            }
        } catch (err) {
            res.status(500).json({
                status: false,
                message: 'Something went Wrong ! please try again later',
                error: err.message
            });
        }
    }
};

module.exports = authController;