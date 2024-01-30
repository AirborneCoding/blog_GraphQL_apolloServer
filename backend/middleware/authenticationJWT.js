const CustomError = require('../errors');
const { isTokenValid } = require('../utils/jwt');


// check for authentication restapi users
const authenticateUser_RestApis = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new CustomError.UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];

    try {
        const { name, userId, role } = isTokenValid({ token });
        req.user = { name, userId, role };

        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication invalid');
    }
};

// check for authentication graphapi users
const authenticateUser_graphql = (context) => {
    const authHeader = context.req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new CustomError.UnauthenticatedError('Authentication invalid');
    }
    let token = authHeader.split('Bearer ')[1];

    try {
        const { username, userId, email } = isTokenValid({ token });
        context.user = { username, userId, email };
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication invalid');
    }
};


// todo : authorization by role
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthorizedError(
                'Unauthorized to access this route'
            );
        }
        next();
    };
};

module.exports = {
    authenticateUser_RestApis,
    authenticateUser_graphql,
    authorizePermissions,
};
