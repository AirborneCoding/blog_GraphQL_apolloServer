const User = require("../../../models/users.model")
const Post = require("../../../models/articles.model")
const Comment = require("../../../models/comments.model")
const CustomError = require("../../../errors")
const { checkPermissions } = require("../../../utils/secure")

const { authenticateUser_graphql } = require("../../../middleware/authenticationJWT")
const { UserInputError } = require("apollo-server")


/**-----------------------------------------------
 * @desc    get post comment
 * @method  Query
 * @access  public
------------------------------------------------*/
const getPostComments = async (parent, args, context, info) => {
    const comments = await Comment.find({ postId: args.postSlug })
        .populate("user")
        .sort("-createdAt");
    return comments
}

/**-----------------------------------------------
 * @desc    delete comment
 * @method  Mutation
 * @access  private (logged users && comment creator only)   
------------------------------------------------*/
const deleteComment = async (parent, args, context, info) => {
    authenticateUser_graphql(context)

    const comment = await Comment.findById(args.commentId)

    if (!comment) throw new CustomError.NotFoundError("Comment not found")

    const post = await Post.findById(comment.postId);

    if (!post) throw new CustomError.NotFoundError("Post not found");

    checkPermissions(context.user, comment.user, post.user)
    await comment.deleteOne()

    return "success"
}

/**-----------------------------------------------
 * @desc    update comment
 * @method  Mutation
 * @access  private (logged users && comment creator only)
 * todo : fix it
------------------------------------------------*/
const updateComment = async (parent, args, context, info) => {
    authenticateUser_graphql(context)

    const comment = await Comment.findById(args.commentId)

    if (!comment) throw new CustomError.NotFoundError("Comment not found")

    comment.text = req.body.text || comment.text

    const post = await Post.findById(comment.postId);
    if (!post) throw new CustomError.NotFoundError("Post not found");

    checkPermissions(context.user, comment.user, post.user)
    await comment.save()

    return "success"
}

/**-----------------------------------------------
 * @desc    like comment
 * @method  Mutation
 * @access  private (logged users)
 * todo   
------------------------------------------------*/
const likeComment = async (req, res) => {
    const commentId = req.body.commentId;
    const userId = req.user.userId;

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new CustomError.NotFoundError("Comment not found");
    }

    const isCommentAlreadyLiked = Comment.likes.find((user) => user.toString() === userId);
    if (isCommentAlreadyLiked) {
        comment = await Comment.findByIdAndUpdate(
            commentId,
            {
                $pull: { likes: userId },
            },
            { new: true }
        );
    } else {
        comment = await Posts.findByIdAndUpdate(
            commentId,
            {
                $push: { likes: userId },
            },
            { new: true }
        );
    }

    res.status(StatusCodes.OK).json({ msg: "comment liked" });
}

/**-----------------------------------------------
 * @desc    create comment
 * @method  Mutation
 * @access  private (logged users only) 
------------------------------------------------*/
const createComment = async (parent, args, context, info) => {
    authenticateUser_graphql(context)
    const userId = context.user.userId
    const { postId, text } = args

    const user = await User.findById(userId);
    // const post = await Post.findOne({ slug: postSlug });
    const post = await Post.findById(postId);

    // postId

    if (!user) {
        throw new CustomError.NotFoundError("User not found");
    }
    if (!post) {
        throw new CustomError.NotFoundError("Post not found");
    }
    if (!text) {
        throw new CustomError.BadRequestError("type a comment");
    }

    const comment = await Comment.create({
        postId: post._id,
        user: userId,
        text,
        username: context.user.username,
    });

    // pubsub.publish('commentAdded', {
    //     commentAdded: {
    //         postId: post._id,
    //         comment,
    //     },
    // });

    return 'Comment created'
}


module.exports = {
    Query: {
        getPostComments,
    },
    Mutation: {
        createComment,
        updateComment,
        deleteComment,
    }
}