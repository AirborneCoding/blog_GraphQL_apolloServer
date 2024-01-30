const User = require("../../../models/users.model")
const CustomError = require("../../../errors")
const crypto = require("crypto")
const { createHash } = require("../../../utils/secure")

const { UserInputError } = require("apollo-server")

const { sendVerificationEmail, sendResetPasswordEmail } = require("../../../utils/email")
const { authenticateUser_graphql } = require("../../../middleware/authenticationJWT")

/**-----------------------------------------------
 * @desc    register new user
 * @method  MUTATION
 * @access  public 
------------------------------------------------*/
const register = async (parent, args, context, info) => {
    const { username, email, password } = args

    const isEmailAlreadyExist = await User.findOne({ email })
    if (isEmailAlreadyExist) {
        throw new CustomError.BadRequestError("Email already exists")
    }
    const isNameAlreadyExist = await User.findOne({ username })
    if (isNameAlreadyExist) {
        throw new CustomError.BadRequestError("Name Already exists, Please Try with different name")
    }

    const verificationToken = crypto.randomBytes(40).toString('hex');

    const user = await User.create({
        username,
        email: email,
        password: password,
        verificationToken
    })

    await sendVerificationEmail({
        name: user.username,
        email: user.email,
        verificationToken: user.verificationToken,
        origin: process.env.ORIGINE,
    });

    return {
        user: {
            username,
            email,
            verificationToken
        },
        msg: 'We sent to you an email, please verify your email addresse',
    }
}

/**-----------------------------------------------
 * @desc    login user
 * @method  MUTATION
 * @access  public 
------------------------------------------------*/
const login = async (parent, args, context, info) => {

    const { email, password } = args

    if (!password || !email) {
        throw new CustomError.BadRequestError("please provide your information")
    }

    const user = await User.findOne({ email: email }) || await User.findOne({ username: email })
    if (!user) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials")
    }

    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials")
    }

    const token = await user.createJWT()

    return {
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            token,
            // avatar: user?.avatar?.url,
        },
        msg: "login successfully"
    }
}


/**-----------------------------------------------
 * @desc    verify account
 * @method  MUTATION
 * @access  private 
------------------------------------------------*/
const verifyEmail = async (parent, args, context, info) => {
    const { verificationToken, email } = args
    const user = await User.findOne({ email });

    if (!user) {
        throw new CustomError.UnauthenticatedError('Verification Failed');
    }

    if (user.verificationToken !== verificationToken) {
        throw new CustomError.UnauthenticatedError('Verification Failed');
    }

    (user.isVerified = true), (user.verified = Date.now());
    user.verificationToken = '';

    await user.save();

    return { msg: 'Email Verified' }
}

/**-----------------------------------------------
 * @desc    forgot password
 * @method  MUTATION
 * @access  private (logged users)
------------------------------------------------*/
const forgotPassword = async (parent, args, context, info) => {
    const { email } = args;
    if (!email) {
        throw new CustomError.BadRequestError('Please provide valid email');
    }

    const user = await User.findOne({ email });

    if (user) {
        const passwordToken = crypto.randomBytes(70).toString('hex');
        console.log(passwordToken);
        await sendResetPasswordEmail({
            name: user.username,
            email: user.email,
            token: passwordToken,
            origin: process.env.ORIGINE,
        });

        const tenMinutes = 1000 * 60 * 10;
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

        user.passwordToken = createHash(passwordToken);
        user.passwordTokenExpirationDate = passwordTokenExpirationDate;
        await user.save();
    }

    return { msg: 'Please check your email for reset password link' }
}

/**-----------------------------------------------
 * @desc    reset password
 * @method  MUTATION
 * @access  private (logged users)
------------------------------------------------*/
const resetPassword = async (parent, args, context, info) => {
    const { token, email, password } = args;
    if (!token || !email || !password) {
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ email });

    if (user) {
        const currentDate = new Date();

        if (
            user.passwordToken === createHash(token) &&
            user.passwordTokenExpirationDate > currentDate
        ) {
            user.password = password;
            user.passwordToken = null;
            user.passwordTokenExpirationDate = null;
            await user.save();
        }
    }
    return { msg: 'reset password' }
}

/**-----------------------------------------------
 * @desc    change password
 * @method  MUTATION
 * @access  private (logged users)
------------------------------------------------*/
const changePassword = async (parent, args, context, info) => {
    authenticateUser_graphql(context)

    const { oldPassword, newPassword } = args;
    if (!oldPassword) throw new CustomError.BadRequestError("Your Old password is required")
    if (!newPassword) throw new CustomError.BadRequestError("Please enter your new password")

    const user = await User.findOne({ _id: context.user.userId })

    const isPasswordMatch = await user.comparePassword(oldPassword);
    if (!isPasswordMatch) throw new CustomError.UnauthenticatedError("Invalid old password");

    user.password = newPassword;
    await user.save();

    return 'your password had changed'
}


module.exports = {
    Query: {},
    Mutation: {
        register,
        login,
        verifyEmail,
        forgotPassword,
        resetPassword,
        changePassword,
    }
}