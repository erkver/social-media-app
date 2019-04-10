module.exports = {
  getPosts: async (req, res) => {
    try {
      const result = await req.app.get('db').posts.get_posts();
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json('Get all posts failed');
    }
  },
  getPost: async (req, res) => {
    try {
      const result = await req.app.get('db').posts.get_post(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json('Get post failed');
    }
  },
  addPost: async (req, res) => {
    try {
      const result = await req.app
        .get('db')
        .posts.add_post([req.body.text, req.body.image, req.body.userId]);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json('Add post failed');
    }
  },
  editPost: async (req, res) => {
    try {
      const result = await req.app
        .get('db')
        .posts.edit_post([req.params.id, req.body.text]);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json('Edit post failed');
    }
  },
  deletePost: async (req, res) => {
    try {
      const result = await req.app.get('db').posts.delete_post(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json('Delete post failed');
    }
  }
};
