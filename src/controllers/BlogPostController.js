const BlogPostDao = require('../models/dao/BlogPostDAO')

class BlogPostController {
  constructor (db) {
    this.blogPostDao = new BlogPostDao(db)
    this.renderHomeWithPosts = this.renderHomeWithPosts.bind(this)
    this.renderSinglePost = this.renderSinglePost.bind(this)
    this.renderPostCreationForm = this.renderPostCreationForm.bind(this)
    this.renderPostUpdateForm = this.renderPostUpdateForm.bind(this)
    this.insertAndRenderPost = this.insertAndRenderPost.bind(this)
    this.updateAndRenderPost = this.updateAndRenderPost.bind(this)
    this.deletePostAndRenderResponse = this.deletePostAndRenderResponse.bind(this)
  }

  async renderHomeWithPosts (req, res) {
    const posts = await this.blogPostDao.getAll()
    res.render('home', {
      posts
    })
  }

  async renderSinglePost (req, res) {
    const id = req.params.id

    try {
      const post = await this.blogPostDao.getById(id)
      const date = new Date(post.created_at_post).toISOString().slice(0, 10)
      if (!post) {
        res.status(404).render('404')
        return
      }

      res.render('post', {
        id,
        title_post: post.title_post,
        content_post: post.content_post,
        image: post.featured_image,
        timestamp: date
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderPostCreationForm (req, res) {
    res.render('post-form')
  }

  async renderPostUpdateForm (req, res) {
    const id = req.params.id

    try {
      const post = await this.blogPostDao.getById(id)

      if (!post) {
        res.status(404).render('404')
        return
      }

      res.render('post-form', {
        id,
        title: post.title_post,
        content: post.content_post,
        image: post.featured_image
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderPost (req, res) {
    const title = req.body.title
    const content = req.body.content
    const image = req.body.image

    const post = { title, content, image }

    try {
      const id = await this.blogPostDao.create(post)

      res.redirect(`/post/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderPost (req, res) {
    const id = req.params.id
    const title = req.body.title
    const content = req.body.content
    const image = req.body.image

    try {
      const post = { title, content, id, image }

      await this.blogPostDao.update(post)

      res.redirect(`/post/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deletePostAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const post = await this.blogPostDao.getById(id)

      if (!post) {
        res.status(404).render('404')
        return
      }

      await this.blogPostDao.delete(id)

      res.render('post-deleted', {
        id,
        title: post.title
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = BlogPostController
