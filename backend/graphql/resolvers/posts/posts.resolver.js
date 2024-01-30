const User = require("../../../models/users.model")
const Post = require("../../../models/articles.model")
const Comment = require("../../../models/comments.model")
const CustomError = require("../../../errors")
const mongoose = require("mongoose")
const { checkPermissions } = require("../../../utils/secure")
const { UserInputError, ApolloError } = require("apollo-server")
const { authenticateUser_graphql } = require("../../../middleware/authenticationJWT")

// TODO : notifications
// todo : follow author


/**-----------------------------------------------
 * @desc    get all posts
 * @method  QUERY
 * @access  public 
------------------------------------------------*/
const getAllPosts = async (parent, args, context, info) => {
    const { search, category, hashtags } = args;
    let filterObject = {};

    if (search) {
        const searchRegex = new RegExp(search, 'i');
        filterObject.$or = [
            { title: { $regex: searchRegex.source, $options: 'i' } },
            { hashtags: { $regex: searchRegex.source, $options: 'i' } },
            { content: { $regex: searchRegex.source, $options: 'i' } },
            { category: { $regex: searchRegex.source, $options: 'i' } },
            { 'user.username': { $regex: searchRegex.source, $options: 'i' } },
        ];
    }

    if (hashtags) {
        filterObject.hashtags = hashtags
    }
    if (category) {
        filterObject.category = category
    }

    filterObject.postStatus = "published"

    let result = Post.find(filterObject).populate({
        path: 'user',
    })
        .sort("-createdAt")


    // Pagination logic
    const pageInt = Number(args.page) || 1;
    const pageSizeInt = Number(args.pageSize) || 2; // limit
    const skip = (pageInt - 1) * pageSizeInt;

    result = result.skip(skip).limit(pageSizeInt);

    let posts = await result;

    const totalPosts = await Post.countDocuments(filterObject);

    const pageCount = Math.ceil(totalPosts / pageSizeInt);

    const pagination = {
        page: pageInt,
        pageSize: pageSizeInt,
        pageCount,
        total: totalPosts,
    };

    return { count: posts.length, posts, pagination }

}

/**-----------------------------------------------
 * @desc    get single post
 * @method  QUERY
 * @access  public 
------------------------------------------------*/
const getSinglePost = async (parent, args, context, info) => {
    const { postSlug } = args;

    const post = await Post.findOne({ slug: postSlug })
        // .where({ postStatus: 'published' })
        .populate("user")
        .populate({
            path: "comments",
            populate: {
                path: "user",
            }
        })

    if (!post) throw new CustomError.NotFoundError("Post not found");

    return post
}

/**-----------------------------------------------
 * @desc    delete posts
 * @method  Mutation
 * @access  private (owner of the post) 
------------------------------------------------*/
const deletePost = async (parent, args, context, info) => {
    authenticateUser_graphql(context)

    const { id: postId } = args
    const post = await Post.findById(postId)

    if (!post) throw new CustomError.NotFoundError("Post not found");

    checkPermissions(context.user, post.user)

    await Comment.deleteMany({ postId: postId })
    await post.deleteOne()

    return "Post deleted successfully"
}

/**-----------------------------------------------
 * @desc    similar posts
 * @method  Query
 * @access  public 
------------------------------------------------*/
const getSimilarPosts = async (parent, args, context, info) => {
    const { postSlug } = args;

    const currentPost = await Post.findOne({ slug: postSlug });

    if (!currentPost) throw new CustomError.NotFoundError("Job not found");

    const { content, user, category, hashtags } = currentPost;


    const query = {
        _id: { $ne: new mongoose.Types.ObjectId(currentPost._id) }, //_id: { $ne: postId }
        postStatus: 'published',
        $or: [
            { user: user ? new mongoose.Types.ObjectId(user) : null },
            { category: category },
            { hashtags: { $in: hashtags } },
            { content: content },
        ],
    };

    const similarPosts = await Post.find(query)
        .populate("user")
        .limit(6);

    return similarPosts
};


/**-----------------------------------------------
 * @desc    handle like
 * @method  Mutation
 * @access  private (logged users only) 
 * ! fix do it with postId instead of slug
------------------------------------------------*/
const handleLike = async (parent, args, context, info) => {
    authenticateUser_graphql(context)
    const userId = context.user.userId
    const { postSlug } = args;

    let post = await Post.findOne({ slug: postSlug })
    if (!post) throw new CustomError.NotFoundError("post not found")

    const isPostAlreadyLiked = post.likes.find((user) => user.toString() === userId);

    if (isPostAlreadyLiked) {
        post = await Post.findByIdAndUpdate(
            post._id,
            {
                $pull: { likes: userId },
            },
            { new: true }
        );
    } else {
        post = await Post.findByIdAndUpdate(
            post._id,
            {
                $push: { likes: userId },
            },
            { new: true }
        );
    }

    return "post liked"
}

/**-----------------------------------------------
 * @desc    create post
 * @method  Mutation
 * @access  private (logged users only) 
------------------------------------------------*/
const createPost = async (parent, args, context, info) => {
    // 1. get requested user
    authenticateUser_graphql(context)
    const userId = context.user.userId

    // 2. get the request body 
    const {
        title,
        content,
        hashtags,
        category,
        postStatus
    } = args.args;

    // console.log(hashtags);

    // 3. Validating for title and content as required
    if (!title) throw new CustomError.BadRequestError("Title required");
    if (!content) throw new CustomError.BadRequestError("Content required");

    // 4. Parsing hashtags from the request body
    let hashtagsArray = [];

    if (hashtags) {
        // TODO
    }

    //todo 5. Handling post image if it exists in the request
    if (context.files) {
        // Extracting image file from the request
        const productPostMedia = req.files.image;

        // Validating that the uploaded file is an image
        if (!productPostMedia.mimetype.startsWith("image")) {
            throw new CustomError.BadRequestError("Please upload an image");
        }

        // Uploading the image to Cloudinary and getting the result
        const imagePathForPostImage = req.files.image.tempFilePath;
        var result = await uploadImageCloudinary(imagePathForPostImage);

        // Extracting image URL and public ID from the Cloudinary result
        const url = result.secure_url;
        const id = result.public_id;

        // Creating an image object with URL and ID
        var image = {
            url: url,
            id: id
        };
    }

    // 6. Creating a new post in the database using the Posts model
    const post = await Post.create({
        ...args.args,
        user: userId,
        image: image,
        hashtags: hashtagsArray,
        category: category,
        postStatus: args.args.postStatus
    });

    context.pubSub.publish("NEW_POST", {
        newPost: post
    })
    // 7. Sending a success response with the created post information
    return "success"
};

/**-----------------------------------------------
 * @desc    increment views
 * @method  Mutation
 * @access  public
------------------------------------------------*/

const handlePostsViews = async (parent, args, context, info) => {
    const { postSlug } = args;

    let post = await Post.findOne({ slug: postSlug })

    post.viewsCount += 1;
    await post.save();

    return "success"
}


module.exports = {
    Query: {
        getAllPosts,
        getSinglePost,
        getSimilarPosts
    },
    Mutation: {
        deletePost,
        handleLike,
        createPost,
        handlePostsViews,
    }
}

