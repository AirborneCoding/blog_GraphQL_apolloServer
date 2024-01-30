const router = require("express").Router()

const { authenticateUser_RestApis } = require("../middleware/authenticationJWT")

const {
    createPost,
    updatePost,
    handleLike,
    handlePostsViews
} = require("../controllers/posts.controller")

router.post("/", authenticateUser_RestApis, createPost)
router.patch("/:id", authenticateUser_RestApis, updatePost)

router.route("/:id")
    .patch(authenticateUser_RestApis, updatePost)
    .put(authenticateUser_RestApis, handleLike);

router.patch("/views/:postSlug", handlePostsViews)

module.exports = router