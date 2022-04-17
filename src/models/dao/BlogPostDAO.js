class BlogPostDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, title_post, content_post, featured_image, created_at_post FROM post')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, title_post, content_post, featured_image FROM post WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (post) {
    const response = await this.db.query('INSERT INTO post (title_post, content_post, featured_image) VALUES (?, ?, ?)', [post.title, post.content, post.image])
    const result = response[0]
    return result.insertId
  }

  async update (post) {
    const response = await this.db.query('UPDATE post SET title_post = ?, content_post = ?, featured_image = ? WHERE id = ?', [post.title, post.content, post.image, post.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM post WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = BlogPostDAO
