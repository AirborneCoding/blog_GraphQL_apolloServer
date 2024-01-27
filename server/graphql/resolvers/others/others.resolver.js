const User = require("../../../models/users.model")
const Post = require("../../../models/articles.model")
const mongoose = require("mongoose");
const { authenticateUser_graphql } = require("../../../middleware/authenticationJWT")

/**-----------------------------------------------
 * @desc    get top 5 categories and hashtags
 * @method  Query
 * @access public
------------------------------------------------*/
const top5_Cate_Hash = async () => {
    const getTopItems = async (field) => {
        const pipeline = [
            {
                $match: { postStatus: 'published' },
            },
            {
                $unwind: `$${field}`,
            },
            {
                $group: {
                    _id: `$${field}`,
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 5,
            },
        ];

        return await Post.aggregate(pipeline);
    };
    const topViewedArticles = await Post.find({ postStatus: 'published' })
        .sort({ viewsCount: -1 })
        .limit(3)
        .select('_id title viewsCount');

    // worked added to res : console.log(topViewedArticles);

    const topCategories = await getTopItems('category');
    const topHashtags = await getTopItems('hashtags');
    return {
        topCategories,
        topHashtags,
    };

}

/**-----------------------------------------------
 * @desc    get User Post Views By Months
 * @method  Query
 * @access private (logged users only)
------------------------------------------------*/
const getUserPostViewsByMonth = async (parent, args, context, info) => {
    authenticateUser_graphql(context)
    const userId = context.user.userId;

    const result = await Post.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                postStatus: 'published',
            },
        },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                    year: { $year: '$createdAt' },
                },
                totalViews: { $sum: '$viewsCount' },
            },
        },
        {
            $sort: { '_id.year': -1, '_id.month': -1 },
        },
    ]);

    const formattedResult = result.map((item) => ({
        year: item._id.year,
        month: item._id.month,
        totalViews: item.totalViews,
    }));

    return formattedResult
};

/**-----------------------------------------------
 * @desc    total views count / posts / post views
 * @method  Query
 * @access private (logged users only)
 * TODO : views count
------------------------------------------------*/
const totalData = async (parent, args, context, info) => {
    authenticateUser_graphql(context)
    const userId = context.user.userId;

    const postsCount = await Post.countDocuments({ user: userId });
    const totalViews = await Post.aggregate([
        {
            $match: { user: userId }
        },
        {
            $group: {
                _id: null,
                totalViews: { $sum: '$viewsCount' }
            }
        }
    ]);
    const viewsPerMonth = totalViews.length > 0 ? totalViews[0].totalViews : 0;

    // Get the most viewed article
    const mostViewedArticle = await Post.findOne({ user: userId })
        .sort({ viewsCount: -1 })
        .lean();

    return { postsCount, viewsPerMonth, mostViewedArticle }
}


/**-----------------------------------------------
 * @desc    get top 5 authors
 * @method  Query
 * @access public
------------------------------------------------*/
const fetchTopAuthors = async () => {
    const authors = await User.aggregate([
        {
            $lookup: {
                from: 'articles',
                localField: '_id',
                foreignField: 'user',
                as: 'posts',
            },
        },
        {
            $project: {
                _id: 1,
                username: 1,
                postCount: { $size: '$posts' },
                avatar: 1
            },
        },
        {
            $sort: { postCount: -1 },
        },
        {
            $limit: 5,
        },
    ]);

    return authors
}


/**-----------------------------------------------
 * @desc    search in the blog
 * @method  Query
 * @access public
------------------------------------------------*/
const blogSearch = async (parent, args, context, info) => {
    const searchTerm = args.q;
    const pageSize = Number(args.pageSize) || 20;
    const page = Number(args.page) || 1;

    // Search in Posts
    const posts = await Post.find({
        $and: [
            {
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { content: { $regex: searchTerm, $options: 'i' } },
                    { hashtags: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } }
                ],
            },
            { postStatus: 'published' },
        ],
    })
        .populate({ path: 'user' })
        .skip((page - 1) * pageSize)
        .limit(pageSize);



    // Search in Users
    const authors = await User.find({
        $or: [
            { username: { $regex: searchTerm, $options: 'i' } },
            { bio: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
        ],
    })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    const results = {
        posts: { count: posts.length, results: posts },
        authors: { count: authors.length, results: authors },
    };

    // Construct pagination object
    const pagination = {
        page,
        pageSize,
        pageCount: Math.ceil(Math.max(posts.length, authors.length) / pageSize),
        total: Math.max(posts.length, authors.length),
    };

    return { count: (results.posts.count + results.authors.count), ...results, pagination };
};

module.exports = {
    Query: {
        top5_Cate_Hash,
        getUserPostViewsByMonth,
        totalData,
        fetchTopAuthors,
        blogSearch
    },
    Mutation: {}
}
