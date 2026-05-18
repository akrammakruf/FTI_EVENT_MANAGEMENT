const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../model/userModel');

const AuthController = {

    async register(req, res) {

        try {

            const {
                name,
                email,
                password,
                role
            } = req.body;

            const cekUser = await UserModel.findByEmail(email);

            if (cekUser) {

                return res.status(400).json({
                    success: false,
                    message: 'Email sudah digunakan'
                });

            }

            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(
                password,
                salt
            );

            await UserModel.createUser(
                name,
                email,
                hashedPassword,
                role || 'user'
            );

            return res.status(201).json({
                success: true,
                message: 'Register berhasil'
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: 'Server Error'
            });

        }

    },

    async login(req, res) {

        try {

            const { email, password } = req.body;

            const user = await UserModel.findByEmail(email);

            if (!user) {

                return res.status(401).json({
                    success: false,
                    message: 'Email tidak ditemukan'
                });

            }

            const cekPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!cekPassword) {

                return res.status(401).json({
                    success: false,
                    message: 'Password salah'
                });

            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET || 'SECRET_KEY',
                {
                    expiresIn: '1d'
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Login berhasil',
                token
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: 'Server Error'
            });

        }

    }

};

module.exports = AuthController;