const CustomError = require("../../errors")

const checkPermissions = (requestUser, resourceUserId, postUserId) => {
    if (requestUser.role === 'admin') return;
    if (requestUser.userId === resourceUserId.toString()) return;
    if (requestUser.userId === postUserId.toString()) return;
    throw new CustomError.UnauthorizedError(
        'Not authorized to access this route'
    );
};

module.exports = checkPermissions;









/* 
*origin
const CustomError = require("../../errors")

const checkPermissions = (requestUser, resourceUserId) => {
 // console.log(requestUser);
 // console.log(resourceUserId);
 // console.log(typeof resourceUserId);
 if (requestUser.role === 'admin') return;
 if (requestUser.userId === resourceUserId.toString()) return;
 throw new CustomError.UnauthorizedError(
  'Not authorized to access this route'
 );
};

module.exports = checkPermissions;

*/