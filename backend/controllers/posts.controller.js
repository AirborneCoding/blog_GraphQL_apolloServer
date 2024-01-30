
const Posts = require("../models/articles.model")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")

const { cloudinaryRemoveImage, uploadImageCloudinary } = require("../utils/uploads/cloudinary")
const { checkPermissions } = require("../utils/secure")
//*#######################################################################################


/**-----------------------------------------------
 * @desc    create new post
 * @route   /api/v1/posts
 * @method  POST
 * @access  public 
------------------------------------------------*/
const createPost = async (req, res) => {
    // 1. get requested user
    const userId = req.user.userId;

    // 2. get the request body 
    const {
        title,
        content,
        hashtags,
        category
    } = req.body;

    // 3. Validating for title and content as required
    if (!title) throw new CustomError.BadRequestError("Title required");
    if (!content) throw new CustomError.BadRequestError("Content required");
    if (!category) throw new CustomError.BadRequestError("category required");

    // 4. Parsing hashtags from the request body
    let hashtagsArray = [];
    if (hashtags) {
        // Splitting hashtags by '#' and removing empty mentions
        hashtagsArray = hashtags.split('#').filter((mention) => mention.trim() !== ' ');
        // Splitting hashtags by comma or whitespace and removing empty hashtags
        hashtagsArray = hashtags.split(/,|\s/).filter((hashtag) => hashtag.trim() !== '');
    }

    // 5. Handling post image if it exists in the request
    if (req.files) {
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
    const post = await Posts.create({
        ...req.body,
        user: userId,
        image: image,
        hashtags: hashtagsArray,
        category: category
    });

    // 7. Sending a success response with the created post information
    res.status(StatusCodes.CREATED).json({ msg: "success upload post with photo", post });
};



/**-----------------------------------------------
 * @desc    update post details
 * @route   /api/v1/posts/:id
 * @method  PATCH
 * @access  public 
------------------------------------------------*/
const updatePost = async (req, res) => {
    // 1. Extracting the userId from the authenticated user in the request
    const userId = req.user.userId;

    // 2. Extracting postId from request parameters
    const postId = req.params.id;

    // 3. Finding the post by postId and userId
    var post = await Posts.findOne({ _id: postId, user: userId });

    // 4. Checking if the post exists
    if (!post) throw new CustomError.NotFoundError("Post not found");

    // 5-1. Checking permissions
    checkPermissions(req.user, post.user);

    // 5-2. Destructuring relevant properties from the request body
    const {
        title,
        content,
        hashtags,
        category,
    } = req.body;

    // 6. Updating post properties if provided in the request body
    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;

    // 7. Updating hashtags if provided in the request body
    if (hashtags) {
        let hashtagsArray = [];
        hashtagsArray = hashtags.split(/,|\s/).filter((hashtag) => hashtag.trim() !== '');
        post.hashtags = hashtagsArray;
    }

    // 8. Handling post image if it exists in the request
    if (req.files && req.files.image) {
        const productPostMedia = req.files.image;

        if (!productPostMedia.mimetype.startsWith("image")) {
            throw new CustomError.BadRequestError("Please upload an image");
        }

        // Delete the old image from Cloudinary if it exists
        if (post.image && post.image?.id) {
            await cloudinaryRemoveImage(post.image?.id);
        }

        const imagePathForPostImage = req.files.image.tempFilePath;
        var result = await uploadImageCloudinary(imagePathForPostImage);

        const url = result.secure_url;
        const id = result.public_id;

        post.image = {
            url: url,
            id: id
        };
    }


    // 10. Saving the updated post
    await post.save();

    // 11. Sending a success response with the updated post information
    res.status(StatusCodes.OK).json({ msg: "Post updated successfully" });
};


/**-----------------------------------------------
 * @desc    handle like
 * @route   /api/v1/posts/:id
 * @method  PUT
 * @access  public 
------------------------------------------------*/
const handleLike = async (req, res) => {
    const userId = req.user.userId
    const { id: postId } = req.params;

    let post = await Posts.findById(postId)
    if (!post) {
        throw new CustomError.NotFoundError("post not found")
    }

    const isPostAlreadyLiked = post.likes.find((user) => user.toString() === userId);

    if (isPostAlreadyLiked) {
        post = await Posts.findByIdAndUpdate(
            postId,
            {
                $pull: { likes: userId },
            },
            { new: true }
        );
    } else {
        post = await Posts.findByIdAndUpdate(
            postId,
            {
                $push: { likes: userId },
            },
            { new: true }
        );
    }

    res.status(StatusCodes.OK).json({ msg: "post liked" });
}

/**-----------------------------------------------
 * @desc    posts views counter
 * @route   /api/v1/posts/views/:id
 * @method  PUT
 * @access  public 
------------------------------------------------*/
const handlePostsViews = async (req, res) => {
    const { postSlug } = req.params;

    let post = await Posts.findOne({ slug: postSlug })
    if (!post) throw new CustomError.NotFoundError("post not found")

    post.viewsCount += 1;
    await post.save();

    return res.status(StatusCodes.OK).json({ msg: "success" });
}


module.exports = {
    createPost,
    updatePost,
    handleLike,
    handlePostsViews
}



