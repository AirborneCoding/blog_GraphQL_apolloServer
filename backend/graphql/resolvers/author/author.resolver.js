const User = require("../../../models/users.model")
const Post = require("../../../models/articles.model")
const CustomError = require("../../../errors")
const { UserInputError } = require("apollo-server")
const { authenticateUser_graphql } = require("../../../middleware/authenticationJWT")

/**-----------------------------------------------
 * @desc    get author profile
 * @method  QUERY
 * @access  public 
------------------------------------------------*/
const getAuthorProfile = async (parent, args, context, info) => {
    const { authorName } = args
    const author = await User.findOne({ username: authorName })
    if (!author) throw new CustomError.NotFoundError("Author not found")

    return author
}

/**-----------------------------------------------
 * @desc    get author posts
 * @method  QUERY
 * @access  public
------------------------------------------------*/
const getAuthorPosts = async (parent, args, context, info) => {
    const {
        authorName,
        page,
        pageSize
    } = args;

    const user = await User.findOne({ username: authorName })

    if (!user) throw new CustomError.NotFoundError("User not found")

    let result = Post.find({ user: user._id, postStatus: "published" })
        .populate("user")

    const pageInt = Number(page) || 1;
    const pageSizeInt = Number(pageSize) || 16;
    const skip = (pageInt - 1) * pageSizeInt;

    result = result.sort("-createdAt").skip(skip).limit(pageSizeInt);

    let posts = await result;

    const totalPosts = await Post.countDocuments({ user: user._id });
    const pageCount = Math.ceil(totalPosts / pageSizeInt);
    const pagination = {
        page: pageInt,
        pageSize: pageSizeInt,
        pageCount,
        total: totalPosts,
    };

    return { count: posts.length, posts, pagination }
}


module.exports = {
    Query: {
        getAuthorProfile,
        getAuthorPosts,
    },
    Mutation: {}
}