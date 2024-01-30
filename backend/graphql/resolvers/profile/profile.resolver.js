const User = require("../../../models/users.model")
const Post = require("../../../models/articles.model")
const CustomError = require("../../../errors")
const { authenticateUser_graphql } = require("../../../middleware/authenticationJWT")
const { checkPermissions } = require("../../../utils/secure")
const { UserInputError } = require("apollo-server")
const { cloudinaryRemoveImage, uploadImageCloudinary } = require("../../../utils/uploads/cloudinary")

// todo : getAllCommentsForUser
// todo : upload file (profile photo) 


/**-----------------------------------------------
 * @desc    get user profile
 * @method  QUERY
 * @access  private (logged users && user account owner)
------------------------------------------------*/
const getUserProfile = async (parent, args, context, info) => {
    console.log(context);
    authenticateUser_graphql(context)
    const userId = context?.user?.userId

    const user = await User.findById(userId)

    if (!user) throw new CustomError.NotFoundError("User not found")

    return user
}

/**-----------------------------------------------
 * @desc    update profile
 * @method  Mutation
 * @access  private (logged users && user account owner)
------------------------------------------------*/
const updateProfile = async (parent, args, context, info) => {
    authenticateUser_graphql(context)
    const userId = context?.user?.userId

    const fieldsToUpdate = ['username', 'email', 'bio', 'description'];

    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
        throw new CustomError.NotFoundError("User not found");
    }

    // Check permissions before updating
    checkPermissions(context?.user, user._id);

    // Update only the provided fields from req.body
    fieldsToUpdate.forEach((field) => {
        if (args[field] !== undefined) {
            user[field] = args[field];
        }
    });

    // Save the updated user
    await user.save();

    return { msg: "Profile updated successfully", user }
};

/**-----------------------------------------------
 * @desc    delete profile
 * @method  Mutation
 * @access  private (logged users && user account owner)
------------------------------------------------*/
const deleteProfile = async (parent, args, context, info) => {
    authenticateUser_graphql(context)
    const userId = context?.user?.userId

    const user = await User.findById(userId)
    if (!user) throw new CustomError.NotFoundError("User not found")

    checkPermissions(context.user, user._id)

    await Post.deleteMany({ user: userId });
    await user.deleteOne()

    return "Your profile has been deleted"
}

/**-----------------------------------------------
 * @desc    get my posts
 * @method  Query
 * @access  private (logged users && user account owner)
 * TODO : just fix
------------------------------------------------*/
const getUserPosts = async (parent, args, context, info) => {
    authenticateUser_graphql(context)
    const userId = context?.user?.userId

    const { search, sort, postStatus } = args;
    let filterObject = { user: userId };

    if (postStatus === "archived") {
        filterObject.postStatus = "archived"
    } else if (postStatus === "published") {
        filterObject.postStatus = 'published';
    }

    if (search) {
        const searchRegex = new RegExp(search, 'i');
        filterObject.title = { $regex: searchRegex.source, $options: 'i' };
    }


    let result = Post.find(filterObject)

    // sort logic
    switch (sort) {
        case "latest":
            result = result.sort({ createdAt: -1 });
            break;
        case "oldest":
            result = result.sort({ createdAt: 1 });
            break;
        case "a-z":
            result = result.sort({ title: 1 });
            break;
        case "z-a":
            result = result.sort({ title: -1 });
            break;
        case "most-liked":
            result = result.sort({ likes: -1 });
            break;
        case "most-viewed":
            result = result.sort({ viewsCount: -1 });
            break;
        default:
            break;
    }

    // Pagination logic
    const pageInt = Number(args.page) || 1;
    const pageSizeInt = Number(args.pageSize) || 15;
    const skip = (pageInt - 1) * pageSizeInt;

    result = result.sort("-createdAt").skip(skip).limit(pageSizeInt);

    let posts = await result;

    // Get total count of documents
    const totalPosts = await Post.countDocuments(filterObject);
    const allTotalPosts = await Post.countDocuments({ user: context.user.userId }); // (optional)
    // Calculate pageCount
    const pageCount = Math.ceil(totalPosts / pageSizeInt);
    // Construct pagination object
    const pagination = {
        page: pageInt,
        pageSize: pageSizeInt,
        pageCount,
        total: totalPosts,
    };

    return { allTotalPosts, count: posts.length, posts, pagination }
}


module.exports = {
    Query: {
        getUserProfile,
        getUserPosts
    },
    Mutation: {
        updateProfile,
        deleteProfile,
    },

}

