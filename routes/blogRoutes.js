const { Router } = require("express");
const router = Router()
const {getAllBlogs, showForm, createBlog, getBlog, deleteBlog, showEditForm, editBlog} = require("../controllers/blogControllers")
const {requireAuth} = require("../middleware/authMiddleware")

// All routes has "/blogs" as base
// -----------------------------------------------------
router.get("/", getAllBlogs)

router.get("/create", requireAuth, showForm)

router.post("/", requireAuth, createBlog)

router.get("/:id", getBlog)

router.delete("/:id",requireAuth, deleteBlog)

router.get("/:id/edit", requireAuth, showEditForm)

router.put("/:id", requireAuth, editBlog)


module.exports = router