const express = require('express')
const BlogPostController = require('./controllers/BlogPostController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const blogPostController = new BlogPostController(sqlClient)

// Routes
router.get('/', blogPostController.renderHomeWithPosts)
router.get('/about', pageController.renderAbout)

router.get('/post/create', blogPostController.renderPostCreationForm)
router.post('/post/create', blogPostController.insertAndRenderPost)

router.get('/post/:id', blogPostController.renderSinglePost)

router.get('/post/:id/update', blogPostController.renderPostUpdateForm)
router.post('/post/:id/update', blogPostController.updateAndRenderPost)

router.post('/post/:id/delete', blogPostController.deletePostAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
