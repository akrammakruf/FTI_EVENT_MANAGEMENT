const aclMiddleware = (...roles) => {

    return (req, res, next) => {

        try {

            const roleUser = req.user.role;

            if (!roles.includes(roleUser)) {

                return res.status(403).json({
                    success: false,
                    message: 'Akses ditolak'
                });

            }

            next();

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: 'Server Error'
            });

        }

    };

};

module.exports = aclMiddleware;