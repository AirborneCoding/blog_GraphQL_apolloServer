const router = require("express").Router()

const {
    uploadProfilePhoto,
    testedApi,

} = require("../controllers/users.controller")

const { authenticateUser_RestApis } = require("../middleware/authenticationJWT")

router.get("/", testedApi)
router.put("/profilePhoto", authenticateUser_RestApis, uploadProfilePhoto)




module.exports = router