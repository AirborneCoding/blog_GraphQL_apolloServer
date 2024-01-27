const User = require("../models/users.model")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const { cloudinaryRemoveImage, uploadImageCloudinary } = require("../utils/uploads/cloudinary")
const { checkPermissions } = require("../utils/secure")
//*#######################################################################################

/**-----------------------------------------------
 * @desc    upload profile photo
 * @route   /api/v1/user/profilePhoto
 * @method  POST
 * @access  public 
------------------------------------------------*/
const uploadProfilePhoto = async (req, res) => {
    // 01- check req.fils is existing
    if (!req.files) {
        throw new CustomError.BadRequestError("No File Uploaded")
    }

    // 02- check is image upload or other type of files
    const productImageAvatar = req.files.avatar

    if (!productImageAvatar.mimetype.startsWith("image")) {
        throw new CustomError.BadRequestError("Please upload Image")
    }

    const imagePathForAvatar = req.files.avatar.tempFilePath
    var result = await uploadImageCloudinary(imagePathForAvatar)

    let profile = await User.findById(req.user.userId)
    if (profile.avatar?.id !== null) {
        await cloudinaryRemoveImage(profile.avatar.id)
    }

    const url = result.secure_url
    const id = result.public_id
    profile.avatar = {
        url: url,
        id: id
    }
    await profile.save()

    res.status(StatusCodes.CREATED).json({ msg: "success" });
}

/**-----------------------------------------------
 * @desc    update profile
 * @route   /api/v1/auth
 * @method  PATCH
 * @access  public 
------------------------------------------------*/
const testedApi = async (req, res) => {
    res.send("heelo successfully test")
};



module.exports = {
    uploadProfilePhoto,
    testedApi
}