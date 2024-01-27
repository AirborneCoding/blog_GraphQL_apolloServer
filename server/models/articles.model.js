const mongoose = require("mongoose");
const slugify = require("slugify");

const CATEGORIES = {
    'ACADEMIC_EDUCATION': 'academic & education',
    'BIOGRAPHY': 'biography',
    'CHILDREN_YOUTH': 'children & youth',
    'FICTION_LITERATURE': 'fiction & literature',
    'LIFESTYLE': 'lifestyle',
    'TRAVEL_ADVENTURES': 'travel & adventures',
    'POLITICS_LAWS': 'politics & laws',
    'SCIENCE_RESEARCH': 'science & research',
    'ART': 'art',
    'OTHERS': 'others',
    'BUSINESS_CAREER': 'business & career',
    'NATURE_ENVIRONMENT': 'nature & environment',
    'HEALTH_FITNESS': 'health & fitness',
    'PERSONAL_GROWTH': 'personal growth',
    'RELIGION': 'religion',
    'TECHNOLOGY': 'technology',
    'HISTORY': 'history',
    'GAMING': 'gaming',
    'COMMUNITY': 'community',
    'MUSIC': 'music',
    'BOOKS': 'books'
};


const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, "Title must be at least 3 characters"],
            maxlength: [150, "Title must be between 3-50 characters"],
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        category: {
            type: String,
            lowercase: true,
            enum: Object.values(CATEGORIES),
            default: "others"
        },
        image: {
            type: Object,
            default: {
                url: "",
                id: null,
            },
            required: true
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        hashtags: [
            {
                type: String,
            },
        ],
        viewsCount: {
            type: Number,
            default: 0,
        },
        commentsCount: {
            type: Number,
            default: 0,
        },
        postStatus: {
            type: String,
            enum: ['published', "archived"],
            default: "published",
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Function to generate a slug based on the title
// ArticleSchema.pre('save', function (next) {
//     this.slug = slugify(this.title, { lower: true });
//     next();
// });
ArticleSchema.pre('save', function (next) {
    // Append a unique identifier to the slug
    const uniqueIdentifier = Date.now(); // You can use any other method to generate a unique identifier
    this.slug = slugify(`${this.title}-${uniqueIdentifier}`, { lower: true });
    next();
});

// Populate Comment For This Post
ArticleSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "postId",
    localField: "_id",
});



module.exports = mongoose.model("Articles", ArticleSchema)